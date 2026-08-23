import React from 'react';

/**
 * Colour config for each badge variant.
 * Enhanced with subtle 3D border, soft background tint, and shadow.
 */
const VARIANT_STYLES = {
  brand: 'bg-[#6D4CF2]/10 text-[#6D4CF2] border border-[#6D4CF2]/25 shadow-sm shadow-[#6D4CF2]/10',
  sage: 'bg-[#3FA66B]/12 text-[#2A7D4E] border border-[#3FA66B]/25 shadow-sm shadow-[#3FA66B]/10',
  coral: 'bg-[#F2685A]/12 text-[#C03D4A] border border-[#F2685A]/25 shadow-sm shadow-[#F2685A]/10',
  lemon: 'bg-[#F5B833]/15 text-[#925C03] border border-[#F5B833]/30 shadow-sm shadow-[#F5B833]/10',
  ink: 'bg-[#132A1D]/8 text-[#132A1D] border border-[#132A1D]/15 shadow-sm',
  cream: 'bg-[#F8F4EA] text-[#132A1D] border border-[#132A1D]/15 shadow-sm',
  white: 'bg-white text-[#132A1D] border border-[#132A1D]/12 shadow-sm',
};

const DOT_STYLES = {
  brand: 'bg-[#6D4CF2] ring-2 ring-[#6D4CF2]/25',
  sage: 'bg-[#3FA66B] ring-2 ring-[#3FA66B]/25',
  coral: 'bg-[#F2685A] ring-2 ring-[#F2685A]/25',
  lemon: 'bg-[#F5B833] ring-2 ring-[#F5B833]/25',
  ink: 'bg-[#132A1D] ring-2 ring-[#132A1D]/25',
  cream: 'bg-[#132A1D]/50 ring-2 ring-[#132A1D]/20',
  white: 'bg-[#132A1D]/50 ring-2 ring-[#132A1D]/20',
};

const SIZE_STYLES = {
  sm: 'text-[11px] font-semibold px-2.5 py-0.5 gap-1.5',
  md: 'text-xs font-semibold px-3 py-1 gap-2',
};

/**
 * Badge — small pill label used for statuses, tags, and counts.
 */
function Badge({
  children,
  variant = 'brand',
  size = 'sm',
  dot = false,
  className = '',
  ...rest
}) {
  const base = [
    'inline-flex items-center font-inter rounded-full transition-all select-none',
    VARIANT_STYLES[variant] ?? VARIANT_STYLES.brand,
    SIZE_STYLES[size] ?? SIZE_STYLES.sm,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={base} {...rest}>
      {dot && (
        <span
          className={`shrink-0 w-1.5 h-1.5 rounded-full ${DOT_STYLES[variant] ?? DOT_STYLES.brand}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
