const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { Marp } = require('@marp-team/marp-core');
const { getInstalledBrowsers } = require('@puppeteer/browsers');
const puppeteer = require('puppeteer-core');
const config = require('../marp.config.cjs');

async function main() {
  const input = path.resolve(process.argv[2] || 'example.md');
  const marp = config.engine({ marp: new Marp() });
  marp.themeSet.add(await fs.readFile(path.join(__dirname, '../trustpoint-labs.css'), 'utf8'));
  const { html, css } = marp.render(await fs.readFile(input, 'utf8'));
  const cacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(os.homedir(), '.cache/puppeteer');
  const installed = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH
    ? [] : await getInstalledBrowsers({ cacheDir });
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH ||
    process.env.CHROME_PATH || installed.find(b => b.browser === 'chrome-headless-shell')?.executablePath ||
    installed.find(b => b.browser === 'chrome')?.executablePath;
  if (!executablePath) {
    throw new Error('Set PUPPETEER_EXECUTABLE_PATH to a Chromium browser, or install one with npx puppeteer browsers install chrome-headless-shell.');
  }
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'marp-overflow-'));
  let browser;
  try {
    const base = pathToFileURL(path.dirname(input) + path.sep).href.replaceAll('"', '&quot;');
    const filename = path.join(temp, 'slides.html');
    await fs.writeFile(filename, `<!doctype html><html><head><meta charset="utf-8"><base href="${base}"><style>${css}</style></head><body>${html}</body></html>`);
    browser = await puppeteer.launch({ executablePath, headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.emulateMediaType('print');
    await page.goto(pathToFileURL(filename).href, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(img => img.decode()));
    });
    const results = await page.evaluate(() => [...document.querySelectorAll('section')].map((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const style = getComputedStyle(slide);
      const scale = rect.width / slide.offsetWidth;
      const bounds = {
        top: rect.top + parseFloat(style.paddingTop) * scale,
        bottom: rect.bottom - parseFloat(style.paddingBottom) * scale,
        left: rect.left + parseFloat(style.paddingLeft) * scale,
        right: rect.right - parseFloat(style.paddingRight) * scale,
      };
      const overflow = { top: 0, bottom: 0, left: 0, right: 0 };
      const measure = (r, textOnly = false) => {
        if (!r.width || !r.height) return;
        // Font glyph bounds can extend beyond a tight heading line-height.
        // Use element boxes vertically and text ranges for horizontal spill.
        if (!textOnly) {
          overflow.top = Math.max(overflow.top, (bounds.top - r.top) / scale);
          overflow.bottom = Math.max(overflow.bottom, (r.bottom - bounds.bottom) / scale);
        }
        overflow.left = Math.max(overflow.left, (bounds.left - r.left) / scale);
        overflow.right = Math.max(overflow.right, (r.right - bounds.right) / scale);
      };
      for (const el of slide.querySelectorAll('*')) {
        if (el.closest('header, footer, script, style, defs') || getComputedStyle(el).display === 'none') continue;
        measure(el.getBoundingClientRect());
        // Text can overflow even when its paragraph's own box stays in bounds.
        for (const text of el.childNodes) {
          if (text.nodeType !== Node.TEXT_NODE || !text.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(text);
          for (const rect of range.getClientRects()) measure(rect, true);
        }
      }
      return { slide: i + 1, title: slide.querySelector('h1')?.textContent.trim(), overflow };
    }));
    const failures = results.filter(r => Object.values(r.overflow).some(px => px > 1));
    for (const r of failures) {
      const edges = Object.entries(r.overflow).filter(([, px]) => px > 1)
        .map(([edge, px]) => `${edge}: ${Math.ceil(px)}px`).join(', ');
      console.error(`Slide ${r.slide} (${r.title || 'untitled'}) exceeds the content area — ${edges}`);
    }
    if (failures.length) {
      console.error('Use compact, shorten the content, or split the slide, then check again.');
      process.exitCode = 1;
    } else {
      console.log(`No content overflow detected in ${results.length} slides (${path.basename(input)}).`);
    }
  } finally {
    await browser?.close();
    await fs.rm(temp, { recursive: true, force: true });
  }
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
