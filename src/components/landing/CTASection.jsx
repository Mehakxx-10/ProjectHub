import React, { useState } from 'react';

/* ─── Perks list ─────────────────────────────────────────────────── */
const PERKS = [
  'Free forever on solo plan',
  'No credit card required',
  'Set up in under 2 minutes',
  'Cancel or upgrade anytime',
];

const LOGOS = ['Airbnb', 'Stripe', 'Figma', 'Vercel', 'Linear', 'Notion'];

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  );
}

/**
 * CTASection — dark green final conversion section.
 *
 * @param {object}   props
 * @param {Function} props.onGetStarted
 */
function CTASection({ onGetStarted }) {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (onGetStarted) {
      onGetStarted(email);
      return;
    }
    if (!email.trim()) { setError('Please enter your email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email.'); return; }
    setError('');
    setSubmitted(true);
  }

  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24"
      style={{ background: '#0F2419' }}
      aria-label="Call to action"
    >
      {/* Subtle blob accents */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(109,76,242,0.15)', filter: 'blur(80px)', transform: 'translate(40%, -40%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(76,175,125,0.12)', filter: 'blur(80px)', transform: 'translate(-40%, 40%)' }}
        aria-hidden="true"
      />

      <div className="container-main relative text-center" style={{ zIndex: 1 }}>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 font-inter font-medium text-sm"
          style={{ border: '1px solid rgba(109,76,242,0.35)', background: 'rgba(109,76,242,0.12)', color: '#a78bfa' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#6D4CF2]" />
          Join 10,000+ teams shipping faster
        </div>

        {/* Heading */}
        <h2
          className="font-sora font-bold text-white mb-5 leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Ready to get things done<span style={{ color: '#6D4CF2' }}>?</span>
        </h2>

        <p className="font-inter leading-relaxed mb-10 mx-auto" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '480px' }}>
          Start your free workspace in seconds. No complex onboarding, no hidden
          fees — just a better way to run your projects.
        </p>

        {/* Email form / success */}
        {submitted ? (
          <div className="flex flex-col items-center gap-3 animate-fade-in">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
              style={{ background: 'rgba(76,175,125,0.2)' }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4CAF7D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Success">
                <path d="M5 14l6 6L23 8" />
              </svg>
            </div>
            <p className="font-sora font-bold text-white text-xl">You're on the list! 🎉</p>
            <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Check your inbox — we'll get you started right away.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10"
            aria-label="Get started sign-up form"
          >
            <label htmlFor="cta-email" className="sr-only">Email address</label>
            <input
              id="cta-email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full font-inter text-sm focus:outline-none transition-all duration-200"
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.1)',
                border: error ? '1.5px solid #E8543E' : '1.5px solid rgba(255,255,255,0.15)',
                color: '#fff',
              }}
            />
            <button
              type="submit"
              id="cta-submit-btn"
              className="inline-flex items-center justify-center gap-2 rounded-full font-inter font-semibold text-sm whitespace-nowrap transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ padding: '12px 24px', background: '#F8F4EA', color: '#0F2419' }}
            >
              Get Started Free
              <ArrowRight />
            </button>
          </form>
        )}

        {error && <p className="font-inter text-sm mb-4" style={{ color: '#E8543E' }}>{error}</p>}

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-14">
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-center gap-1.5 font-inter text-sm" style={{ color: '#FFFFFF' }}>
              <span style={{ color: '#4CAF7D' }}><CheckIcon /></span>
              {perk}
            </div>
          ))}
        </div>

        {/* Divider + logos */}
        <div className="w-full h-px mb-10" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <p className="font-inter text-xs uppercase tracking-widest mb-6" style={{ color: '#FFFFFF' }}>
          Trusted by teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {LOGOS.map((logo) => (
            <span key={logo} className="font-sora font-bold text-lg select-none cursor-default transition-colors" style={{ color: '#FFFFFF' }}>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
