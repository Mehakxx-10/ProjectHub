import React, { useEffect } from 'react';

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
    </svg>
  );
}

/**
 * MobileMenu — light-theme slide-in drawer for the Landing navbar.
 *
 * @param {object}   props
 * @param {boolean}  props.isOpen
 * @param {Function} props.onClose
 * @param {Array}    props.navLinks
 * @param {Function} props.onGetStarted
 * @param {Function} [props.onLogin]   — navigates to /dashboard
 */
function MobileMenu({ isOpen, onClose, navLinks = [], onGetStarted, onLogin }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-[#F8F4EA] border-l border-ink/10
          flex flex-col transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <span className="font-sora font-bold text-ink text-base">Menu</span>
          <button
            onClick={onClose}
            className="text-ink/40 hover:text-ink p-1.5 rounded-lg hover:bg-ink/6 transition-all"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-5" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1 list-none" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-ink/65
                    hover:text-ink hover:bg-ink/6 text-sm font-medium font-inter
                    transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer CTAs */}
        <div className="px-6 py-6 border-t border-ink/10 flex flex-col gap-3">
          <button
            onClick={onLogin ?? onClose}
            className="text-ink/55 hover:text-ink text-sm font-medium font-inter py-2 text-left transition-colors"
          >
            Log in →
          </button>
          <button
            id="mobile-cta-btn"
            onClick={onGetStarted}
            className="w-full py-3 bg-ink text-cream font-semibold font-inter text-sm rounded-full
              hover:bg-ink-800 transition-all duration-200 active:scale-95"
          >
            Get Started Free
          </button>
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;
