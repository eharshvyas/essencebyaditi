import { useState } from 'react';
import { Loader2, CalendarDays, CheckCircle } from 'lucide-react';

const CONCERNS = [
  "Hair & Scalp", "Skin & Cosmetology", "Nail Health",
  "Women's Health / PCOS", "Panchakarma & Detox", "General / Integrative", "Other"
];

export default function ContactForm({ formspreeId }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', concern: '', preferred_date: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.concern) { setError('Please select your concern.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
        setForm({ name: '', email: '', phone: '', concern: '', preferred_date: '', message: '' });
      } else {
        setError('Something went wrong. Please try WhatsApp or email instead.');
      }
    } catch {
      setError('Could not submit. Please try WhatsApp or email instead.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full rounded-2xl border border-slate-200 bg-white/80 px-5 py-3.5 text-sm outline-none transition-all focus:border-[#DB2777] focus:ring-2 focus:ring-pink-100';

  if (done) {
    return (
      <div className="glass-deep rounded-[2rem] p-8 lg:p-10 flex flex-col items-center justify-center text-center min-h-[320px]">
        <CheckCircle size={48} className="text-green-500 mb-5" />
        <h3 className="font-serif text-2xl text-[#0F172A] mb-2">Request received!</h3>
        <p className="text-slate-600 text-sm max-w-sm">We'll confirm your appointment slot within 24 hours. Check your email for a reply from Dr. Aditi.</p>
        <button onClick={() => setDone(false)} className="mt-7 text-sm font-medium text-[#2563EB] underline underline-offset-2">Submit another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-deep rounded-[2rem] p-8 lg:p-10 space-y-5">
      <h2 className="font-serif text-2xl text-[#0F172A] mb-1">Request an appointment</h2>
      <p className="text-sm text-slate-500 !mt-1">In-clinic (Kharghar / Thane) or online video consultation.</p>

      <div className="grid sm:grid-cols-2 gap-5">
        <input required minLength={2} placeholder="Full name" value={form.name} onChange={set('name')} className={inputCls} />
        <input required type="email" placeholder="Email" value={form.email} onChange={set('email')} className={inputCls} />
        <input required minLength={7} placeholder="Phone / WhatsApp" value={form.phone} onChange={set('phone')} className={inputCls} />
        <input type="date" value={form.preferred_date} onChange={set('preferred_date')} className={inputCls} aria-label="Preferred date" />
      </div>

      <div className="flex flex-wrap gap-2">
        {CONCERNS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setForm({ ...form, concern: c })}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 border ${
              form.concern === c
                ? 'bg-gradient-to-r from-[#1E3A8A] to-[#9D2777] text-white border-transparent'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:border-[#DB2777] hover:text-[#DB2777]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <textarea rows={4} placeholder="Tell us briefly about your concern (optional)" value={form.message} onChange={set('message')} className={inputCls} />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="sheen w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A8A] text-white px-8 py-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#2563EB] hover:to-[#DB2777] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-900/20 disabled:opacity-60"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <CalendarDays size={16} />}
        Request Appointment
      </button>
    </form>
  );
}
