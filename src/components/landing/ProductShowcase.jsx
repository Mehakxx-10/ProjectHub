import React from 'react';

/* ─── Shared check icon ──────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  );
}

/* ─── Feature list ───────────────────────────────────────────────── */
const FEATURES = [
  'Overview of all active projects at a glance',
  'Live progress bars per project and per sprint',
  'Stat cards for tasks, team velocity, and deadlines',
  'Click-through to individual project detail views',
];

/* ─── Mock stat cards ────────────────────────────────────────────── */
const STATS = [
  { label: 'Projects', value: '12', icon: '📁', iconBg: '#EDE9FE', color: '#6D4CF2' },
  { label: 'Completed', value: '84%', icon: '✅', iconBg: '#D1FAE5', color: '#16A34A' },
  { label: 'Overdue', value: '2', icon: '⚠️', iconBg: '#FEE2E2', color: '#DC2626' },
  { label: 'Team Load', value: '78%', icon: '👥', iconBg: '#FEF3C7', color: '#D97706' },
];

/* ─── Mock project rows ──────────────────────────────────────────── */
const PROJECTS = [
  { name: 'Website Redesign', tasks: '18/25', progress: 72, color: '#6D4CF2', status: 'In Progress' },
  { name: 'Mobile App v2',    tasks: '9/20',  progress: 45, color: '#E8543E', status: 'In Progress' },
  { name: 'Q3 Marketing',     tasks: '27/30', progress: 90, color: '#4CAF7D', status: 'Review' },
  { name: 'API Integration',  tasks: '4/15',  progress: 27, color: '#F0B429', status: 'To Do' },
];

/* ─── Dashboard table UI ─────────────────────────────────────────── */
function DashboardUI() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1.5px solid rgba(15,36,25,0.1)', boxShadow: '0 4px 24px rgba(15,36,25,0.08)' }}
      aria-hidden="true"
    >
      {/* Title bar */}
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{ background: 'rgba(15,36,25,0.04)', borderBottom: '1px solid rgba(15,36,25,0.08)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="flex-1 text-center font-inter text-[10px]" style={{ color: 'rgba(15,36,25,0.35)' }}>
          Dashboard — ProjectHub
        </span>
      </div>

      <div className="bg-[#F8F4EA] p-5 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {STATS.map(({ label, value, icon, iconBg, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-3"
              style={{ border: '1px solid rgba(15,36,25,0.08)' }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mb-2"
                style={{ background: iconBg }}
              >
                {icon}
              </div>
              <div className="font-sora font-bold text-base leading-none" style={{ color }}>
                {value}
              </div>
              <div className="font-inter text-[10px] mt-0.5" style={{ color: 'rgba(15,36,25,0.45)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Projects table */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(15,36,25,0.08)' }}>
          <div
            className="grid grid-cols-12 gap-2 px-4 py-2.5 font-inter font-semibold uppercase tracking-wide"
            style={{ fontSize: '9px', color: 'rgba(15,36,25,0.4)', borderBottom: '1px solid rgba(15,36,25,0.07)', background: 'rgba(15,36,25,0.03)' }}
          >
            <span className="col-span-4">Project</span>
            <span className="col-span-2 text-center">Tasks</span>
            <span className="col-span-4">Progress</span>
            <span className="col-span-2 text-center">Status</span>
          </div>
          {PROJECTS.map(({ name, tasks, progress, color, status }) => (
            <div
              key={name}
              className="grid grid-cols-12 gap-2 items-center px-4 py-2.5"
              style={{ borderBottom: '1px solid rgba(15,36,25,0.05)' }}
            >
              <div className="col-span-4 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="font-inter font-medium text-[11px] truncate" style={{ color: '#0F2419' }}>{name}</span>
              </div>
              <div className="col-span-2 text-center font-inter text-[10px]" style={{ color: 'rgba(15,36,25,0.45)' }}>{tasks}</div>
              <div className="col-span-4 flex items-center gap-2">
                <div className="flex-1 rounded-full h-1.5" style={{ background: 'rgba(15,36,25,0.08)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${progress}%`, background: color }} />
                </div>
                <span className="font-inter text-[10px] w-6" style={{ color: 'rgba(15,36,25,0.4)' }}>{progress}%</span>
              </div>
              <div className="col-span-2 flex justify-center">
                <span
                  className="font-inter font-medium rounded-full px-1.5 py-0.5"
                  style={{ fontSize: '9px', background: `${color}18`, color }}
                >
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ProductShowcase — light cream section, text left, dashboard right.
 */
function ProductShowcase() {
  return (
    <section
      id="showcase"
      className="py-20 bg-white"
      aria-label="Product showcase"
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-14 xl:gap-20">

          {/* Left: text */}
          <div className="flex-1 max-w-md">
            <p className="font-inter font-semibold text-xs uppercase tracking-widest mb-4" style={{ color: '#6D4CF2' }}>
              Dashboard
            </p>
            <h2 className="font-sora font-bold mb-5 leading-tight" style={{ color: '#0F2419', fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>
              See every project{' '}
              <span style={{ color: '#6D4CF2' }}>at a glance</span>
            </h2>
            <p className="font-inter leading-relaxed mb-8" style={{ color: '#0F2419', opacity: 0.6, fontSize: '0.9375rem' }}>
              Your command centre for all active work. Monitor progress, spot
              blockers, and keep every project on track without digging through
              email threads.
            </p>
            <ul className="flex flex-col gap-3 mb-8" role="list">
              {FEATURES.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#D1FAE5', color: '#16A34A' }}
                  >
                    <CheckIcon />
                  </div>
                  <span className="font-inter text-sm" style={{ color: '#0F2419', opacity: 0.7 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: mockup */}
          <div className="flex-1 w-full">
            <DashboardUI />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
