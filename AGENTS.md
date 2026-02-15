# AGENTS.md

Guidance for coding agents working in this repository.

## Scope
These instructions apply to the entire repository.

## Project overview
- This is a Vite + React + Tailwind single-page application.
- Main source code lives in `src/`.
- Chapter content is organized under `src/chapters/<slug>/content.jsx`.
- Interactive visuals live in `src/visuals/`.

## Working style
- Keep changes focused and minimal.
- Reuse existing shared components in `src/components/` before creating new ones.
- Prefer functional React components and hooks.
- Keep visuals performant; avoid expensive work on scroll.
- Avoid introducing new dependencies unless necessary.

## Quality checks
Run these before finishing when relevant:
- `npm run lint`
- `npm run format`
- `npm run build`

## Chapter/content updates
When adding or editing chapters:
1. Update chapter metadata and content in `src/chapters/<slug>/content.jsx`.
2. Ensure the chapter is registered in `src/chapters/index.js`.
3. Reuse chapter helper components like `Scrolly`, `Takeaways`, and `Callout` when possible.

## Commit/PR expectations
- Use clear commit messages that summarize the change.
- In PR descriptions, include:
  - what changed,
  - why it changed,
  - and how it was validated.
