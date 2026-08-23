import React from 'react';

/**
 * Spinner SVG used in loading state.
 */
function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

/** Map variant name → Tailwind class string with soft 3D elevation. */
const VARIANTS = {
  primary:
    'bg-[#6D4CF2] text-white hover:bg-[#5B3AD9] shadow-md shadow-[#6D4CF2]/25 hover:shadow-lg hover:shadow-[#6D4CF2]/35 hover:-translate-y-0.5 active:scale-95 border border-white/10',
  secondary:
    'bg-[#132A1D] text-white hover:bg-[#1A3827] shadow-md shadow-[#132A1D]/20 hover:shadow-lg hover:shadow-[#132A1D]/30 hover:-translate-y-0.5 active:scale-95 border border-white/10',
  outline:
    'border-2 border-[#6D4CF2] text-[#6D4CF2] hover:bg-[#6D4CF2] hover:text-white shadow-sm hover:shadow active:scale-95',
  ghost:
    'text-[#132A1D]/75 hover:text-[#132A1D] hover:bg-[#132A1D]/6 active:scale-95',
  'outline-light':
    'border-2 border-[#F8F4EA]/30 text-[#F8F4EA] hover:bg-[#F8F4EA]/10 active:scale-95',
  danger:
    'bg-[#F2685A] text-white hover:bg-[#E05244] shadow-md shadow-[#F2685A]/25 hover:shadow-lg hover:shadow-[#F2685A]/35 hover:-translate-y-0.5 active:scale-95 border border-white/10',
};

/** Map size name → Tailwind class string. */
const SIZES = {
  xs: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg font-semibold',
  sm: 'px-4 py-2 text-xs sm:text-sm gap-2 rounded-xl font-semibold',
  md: 'px-5 py-2.5 sm:py-3 text-sm gap-2.5 rounded-2xl font-bold',
  lg: 'px-7 py-3.5 text-base gap-3 rounded-2xl font-bold',
};

/**
 * Button — Soft-3D elevated button across ProjectHub.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...rest
}) {
  const base = [
    'inline-flex items-center justify-center font-inter transition-all duration-200 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={base} disabled={isLoading || rest.disabled} {...rest}>
      {isLoading && <Spinner />}
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}

export default Button;
