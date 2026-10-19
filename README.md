# Trustpoint Labs Marp Theme

Reusable [Marp](https://marp.app/) theme inspired by the Trustpoint Labs board presentation.

## Brand

- Open Sauce One typography (bring your own licensed font; not included)
- Official Trustpoint Labs logo (provided by the brand owner), embedded inside `trustpoint-labs.css`
- Primary blue `#0756A5`; near-white `#F8F9FA`; ink `#101114`
- 16:9 format and classes: `lead`, `divider`, `dark`, `compact`, `statement`, `comparison`

## Build a PDF

Install Node.js 22+ and Open Sauce One on the build host, then:

```bash
npm install
npm run build
```

Find the PDF at `dist/trustpoint-labs-example.pdf`.

To make your own deck:

```bash
npx marp --config-file ./marp.config.cjs --theme-set trustpoint-labs.css my-deck.md --pdf --allow-local-files -o my-deck.pdf
```

The `example.md` front matter shows `theme: trustpoint-labs`.

## Automatic builds

GitHub Actions builds the example PDF on each push to `main` and on pull requests. Download it from the workflow run's **Artifacts** section. An artifact is not automatically a permanent website URL; publish it to your Netlify website separately or integrate its generation into the Astro website build.

## Font note

Open Sauce One is not distributed in this repository. GitHub-hosted runners will otherwise render with a fallback font, potentially changing line breaks. Provide a properly licensed font via an authorized distribution/build mechanism if exact typography is required in CI.

## Logo

`assets/trustpoint-labs-logo.png` contains the official supplied logo. The theme embeds its PNG data, so a single CSS file can be reused from any directory. If you update the logo asset, re-embed it into the CSS as well. All slides show the logo by default, including blue slides. Use `<!-- _logo: false -->` to hide it on an individual slide.


## Slide alignment and logo options

Slides align at the top by default. Combine these optional classes with any slide layout using a Marp `_class` directive:

| Class | Effect |
| :--- | :--- |
| `center` | Center the content vertically while keeping text left aligned. |
| `logo` | Show the logo, including on blue slides (with a padded white badge). |
| `no-logo` | Hide the logo on any slide. Takes precedence over `logo`. |

Centered opening slide with the default logo:

```markdown
<!-- _class: lead center -->
```

Centered blue closing slide with the default logo:

```markdown
<!-- _class: divider center -->
```

To hide the logo on either slide, add `<!-- _logo: false -->`. Omit `center` to keep headings at the top.

For a deck without logos by default, add `class: no-logo` to its front matter. A slide-specific `_class` replaces the deck classes, so include `no-logo` in that slide's classes when needed.
## Background colors

The default background is white (`#FFFFFF`). Combine one background class with any layout, alignment, and logo options:

| Class | Background | Text | Default logo |
| :--- | :--- | :--- | :--- |
| `white` | White | Dark | Shown |
| `blue` | Brand blue `#0756A5` | Light | Shown with a white badge |
| `black` | Black `#000000` | Light | Shown with a white badge |

```markdown
<!-- _class: lead blue center -->
```

```markdown
<!-- _class: black no-logo -->
```

```markdown
<!-- _class: white -->
```

`divider` still defaults to blue and `dark` to black. An explicit background class can override these defaults, for example `divider white center`. The `logo` and `no-logo` classes override the background's logo default.

## Logo directive

Use a slide-specific directive just like `_paginate`:

```markdown
<!-- _logo: false -->
```

`_logo: true` shows the logo, including on blue slides. The directive overrides `logo` / `no-logo` classes and background defaults. Without a directive or a visibility class, the logo is shown on every background.

For a deck-wide default, add `logo: false` to the front matter; `_logo: true` can enable it on an individual slide.

Custom directives require the included `marp.config.cjs`, which `npm run build` loads automatically. When building from another directory, pass `--config-file /path/to/marp.config.cjs`. Copy this configuration along with the CSS when reusing the theme. Editors or renderers that load only the CSS must use the `logo` / `no-logo` classes instead.

## Example deck

`example.md` uses Lorem ipsum placeholder content to demonstrate opening and closing slides, headings, lists, quotes, comparison and compact tables, code blocks, a Mermaid flowchart, all three backgrounds, vertical centering, and per-slide logo and pagination directives.

The flowchart source is `assets/example-flow.mmd`. Its generated SVG is included so `npm run build` and editor previews can show the diagram without running Mermaid. After editing the source, regenerate it with:

```bash
npm run build:diagrams
```

This uses the [official Mermaid CLI](https://github.com/mermaid-js/mermaid-cli). If its browser is missing, run `npx puppeteer browsers install chrome-headless-shell` first. To use an existing compatible browser, set `PUPPETEER_EXECUTABLE_PATH` when running the command. Rebuild the PDF afterward with `npm run build`. Mermaid code fences are not rendered directly by this theme; embed the generated SVG as shown in the example.
