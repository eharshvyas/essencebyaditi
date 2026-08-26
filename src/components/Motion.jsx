import { motion } from 'framer-motion';

export function KineticLines({ lines, className = '', spanClassName = '', delay = 0 }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className={spanClassName ? `inline-block ${spanClassName}` : 'block'}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Reveal({ children, delay = 0, y = 32, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxBlob({ className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [-50, 0, -50] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}
