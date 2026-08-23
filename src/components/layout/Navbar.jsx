import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu.jsx';

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" rx="2" fill="#6D4CF2" />
      <rect x="12" y="1" width="9" height="9" rx="2" fill="#6D4CF2" fillOpacity="0.45" />
      <rect x="1" y="12" width="9" height="9" rx="2" fill="#6D4CF2" fillOpacity="0.45" />
      <rect x="12" y="12" width="9" height="9" rx="2" fill="#6D4CF2" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Features',    href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Projects',    href: '#showcase' },
  { label: 'Contact',     href: '#footer' },
];

/**
 * Navbar — sticky marketing navbar for the Landing page.
 * "Log in" navigates to /dashboard.
 * "Get Started" opens the modal.
 *
 * @param {object}   props
 * @param {Function} props.onGetStarted  — opens the Get Started modal
 */
function Navbar({ onGetStarted }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 16); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-[#F8F4EA] transition-all duration-300 ${
          scrolled ? 'shadow-sm border-b border-ink/8' : ''
        }`}
        aria-label="Main navigation"
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group" aria-label="ProjectHub home">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                <LogoIcon />
              </div>
              <span className="font-sora font-bold text-[1.1rem] text-ink tracking-tight">
                Project<span className="text-brand">Hub</span>
              </span>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-7 list-none" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-ink/60 hover:text-ink text-[0.9rem] font-medium font-inter transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                id="navbar-login-btn"
                onClick={() => navigate('/login')}
                className="text-ink/60 hover:text-ink text-sm font-medium font-inter px-3 py-2 transition-colors rounded-xl hover:bg-ink/6"
                aria-label="Log in to app"
              >
                Log in
              </button>
              <button
                id="navbar-get-started"
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream text-sm font-semibold font-inter rounded-full hover:bg-ink-800 transition-all duration-200 active:scale-95"
              >
                Get Started
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-trigger"
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <span className="block w-5 h-0.5 bg-ink rounded-full" />
              <span className="block w-5 h-0.5 bg-ink rounded-full" />
              <span className="block w-3.5 h-0.5 bg-ink rounded-full" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        onGetStarted={() => { setMobileOpen(false); onGetStarted?.(); }}
        onLogin={() => { setMobileOpen(false); navigate('/login'); }}
      />
    </>
  );
}

export default Navbar;
