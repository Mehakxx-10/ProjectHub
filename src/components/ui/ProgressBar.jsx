import React from 'react';

const TRACK_STYLES = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

const BAR_GRADIENTS = {
  brand: 'bg-gradient-to-r from-[#6D4CF2] to-[#8B6EFA] shadow-sm shadow-[#6D4CF2]/30',
  sage:  'bg-gradient-to-r from-[#3FA66B] to-[#52C483] shadow-sm shadow-[#3FA66B]/30',
  coral: 'bg-gradient-to-r from-[#F2685A] to-[#FA897E] shadow-sm shadow-[#F2685A]/30',
  lemon: 'bg-gradient-to-r from-[#F5B833] to-[#FFCF5C] shadow-sm shadow-[#F5B833]/30',
  ink:   'bg-gradient-to-r from-[#132A1D] to-[#2B543D] shadow-sm shadow-[#132A1D]/30',
};

/**
 * ProgressBar — 3D-styled horizontal progress indicator with subtle inset track and gradient fill.
 */
function ProgressBar({
  value = 0,
  color = 'brand',
  size = 'md',
  label,
  showValue = false,
  animated = false,
  className = '',
}) {
  const clamped = Math.min(Math.max(Number(value) || 0, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-[#132A1D]/65 font-inter">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-bold text-[#132A1D] font-inter">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-[#132A1D]/8 p-[2px] rounded-full overflow-hidden shadow-inner ${TRACK_STYLES[size] ?? TRACK_STYLES.md}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `${clamped}% complete`}
      >
        <div
          className={[
            'h-full rounded-full transition-all duration-500 ease-out relative',
            BAR_GRADIENTS[color] ?? BAR_GRADIENTS.brand,
            animated ? 'animate-pulse' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
