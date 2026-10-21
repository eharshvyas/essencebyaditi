import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrollTop > 400);
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const r = 20;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 z-40 w-12 h-12 flex items-center justify-center cursor-pointer group"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0">
            <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(30,58,138,0.1)" strokeWidth="2.5" />
            <circle
              cx="24" cy="24" r={r}
              fill="none"
              stroke="url(#grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 24 24)"
              style={{ transition: 'stroke-dashoffset 0.1s' }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#DB2777" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg shadow-blue-900/10 flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy group-hover:text-white transition-colors">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
