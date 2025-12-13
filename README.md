# Python Packaging Odyssey

A polished, interactive “visual essay” that explains Python environments and packaging through scrollytelling, responsive visuals, and concise takeaways. Built with Vite, React, Tailwind, D3, and react-scrollama.

## Features
- Home page with chapter grid, learning outcomes, and CTA.
- Five chapters with consistent templates and navigation.
- Chapter 1 fully authored with an interactive environment sandbox visualizing system vs virtual env site-packages.
- Glossary and resources pages for quick reference.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run preview
   ```

> If installing packages fails due to registry restrictions, try again from a network that can access https://registry.npmjs.org.

## Project structure
```
src/
  app/              # Router + app entry
  components/       # Layout, chapter chrome, UI primitives
  pages/            # Top-level routes (home, glossary, resources, chapter wrapper)
  chapters/         # Chapter registry + per-chapter content/visual hooks
  styles/           # Global Tailwind styles
  utils/            # Small helpers (reading time, slug)
  visuals/          # D3/React interactive components
```

## Adding a new chapter (2-minute guide)
1. Duplicate one of the folders in `src/chapters/` and update the metadata (slug, title, summary, tags, readingTime).
2. Author your content in the exported React component. Reuse `Scrolly`, `Takeaways`, and `Callout` helpers as needed.
3. Add any visuals to `src/visuals/` and import them into the chapter content.
4. Register the chapter in `src/chapters/index.js` (order determines prev/next navigation and home page layout).
5. Run `npm run lint` and `npm run format` before committing.

## Tooling
- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Styling:** Tailwind CSS utilities with a lightweight global typography layer.

## Deployment notes
The app uses a hash-based router for GitHub Pages compatibility. The Vite dev server and build output are ready for static hosting.
