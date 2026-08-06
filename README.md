# Semantic Atlas

A Korean–English study companion for John C. Reynolds’ *Theories of
Programming Languages*. The course reorganizes the textbook into 20 guided
units: Chapters 1–19 plus the mathematical appendix.

## What is included

- Full Korean and English routes (`/ko`, `/en`)
- A whole-book introduction (`/ko/overview`, `/en/overview`) connecting the complete argument before Chapter 1
- A separate study page for every chapter and the appendix
- Precise section-by-section chapter maps, technical takeaways, and common-confusion notes
- Four guided conceptual steps in every unit
- 60 original multiple-choice concept checks with explanations
- Local progress tracking with no account or server-side data
- An Obsidian-compatible `wiki/` generated from the same course content
- Source manifest, ingestion log, glossary, overview, and hot context

## Longform expansion status

The course is being expanded sequentially so displayed reading times reflect
actual material rather than a nominal estimate.

- Chapter 1: complete 60+ minute lesson, worked examples, proof sketches,
  retrieval checks, and practice workshop
- Chapters 2–19 and the appendix: concise guided briefs, labeled `Brief` until
  each receives the same 30+ minute treatment

## Copyright boundary

The textbook PDF is copyrighted and is **not part of this repository**. Local
copies and text extractions are protected by `.gitignore`:

```text
.raw/private/
.local/
*.pdf
```

If you own the book, place your local copy at:

```text
.raw/private/reynolds-theories-of-programming-languages-2009.pdf
```

The public repository contains independent summaries, explanations, learning
structure, and original quizzes. Consult the textbook for exact definitions,
proofs, and the original exercises.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

## Validate

```bash
npm test
npm run content:lint
```

Regenerate the Obsidian notes after editing `content/`:

```bash
npm run content:wiki
```

## Repository map

```text
app/                 bilingual site routes and components
content/             canonical structured course content
wiki/                generated Obsidian study notes
.raw/.manifest.json  source-ingestion record (PDF excluded)
scripts/             wiki generation and content linting
tests/               server-render and copyright-boundary checks
```

## Study method

Each unit follows the same loop:

1. Orient around the chapter’s central question.
2. Trace the sequence from syntax to meaning to proof.
3. Close the book and answer the checkpoint prompts.
4. Take the concept quiz and follow the bridge into the next chapter.

This is an independent educational project and is not affiliated with John C.
Reynolds or Cambridge University Press.
