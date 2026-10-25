import React, { createContext, useContext, useCallback, useState, useRef } from 'react';

const ToastContext = createContext(null);

const TONES = {
  success: { bar: 'bg-[#22C55E]', icon: '✓' },
  error: { bar: 'bg-[#F2685A]', icon: '!' },
  info: { bar: 'bg-[#6D4CF2]', icon: 'i' },
};

/**
 * ToastProvider — global, reusable toast notification system.
 * Exposes `showToast(message, { tone, duration })` via useToast().
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, { tone = 'info', duration = 3200 } = {}) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      {/* Toast stack — fixed, bottom-right */}
      <div
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[min(92vw,340px)]"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const tone = TONES[t.tone] ?? TONES.info;
          return (
            <div
              key={t.id}
              className="relative overflow-hidden flex items-start gap-3 bg-white rounded-2xl shadow-2xl border border-[#132A1D]/10 px-4 py-3 animate-slide-up"
              role="status"
            >
              <span className={`${tone.bar} absolute left-0 top-0 bottom-0 w-1.5`} aria-hidden="true" />
              <span
                className={`${tone.bar} text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5`}
                aria-hidden="true"
              >
                {tone.icon}
              </span>
              <p className="text-sm font-inter font-medium text-[#132A1D] flex-1">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="text-[#132A1D]/35 hover:text-[#132A1D] text-sm leading-none cursor-pointer"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

/** Custom hook to consume ToastContext. */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastContext;
