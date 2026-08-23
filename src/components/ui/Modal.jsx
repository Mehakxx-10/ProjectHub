import React, { useEffect, useCallback } from 'react';

const SIZE_STYLES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/** Close (×) icon */
function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      />
    </svg>
  );
}

/**
 * Modal — Soft-3D elevated accessible overlay dialog.
 */
function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  showClose = true,
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#132A1D]/50 backdrop-blur-sm animate-fade-in transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 3D Elevated Dialog Panel */}
      <div
        className={[
          'relative w-full bg-white rounded-3xl shadow-2xl',
          'border border-[#132A1D]/10 overflow-hidden animate-slide-up',
          SIZE_STYLES[size] ?? SIZE_STYLES.md,
        ].join(' ')}
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#6D4CF2] via-[#F5B833] to-[#3FA66B]" />

        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#132A1D]/8">
            {title && (
              <h2
                id="modal-title"
                className="font-sora font-bold text-xl text-[#132A1D] tracking-tight"
              >
                {title}
              </h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="ml-auto text-[#132A1D]/40 hover:text-[#132A1D] transition-colors p-1.5 rounded-xl hover:bg-[#132A1D]/5 cursor-pointer"
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 sm:px-8 py-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
