import React, { useState } from 'react';
import { initialNotifications } from '../data/notifications.js';

const TYPE_CONFIG = {
  task:     { bg: 'bg-[#DCF3E4]', text: 'text-[#2A7D4E]', border: 'border-[#3FA66B]/20', icon: '✅' },
  mention:  { bg: 'bg-[#EFE9FE]', text: 'text-brand',     border: 'border-brand/20',     icon: '💬' },
  deadline: { bg: 'bg-[#FDE4E1]', text: 'text-[#C03D4A]', border: 'border-[#F2685A]/20', icon: '⏰' },
  project:  { bg: 'bg-[#FEF2D6]', text: 'text-[#925C03]', border: 'border-[#F5B833]/20', icon: '📁' },
  comment:  { bg: 'bg-[#EFE9FE]', text: 'text-brand',     border: 'border-brand/20',     icon: '💭' },
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  );
}

function DismissIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  );
}

function NotificationRow({ n, onRead, onDelete }) {
  const config = TYPE_CONFIG[n.type] ?? { bg: 'bg-[#132A1D]/5', text: 'text-[#132A1D]', border: 'border-[#132A1D]/10', icon: '🔔' };

  return (
    <div
      className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-200 border ${
        !n.read
          ? 'bg-white border-[#6D4CF2]/25 shadow-[0_4px_20px_-4px_rgba(109,76,242,0.12),0_1px_3px_rgba(19,42,29,0.04)]'
          : 'bg-white/80 border-[#132A1D]/8 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Type Icon Badge */}
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-sm border ${config.bg} ${config.text} ${config.border}`}
        >
          {n.icon || config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-sora font-bold text-sm text-[#132A1D] flex items-center gap-2">
                {n.title}
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-brand ring-4 ring-brand/15 shrink-0" />
                )}
              </h4>
              <p className="font-inter text-xs sm:text-sm text-[#132A1D]/65 mt-1 leading-relaxed">
                {n.message}
              </p>
            </div>
          </div>

          {/* Footer Metadata & Actions */}
          <div className="flex items-center justify-between flex-wrap gap-2 mt-3 pt-3 border-t border-[#132A1D]/6">
            <div className="flex items-center gap-2.5">
              {n.project && (
                <span className="font-inter text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#132A1D]/5 text-[#132A1D]/70 border border-[#132A1D]/8">
                  {n.project}
                </span>
              )}
              <span className="font-inter text-xs text-[#132A1D]/40 font-medium">
                {n.time}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!n.read && (
                <button
                  onClick={() => onRead(n.id)}
                  className="inline-flex items-center gap-1 font-inter text-xs font-bold text-brand hover:text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-xl border border-brand/20 transition-all cursor-pointer"
                >
                  <CheckIcon />
                  <span>Mark read</span>
                </button>
              )}
              <button
                onClick={() => onDelete(n.id)}
                className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#132A1D]/45 hover:text-[#C03D4A] hover:bg-[#F2685A]/10 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                title="Dismiss"
              >
                <DismissIcon />
                <span className="hidden sm:inline">Dismiss</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Notifications — Soft-3D notification center with Unread and Earlier sections.
 */
function Notifications() {
  const [items, setItems] = useState(initialNotifications);

  const unreadCount = items.filter((n) => !n.read).length;

  function markRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id) {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }

  const unreadItems  = items.filter((n) => !n.read);
  const earlierItems = items.filter((n) => n.read);

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-7 max-w-4xl mx-auto">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Activity & Mentions
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            Notifications
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up! No unread updates.'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="font-inter font-bold text-xs sm:text-sm text-brand hover:text-brand-600 px-4 py-2.5 rounded-xl bg-white border border-brand/20 shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* ── Notification Feed ────────────────────────────────────────── */}
      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#132A1D]/8 shadow-sm">
          <span className="text-4xl mb-3 block">🎉</span>
          <h3 className="font-sora font-bold text-lg text-[#132A1D]">All clear!</h3>
          <p className="font-inter text-[#132A1D]/50 text-sm mt-1">No notifications to show right now.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Unread Section */}
          {unreadItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <p className="font-inter font-bold text-xs uppercase tracking-wider text-[#132A1D]/60">
                  Unread ({unreadItems.length})
                </p>
              </div>
              <div className="space-y-3">
                {unreadItems.map((n) => (
                  <NotificationRow key={n.id} n={n} onRead={markRead} onDelete={dismiss} />
                ))}
              </div>
            </div>
          )}

          {/* Earlier Section */}
          {earlierItems.length > 0 && (
            <div className="space-y-3">
              <p className="font-inter font-bold text-xs uppercase tracking-wider text-[#132A1D]/40 px-1">
                Earlier
              </p>
              <div className="space-y-3">
                {earlierItems.map((n) => (
                  <NotificationRow key={n.id} n={n} onRead={markRead} onDelete={dismiss} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
