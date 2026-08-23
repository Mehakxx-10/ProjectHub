import React, { useState, useMemo } from 'react';
import Badge from '../components/ui/Badge.jsx';
import { useProjects } from '../context/ProjectContext.jsx';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_COLORS = {
  'To Do':       '#F2685A',
  'In Progress': '#F5B833',
  'Done':        '#3FA66B',
};

const STATUS_VARIANT = {
  'To Do':       'coral',
  'In Progress': 'lemon',
  'Done':        'sage',
};

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

/**
 * Calendar — Soft-3D monthly calendar view connected to central ProjectContext.
 */
function Calendar() {
  const { tasks } = useProjects();
  const today = new Date();

  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  /* ── Calendar grid calculations ─────────────────────────────────── */
  const { days, startOffset } = useMemo(() => {
    const first = new Date(year, month, 1);
    const last  = new Date(year, month + 1, 0);
    return {
      days:        last.getDate(),
      startOffset: first.getDay(),
    };
  }, [year, month]);

  /* ── Tasks indexed by day ───────────────────────────────────────── */
  const tasksByDay = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      const d = new Date(t.deadline);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(t);
      }
    });
    return map;
  }, [tasks, year, month]);

  /* ── Selected day state ─────────────────────────────────────────── */
  const [selected, setSelected] = useState(null);
  const selectedTasks = selected ? (tasksByDay[selected] ?? []) : [];

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else             { setMonth(m => m - 1); }
    setSelected(null);
  }

  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else              { setMonth(m => m + 1); }
    setSelected(null);
  }

  const isToday = (d) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  /* ── Build grid cells ───────────────────────────────────────────── */
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= days; d++)      cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-7 max-w-7xl mx-auto">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Schedule & Milestones
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            Calendar
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            Task deadlines and sprint schedules at a glance.
          </p>
        </div>
      </div>

      {/* ── Main Layout: Calendar Grid + Selected Date Panel ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

        {/* ── Left: Calendar Month Panel (8 cols) ────────────────────── */}
        <div
          className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
        >
          {/* Month Navigation Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#132A1D]/8">
            <button
              onClick={prevMonth}
              className="p-2.5 rounded-xl bg-[#F8F4EA] border border-[#132A1D]/8 text-[#132A1D]/70 hover:text-[#132A1D] hover:bg-white shadow-sm transition-all cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
            
            <h3 className="font-sora font-extrabold text-[#132A1D] text-lg sm:text-xl tracking-tight">
              {MONTH_NAMES[month]} {year}
            </h3>

            <button
              onClick={nextMonth}
              className="p-2.5 rounded-xl bg-[#F8F4EA] border border-[#132A1D]/8 text-[#132A1D]/70 hover:text-[#132A1D] hover:bg-white shadow-sm transition-all cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Day Names Header */}
          <div className="grid grid-cols-7 mb-3">
            {DAY_NAMES.map((d) => (
              <div key={d} className="text-center font-inter font-bold text-[#132A1D]/40 text-xs py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-2">
            {cells.map((d, i) => {
              if (d === null) return <div key={`empty-${i}`} className="min-h-[52px]" />;

              const hasTasks   = !!tasksByDay[d];
              const dayTasks   = tasksByDay[d] ?? [];
              const isSelected = selected === d;
              const todayCell  = isToday(d);

              return (
                <button
                  key={d}
                  onClick={() => setSelected(isSelected ? null : d)}
                  className={`
                    relative flex flex-col items-center justify-start rounded-2xl py-2 px-1
                    min-h-[54px] transition-all cursor-pointer text-center
                    ${isSelected
                      ? 'bg-[#6D4CF2] text-white shadow-lg shadow-brand/35 -translate-y-0.5'
                      : todayCell
                      ? 'bg-brand-50 text-brand font-bold border border-brand/20 shadow-sm'
                      : 'hover:bg-[#132A1D]/5 text-[#132A1D] border border-transparent'
                    }
                  `}
                  aria-label={`${d} ${MONTH_NAMES[month]}${hasTasks ? `, ${dayTasks.length} task(s)` : ''}`}
                  aria-pressed={isSelected}
                >
                  <span className="font-inter text-xs font-semibold leading-none">{d}</span>
                  
                  {/* Status Indicator Dots */}
                  {hasTasks && (
                    <div className="flex gap-1 mt-1.5 flex-wrap justify-center">
                      {dayTasks.slice(0, 3).map((t) => (
                        <span
                          key={t.id}
                          className="w-1.5 h-1.5 rounded-full shadow-sm"
                          style={{
                            background: isSelected
                              ? '#ffffff'
                              : STATUS_COLORS[t.status] || '#6D4CF2',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-6 pt-5 border-t border-[#132A1D]/8 text-xs font-inter font-medium text-[#132A1D]/60 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2685A] shadow-sm" />
              <span>To Do</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5B833] shadow-sm" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3FA66B] shadow-sm" />
              <span>Done</span>
            </div>
          </div>
        </div>

        {/* ── Right: Selected Date Tasks Panel (4 cols) ───────────────── */}
        <div
          className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] flex flex-col justify-between"
        >
          <div>
            <div className="mb-4">
              <span className="text-[11px] font-bold font-inter text-brand uppercase tracking-wider">
                Date Details
              </span>
              <h3 className="font-sora font-extrabold text-[#132A1D] text-lg tracking-tight mt-0.5">
                {selected
                  ? `${MONTH_NAMES[month]} ${selected}, ${year}`
                  : 'Select a date'}
              </h3>
            </div>

            {!selected ? (
              <div className="bg-[#132A1D]/[0.02] p-5 rounded-2xl border border-[#132A1D]/6 text-center">
                <p className="font-inter text-[#132A1D]/55 text-xs leading-relaxed">
                  Click any date with deadline indicators on the calendar to inspect specific scheduled tasks.
                </p>
              </div>
            ) : selectedTasks.length === 0 ? (
              <div className="bg-[#132A1D]/[0.02] p-6 rounded-2xl border border-[#132A1D]/6 text-center">
                <span className="text-2xl mb-1 block">📅</span>
                <p className="font-inter text-[#132A1D]/55 text-xs font-medium">
                  No tasks due on this date.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3 list-none" role="list">
                {selectedTasks.map((t) => (
                  <li
                    key={t.id}
                    className="p-3.5 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/8 shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sora font-bold text-xs text-[#132A1D] leading-snug">
                        {t.title}
                      </h4>
                      <Badge variant={STATUS_VARIANT[t.status] ?? 'ink'} size="sm">
                        {t.status}
                      </Badge>
                    </div>
                    {t.projectName && (
                      <p className="font-inter text-[11px] font-semibold text-brand">
                        {t.projectName}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-[11px] font-inter text-[#132A1D]/50 pt-1 border-t border-[#132A1D]/5">
                      <span>👤 {t.assignee || 'Unassigned'}</span>
                      <span className="font-medium">{t.priority} Priority</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* This month's deadlines summary */}
          <div className="mt-6 pt-4 border-t border-[#132A1D]/8">
            <p className="font-inter font-bold text-[11px] text-[#132A1D]/45 uppercase tracking-wider mb-2.5">
              This month's deadlines
            </p>
            {Object.keys(tasksByDay).length === 0 ? (
              <p className="font-inter text-[#132A1D]/40 text-xs">No deadlines scheduled this month.</p>
            ) : (
              <ul className="flex flex-col gap-1.5 max-h-48 overflow-y-auto list-none" role="list">
                {Object.entries(tasksByDay)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([day, dayTasks]) => (
                    <li key={day} className="flex items-center gap-2 text-xs font-inter py-0.5">
                      <span className="w-5 font-bold text-brand">{day}</span>
                      <span className="text-[#132A1D]/75 truncate flex-1">
                        {dayTasks[0]?.title}
                        {dayTasks.length > 1 && ` (+${dayTasks.length - 1} more)`}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
