# Essence by Aditi

Static website for Dr. Aditi Varekar Khatate — Ayurvedic physician (BAMS, MD Ayurveda) specialising in hair, skin, nails, women's health & Panchakarma in Navi Mumbai.

## Stack

- **Astro** — static site generator, zero JS by default
- **Tailwind CSS** — utility-first styling
- **Vercel** — deployment target

## Development

```bash
npm install
npm run dev
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Deploy

Push to GitHub. Connect repo to Vercel. Auto-deploys on every push.

Framework preset: **Astro**. No env vars needed (fully static).

## Structure

```
src/
  layouts/Base.astro     — HTML shell, meta, fonts, JSON-LD
  pages/                 — routes (index, about, services, blog, contact)
  components/            — Navbar, Footer, WhatsApp
  data/                  — content.js, blog.js (all site content)
  styles/global.css      — Tailwind + custom CSS
public/images/           — all images (webp)
```

## Content Editing

All copy in two files (no code knowledge needed):
- `src/data/content.js` — brand, services, timeline, testimonials, partners, FAQs
- `src/data/blog.js` — journal articles

Future: connect Sanity CMS for headless content management.

## Author

Designed & built by [withHarsh.com](https://withharsh.com)
