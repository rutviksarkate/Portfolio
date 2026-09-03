# Rutvik Sarkate — Portfolio

Personal portfolio website built with React, Vite, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

The dev server starts on **http://localhost:43217**.

## Production Build

```bash
npm run build
npm run preview   # preview the built site locally
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite — no config changes needed (`vercel.json` is included).
4. Click **Deploy**.

## Customization

| What | File |
|---|---|
| Name, email, links, hero copy, availability | `src/config/site.js` |
| Project cards | `src/data/projects.js` |
| Work experience | `src/data/experience.js` |
| Skills | `src/data/skills.js` |
| Services | `src/data/services.js` |
| Process steps | `src/data/process.js` |
| Capability badges | `src/data/capabilities.js` |
| SEO title & meta | `index.html` + `src/config/site.js` |

### Replacing project screenshots

1. Drop your image into `src/assets/projects/` (PNG or WebP recommended).
2. Import it in `src/data/projects.js`.
3. Set the `image` field on the matching project object.

### Connecting the contact form

Set `site.form.endpoint` in `src/config/site.js` to a Formspree, Getform, or custom API URL. Until a backend endpoint is configured, the form opens the visitor's email client with a pre-filled message.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React
