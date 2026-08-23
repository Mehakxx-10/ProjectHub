import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

/* ─── Logo icon ──────────────────────────────────────────────────── */
function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" rx="2.5" fill="#6D4CF2" />
      <rect x="12" y="1" width="9" height="9" rx="2.5" fill="#6D4CF2" fillOpacity="0.45" />
      <rect x="1" y="12" width="9" height="9" rx="2.5" fill="#6D4CF2" fillOpacity="0.45" />
      <rect x="12" y="12" width="9" height="9" rx="2.5" fill="#6D4CF2" />
    </svg>
  );
}

/* ─── Nav icons ───────────────────────────────────────────────────── */
function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="7" height="7" rx="2" />
      <rect x="11" y="2" width="7" height="7" rx="2" />
      <rect x="2" y="11" width="7" height="7" rx="2" />
      <rect x="11" y="11" width="7" height="7" rx="2" />
    </svg>
  );
}

function IconProjects() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  );
}

function IconTasks() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 10l3 3L15 6" />
      <rect x="3" y="3" width="14" height="14" rx="2.5" />
    </svg>
  );
}

function IconTeam() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="7" r="3" />
      <path d="M1 17c0-3.3 2.7-6 6-6h.5" />
      <circle cx="15" cy="7" r="2.5" />
      <path d="M12 17c0-2.8 1.6-5 4-5" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="16" height="15" rx="2.5" />
      <path d="M6 1v4M14 1v4M2 8h16" />
    </svg>
  );
}

function IconReports() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 16V10M9 16V4M14 16V8M19 16v-5" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2a6 6 0 0 0-6 6v3l-2 3h16l-2-3V8a6 6 0 0 0-6-6z" />
      <path d="M8 17a2 2 0 0 0 4 0" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="3" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="7" r="4" />
      <path d="M2 19c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11.5L14.5 8 11 4.5M14.5 8H6" />
    </svg>
  );
}

const MENU_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', Icon: IconDashboard },
  { label: 'Projects',  to: '/projects',  Icon: IconProjects  },
  { label: 'Tasks',     to: '/tasks',     Icon: IconTasks     },
  { label: 'Team',      to: '/team',      Icon: IconTeam      },
  { label: 'Calendar',  to: '/calendar',  Icon: IconCalendar  },
  { label: 'Reports',   to: '/reports',   Icon: IconReports   },
];

const ACCOUNT_ITEMS = [
  { label: 'Notifications', to: '/notifications', Icon: IconBell    },
  { label: 'Settings',      to: '/settings',      Icon: IconSettings },
  { label: 'Profile',       to: '/profile',       Icon: IconProfile  },
];

/**
 * Sidebar — Premium 3D-styled floating navigation panel with Menu and Account sections.
 */
function Sidebar({ mobileOpen = false, onMobileClose }) {
  const navigate = useNavigate();
  const { currentUser, registeredUser, logout } = useAuth();

  const activeUser = currentUser || registeredUser;
  const userName = activeUser?.name || 'Ananya K.';
  const userRole = 'Software Engineer';
  const userInitials = (userName || 'AK')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AK';

  function handleLogoClick() {
    onMobileClose?.();
    navigate('/');
  }

  function handleLogout() {
    logout();
    onMobileClose?.();
    navigate('/login');
  }

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 overflow-y-auto">
      <div>
        {/* Logo Branding */}
        <div className="px-3 py-3 mb-3">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            aria-label="Go to home"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-all shadow-sm border border-brand/15 group-hover:scale-105">
              <LogoIcon />
            </div>
            <span className="font-sora font-bold text-lg text-[#132A1D] tracking-tight">
              Project<span className="text-brand">Hub</span>
            </span>
          </button>
        </div>

        {/* ── MENU Section ─────────────────────────────────────────── */}
        <nav aria-label="Main menu" className="space-y-1 mb-5">
          <p className="text-[#132A1D]/40 text-[10px] font-bold font-inter uppercase tracking-widest px-3.5 mb-2">
            Menu
          </p>
          <ul className="flex flex-col gap-1 list-none" role="list">
            {MENU_ITEMS.map(({ label, to, Icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold font-inter transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'bg-[#6D4CF2] text-white shadow-lg shadow-brand/35 -translate-y-0.5'
                        : 'text-[#132A1D]/65 hover:text-[#132A1D] hover:bg-white hover:shadow-sm hover:translate-x-1',
                    ].join(' ')
                  }
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? 'text-white' : 'text-[#132A1D]/55'}>
                        <Icon />
                      </span>
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── ACCOUNT Section ──────────────────────────────────────── */}
        <nav aria-label="Account menu" className="space-y-1">
          <p className="text-[#132A1D]/40 text-[10px] font-bold font-inter uppercase tracking-widest px-3.5 mb-2">
            Account
          </p>
          <ul className="flex flex-col gap-1 list-none" role="list">
            {ACCOUNT_ITEMS.map(({ label, to, Icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold font-inter transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'bg-[#6D4CF2] text-white shadow-lg shadow-brand/35 -translate-y-0.5'
                        : 'text-[#132A1D]/65 hover:text-[#132A1D] hover:bg-white hover:shadow-sm hover:translate-x-1',
                    ].join(' ')
                  }
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? 'text-white' : 'text-[#132A1D]/55'}>
                        <Icon />
                      </span>
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── Bottom Section: User Profile & Logout ──────────────────── */}
      <div className="pt-4 border-t border-[#132A1D]/8 mt-4">
        <div className="bg-white rounded-2xl p-3 border border-[#132A1D]/8 shadow-[0_4px_16px_-4px_rgba(19,42,29,0.06)] flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-sora font-bold text-xs shrink-0 shadow-md shadow-brand/25 border border-white/40"
              style={{ background: '#6D4CF2' }}
              aria-hidden="true"
            >
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="font-sora font-bold text-[#132A1D] text-xs leading-snug truncate">
                {userName}
              </p>
              <p className="font-inter text-[#132A1D]/50 text-[11px] font-medium truncate">
                {userRole}
              </p>
            </div>
          </div>

          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-[#132A1D]/45 hover:text-coral hover:bg-coral-50 transition-colors cursor-pointer shrink-0"
            title="Log out"
            aria-label="Log out"
          >
            <IconLogout />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop Floating Sidebar ─────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0 bg-[#F8F4EA] border-r border-[#132A1D]/8 h-screen sticky top-0 z-30"
        aria-label="Main sidebar"
      >
        {navContent}
      </aside>

      {/* ── Mobile Backdrop ──────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-[#132A1D]/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation sidebar"
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#F8F4EA] border-r border-[#132A1D]/10
          flex flex-col transition-transform duration-300 ease-out shadow-2xl lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}

export default Sidebar;
