import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/blog/', label: 'Journal' },
  { href: '/contact/', label: 'Contact' },
];

export default function NavbarClient({ currentPath }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-3 lg:top-4 inset-x-0 z-50 px-3 sm:px-5">
      <div className={`max-w-5xl mx-auto flex items-center justify-between glass-pill rounded-full pl-4 pr-2 sm:pl-5 py-2 transition-all duration-500 ${scrolled ? 'shadow-xl shadow-blue-900/10 scale-[0.99]' : ''}`}>
        <a href="/" className="flex items-center gap-2.5 group shrink-0">
          <img src="/images/logo.png" alt="Essence by Aditi logo" className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12" width="32" height="32" />
          <div className="leading-tight whitespace-nowrap">
            <span className="font-serif text-base sm:text-lg font-semibold text-brand-navy tracking-tight">Essence</span>
            <span className="font-serif italic text-base sm:text-lg text-brand-pink/85"> by Aditi</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6 mx-6">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`link-underline text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                currentPath === href || (href !== '/' && currentPath.startsWith(href))
                  ? 'text-brand-navy'
                  : 'text-slate-600 hover:text-brand-navy'
              }`}
              {...(currentPath === href ? { 'aria-current': 'page' } : {})}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/contact/" className="sheen hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-navy text-white text-sm font-medium px-5 py-2.5 transition-all duration-300 hover:bg-brand-blue hover:shadow-lg hover:shadow-blue-900/20 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            Book Consultation
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-brand-navy"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-pill mt-2 max-w-5xl mx-auto rounded-[1.75rem] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map(({ href, label }) => (
                <a key={href} href={href} className="text-base font-medium text-slate-700">{label}</a>
              ))}
              <a href="/contact/" className="mt-2 text-center rounded-full bg-brand-navy text-white text-sm font-medium px-5 py-3">Book Consultation</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
