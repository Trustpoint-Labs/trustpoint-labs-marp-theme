# Repository guidance

## Purpose and files

This repository provides a reusable Trustpoint Labs Marp theme and an example deck.

- `trustpoint-labs.css`: theme, embedded logo, background and layout classes, and reusable component rules.
- `marp.config.cjs`: Marp engine extension implementing the `logo` directive.
- `example.md`: generic Lorem ipsum showcase, including a Mermaid diagram and an image slide.
- `assets/`: official logo, example image, Mermaid source, and generated diagram SVG.
- `README.md`: authoring, setup, and build instructions.
- `package.json` and `package-lock.json`: development tools and reproducible dependencies.
- `dist/trustpoint-labs-example.pdf`: example PDF; currently tracked in Git.

Read the current files before editing. Preserve unrelated user changes. IDE tabs may reference files that are not present on disk. Component rules are already appended to `trustpoint-labs.css`; do not append them again or assume a separate `components.css` or gallery exists.

## Theme behavior to preserve

- Slides are 1280 × 720 (16:9), with a white background by default.
- `white`, `blue`, and `black` select backgrounds and contrasting text colors.
- `divider` defaults to blue; `dark` defaults to black. An explicit background class overrides these defaults.
- Content aligns at the top and left by default. `center` means vertically centered and left aligned.
- The logo appears by default on all backgrounds. On colored slides, its padded white badge touches the top and right slide edges.
- `<!-- _logo: false -->` hides the logo for one slide; `_logo: true` shows it. These directives take precedence over visibility classes.
- Front-matter `logo: false` sets the deck default. A slide-specific `_logo` overrides it without affecting subsequent slides.
- `logo` and `no-logo` remain available for CSS-only renderers. When both classes are present, `no-logo` wins unless a directive overrides it.
- A slide-specific `_class` replaces the inherited class list.
- Keep core layouts (`lead`, `divider`, `dark`, `compact`, `statement`, `comparison`) and components (`cards-2`, `cards-3`, `metrics`, `steps`, `timeline`, `split`) composable with background and visibility options.

## Editing conventions

- Keep the theme reusable as a single CSS file, including its embedded logo. If the logo PNG changes, update the embedded image too.
- Prefer existing color variables and narrowly scoped slide selectors. Check CSS specificity against Marp's imported default theme.
- Use ordinary Markdown lists and tables for components. Do not require raw HTML for existing layouts.
- Keep example prose generic and short enough for fixed-size slides. Use comments to explain authoring options where helpful.
- Open Sauce One is not bundled. Preserve fallback fonts and do not add font files without appropriate licensing.
- Keep documentation consistent with actual files and behavior. Do not describe proposed CI workflows as already installed.

## Build and verification

Use Node.js 22+ and install locked dependencies with `npm ci`.

```bash
npm run build
```

This loads `marp.config.cjs` and exports `dist/trustpoint-labs-example.pdf`. Custom logo directives require that configuration; CSS alone cannot implement them.

For Mermaid source changes:

```bash
npm run build:diagrams
npm run build
```

Edit `assets/example-flow.mmd`, then regenerate `assets/example-flow.svg`; avoid hand-editing the generated SVG. Keep both files in version control. The SVG lets regular PDF builds and previews work without running Mermaid. Use classic diagram styling and SVG text labels (`htmlLabels: false`) for reliable PDF output.

Rendering requires a working browser. If Mermaid's browser is missing, install it with `npx puppeteer browsers install chrome-headless-shell`, or set `PUPPETEER_EXECUTABLE_PATH` to an installed compatible browser. Do not commit machine-specific executable paths. If the sandbox prevents browser launch, use the environment's approval mechanism rather than changing the theme to work around it.

For visual changes, build the PDF and inspect affected slides for clipping, wrapping, text contrast, image proportions, logo placement, and footer overlap. Check relevant combinations of background, layout, and visibility. Do not rely solely on a successful build.

For directive changes, verify per-slide scope, deck-wide inheritance, true/false values, and precedence over classes. Run `npm run test:overflow` for the overflow checker regression tests. `npm run check:overflow -- path/to/deck.md` checks a specific deck, and the example build runs this check before PDF export.

## Version control

- Keep `node_modules/`, local editor settings, OS metadata, and npm debug logs out of Git.
- Commit the lockfile when dependencies change.
- The example PDF is currently tracked and `dist/` is not ignored. Rebuild it for deck or theme changes; do not remove it from tracking without an explicit request.
- Do not create commits, push, or publish artifacts unless requested.
