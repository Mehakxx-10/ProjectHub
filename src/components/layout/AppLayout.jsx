import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

/* ─── Page title map ─────────────────────────────────────────────── */
const PAGE_TITLES = {
  '/dashboard':     'Dashboard',
  '/projects':      'Projects',
  '/tasks':         'Tasks',
  '/team':          'Team',
  '/calendar':      'Calendar',
  '/reports':       'Reports',
  '/notifications': 'Notifications',
  '/settings':      'Settings',
  '/profile':       'My Profile',
};

/* ─── Hamburger icon ─────────────────────────────────────────────── */
function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h10" stroke="#132A1D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2a6 6 0 0 0-6 6v3l-2 3h16l-2-3V8a6 6 0 0 0-6-6z" />
      <path d="M8 17a2 2 0 0 0 4 0" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="7" r="5" />
      <path d="M11 11l3.5 3.5" />
    </svg>
  );
}

/**
 * AppLayout — 3D-styled application shell wrapping authenticated pages.
 */
function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'ProjectHub';

  const userInitials = (currentUser?.name || 'PU')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'PU';

  return (
    <div className="flex min-h-screen bg-[#F8F4EA]">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* ── Top Header Bar ─────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-20 bg-[#F8F4EA]/90 backdrop-blur-md border-b border-[#132A1D]/8 shadow-sm transition-all"
          style={{ minHeight: '68px' }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[68px] max-w-7xl mx-auto w-full gap-4">
            
            {/* Left: Mobile menu trigger + Page Title */}
            <div className="flex items-center gap-3">
              <button
                id="app-mobile-menu-btn"
                className="lg:hidden p-2 rounded-xl bg-white border border-[#132A1D]/8 shadow-sm hover:bg-[#132A1D]/5 transition-colors text-[#132A1D]"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon />
              </button>
              
              <div>
                <h1 className="font-sora font-bold text-[#132A1D] text-lg sm:text-xl leading-tight">
                  {pageTitle}
                </h1>
                <p className="font-inter text-[#132A1D]/45 text-xs hidden sm:block">
                  ProjectHub Workspace
                </p>
              </div>
            </div>

            {/* Center: Global Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#132A1D]/40 pointer-events-none">
                  <IconSearch />
                </span>
                <input
                  type="text"
                  placeholder="Quick search across projects, tasks..."
                  className="w-full font-inter text-xs text-[#132A1D] rounded-xl pl-9 pr-4 py-2.5 bg-white border border-[#132A1D]/10 shadow-[0_2px_8px_rgba(19,42,29,0.04)] placeholder-[#132A1D]/40 outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all"
                  onClick={() => {
                    if (location.pathname !== '/tasks' && location.pathname !== '/projects') {
                      navigate('/tasks');
                    }
                  }}
                  readOnly
                />
              </div>
            </div>

            {/* Right: Notification Bell + Avatar Profile + Home Link */}
            <div className="flex items-center gap-2.5">
              
              {/* Notification Button */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2.5 rounded-xl bg-white border border-[#132A1D]/8 shadow-sm hover:shadow hover:bg-[#132A1D]/5 transition-all text-[#132A1D]/70 hover:text-[#132A1D] cursor-pointer"
                title="Notifications"
                aria-label="Notifications"
              >
                <IconBell />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F2685A] ring-2 ring-white" />
              </button>

              {/* User Avatar Chip */}
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-white border border-[#132A1D]/8 shadow-sm hover:shadow hover:border-brand/20 transition-all cursor-pointer"
                title="My Profile"
                aria-label="My Profile"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-sora font-bold text-xs shadow-sm"
                  style={{ background: '#6D4CF2' }}
                >
                  {userInitials}
                </div>
                <span className="font-inter text-xs font-semibold text-[#132A1D] hidden xl:inline truncate max-w-[100px]">
                  {currentUser?.name?.split(' ')[0] || 'User'}
                </span>
              </button>

              {/* Back to Home button */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 text-[#132A1D]/60 hover:text-[#132A1D] text-xs font-inter font-semibold transition-all px-3 py-2 rounded-xl bg-white/70 border border-[#132A1D]/8 hover:bg-white shadow-sm hover:shadow"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 2L4 7l5 5" />
                </svg>
                <span>Home</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── Page Content Area ──────────────────────────────────────── */}
        <main
          id="app-main-content"
          className="flex-1 overflow-y-auto"
          style={{ background: '#F8F4EA' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
