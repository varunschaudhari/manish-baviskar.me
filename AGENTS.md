# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview

Static portfolio website (HTML/CSS/vanilla JS) with no backend. All content is in `index.html`, styled by `style.css`, with interactivity in `script.js`. External CDN dependencies: Google Fonts, Font Awesome 6.4.0, AOS 2.3.1.

### Development Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves on port 8080) |
| Lint all | `npm run lint` |
| Lint HTML | `npm run lint:html` |
| Lint CSS | `npm run lint:css` |
| Lint JS | `npm run lint:js` |

### Notes

- The dev server (`serve`) serves static files only; there is no build step.
- The contact form logs to `console.log()` — there is no backend endpoint.
- Lint configs (`.htmlhintrc`, `.stylelintrc.json`, `eslint.config.mjs`) are tuned to the existing code style; warnings for unused vars in `script.js` are expected.
- CDN resources require internet access. Without it, the site renders but icons/fonts/scroll-animations degrade.
