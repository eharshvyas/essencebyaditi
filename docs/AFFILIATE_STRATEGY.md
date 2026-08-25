# Affiliate & Partnership Strategy — Essence by Aditi

## Why (pre-product monetisation)
Until Essence launches its own formulations, the brand monetises trust via curated recommendations — and builds relationships with the exact companies it may later manufacture with.

## Tier 1 — Affiliate programs to join now (free)
| Brand | Program | Commission (typical) |
|---|---|---|
| Kama Ayurveda | via Amazon Associates / Cuelinks | 5–10% |
| Kerala Ayurveda | direct affiliate program | 10–15% |
| Auric | direct + Amazon | 10% |
| Himalaya Wellness | Amazon Associates | 4–8% |
| Sandu Pharmaceuticals | distributor/affiliate enquiry | negotiable |
| Amazon Associates (catch-all) | amazon.in | 4–9% health |

Steps: register amazon.in Associates + Cuelinks/EarnKaro with essencebyaditi.com → replace partner cards' hrefs in `content.js` → add "affiliate disclosure" line (legally required).

## Tier 2 — Clinic & forum partnerships
- **Urban Ayurveda** (current clinic): cross-listing + backlink exchange
- Local gyms/yoga studios in Kharghar: referral tie-ups, guest workshops
- Ayurveda forums/communities: AyurTimes, Reddit r/ayurveda AMAs, NAMA-style associations — authority + backlinks

## Tier 3 — Content partnerships
- Guest articles on health portals (OnlyMyHealth, HealthShots) with author bio link
- Podcast/YouTube guesting on women's health channels
- Brand-sponsored educational reels (disclosed) once IG crosses 5k

## Rules (protect the medical brand)
1. Only recommend products she has clinically used/verified
2. Always disclose affiliate links ("This supports our free content")
3. Never affiliate-link prescription-grade classical medicines — education only
4. Track via UTM (utm_source=site&utm_medium=affiliate) in a simple sheet

## Website integration (already scaffolded)
Home → "Partners & curated brands" section reads from `PARTNERS` in `content.js`. Add `url` field per partner and wrap cards in `<a>` when programs are approved.
