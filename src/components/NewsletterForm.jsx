import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react';

export default function NewsletterForm({ dark = false, formspreeId }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'New Essence Letter Subscriber' }),
      });
      if (res.ok) { setDone(true); setEmail(''); }
      else setError('Something went wrong. Try again.');
    } catch {
      setError('Could not subscribe. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
        <CheckCircle size={16} /> Welcome to The Essence Letter!
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`flex-1 min-w-0 rounded-full px-5 py-3 text-sm outline-none transition-all ${
          dark
            ? 'bg-white/10 border border-white/15 text-white placeholder:text-slate-500 focus:border-indigo-300'
            : 'bg-white border border-slate-200 text-slate-800 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        aria-label="Subscribe"
        className="shrink-0 w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center transition-all duration-300 hover:bg-[#1E3A8A] hover:scale-105 disabled:opacity-60"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </form>
  );
}
