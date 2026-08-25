import { motion } from 'framer-motion';
import { MARQUEE_ITEMS } from '../data/content.js';

export default function Marquee() {
  return (
    <div className="border-y border-indigo-100 bg-white/60 py-5 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="marquee-text text-lg md:text-xl text-brand-navy/80 mx-8 flex items-center gap-8 shrink-0">
            {item} <span className="text-pink-400">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
