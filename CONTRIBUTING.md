# Contributing

Thanks for helping expand the Python Packaging Odyssey! This project is a Vite + React + Tailwind single-page app with scrollytelling visuals powered by react-scrollama and D3.

## Workflow
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Make changes in `src/` using the existing folder layout.
4. Lint and format before committing:
   - `npm run lint`
   - `npm run format`
5. Submit a PR with a clear summary of what you changed.

## Adding or editing chapters
- Each chapter lives in `src/chapters/<slug>/content.jsx`.
- Register the chapter in `src/chapters/index.js` (order controls prev/next links and home page tiles).
- Reuse shared components like `Scrolly`, `Takeaways`, `Callout`, `ChapterHero`, and UI primitives in `src/components/ui/`.
- Put interactive visuals in `src/visuals/` and import them into the chapter content.

## Style guidelines
- Tailwind for layout/spacing; keep prose readable and components minimal.
- Prefer functional React components and hooks.
- Avoid adding heavy dependencies without discussion.
- Keep visuals performant; memoize derived data and avoid expensive work on scroll when possible.
