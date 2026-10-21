import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('Set DATABASE_URL env var first');
  process.exit(1);
}

const db = neon(DATABASE_URL);

const schema = readFileSync(join(__dir, '..', 'src', 'lib', 'schema.sql'), 'utf8');

const SEED_POSTS = [
  {
    slug: "ayurvedic-hair-care-guide",
    title: "Ayurvedic Hair Care: The Complete Guide to Stronger, Healthier Hair",
    excerpt: "Hair fall, dandruff and premature greying almost always begin below the scalp. Here's the dosha-based framework I use in clinic every day.",
    category: "Hair", read_time: "6 min read", image: "/images/clinic-8.webp",
    body: JSON.stringify([
      { h: "Your hair is a report card", p: "In Ayurveda, hair (kesha) is a by-product of asthi dhatu — bone tissue. When digestion weakens or stress runs high, nourishment never reaches the follicle. That's why oiling alone rarely fixes hair fall: the problem started at your gut, your hormones or your nervous system." },
      { h: "Know your hair dosha", p: "Vata hair is dry, frizzy and prone to split ends — it needs warm oiling (Shiro Abhyanga) with sesame-based oils. Pitta hair thins early and greys prematurely — cooling herbs like bhringraj, amla and brahmi are its medicine. Kapha scalps get oily and dandruff-prone — they need stimulating cleansing with triphala and neem." },
      { h: "The clinic-grade routine", p: "1) Oil the scalp 2–3 times weekly, 20 minutes before washing — never overnight on a dandruff-prone scalp. 2) Wash with a gentle, sulphate-conscious cleanser. 3) Eat for your hair: soaked almonds, curry leaves, sesame, moringa and adequate protein. 4) Sleep before 11 pm — hair grows in deep rest. 5) Address iron, B12, D3 and thyroid — I always correlate trichoscopy findings with lab reports." },
      { h: "When to see a doctor", p: "If you're losing more than 100 strands a day for over a month, seeing a widening partition, or patches of loss — get a trichoscopy assessment. Early alopecia responds beautifully to combined Ayurvedic and nutritional protocols; late-stage is much harder. The follicle you save today is the hair you keep for decades." },
    ]),
  },
  {
    slug: "ayurvedic-skin-care-dosha-guide",
    title: "Glowing Skin, the Ayurvedic Way: Your Dosha-Based Skincare Routine",
    excerpt: "Forget 10-step routines. Ayurvedic cosmetology treats skin as a mirror of digestion, hormones and mind — and that's why it works.",
    category: "Skin", read_time: "5 min read", image: "/images/texture.webp",
    body: JSON.stringify([
      { h: "Twacha: skin as a living organ", p: "Ayurveda describes seven layers of skin, each nourished by rasa dhatu — the juice of everything you eat and feel. Acne, melasma and dullness are rarely 'skin problems'; they are digestion, hormone and stress problems announcing themselves on your face." },
      { h: "Match the routine to the dosha", p: "Vata skin is dry and thin: it loves cream-based cleansing, kumkumadi oil at night and warm, oily foods. Pitta skin is sensitive and acne-prone: cooling manjishtha, sandalwood and a strict truce with spicy food. Kapha skin is oily and congestion-prone: clay-based ubtans, dry brushing and lighter meals." },
      { h: "The inner prescription", p: "No lepa can out-perform a bad gut. I routinely pair external treatments with gut-reset protocols: warm water mornings, triphala at night, seasonal virechana for stubborn pitta conditions like melasma. For hormonal acne, we investigate PCOS markers before touching the skin." },
      { h: "A realistic timeline", p: "Skin renews in 28–40 day cycles. Expect first visible change at week 6, significant change by week 12. Photograph your skin monthly, not daily. Consistency — not intensity — is the entire secret." },
    ]),
  },
  {
    slug: "nails-health-ayurveda",
    title: "What Your Nails Reveal About Your Health: An Ayurvedic Reading",
    excerpt: "Brittle, ridged, spotted or discoloured — nails are tiny diagnostic screens. Here's how a physician reads them.",
    category: "Nails", read_time: "4 min read", image: "/images/clinic-7.webp",
    body: JSON.stringify([
      { h: "Nakha: the overflow of bone tissue", p: "Like hair, nails (nakha) are formed as a by-product of asthi dhatu. Weak nails frequently accompany weak bones, poor mineral absorption or chronically low agni (digestive fire). That's why calcium tablets alone often disappoint." },
      { h: "The physician's checklist", p: "Vertical ridges suggest vata aggravation and dehydration at the tissue level. White spots often track zinc deficiency. Spoon-shaped nails point to iron deficiency. Yellowing may be fungal or hepatic. Horizontal grooves (Beau's lines) mark periods of illness or extreme stress — your nails literally record your history." },
      { h: "Rebuilding from within", p: "Protocols usually include: sesame and moringa in the diet, praval or mukta-based classical calcium sources where indicated, medicated ghee to improve absorption, and local care — daily oiling of the nail matrix with warm sesame or neem oil. Fungal cases get internal blood-purifying herbs alongside external application." },
      { h: "The 6-month rule", p: "A fingernail takes about 6 months to fully replace itself. Judge any nail treatment at month three, not week three — and if the matrix (the pale half-moon) looks healthy, the new nail growing out will be too." },
    ]),
  },
  {
    slug: "ayurveda-womens-health-hormones-pcos",
    title: "Ayurveda for Women's Health: Hormones, PCOS and Cycle Wellness",
    excerpt: "PCOS is not a life sentence. An integrative Stri Rog approach — Ayurveda plus modern diagnostics — changes the story.",
    category: "Women's Health", read_time: "7 min read", image: "/images/still-lotus.webp",
    body: JSON.stringify([
      { h: "The cycle is a vital sign", p: "Ayurveda treats the menstrual cycle as a monthly health report — its regularity, flow and comfort reflect the state of your doshas, your agni and your mind. Pain and irregularity are common, but they are never 'normal'." },
      { h: "PCOS through two lenses", p: "Modern medicine sees insulin resistance and androgen excess; Ayurveda sees kapha-meda obstruction of the artava vaha srotas (reproductive channels) with vata derangement. Both are right — and the treatments align beautifully: metabolic correction, cycle regulation, and stress repair. As a Maharashtra-registered practitioner, I read your ultrasound and hormone panels alongside your Nadi." },
      { h: "The protocol that works", p: "1) Metabolic reset: warm, unprocessed food; dinner by 8 pm; 40 minutes of movement daily. 2) Classical medicines: shatavari, ashoka, lodhra and guduchi-based formulations, individualised. 3) Panchakarma where indicated: basti courses are remarkably effective for vata-driven cycle disorders. 4) Mind: yoga nidra and breathwork — cortisol is a hormone too." },
      { h: "Fertility and beyond", p: "Preconception care (garbha sanskar's scientific core) means preparing both partners for 90+ days — the lifespan of the egg and sperm being recruited. Cycle regularity, healthy ovulation and a calm nervous system do more for fertility than any single intervention." },
    ]),
  },
  {
    slug: "panchakarma-detox-explained",
    title: "Panchakarma Explained: The Real Science of Ayurvedic Detox",
    excerpt: "Not a spa package — a medical procedure. What the five classical purification therapies actually do, and who genuinely needs them.",
    category: "Panchakarma", read_time: "6 min read", image: "/images/still-herbs.webp",
    body: JSON.stringify([
      { h: "Five actions, one goal", p: "Panchakarma means 'five actions': Vamana (therapeutic emesis), Virechana (purgation), Basti (medicated enema), Nasya (nasal therapy) and Raktamokshana (bloodletting). Each evacuates aggravated doshas from the body's deep tissues through their nearest natural route." },
      { h: "Why 'detox' undersells it", p: "A juice cleanse works on your intestines for a weekend. Panchakarma works on lipid-soluble toxins stored in tissues — it uses days of internal and external oleation (snehana) and sudation (swedana) to mobilise deep-seated ama before eliminating it. This is why it's a supervised medical procedure, never a DIY trend." },
      { h: "Who actually needs it", p: "Chronic skin disease, stubborn metabolic and hormonal disorders, joint disease, migraine, allergic conditions, burnout — and healthy people once or twice a year in season transitions (ritu sandhi). Who shouldn't: very weak patients, certain pregnancies, acute illness. Assessment always comes first." },
      { h: "What a course looks like", p: "Typically 7–21 days: 3–7 days preparation (ghee protocols, massage, steam), the main elimination day(s), then the most underrated phase — samsarjana krama, the graded diet that rebuilds digestion. Skip the rebuild and you lose half the benefit. Done right, patients describe the after-feeling as 'factory reset'." },
    ]),
  },
  {
    slug: "ritucharya-seasonal-ayurvedic-routine",
    title: "Ritucharya: The Ayurvedic Seasonal Routine Your Skin & Hormones Are Asking For",
    excerpt: "Breakouts every monsoon? Hair fall every winter? Ayurveda predicted your calendar. Here's how to eat, oil and live by the season.",
    category: "Lifestyle", read_time: "5 min read", image: "/images/still-oils.webp",
    body: JSON.stringify([
      { h: "Your body runs on seasons", p: "Ritucharya — the science of seasonal living — is one of Ayurveda's oldest preventive tools. Doshas rise and fall with the weather: Pitta accumulates through summer and erupts as acne and pigmentation in early monsoon; Vata spikes in winter as dry skin, frizzy hair and irregular cycles. Most 'sudden' flare-ups in clinic are perfectly seasonal." },
      { h: "Summer & early monsoon (Pitta season)", p: "Favour cooling foods — gulkand, coriander water, soaked raisins, coconut. Swap intense workouts for early-morning ones. Skin gets cooling lepas of manjishtha and sandalwood; scalp gets amla-based oils. This is when melasma and acne patients need the strictest routine — and see the fastest rewards." },
      { h: "Winter (Vata season)", p: "The season of nourishment: warm oil Abhyanga before bathing, sesame and almond in the diet, ghee with meals, early dinners. Hair responds beautifully to winter oiling because follicles are in a receptive phase. It is also the best season to work on fertility and menstrual regularity." },
      { h: "The two golden junctions", p: "Ritu Sandhi — the 7–10 day transition between seasons — is when immunity dips and old complaints return. This is exactly when Ayurveda schedules cleansing (a short virechana or a guided home detox) and when I review every chronic patient's plan. Align with the season, and the body stops fighting you." },
    ]),
  },
];

async function main() {
  console.log('Creating tables...');
  const statements = schema.split(';').map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    await db.query(stmt);
  }
  console.log('Tables created.');

  console.log('Seeding posts...');
  for (const p of SEED_POSTS) {
    await db.query(`
      INSERT INTO posts (slug, title, excerpt, category, read_time, image, body, published, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW())
      ON CONFLICT (slug) DO NOTHING
    `, [p.slug, p.title, p.excerpt, p.category, p.read_time, p.image, p.body]);
    console.log(`  ✓ ${p.slug}`);
  }
  console.log('Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
