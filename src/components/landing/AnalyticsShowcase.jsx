import React from 'react';

/* ─── Metric cards ───────────────────────────────────────────────── */
const METRICS = [
  { label: 'Project Completion', value: '84%', delta: '↑ 6% vs last sprint', icon: '📁', iconBg: '#EDE9FE', color: '#6D4CF2' },
  { label: 'Tasks Completed', value: '238', delta: '↑ 12% this week', icon: '✅', iconBg: '#D1FAE5', color: '#16A34A' },
  { label: 'Tasks Remaining', value: '42', delta: 'Down from 68', icon: '📋', iconBg: '#FEF3C7', color: '#D97706' },
  { label: 'Active Projects', value: '12', delta: '+2 new this month', icon: '📊', iconBg: '#FEE2E2', color: '#DC2626' },
];

/* ─── Team performance ───────────────────────────────────────────── */
const TEAM = [
  { name: 'Mehak K.',  tasks: 14, pct: 93, initials: 'MK', color: '#6D4CF2' },
  { name: 'Aryan R.',  tasks: 11, pct: 78, initials: 'AR', color: '#E8543E' },
  { name: 'Sneha J.',  tasks:  9, pct: 64, initials: 'SJ', color: '#4CAF7D' },
  { name: 'Tarun M.',  tasks:  7, pct: 50, initials: 'TM', color: '#F0B429' },
];

/* ─── Weekly bar chart data ──────────────────────────────────────── */
const WEEKLY = [
  { day: 'Mon', done: 8,  planned: 10 },
  { day: 'Tue', done: 12, planned: 10 },
  { day: 'Wed', done: 7,  planned: 10 },
  { day: 'Thu', done: 14, planned: 12 },
  { day: 'Fri', done: 11, planned: 12 },
  { day: 'Sat', done: 5,  planned: 6 },
  { day: 'Sun', done: 3,  planned: 4 },
];
const MAX_H = 16;

/* ─── Analytics features list ────────────────────────────────────── */
const ANA_FEATURES = [
  'Weekly and monthly velocity charts',
  'Team performance leaderboard',
  'Burndown and burnup chart views',
  'Cycle time and throughput metrics',
];

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  );
}

/* ─── Analytics UI ───────────────────────────────────────────────── */
function AnalyticsUI() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1.5px solid rgba(15,36,25,0.1)', boxShadow: '0 4px 24px rgba(15,36,25,0.08)' }}
      aria-hidden="true"
    >
      {/* Chrome */}
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ background: 'rgba(15,36,25,0.04)', borderBottom: '1px solid rgba(15,36,25,0.08)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="flex-1 text-center font-inter text-[10px]" style={{ color: 'rgba(15,36,25,0.35)' }}>
          Reports & Analytics
        </span>
      </div>

      <div className="bg-[#F8F4EA] p-5 space-y-4">
        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-2">
          {METRICS.map(({ label, value, delta, icon, iconBg, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-3"
              style={{ border: '1px solid rgba(15,36,25,0.08)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: iconBg }}>
                  {icon}
                </div>
                <span className="font-sora font-bold text-lg leading-none" style={{ color }}>
                  {value}
                </span>
              </div>
              <p className="font-inter text-[10px]" style={{ color: 'rgba(15,36,25,0.5)' }}>{label}</p>
              <p className="font-inter text-[9px] mt-0.5" style={{ color, opacity: 0.75 }}>{delta}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid rgba(15,36,25,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-inter font-semibold text-xs" style={{ color: '#0F2419' }}>Tasks Completed — This Week</span>
            <div className="flex items-center gap-3 font-inter text-[9px]" style={{ color: 'rgba(15,36,25,0.45)' }}>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm" style={{ background: '#6D4CF2', display:'inline-block' }} />
                Completed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm" style={{ background: 'rgba(15,36,25,0.12)', display:'inline-block' }} />
                Planned
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1.5" style={{ height: '80px' }}>
            {WEEKLY.map(({ day, done, planned }) => {
              const dH = (done / MAX_H) * 100;
              const pH = (planned / MAX_H) * 100;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex items-end justify-center gap-px" style={{ height: '68px' }}>
                    <div className="w-[45%] rounded-t-sm" style={{ height: `${pH}%`, background: 'rgba(15,36,25,0.1)' }} />
                    <div className="w-[45%] rounded-t-sm" style={{ height: `${dH}%`, background: done >= planned ? '#4CAF7D' : '#6D4CF2' }} />
                  </div>
                  <span className="font-inter text-[8px]" style={{ color: 'rgba(15,36,25,0.35)' }}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team performance */}
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid rgba(15,36,25,0.08)' }}>
          <p className="font-inter font-semibold text-xs mb-3" style={{ color: '#0F2419' }}>Team Performance</p>
          <div className="flex flex-col gap-2.5">
            {TEAM.map(({ name, tasks, pct, initials, color }) => (
              <div key={name} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-sora font-bold flex-shrink-0"
                  style={{ fontSize: '8px', background: color }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-inter font-medium text-[11px]" style={{ color: '#0F2419' }}>{name}</span>
                    <span className="font-inter text-[10px]" style={{ color: 'rgba(15,36,25,0.4)' }}>{tasks} tasks</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(15,36,25,0.08)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
                <span className="font-inter font-semibold text-[10px] flex-shrink-0" style={{ color }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * AnalyticsShowcase — white section, text left, analytics UI right.
 */
function AnalyticsShowcase() {
  return (
    <section
      id="analytics"
      className="py-20 bg-white"
      aria-label="Analytics showcase"
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-14 xl:gap-20">

          {/* Text */}
          <div className="flex-1 max-w-md">
            <p className="font-inter font-semibold text-xs uppercase tracking-widest mb-4" style={{ color: '#4CAF7D' }}>
              Analytics
            </p>
            <h2 className="font-sora font-bold mb-5 leading-tight" style={{ color: '#0F2419', fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>
              Data-driven decisions,{' '}
              <span style={{ color: '#4CAF7D' }}>zero guesswork</span>
            </h2>
            <p className="font-inter leading-relaxed mb-8" style={{ color: '#0F2419', opacity: 0.6, fontSize: '0.9375rem' }}>
              Rich velocity charts, team performance metrics, and burndown reports
              give you the clarity to make confident decisions.
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {ANA_FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#D1FAE5', color: '#16A34A' }}
                  >
                    <CheckIcon />
                  </div>
                  <span className="font-inter text-sm" style={{ color: '#0F2419', opacity: 0.7 }}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Analytics UI */}
          <div className="flex-1 w-full">
            <AnalyticsUI />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsShowcase;
