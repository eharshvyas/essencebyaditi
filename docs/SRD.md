# SRD — Software Requirements Document

## Functional requirements
- FR1: Visitor can browse Home/About/Services/Blog/Contact without auth
- FR2: Visitor can submit appointment request (name, email, phone, concern required; date/message optional); server validates and persists
- FR3: Visitor can subscribe to newsletter; duplicate email returns friendly 409
- FR4: Blog renders from static data; each article has unique slug URL for SEO
- FR5: Calendly button appears only when REACT_APP_CALENDLY_URL is set
- FR6: All social links open in new tab with rel="noopener noreferrer"

## Non-functional requirements
- NFR1 Performance: hero image preloaded; all others lazy; WebP only; target Lighthouse ≥95 all categories
- NFR2 Accessibility: WCAG AA contrast, aria-labels on icon buttons, prefers-reduced-motion honoured
- NFR3 SEO: unique title/description per page, JSON-LD, sitemap, robots, semantic HTML
- NFR4 Responsiveness: 360px → 1920px, content wraps/scales fluidly
- NFR5 Reliability: forms show toast success/failure; backend validates via Pydantic
- NFR6 Security: no secrets in code; env-only config; CORS controlled by env

## Data model (MongoDB)
- `subscribers`: {id, email(unique-checked), name?, subscribed_at}
- `appointments`: {id, name, email, phone, concern, preferred_date?, message?, status, created_at}
- `contact_messages`: {id, name, email, subject, message, created_at}
