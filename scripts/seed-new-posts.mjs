import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('Set DATABASE_URL'); process.exit(1); }
const db = neon(DATABASE_URL);

const POSTS = [
  {
    slug: "trichoscopy-hair-loss-diagnosis",
    title: "Trichoscopy: How Modern Diagnostics Changed My Ayurvedic Hair Practice",
    excerpt: "A trichoscope shows what the naked eye misses — follicle density, miniaturisation, scalp blood flow. Here's why I never treat hair fall without one.",
    category: "Hair", read_time: "5 min read", image: "/images/clinic-8.webp",
    body: JSON.stringify([
      { h: "Seeing what was always invisible", p: "A trichoscope magnifies the scalp 50–200x. In seconds, I can count follicular units per square centimetre, spot miniaturised hairs (the earliest sign of androgenetic loss), detect perifollicular inflammation, and photograph it all so you can track your own progress month over month. It turns guesswork into evidence." },
      { h: "What trichoscopy reveals by dosha", p: "Vata-pattern scalps show dry, flaky peripilar casts and reduced vascular markings — the scalp is literally starved. Pitta-pattern shows redness, yellow dots and early follicular miniaturisation — classic androgenetic or stress-induced thinning. Kapha-pattern shows thick sebaceous secretion, white scales and fewer but thicker hairs. Each pattern maps directly to a classical protocol." },
      { h: "How it changes the treatment plan", p: "Before trichoscopy I might prescribe a standard Shiro Abhyanga and bhringraj protocol. Now I can personalise: this patient needs scalp microcirculation support (rakta-dhatu focus), that one needs anti-inflammatory herbs topically (pitta-shamana), another needs deep nutrition correction (asthi-dhatu strengthening). The scope removes bias and reveals the real picture." },
      { h: "When to get one done", p: "Any hair loss lasting over 4 weeks, visible scalp thinning, sudden shedding after illness or pregnancy, or before starting any Panchakarma-for-hair protocol. A 15-minute trichoscopy session saves months of trial-and-error treatment. I offer it as part of every first hair consultation at Urban Ayurveda." },
    ]),
  },
  {
    slug: "ayurvedic-morning-routine-dinacharya",
    title: "The Ayurvedic Morning Routine (Dinacharya) That Fixes Everything Else",
    excerpt: "The first 90 minutes of your day decide your skin, your digestion and your hormones. Here's the Dinacharya protocol I give every patient.",
    category: "Lifestyle", read_time: "5 min read", image: "/images/still-lotus.webp",
    body: JSON.stringify([
      { h: "Why mornings matter in Ayurveda", p: "Dinacharya — daily routine — is Chapter 5 of Ashtanga Hridaya for a reason. Charaka states that regularity of daily habits is the single most powerful preventive medicine. Your circadian rhythm governs cortisol, insulin, melatonin and growth hormone. A disorganised morning cascades into skin flare-ups, hormonal chaos and digestive sluggishness." },
      { h: "The protocol (non-negotiable core)", p: "Wake before 6 am (before Kapha kala). Scrape the tongue — it removes overnight ama and stimulates digestive fire. Drink warm water (not hot, not cold). Evacuate bowels — if this is inconsistent, it is the first thing we fix in clinic. Nasya: 2 drops of anu taila in each nostril for sinus, brain and scalp nourishment. Abhyanga: even 5 minutes of warm sesame oil on the body before your shower transforms dry skin, joint stiffness and anxiety." },
      { h: "The flexible additions", p: "Oil pulling with sesame oil (3–5 minutes, not 20). A short pranayama or sun salutation sequence. Breakfast by 8 am: warm, cooked, with ghee — never skipped and never a cold smoothie in winter. These additions are dosha-specific: Vata patients must oil and warm; Pitta patients benefit from cooling pranayama; Kapha patients need the vigorous movement most." },
      { h: "What changes in 30 days", p: "Patients who adopt even 3 of these habits consistently report better skin clarity, more regular bowel habits, reduced morning puffiness and improved energy by week 3. Dinacharya is not a wellness trend — it is the foundation protocol I build every clinical treatment plan upon." },
    ]),
  },
  {
    slug: "iron-deficiency-hair-skin-nails-ayurveda",
    title: "Iron Deficiency Is Wrecking Your Hair, Skin and Nails — An Ayurvedic Fix",
    excerpt: "Low ferritin is the most common hidden cause of hair fall, pale skin and brittle nails in Indian women. Ayurveda calls it Pandu and treats it differently.",
    category: "Women's Health", read_time: "6 min read", image: "/images/clinic-3.webp",
    body: JSON.stringify([
      { h: "The silent epidemic", p: "Over 50% of Indian women aged 15–49 are anaemic (NFHS-5). Subclinical iron deficiency — ferritin below 40 ng/mL — is even more prevalent and almost never tested. I see it every week: a woman with diffuse hair shedding, pale inner eyelids, spoon-shaped nails and fatigue who has been told her haemoglobin is 'normal'. Haemoglobin is the last marker to fall; ferritin falls first." },
      { h: "Pandu Roga: the Ayurvedic lens", p: "Classical texts describe Pandu as pallor of skin, nails and eyes with weakness, breathlessness and palpitations — a near-exact clinical match. The pathology: aggravated Pitta burns through rakta dhatu (blood tissue), depleting its quality. Treatment targets both rakta formation and the Pitta that's destroying it — not just cramming iron into a broken furnace." },
      { h: "The integrative protocol", p: "Step 1: Confirm with labs — serum ferritin, haemoglobin, B12, folate and thyroid. Step 2: Fix absorption — restore agni with deepana drugs (chitrakadi vati, trikatu) because iron without fire just causes constipation. Step 3: Classical iron — Loha Bhasma, Dhatri Lauha, Punarnava Mandura — processed to be bioavailable and gentle on the gut. Step 4: Diet — jaggery, moringa, sesame, dates, black raisins, cooked greens with lemon for vitamin C synergy. Step 5: Recheck ferritin at month 3." },
      { h: "What to expect", p: "Energy returns first (week 2–3). Hair shedding slows by month 2. Nail ridges take 4–6 months to grow out. Skin colour and under-eye darkness improve gradually. The key: do not stop when you feel better — rebuild stores to ferritin > 70 before tapering." },
    ]),
  },
  {
    slug: "gut-health-skin-connection-ayurveda",
    title: "Your Gut Is Showing on Your Face: The Ayurvedic Gut-Skin Axis",
    excerpt: "Acne, eczema, dullness — your skin speaks for your gut. Ayurveda figured out the gut-skin axis 3000 years before modern science named it.",
    category: "Skin", read_time: "5 min read", image: "/images/still-herbs.webp",
    body: JSON.stringify([
      { h: "Rasa dhatu: the first tissue", p: "Ayurveda teaches that the first product of digestion — rasa dhatu — nourishes skin, hair and every subsequent tissue. When agni (digestive fire) is weak, rasa is under-cooked: full of ama (metabolic waste) instead of nutrition. This ama shows up as acne, puffiness, dark circles and that dull, lifeless look no serum can fix." },
      { h: "Modern science agrees", p: "The gut-skin axis is now an established concept in dermatology research. Gut dysbiosis drives systemic inflammation → skin barrier disruption → acne, rosacea, eczema. Studies show probiotics improve atopic dermatitis; fecal transplants are being trialled for psoriasis. Ayurveda's insight that skin disease begins in the anna vaha srotas (GI tract) was ahead by millennia." },
      { h: "The clinical approach I use", p: "First, map the gut: appetite, bloating, stool consistency, food sensitivities. Most acne patients I see have one or more of: erratic meal timing, excess dairy or sugar, chronic constipation, or antibiotic-damaged flora. Protocol: 1) Regularise meal timing (largest meal at lunch). 2) Deepana-pachana herbs for 7–14 days. 3) Gentle virechana if Pitta is high. 4) Then and only then: external lepas, facial treatments and skincare adjustments. The order matters." },
      { h: "Foods that fix both", p: "Warm, cooked, seasonal food with ghee — the single best prescription. Specific additions: amla for vitamin C and rasa-building, turmeric milk at bedtime for anti-inflammation, soaked fenugreek for insulin sensitivity (relevant for hormonal acne), and fermented foods like rice kanji for gut flora. Remove: cold drinks with meals, excessive raw salads, late-night eating." },
    ]),
  },
  {
    slug: "ayurvedic-cosmetology-facial-treatments",
    title: "Ayurvedic Cosmetology: What Happens in a Medical Facial (and Why It Works)",
    excerpt: "Not a spa facial. A certified Ayurvedic cosmetology treatment diagnoses your skin's dosha, treats the pathology and builds tissue — in 60 minutes.",
    category: "Skin", read_time: "5 min read", image: "/images/studio-1.webp",
    body: JSON.stringify([
      { h: "Cosmetology with a clinical backbone", p: "Ayurvedic cosmetology is a national-level certification that bridges classical skin science (Twacha Vigyan) with modern derma techniques. It is not spa aesthetics rebranded — it is a diagnostic process. I assess Prakriti, Vikriti, current dosha aggravation and skin layer involvement before choosing a single ingredient. The facial that a Vata skin needs will harm a Pitta skin." },
      { h: "What a session looks like", p: "Step 1: Cleansing with dosha-appropriate medicated milk or herbal decoction. Step 2: Steam or no steam — Pitta skins skip steam entirely. Step 3: Lepa (therapeutic mask) — kumkumadi for Vata dullness, manjishtha-sandalwood for Pitta inflammation, multani-neem for Kapha congestion. Step 4: Marma point facial massage with medicated oil — this is the differentiator. Marma stimulation improves lymphatic drainage, reduces puffiness and delivers medicine into deeper tissue layers." },
      { h: "The science of lepas", p: "A lepa is not a face mask. Classical texts specify: upward application (pratiloma) to encourage absorption, a specific thickness (the width of a buffalo's skin — roughly 3mm), and removal before it dries (a dried lepa pulls moisture out instead of delivering medicine in). These details are why a proper Ayurvedic lepa outperforms most commercial sheet masks." },
      { h: "Results and frequency", p: "One session gives immediate glow and de-puffing. For clinical results — melasma lightening, acne scar softening, anti-ageing — plan a course of 6–8 sessions fortnightly, paired with internal medicine and dietary changes. Standalone facials maintain; treatment courses transform. I always pair cosmetology sessions with an internal protocol for the deepest results." },
    ]),
  },
];

async function main() {
  console.log('Seeding 5 new blog posts...');
  for (const p of POSTS) {
    await db.query(`
      INSERT INTO posts (slug, title, excerpt, category, read_time, image, body, published, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW())
      ON CONFLICT (slug) DO NOTHING
    `, [p.slug, p.title, p.excerpt, p.category, p.read_time, p.image, p.body]);
    console.log(`  + ${p.slug}`);
  }
  console.log('Done! 5 new posts added.');
}

main().catch(e => { console.error(e); process.exit(1); });
