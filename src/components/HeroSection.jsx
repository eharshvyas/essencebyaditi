import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { KineticLines, FadeIn } from './Motion';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yImg = useTransform(scrollY, [0, 600], [0, 70]);
  const yBlob = useTransform(scrollY, [0, 600], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      <div className="fluid-bg" />
      <motion.div style={{ y: yBlob }} className="absolute top-24 left-1/2 w-[38rem] h-[38rem] rounded-full pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-200/40 via-pink-100/30 to-rose-100/30 blur-3xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium text-[#1E3A8A] mb-8">
              <Sparkles size={13} className="text-pink-500" /> BAMS · MD (Ayurveda) · Gold Medalist · Navi Mumbai
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.04] text-brand-dark">
            <KineticLines lines={['Your essence,']} delay={0.2} />
            <KineticLines lines={['nurtured through']} delay={0.34} />
            <KineticLines lines={['Ayurveda.']} delay={0.48} spanClassName="text-magic italic" />
          </h1>

          <FadeIn delay={0.9}>
            <p className="mt-8 text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
              Rooted in Ayurveda. Guided by your individuality. <strong className="text-slate-800 font-semibold">Hair, skin, nails & women's health</strong> — by Dr. Aditi Varekar Khatate, blending classical Ayurveda with advanced diagnostics.
            </p>
          </FadeIn>

          <FadeIn delay={1.05}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/contact/" className="sheen group inline-flex items-center gap-2 rounded-full bg-brand-navy text-white px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-blue hover:to-brand-pink hover:shadow-xl hover:shadow-pink-900/20 hover:-translate-y-0.5">
                Book a Consultation
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <a href="/services/" className="link-underline text-sm font-semibold text-brand-navy">Explore treatments</a>
            </div>
          </FadeIn>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-14 flex gap-10">
            {[['7+', 'Years in medicine'], ['4', 'Merit medals'], ['1000s', 'Patients guided']].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-3xl text-brand-navy">{n}</p>
                <p className="text-xs text-slate-500 mt-1 tracking-wide">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            style={{ y: yImg }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2.3rem] bg-gradient-to-br from-indigo-200/50 via-white/0 to-pink-200/50 blur-sm" aria-hidden="true" />
            <div className="img-frame relative rounded-[2rem] rotate-1 shadow-2xl shadow-blue-900/15 overflow-hidden">
              <img src="/images/hero-aditi.webp" alt="Dr. Aditi Varekar Khatate at her clinic" className="w-full aspect-[4/5] object-cover" width="500" height="625" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/30 via-transparent via-40% to-pink-100/20 rounded-[2rem]" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-pink-900/15 rounded-[2rem]" aria-hidden="true" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 max-w-[240px]"
            >
              <p className="font-serif italic text-sm text-brand-navy">"Radiance, Inside Out."</p>
              <p className="text-[11px] text-slate-500 mt-2">— Dr. Aditi Varekar Khatate</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
