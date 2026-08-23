import React from 'react';

/* ─── Icon map — emoji-based, per existing approach ──────────────── */
const ICON_MAP = {
  folder:   { emoji: '🗂️', bg: '#EDE9FE' },   // light purple
  check:    { emoji: '✅', bg: '#D1FAE5' },   // light green
  chart:    { emoji: '📊', bg: '#FEF3C7' },   // light yellow
  team:     { emoji: '👥', bg: '#E0E7FF' },   // light indigo
  calendar: { emoji: '📅', bg: '#FEE2E2' },   // light red/coral
  bell:     { emoji: '🔔', bg: '#D1FAE5' },   // light green
};

/**
 * FeatureCard — white card, colored icon badge (top), title, description.
 *
 * @param {object}  props
 * @param {string}  props.id
 * @param {string}  props.title
 * @param {string}  props.description
 * @param {string}  [props.accent]   — unused visually; kept for data compat
 * @param {string}  [props.icon]     — key into ICON_MAP
 * @param {string}  [props.stat]     — shown as small footer label
 */
function FeatureCard({ id, title, description, icon = 'folder', stat }) {
  const { emoji, bg } = ICON_MAP[icon] ?? ICON_MAP.folder;

  return (
    <article
      className="group bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{
        border: '1px solid rgba(15,36,25,0.09)',
        boxShadow: '0 1px 6px rgba(15,36,25,0.06)',
      }}
      aria-label={title}
    >
      {/* Icon badge */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: bg }}
        aria-hidden="true"
      >
        {emoji}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3
          className="font-sora font-bold"
          style={{ color: '#0F2419', fontSize: '1rem' }}
        >
          {title}
        </h3>
        <p
          className="font-inter leading-relaxed"
          style={{ color: '#0F2419', opacity: 0.6, fontSize: '0.875rem' }}
        >
          {description}
        </p>
      </div>

      {/* Optional stat */}
      {stat && (
        <div
          className="mt-auto font-inter font-semibold text-xs"
          style={{ color: '#6D4CF2', opacity: 0.85 }}
        >
          {stat}
        </div>
      )}
    </article>
  );
}

export default FeatureCard;
