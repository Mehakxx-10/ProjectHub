import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/landing/Hero.jsx';
import FeatureCard from '../components/landing/FeatureCard.jsx';
import HowItWorksStep from '../components/landing/HowItWorksStep.jsx';
import ProductShowcase from '../components/landing/ProductShowcase.jsx';
import KanbanShowcase from '../components/landing/KanbanShowcase.jsx';
import AnalyticsShowcase from '../components/landing/AnalyticsShowcase.jsx';
import CTASection from '../components/landing/CTASection.jsx';
import Modal from '../components/ui/Modal.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { features } from '../data/features.js';
import { howItWorksSteps } from '../data/howItWorksSteps.js';

/* ─────────────────────────────────────────────────────────
   Get Started modal form (controlled, with validation)
───────────────────────────────────────────────────────── */
function GetStartedForm({ onClose }) {
  const [form, setForm]     = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone]     = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Please enter your full name (min 2 characters).';
    if (!form.email.trim())
      e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address.';
    return e;
  }

  function handleChange(field) {
    return (e) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setDone(true);
  }

  const INPUT_BASE = {
    width: '100%',
    padding: '11px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(15,36,25,0.15)',
    background: '#F8F4EA',
    color: '#0F2419',
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  if (done) {
    return (
      <div className="text-center py-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
          style={{ background: '#D1FAE5' }}
        >
          🎉
        </div>
        <h3 className="font-sora font-bold text-xl mb-2" style={{ color: '#0F2419' }}>
          Welcome aboard!
        </h3>
        <p className="font-inter text-sm mb-6" style={{ color: 'rgba(15,36,25,0.6)' }}>
          Check your inbox — we'll get you started right away.
        </p>
        <button
          onClick={onClose}
          className="font-inter font-semibold text-sm transition-opacity hover:opacity-70"
          style={{ color: '#6D4CF2' }}
        >
          Close ↗
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label htmlFor="gs-name" className="block font-inter font-medium text-sm mb-1.5" style={{ color: '#0F2419' }}>
          Full Name
        </label>
        <input
          id="gs-name"
          type="text"
          placeholder="Alex Johnson"
          value={form.name}
          onChange={handleChange('name')}
          style={{
            ...INPUT_BASE,
            borderColor: errors.name ? '#E8543E' : 'rgba(15,36,25,0.15)',
          }}
        />
        {errors.name && (
          <p className="font-inter text-xs mt-1" style={{ color: '#E8543E' }}>{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="gs-email" className="block font-inter font-medium text-sm mb-1.5" style={{ color: '#0F2419' }}>
          Email Address
        </label>
        <input
          id="gs-email"
          type="email"
          placeholder="alex@company.com"
          value={form.email}
          onChange={handleChange('email')}
          style={{
            ...INPUT_BASE,
            borderColor: errors.email ? '#E8543E' : 'rgba(15,36,25,0.15)',
          }}
        />
        {errors.email && (
          <p className="font-inter text-xs mt-1" style={{ color: '#E8543E' }}>{errors.email}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        id="gs-submit"
        className="w-full rounded-full font-inter font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{ padding: '13px 24px', background: '#14241C', marginTop: '4px' }}
      >
        Create Free Account →
      </button>

      <p className="text-center font-inter text-xs" style={{ color: 'rgba(15,36,25,0.4)' }}>
        Free forever · No credit card required
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────
   Landing page
───────────────────────────────────────────────────────── */
/**
 * Landing — public marketing page at route "/".
 *
 * State managed here:
 *   - isModalOpen  : Get Started modal visibility
 *   - searchQuery  : Features section search filter
 */
function Landing() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function handleGetStarted() {
    navigate('/register');
  }
  function closeModal() { setIsModalOpen(false); }

  /* Filter features by title or description */
  const filteredFeatures = features.filter((f) =>
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Navbar onGetStarted={handleGetStarted} />

      {/* ── Main content ────────────────────────────────────────── */}
      <main id="main-content">

        {/* 1. Hero ──────────────────────────────────────────────── */}
        <Hero onGetStarted={handleGetStarted} />

        {/* 2. Features ──────────────────────────────────────────── */}
        <section
          id="features"
          className="py-20 bg-white"
          aria-label="Features"
        >
          <div className="container-main">

            {/* Section heading */}
            <div className="text-center mb-12">
              <h2
                className="font-sora font-bold mb-4 leading-tight"
                style={{ color: '#0F2419', fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)' }}
              >
                Everything you need to manage projects
              </h2>
              <p className="font-inter" style={{ color: 'rgba(15,36,25,0.55)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                Every feature you need to plan, track, and deliver — without the
                bloat of tools that cost a fortune.
              </p>
            </div>

            {/* Search input */}
            <div className="flex justify-center mb-10">
              <div className="relative w-full max-w-sm">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  width="16" height="16" viewBox="0 0 20 20" fill="none"
                  stroke="rgba(15,36,25,0.4)" strokeWidth="1.75" strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="9" r="7" />
                  <path d="M16 16l-3.5-3.5" />
                </svg>
                <input
                  id="feature-search"
                  type="text"
                  placeholder="Search features…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full font-inter text-sm focus:outline-none transition-all duration-200"
                  style={{
                    padding: '11px 16px 11px 44px',
                    border: '1.5px solid rgba(15,36,25,0.12)',
                    background: '#F8F4EA',
                    color: '#0F2419',
                  }}
                  aria-label="Search features"
                />
              </div>
            </div>

            {/* Feature grid */}
            {filteredFeatures.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFeatures.map((feature) => (
                  <FeatureCard key={feature.id} {...feature} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No features found"
                description={`No features match "${searchQuery}". Try a different keyword.`}
              />
            )}
          </div>
        </section>

        {/* 3. How It Works ──────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="py-20 bg-[#F8F4EA]"
          aria-label="How it works"
        >
          <div className="container-main">

            {/* Heading */}
            <div className="text-center mb-16">
              <h2
                className="font-sora font-bold leading-tight"
                style={{ color: '#0F2419', fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)' }}
              >
                How it works
              </h2>
              <p className="font-inter mt-3" style={{ color: 'rgba(15,36,25,0.55)', fontSize: '1rem', maxWidth: '420px', margin: '12px auto 0' }}>
                Four simple steps from zero to shipping your first project.
              </p>
            </div>

            {/* Steps with dashed connector on desktop */}
            <div className="relative">
              {/* Dashed horizontal line (visible only on lg) */}
              <div
                className="hidden lg:block absolute"
                style={{
                  top: '32px',
                  left: 'calc(12.5% + 32px)',
                  right: 'calc(12.5% + 32px)',
                  borderTop: '2px dashed rgba(15,36,25,0.18)',
                }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4">
                {howItWorksSteps.map((step, idx) => (
                  <HowItWorksStep
                    key={step.step}
                    {...step}
                    isLast={idx === howItWorksSteps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Product Showcase ──────────────────────────────────── */}
        <ProductShowcase />

        {/* 5. Kanban Showcase ───────────────────────────────────── */}
        <KanbanShowcase />

        {/* 6. Analytics / Progress ─────────────────────────────── */}
        <AnalyticsShowcase />

        {/* 7. CTA ───────────────────────────────────────────────── */}
        <CTASection onGetStarted={handleGetStarted} />
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <Footer />

      {/* ── Get Started Modal ────────────────────────────────────── */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Start for free — no card needed"
        size="sm"
      >
        <GetStartedForm onClose={closeModal} />
      </Modal>
    </>
  );
}

export default Landing;
