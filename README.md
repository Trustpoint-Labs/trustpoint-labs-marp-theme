# Trustpoint Labs Marp Theme

Reusable [Marp](https://marp.app/) theme inspired by the Trustpoint Labs board presentation.

## Brand

- Open Sauce One typography (bring your own licensed font; not included)
- Official Trustpoint Labs logo (provided by the brand owner), embedded inside `trustpoint-labs.css`
- Primary blue `#0756A5`; near-white `#F8F9FA`; ink `#101114`
- 16:9 format with core classes: `lead`, `divider`, `dark`, `compact`, `statement`, `comparison`

## Build a PDF

Install Node.js 22+ and Open Sauce One on the build host, then:

```bash
npm install
npm run build
```

Find the PDF at `dist/trustpoint-labs-example.pdf`.

To make your own deck:

```bash
npx marp my-deck.md --config-file ./marp.config.cjs --theme ./trustpoint-labs.css --pdf --allow-local-files -o my-deck.pdf
```

The `example.md` front matter shows `theme: trustpoint-labs`.

## Automatic builds

When a GitHub Actions workflow is configured to build the presentation, PDF artifacts can be uploaded from pushes to `main` and pull requests. Download them from the workflow run's **Artifacts** section. **Note:** The workflow is not included in the checked repository snapshot, so this is a proposed workflow rather than a currently verified automated build. An artifact is not a permanent website URL; publish it to Netlify separately or generate the PDF during the Astro site build.

## Font note

Open Sauce One is not distributed in this repository. GitHub-hosted runners will otherwise render with a fallback font, potentially changing line breaks. Provide a properly licensed font via an authorized distribution/build mechanism if exact typography is required in CI.

## Logo

`assets/trustpoint-labs-logo.png` contains the official supplied logo. The theme embeds its PNG data, so a single CSS file can be reused from any directory. If you update the logo asset, re-embed it into the CSS as well.


## Reusable slide components

The following optional components supplement the core slide layouts. They use **ordinary Markdown** (lists or tables), so they work without enabling raw HTML. The components are defined in `components.css` from the reusable-components patch; they are **not available until that CSS is appended** to `trustpoint-labs.css`.

### Install components

Copy `components.css` and `components-gallery.md` into the repository root, then append the component stylesheet once:

```bash
cat components.css >> trustpoint-labs.css
```

Do not replace the existing theme with `components.css` or append it twice.

### Component overview

| Class | Markdown structure | Recommended use |
| :--- | :--- | :--- |
| `cards-2` | Unordered list with two items | Two pillars, customer segments, offerings |
| `cards-3` | Unordered list with three items | Services, USPs, product capabilities |
| `metrics` | Unordered list with three items | Key metrics or technology highlights |
| `steps` | Ordered list with four items | Process / identity lifecycle |
| `timeline` | Ordered list with four items | Project stages and milestones |
| `split` | Two-column Markdown table | CA vs. RA, challenges vs. solutions |

Set a class using `<!-- _class: cards-3 -->` on a slide. You may combine it with an existing class, e.g. `<!-- _class: cards-3 blue -->`. Keep copy short: these are fixed 16:9 compositions and **do not automatically paginate overflowing content**. Some colored combinations should be verified visually before publication.

### Two-column cards — `cards-2`

```markdown
<!-- _class: cards-2 -->

# TWO PILLARS

- **Open source**  Transparent, auditable and vendor-independent software.
- **Professional services**  Engineering, integration and support.
```

### Three-column cards — `cards-3`

```markdown
<!-- _class: cards-3 -->

# OUR SERVICES

- **Engineering**  Custom development for industrial identity management.
- **Integration**  Connect Trustpoint to existing PKI and OT environments.
- **Support**  Deployment assistance and operational support.
```

### Metrics / highlights — `metrics`

Use a short leading term or value with a one-line explanation. The sample below lists protocols, not measured performance indicators.

```markdown
<!-- _class: metrics -->

# AT A GLANCE

- **EST**  Enrollment over Secure Transport
- **CMP**  Certificate Management Protocol
- **OPC UA**  Industrial interoperability
```

### Process steps — `steps`

```markdown
<!-- _class: steps -->

# MACHINE IDENTITY LIFECYCLE

1. **Onboard**  Establish a device identity.
2. **Issue**  Create trusted certificates.
3. **Renew**  Maintain continuity.
4. **Revoke**  Retire compromised identities.
```

### Timeline — `timeline`

```markdown
<!-- _class: timeline -->

# IMPLEMENTATION ROADMAP

1. **Discover**  Analyze the environment.
2. **Pilot**  Validate a small deployment.
3. **Integrate**  Connect production systems.
4. **Operate**  Automate renewal and monitoring.
```

### Two-column comparison — `split`

```markdown
<!-- _class: split -->

# DEPLOYMENT MODES

| Local CA mode | RA mode |
| :--- | :--- |
| Issue certificates locally in industrial networks. | Connect industrial enrollment to an external authoritative PKI. |
```

### Preview all components

The accompanying `components-gallery.md` demonstrates all six layouts, including one example on a blue slide.

```bash
mkdir -p dist
npx marp components-gallery.md \
  --config-file ./marp.config.cjs \
  --theme ./trustpoint-labs.css \
  --pdf --allow-local-files \
  -o dist/components-gallery.pdf
```

For reproducibility, build with the locally installed Marp version and commit `package-lock.json`.

## Authoring reference

### Example of a complete deck

```markdown
---
marp: true
theme: trustpoint-labs
size: 16:9
paginate: true
footer: "Trustpoint Labs · trustpoint-labs.com"
---

<!-- _class: lead white center -->
<!-- _paginate: false -->

# TRUSTPOINT LABS

Machine identity management for industrial environments.

---

<!-- _class: cards-3 -->

# OUR SERVICES

- **Engineering** Custom functionality and integrations.
- **Integration** Existing OT and PKI infrastructures.
- **Support** Deployment, maintenance and operations.

---

<!-- _class: divider blue center -->
<!-- _paginate: false -->

# LET'S CONNECT

trustpoint-labs.com
```

### Combining classes and directives

Classes select layout and background; directives override individual slide settings. For example:

```markdown
<!-- _class: cards-3 blue -->
<!-- _logo: true -->
<!-- _paginate: false -->
```

Remember that a per-slide `_class` replaces the inherited deck-level class list. If you rely on a global class such as `no-logo`, repeat it where necessary.

## Troubleshooting

| Symptom | Recommended check |
| :--- | :--- |
| Marp prints only the CLI usage text | Pass the input Markdown before other arguments; use `--theme` for one stylesheet. |
| Custom `_logo` is ignored | Ensure that Marp loads `marp.config.cjs`. |
| Logo looks wrong | Check whether the PNG was updated without re-embedding it in CSS. |
| Text wraps differently in CI | Confirm Open Sauce One is installed on the build host. |
| Diagram does not reflect `.mmd` changes | Run `npm run build:diagrams`, then rebuild PDF. |
| Component layouts look like plain lists | Confirm `components.css` rules have been appended to `trustpoint-labs.css`. |
| Content is clipped | Shorten text, use `compact` judiciously, and inspect the PDF. |

## Security notes

The `--allow-local-files` option is required when local images or SVGs must be embedded in the PDF, but it reduces browser isolation. Use it only for trusted Markdown and local assets. Avoid rendering untrusted contributions in privileged CI contexts. Keep dependencies updated, and review `npm audit` output before upgrading major versions.

## Preventing slide overflow

Use `compact` for dense slides such as a heading, subheading, and four application descriptions:

```markdown
<!-- _class: compact -->

# FOUR CORE APPLICATION AREAS

## Certificate lifecycle management across different OT assets

**01 — OPC UA Certificate Management**\
Manage compatible OPC UA application certificates and trust lists through suitable GDS-based workflows.
```

Put the other three descriptions in separate paragraphs in the same format. The complete four-area example fits with `compact`; at the default size it exceeds the available height.

`npm run build` checks the example deck before exporting the PDF and stops if content extends beyond the slide's padded content area. It does not hide overflow or silently shrink text. To check another deck:

```bash
npm run check:overflow -- path/to/deck.md
```

The checker reports the slide number, title, and overflow in pixels. It uses a Chromium browser from the Puppeteer cache, or `PUPPETEER_EXECUTABLE_PATH` / `CHROME_PATH` when set. It waits for fonts and images, and fails if an image cannot load. Run it on the host used for export, since font substitutions can affect line wrapping. It checks element and text bounds, not every possible overlap between elements; visually review the PDF too.

There is no finite font size that can fit unlimited content. If `compact` still overflows, shorten the text, use a suitable layout, or split it across slides. Check regression coverage with `npm run test:overflow`.
