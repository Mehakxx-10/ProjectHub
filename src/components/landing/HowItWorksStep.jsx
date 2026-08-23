import React from 'react';

/* ─── Step icon map ──────────────────────────────────────────────── */
const STEP_ICONS = {
  '01': { emoji: '📝', bg: '#EDE9FE' },   // purple tint
  '02': { emoji: '📋', bg: '#D1FAE5' },   // green tint
  '03': { emoji: '📈', bg: '#FEF3C7' },   // yellow tint
  '04': { emoji: '🏆', bg: '#E0E7FF' },   // indigo tint
};

/**
 * HowItWorksStep — renders a single step for the horizontal timeline.
 * Parent is responsible for the grid / flex layout and the connector line.
 *
 * @param {object} props
 * @param {string} props.step        — "01" | "02" | "03" | "04"
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.accent]   — kept for data compat, not used visually
 * @param {boolean} [props.isLast]  — kept for data compat
 */
function HowItWorksStep({ step, title, description }) {
  const { emoji, bg } = STEP_ICONS[step] ?? STEP_ICONS['01'];

  return (
    <div className="flex flex-col items-center text-center px-2">
      {/* Circular icon badge */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 flex-shrink-0"
        style={{
          background: bg,
          border: '2px solid rgba(15,36,25,0.1)',
        }}
        aria-hidden="true"
      >
        {emoji}
      </div>

      {/* Step number + title */}
      <p
        className="font-sora font-bold mb-2"
        style={{ color: '#0F2419', fontSize: '0.9rem', lineHeight: 1.3 }}
      >
        {step}. {title}
      </p>

      {/* Description */}
      <p
        className="font-inter leading-relaxed"
        style={{
          color: '#0F2419',
          opacity: 0.6,
          fontSize: '0.8125rem',
          maxWidth: '180px',
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default HowItWorksStep;
