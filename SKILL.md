---
name: marp-presentation-grill
description: Plan and write complete, publication-ready Marp Markdown slide presentations using the Trustpoint Labs theme. Use when the user wants to create a new deck, turn research or an outline into Marp slides, or revise an existing presentation through an adaptive one-question-at-a-time editorial grill. The primary output is a complete .md deck, not an MVP, PDF or PPTX.
---

# Marp Presentation Grill

Create a complete, coherent, audience-ready **Marp Markdown presentation**. The goal is not the fastest MVP or a speculative long-term plan: deliver the full requested presentation at the agreed depth.

## Establish context before asking

- Inspect the supplied topic, draft, files, current conversation, and relevant available project/repository context before asking for information already known.
- For Trustpoint Labs presentations, use the current theme at `https://github.com/Trustpoint-Labs/trustpoint-labs-marp-theme` as the canonical source for supported CSS classes, reusable components, assets and build configuration. Check the current README, CSS and examples when accessible. Never invent theme classes or assume the repository remains unchanged.
- Preserve source terminology and distinguish verified facts from assumptions, plans, and recommendations. Do not present proposed features or customer relationships as shipped functionality or signed engagements.
- Choose language from the request or sources; ask only if audience or usage makes the choice consequential.

## Adaptive presentation grill

Ask **one question at a time**, targeting the highest-impact remaining decision about the audience, desired outcome, central narrative, key messages, depth, evidence, or format. Prioritize decisions that change the storyline or slide structure rather than minor stylistic preferences.

For every question, provide:
- **Recommended answer** — based on the existing material.
- **Why** — how it improves this specific presentation.
- **Trade-off / deferred choice** — what the recommendation excludes or may require later.

Offer concise answer options when useful. Do not exhaustively walk a decision tree. Record nonblocking uncertainties for final fact-checking and proceed. If the user has already supplied enough information, skip questions and propose the complete outline directly.

## Narrative and outline

Build a presentation-specific narrative, not a rigid universal deck. Adapt to product overviews, use cases, technical architectures, proposals, workshops, sales decks and conference talks.

Use these editorial principles:
- One clear message per slide; write assertion-style titles where appropriate.
- Introduce technical concepts only after establishing their relevance to the audience.
- Prefer diagrams, comparisons, processes and concrete evidence over long lists.
- Use a defensible level of detail: do not arbitrarily cap at 10–12 slides. Include all essential material without filler.
- Group dense technical material into logically progressive slides; use appendices for valuable depth that interrupts the main argument.
- Make the conclusion and desired next action explicit when applicable.

Before generating the file, present a concise **deck brief** with: audience, objective, key message, proposed slide sequence, estimated length, source/evidence gaps, and visual approach. **Wait for the user's confirmation before drafting the complete deck**, unless they explicitly ask to generate it immediately.

## Author the final Markdown

After confirmation, produce the **complete `.md` presentation** with usable Marp front matter, all slide separators, slide content and applicable theme directives. No outline placeholders, `TODO` slides or lorem ipsum unless the user explicitly requests a template.

- Use `marp: true`, `theme: trustpoint-labs`, `size: 16:9` and sensible pagination defaults.
- Use only theme classes verified in the actual repository. Existing known examples include `lead`, `divider`, `dark`, `compact`, `statement`, `comparison`, `white`, `blue`, `black`, `center`, `logo` and `no-logo`; check current support for components such as `cards-2`, `cards-3`, `metrics`, `steps`, `timeline`, and `split` before using them.
- Keep slide content realistic for 16:9 layouts. Prefer concise headlines, short labels, structured comparisons and visually meaningful diagrams.
- For technical architecture and lifecycle slides, use Mermaid source when it adds clarity. Follow the repository's actual Mermaid workflow. If Mermaid code fences are unsupported by the theme, reference generated SVGs **only when they actually exist** and include any required `.mmd` source as a companion artifact. Never claim native Mermaid support without verifying it.
- Refer to legitimate repository-relative image paths only if assets exist or are delivered with the deck. Do not embed unavailable fonts, logos or fictional screenshots.
- Use notes or a source appendix for externally sourced claims when needed; retain URLs and provenance where possible.
- Keep sensitive, unannounced or confidential commercial information out of publicly intended presentations unless explicitly authorized.

## Quality review

Review the Markdown before delivery for storyline, factual accuracy, internal consistency, terminology, repetition, links, visual variety, slide density, Marp syntax, theme class compatibility, and whether every promised topic is covered.

When a build environment and appropriate resources are available, render a PDF for **validation**, inspect for clipping/missing images/fonts/diagram failures and revise the Markdown. The Markdown remains the primary deliverable; do not replace it with a PDF. If rendering cannot be done, state this plainly without implying successful visual validation.

## Completion

Deliver the full `.md` file and a brief editorial summary listing slide count, major design choices, sources or assumptions needing confirmation, and any build prerequisites. If a companion asset or Mermaid source is necessary, deliver it too.

Do not publish, commit, push to GitHub, deploy to the website or create a PDF as the final artifact without the user's separate authorization. If the user requests only a proposed outline or revision, stop at that scope.
