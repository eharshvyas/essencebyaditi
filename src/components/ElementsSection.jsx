import { Mountain, Droplets, Flame, Wind, Orbit, Flower2 } from 'lucide-react';
import { Reveal } from './Motion';
import { ELEMENTS } from '../data/content.js';

const ICONS = [Mountain, Droplets, Flame, Wind, Orbit];

export default function ElementsSection() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold mb-4">Panchamahabhuta Siddhanta</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-[#0F172A]">
            Built on the <span className="text-magic italic">five elements</span>
          </h2>
          <p className="text-sm text-slate-500 mt-4 max-w-lg">
            Ayurveda sees you as a living balance of five great elements. Every Essence protocol works to restore that original balance.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {ELEMENTS.map((el, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={el.name} delay={i * 0.06}>
                <div className="card-lift glass-deep rounded-3xl p-6 text-center h-full group">
                  <span className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${i % 2 ? 'bg-gradient-to-br from-[#DB2777] to-[#9333EA]' : 'bg-gradient-to-br from-[#1E3A8A] to-[#2563EB]'}`}>
                    <Icon size={20} />
                  </span>
                  <h3 className="font-serif text-lg text-[#0F172A]">{el.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{el.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 flex items-center justify-center gap-3 font-serif italic text-center text-sm md:text-base text-[#1E3A8A]/80">
            <Flower2 size={14} className="text-pink-400 shrink-0" />
            Trained in the classical Guru–Shishya Parampara — knowledge received from teachers, practised with reverence.
            <Flower2 size={14} className="text-pink-400 shrink-0" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
