import React, { useEffect, useRef, useState, useId } from 'react';

/**
 * Dropdown — reusable, accessible select-style dropdown (keyboard + click-outside).
 * Usage: <Dropdown label="Sort by" options={[{value,label}]} value={v} onChange={setV} />
 */
function Dropdown({ label, options, value, onChange, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonId = useId();

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative inline-block" ref={rootRef}>
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#132A1D]/12 text-sm font-semibold text-[#132A1D] font-inter shadow-sm hover:border-[#6D4CF2]/40 hover:shadow transition-all cursor-pointer"
      >
        {label && <span className="text-[#132A1D]/45 font-medium">{label}:</span>}
        <span>{selected ? selected.label : 'Select…'}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M5 7l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={buttonId}
          className="absolute z-30 mt-2 min-w-[180px] bg-white rounded-2xl border border-[#132A1D]/10 shadow-2xl py-1.5 animate-fade-in"
          style={align === 'right' ? { right: 0 } : { left: 0 }}
        >
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={[
                  'w-full text-left px-4 py-2 text-sm font-inter transition-colors cursor-pointer',
                  opt.value === value
                    ? 'bg-[#6D4CF2]/10 text-[#6D4CF2] font-semibold'
                    : 'text-[#132A1D]/75 hover:bg-[#132A1D]/5',
                ].join(' ')}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
