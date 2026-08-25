# TRD — Technical Reference Document

## Architecture
```
Browser → React SPA (CRA/craco, port 3000)
        → /api/* → FastAPI (port 8001) → MongoDB (motor, async)
```
Kubernetes ingress routes `/api` → backend, everything else → frontend.
For Vercel static deploy: frontend builds to static; point REACT_APP_BACKEND_URL to any hosted FastAPI (Railway/Render) or replace forms with Formspree/Vercel functions.

## Frontend structure
```
src/
  App.js               # router + lenis smooth scroll + grain overlay
  index.css            # tailwind + CSS variables (blue/lavender theme)
  App.css              # glass, fluid-bg, kinetic, marquee, hover systems
  data/content.js      # ALL brand copy (services, manifesto, timeline...)
  data/blog.js         # journal articles (Sanity-shaped)
  components/
    Navbar.jsx Footer.jsx NewsletterForm.jsx SEO.jsx
    motion.jsx          # KineticLines, Reveal, Overline primitives
  pages/ Home About Services Blog BlogPost Contact
```

## Design system (see docs/BRAND_KIT.md)
- Colors: primary #1E3A8A, action #2563EB, lavender #E0E7FF/#C7D2FE, bg #F8FAFC, ink #0F172A
- Type: Playfair Display (display), Manrope (body)
- Surfaces: `.glass` (70% white + 24px blur), `.glass-deep`, `.fluid-bg` animated blobs, 2.8% grain
- Motion: framer-motion (masked line reveals, viewport-once staggered reveals, parallax via useScroll), lenis 1.1s momentum, marquee 28 speed

## Backend
FastAPI + motor. Pydantic models with EmailStr (email-validator). UUID string ids (JSON-safe, no ObjectId leakage). ISO-8601 UTC timestamps.

## Env variables
| Var | Where | Purpose |
|---|---|---|
| MONGO_URL, DB_NAME | backend/.env | database |
| CORS_ORIGINS | backend/.env | CSV origins |
| REACT_APP_BACKEND_URL | frontend/.env | API base |
| REACT_APP_CALENDLY_URL | frontend/.env | booking link (optional) |

## Sanity CMS migration plan
1. Create Sanity project (free tier), schema `post` mirroring blog.js keys
2. `yarn add @sanity/client`; fetch in Blog/BlogPost with GROQ, fallback to static data
3. Move testimonials/partners to Sanity documents next
