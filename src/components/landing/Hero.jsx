import React from 'react';

/* ─────────────────────────────────────────────────────────
   Organic blob shapes — flat solid colours, no blur
───────────────────────────────────────────────────────── */
function HeroBlobs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Large green — top right, bleeds off edge */}
      <div
        style={{
          position: 'absolute',
          top: '-90px',
          right: '-50px',
          width: '370px',
          height: '370px',
          background: '#4CAF7D',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
      />
      {/* Yellow / gold — centre right */}
      <div
        style={{
          position: 'absolute',
          top: '210px',
          right: '155px',
          width: '230px',
          height: '230px',
          background: '#F0B429',
          borderRadius: '70% 30% 70% 30% / 30% 50% 50% 70%',
        }}
      />
      {/* Coral / red — bottom right, bleeds off edge */}
      <div
        style={{
          position: 'absolute',
          bottom: '-50px',
          right: '-20px',
          width: '280px',
          height: '280px',
          background: '#E8543E',
          borderRadius: '43% 57% 50% 50% / 50% 38% 62% 50%',
        }}
      />
      {/* Small teal circle — far left, bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '-35px',
          width: '110px',
          height: '110px',
          background: '#4CAF7D',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Dashboard preview card (matching reference exactly)
───────────────────────────────────────────────────────── */
const SIDEBAR_ITEMS = [
  { label: 'Dashboard', active: true },
  { label: 'Projects', active: false },
  { label: 'Tasks', active: false },
  { label: 'Calendar', active: false },
  { label: 'Team', active: false },
  { label: 'Reports', active: false },
  { label: 'Settings', active: false },
];

const STAT_CARDS = [
  { value: '12', label: 'Projects', icon: '📁', iconBg: '#EDE9FE' },
  { value: '38', label: 'Tasks',    icon: '✅', iconBg: '#D1FAE5' },
  { value: '78%', label: 'Progress', icon: '📊', iconBg: '#FEF3C7' },
];

const TASK_COLS = [
  {
    status: 'To Do',
    dot: '#E8543E',
    count: 12,
    tasks: ['Design Login Page', 'Create User Flow', 'Setup Firebase'],
  },
  {
    status: 'In Progress',
    dot: '#F0B429',
    count: 8,
    tasks: ['Dashboard UI', 'Payment Integration', 'API Connection'],
  },
  {
    status: 'Done',
    dot: '#4CAF7D',
    count: 18,
    tasks: ['Landing Page', 'User Authentication', 'Database Setup'],
  },
];

function DashboardCard() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden bg-white animate-float"
      style={{
        border: '1.5px solid rgba(15,36,25,0.14)',
        boxShadow: '0 8px 40px rgba(15,36,25,0.13)',
        maxWidth: '500px',
      }}
      aria-hidden="true"
    >
      <div className="flex" style={{ minHeight: '370px' }}>

        {/* ── Dark sidebar ── */}
        <div
          className="flex-shrink-0 flex flex-col gap-0.5 p-3"
          style={{ width: '130px', background: '#0F1E15' }}
        >
          <p className="text-white font-sora font-bold text-[11px] px-2 pt-1 pb-3 tracking-tight">
            ProjectHub
          </p>
          {SIDEBAR_ITEMS.map(({ label, active }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-inter font-medium"
              style={{
                background: active ? '#6D4CF2' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: active ? '#fff' : 'rgba(255,255,255,0.25)' }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* ── Main panel ── */}
        <div className="flex-1 p-4 overflow-hidden">

          {/* Welcome row */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-inter font-semibold text-[11px]" style={{ color: '#0F2419' }}>
              Welcome back, Ananya 👋
            </span>
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                  style={{ background: '#F8F4EA' }}
                >
                  🔔
                </div>
                <span
                  className="absolute -top-px -right-px w-2 h-2 rounded-full"
                  style={{ background: '#E8543E', border: '1px solid #fff' }}
                />
              </div>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-sora font-bold text-[8px]"
                style={{ background: '#E8543E' }}
              >
                AK
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {STAT_CARDS.map(({ value, label, icon, iconBg }) => (
              <div
                key={label}
                className="rounded-lg p-2 flex items-center gap-1.5"
                style={{ border: '1px solid rgba(15,36,25,0.08)', background: '#fff' }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: iconBg }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    className="font-sora font-bold leading-none"
                    style={{ fontSize: '13px', color: '#0F2419' }}
                  >
                    {value}
                  </div>
                  <div
                    className="font-inter mt-0.5"
                    style={{ fontSize: '9px', color: 'rgba(15,36,25,0.5)' }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tasks overview */}
          <div
            className="font-inter font-semibold mb-2"
            style={{ fontSize: '10px', color: 'rgba(15,36,25,0.65)' }}
          >
            Tasks Overview
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {TASK_COLS.map(({ status, dot, count }) => (
              <div key={status} className="flex items-center gap-1 min-w-0">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: dot }}
                />
                <span
                  className="font-inter truncate"
                  style={{ fontSize: '8.5px', color: 'rgba(15,36,25,0.6)' }}
                >
                  {status}
                </span>
                <span
                  className="font-inter ml-auto flex-shrink-0"
                  style={{ fontSize: '8.5px', color: 'rgba(15,36,25,0.35)' }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Task rows */}
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-3 gap-1.5 mb-1">
              {TASK_COLS.map(({ status, tasks }) => (
                <div
                  key={status}
                  className="font-inter py-0.5 truncate"
                  style={{
                    fontSize: '8.5px',
                    color: 'rgba(15,36,25,0.65)',
                    borderBottom: '1px solid rgba(15,36,25,0.06)',
                  }}
                >
                  {tasks[i]}
                </div>
              ))}
            </div>
          ))}

          {/* + Add Task row */}
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            {TASK_COLS.map(({ status }) => (
              <span
                key={status}
                className="font-inter font-medium"
                style={{ fontSize: '8.5px', color: '#6D4CF2', cursor: 'pointer' }}
              >
                + Add Task
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Hero — two-column layout, light cream background
───────────────────────────────────────────────────────── */
/**
 * Hero — two-column marketing hero section.
 *
 * @param {object}   props
 * @param {Function} props.onGetStarted  – opens the Get Started modal
 */
function Hero({ onGetStarted }) {
  function scrollToFeatures() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#F8F4EA]"
      style={{ paddingTop: '68px', minHeight: '100vh' }}
      aria-label="Hero section"
    >
      {/* Blobs — desktop only at full size, always rendered */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <HeroBlobs />
      </div>

      {/* Mobile blobs — lighter version */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
        <div style={{ position:'absolute', top:'-50px', right:'-30px', width:'200px', height:'200px', background:'#4CAF7D', borderRadius:'60% 40% 30% 70%/60% 30% 70% 40%' }} />
        <div style={{ position:'absolute', bottom:'-30px', right:'20px', width:'160px', height:'160px', background:'#E8543E', borderRadius:'43% 57% 50% 50%/50% 38% 62% 50%' }} />
        <div style={{ position:'absolute', top:'200px', right:'10px', width:'120px', height:'120px', background:'#F0B429', borderRadius:'70% 30% 70% 30%/30% 50% 50% 70%' }} />
      </div>

      <div className="container-main relative" style={{ zIndex: 1 }}>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 py-16 lg:py-24">

          {/* ── LEFT: headline + buttons ── */}
          <div className="w-full lg:w-[46%] flex-shrink-0">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full font-inter font-semibold text-xs uppercase tracking-widest mb-5 px-4 py-1.5"
              style={{ background: '#EFE9FE', color: '#6D4CF2', border: '1px solid rgba(109,76,242,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
              Project Management, Simplified
            </div>

            <h1
              className="font-sora leading-[1.05] mb-5 text-[#0F2419]"
              style={{ fontWeight: 900, fontSize: 'clamp(2.8rem, 5.5vw, 4rem)' }}
            >
              <span className="block">Plan.</span>
              <span className="block">Organize.</span>
              <span className="block">
                Achieve<span style={{ color: '#6D4CF2' }}>.</span>
              </span>
            </h1>

            <p
              className="font-inter leading-relaxed mb-8"
              style={{ color: '#0F2419', opacity: 0.65, maxWidth: '420px', fontSize: '1rem' }}
            >
              ProjectHub helps individuals and teams organize projects, manage
              tasks, track progress and stay ahead of deadlines — all from one
              centralized workspace.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Primary — dark green pill with arrow */}
              <button
                id="hero-get-started"
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 rounded-full font-inter font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: '#14241C', padding: '12px 24px' }}
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Secondary — outline pill */}
              <button
                id="hero-explore"
                onClick={scrollToFeatures}
                className="inline-flex items-center gap-2 rounded-full font-inter font-semibold text-sm transition-all duration-200 hover:bg-[#14241C]/6 active:scale-95"
                style={{
                  padding: '11px 23px',
                  border: '1.5px solid #14241C',
                  color: '#14241C',
                  background: 'transparent',
                }}
              >
                Explore ProjectHub
              </button>
            </div>
          </div>

          {/* ── RIGHT: dashboard card ── */}
          <div className="relative flex-1 w-full flex justify-center lg:justify-end" style={{ zIndex: 2 }}>
            <div className="w-full" style={{ maxWidth: '500px' }}>
              <DashboardCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
