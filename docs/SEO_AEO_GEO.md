# SEO · AEO · GEO · SEM Playbook — essencebyaditi.com

## Implemented in code (v1)
- JSON-LD **Physician** schema (name, credentials, address, sameAs) in index.html
- Unique per-page titles + meta descriptions (SEO component)
- sitemap.xml (10 URLs) + robots.txt + canonical + OG/Twitter cards
- Semantic HTML (h1 once per page, article/section), WebP images with alt text, lazy loading, preloaded hero
- Mobile-first responsive, fast paint (static content, no blocking JS)

## Keyword map
| Page | Primary keyword | Secondary |
|---|---|---|
| Home | ayurvedic doctor navi mumbai | ayurveda kharghar, dr aditi varekar |
| Services | hair fall treatment ayurveda | ayurvedic cosmetology, panchakarma navi mumbai |
| Blog: PCOS | pcos ayurvedic treatment | irregular periods ayurveda |
| Blog: hair | ayurvedic hair care | trichology navi mumbai |
| Contact | ayurvedic consultation online | book ayurvedic doctor |

## AEO (Answer Engine Optimization — ChatGPT/Perplexity/Google AI)
- FAQ accordion content is extraction-friendly Q&A (add FAQPage JSON-LD when FAQs stabilise)
- Articles use question-headers + direct-answer first sentences
- Author entity: consistent "Dr. Aditi Varekar Khatate, BAMS, MD (Ayurveda)" byline everywhere → builds E-E-A-T entity

## GEO (local)
1. **Google Business Profile** (critical, free): category "Ayurvedic clinic", link site, weekly posts
2. NAP consistency (name/address/phone) across Practo, Justdial, Lybrate, Eka Care
3. City-suffixed content: "in Kharghar", "Navi Mumbai" in titles/h2s (done)
4. Get listed on Urban Ayurveda's site with a backlink

## SEM (when budget exists)
- Start ₹300/day Google Ads: "ayurvedic doctor near me", "pcos treatment navi mumbai" (call + form extensions)
- Meta ads: reels of Dr. Aditi explaining one condition → lead form

## Ongoing checklist (monthly)
- 2 new journal articles (700+ words, one internal link each, add to sitemap)
- 1 backlink outreach (Ayurveda directories, college alumni pages, WJPR author page)
- Search Console: fix coverage, track top queries, refresh best article
- Newsletter → repost as LinkedIn article (second index surface)

## Lighthouse discipline
Keep images <200KB WebP, no new render-blocking scripts, font display=swap (done), test with `npx lighthouse` after each major change.
