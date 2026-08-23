import React from 'react';
import Button from './Button.jsx';

/** Default inbox-zero SVG illustration */
function DefaultIcon() {
  return (
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E4DEFE] to-[#F8F4EA] flex items-center justify-center shadow-md border border-[#6D4CF2]/15">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6D4CF2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
      </svg>
    </div>
  );
}

/**
 * EmptyState — Soft-3D elevated placeholder card when lists have zero matching items.
 */
function EmptyState({
  title = 'No items found',
  description,
  icon,
  action,
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-3xl p-10 sm:p-14 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] flex flex-col items-center justify-center text-center ${className}`}
    >
      {/* Icon / illustration */}
      <div className="mb-4">{icon ?? <DefaultIcon />}</div>

      {/* Title */}
      <h3 className="font-sora font-bold text-lg text-[#132A1D] tracking-tight mb-1.5">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-[#132A1D]/55 text-xs sm:text-sm max-w-sm leading-relaxed font-inter">
          {description}
        </p>
      )}

      {/* Action CTA */}
      {action && (
        <div className="mt-6">
          <Button
            variant={action.variant ?? 'primary'}
            size="sm"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
