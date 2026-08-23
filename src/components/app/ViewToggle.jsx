import React from 'react';

function IconList() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h8" />
    </svg>
  );
}

function IconKanban() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="1" width="4" height="14" rx="1.5" />
      <rect x="6" y="1" width="4" height="10" rx="1.5" />
      <rect x="11" y="1" width="4" height="12" rx="1.5" />
    </svg>
  );
}

/**
 * ViewToggle — 3D-elevated segmented pill switcher between 'list' and 'kanban'.
 */
function ViewToggle({ view, onChange }) {
  return (
    <div
      className="inline-flex items-center bg-[#132A1D]/6 p-1 rounded-xl border border-[#132A1D]/8 shadow-inner"
      role="group"
      aria-label="View toggle"
    >
      {[
        { value: 'list',   Icon: IconList,   label: 'List' },
        { value: 'kanban', Icon: IconKanban, label: 'Kanban' },
      ].map(({ value, Icon, label }) => {
        const isActive = view === value;
        return (
          <button
            key={value}
            id={`view-toggle-${value}`}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
            aria-label={`${label} view`}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-inter font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white text-[#132A1D] shadow-[0_2px_8px_rgba(19,42,29,0.1)] border border-[#132A1D]/8 -translate-y-0.5'
                : 'text-[#132A1D]/55 hover:text-[#132A1D]'
            }`}
          >
            <Icon />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ViewToggle;
