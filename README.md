# Rutvik Sarkate - Portfolio

Personal portfolio for a full-stack software developer. Built with React, Vite, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

The dev server starts on **http://localhost:43217**.

## Production Build

```bash
npm run build
npm run preview
```

## Customize

All public-facing content lives in **`src/data/portfolio.js`**:

- Name, email, GitHub, LinkedIn, resume path
- Availability (`available` + `availability` copy)
- Hero, about, experience, skills, services
- Professional case study and independent builds
- Contact form options

Replace placeholder GitHub / LinkedIn URLs in that file.

Put your resume PDF at `public/Rutvik-Sarkate-Resume.pdf`.

Project screenshots live in `public/projects/`. Update the `image` path on each independent build in `src/data/portfolio.js`.

After you have a production domain, update `site.url` in `src/data/portfolio.js` and the canonical / Open Graph URLs in `index.html`.

## Contact form

Submissions email `site.email` via [FormSubmit](https://formsubmit.co). The first send only delivers an **Activate Form** email. After you click that link, later submissions arrive normally.

To use [Web3Forms](https://web3forms.com) instead, add `VITE_WEB3FORMS_ACCESS_KEY` to `.env.local`.

## Independent builds

EstateDesk, PulseBoard, FrameVault, and Forge are self-initiated product concepts shown as interface screenshots. They are not client work.

## Tech

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React
