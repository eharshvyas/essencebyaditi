import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../data/content.js';

function Card({ t }) {
  return (
    <div className="shrink-0 w-[320px] rounded-3xl bg-white/5 border border-white/10 p-7 backdrop-blur-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400 mb-5">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
      <p className="text-sm leading-relaxed text-indigo-50/90">{t.text}</p>
      <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
        <img src={t.avatar} alt="" className="w-9 h-9 rounded-full" width="36" height="36" />
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-pink-300 mt-0.5">{t.concern}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialScroll() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}
