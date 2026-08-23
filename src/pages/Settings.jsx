import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../hooks/useTheme.js';

const THEMES = [
  { id: 'cream', label: 'Cream (Default ProjectHub)', bg: '#F8F4EA', preview: '#F8F4EA' },
];

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]">
      <div className="mb-5 pb-3 border-b border-[#132A1D]/6">
        <h3 className="font-sora font-extrabold text-[#132A1D] text-lg tracking-tight">{title}</h3>
        {subtitle && <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

/**
 * Settings — Soft-3D styled account & workspace preferences.
 */
function Settings() {
  const { currentUser, registeredUser } = useAuth();
  const activeUser = currentUser || registeredUser;

  const { theme, toggleTheme, setTheme } = useTheme();
  const [name,  setName]  = useState(activeUser?.name || 'Ananya K.');
  const [email, setEmail] = useState(activeUser?.email || 'ananya.k@projecthub.app');
  const [role,  setRole]  = useState('Software Engineer');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [saved,    setSaved]    = useState(false);

  const initials = (name || 'AK')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AK';

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-7 max-w-3xl mx-auto">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Preferences & Profile
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            Settings
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            Manage your account settings, personal details, and workspace preferences.
          </p>
        </div>
      </div>

      {/* ── Profile Section ─────────────────────────────────────────── */}
      <SectionCard title="Profile Information" subtitle="Update your personal details and workspace identity">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar and Role Header */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-sora font-bold text-white text-xl shadow-md border-2 border-white/50 shrink-0"
              style={{ background: '#6D4CF2' }}
            >
              {initials}
            </div>
            <div>
              <h4 className="font-sora font-bold text-sm text-[#132A1D]">{name || 'Your Name'}</h4>
              <p className="font-inter text-xs text-brand font-semibold mt-0.5">{role}</p>
              <p className="font-inter text-[11px] text-[#132A1D]/45 mt-0.5">ProjectHub Team Member</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Display Name */}
            <div>
              <label htmlFor="settings-name" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                Display Name
              </label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-3 bg-[#F8F4EA] border border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="settings-email" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-3 bg-[#F8F4EA] border border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              />
            </div>

            {/* Timezone */}
            <div>
              <label htmlFor="settings-timezone" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                Timezone
              </label>
              <select
                id="settings-timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-3 bg-[#F8F4EA] border border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none transition-all cursor-pointer"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="font-inter font-bold text-sm text-white rounded-2xl px-6 py-3 shadow-lg shadow-[#132A1D]/15 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              style={{ background: saved ? '#3FA66B' : '#132A1D' }}
            >
              {saved ? '✓ Changes Saved' : 'Save Changes'}
            </button>
            {saved && (
              <span className="font-inter text-xs text-[#3FA66B] font-semibold animate-fade-in">
                Profile updated successfully!
              </span>
            )}
          </div>
        </form>
      </SectionCard>

      {/* ── Appearance Section ───────────────────────────────────────── */}
      <SectionCard title="Appearance" subtitle="Customize the visual presentation of your workspace">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {THEMES.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-brand bg-brand-50/50 shadow-md ring-2 ring-brand/20'
                    : 'border-[#132A1D]/10 bg-white hover:border-[#132A1D]/25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl border border-[#132A1D]/15 shadow-inner"
                    style={{ background: t.preview }}
                  />
                  <span className="font-inter font-semibold text-xs sm:text-sm text-[#132A1D]">{t.label}</span>
                </div>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-brand/20" />
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

export default Settings;
