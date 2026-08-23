import React from 'react';
import StatCard from '../components/app/StatCard.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { initialTeam } from '../data/team.js';
import { useProjects } from '../context/ProjectContext.jsx';

/* ─── Pure SVG Donut Chart ───────────────────────────────────────── */
function DonutChart({ segments, size = 130, strokeWidth = 18 }) {
  const r   = (size - strokeWidth) / 2;
  const c   = size / 2;
  const cir = 2 * Math.PI * r;

  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let offset = 0;

  return (
    <svg width={size} height={size} aria-hidden="true" className="transform -rotate-90">
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * cir;
        const gap  = cir - dash;
        const el = (
          <circle
            key={i}
            cx={c} cy={c} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

/**
 * Reports — 3D-styled Project and Task Analytics Overview connected to central ProjectContext.
 */
function Reports() {
  const { projects, tasks } = useProjects();
  const team = initialTeam;

  /* ── Derived statistics from central data ───────────────────────── */
  const totalTasks     = tasks.length;
  const doneTasks      = tasks.filter((t) => t.status === 'Done').length;
  const inProgTasks    = tasks.filter((t) => t.status === 'In Progress').length;
  const todoTasks      = tasks.filter((t) => t.status === 'To Do');
  const highPriority   = tasks.filter((t) => t.priority === 'High').length;

  const avgProgress = Math.round(
    projects.reduce((s, p) => s + (p.progress || 0), 0) / (projects.length || 1)
  );

  /* ── Segments for visualizations ────────────────────────────────── */
  const STATUS_SEG = [
    { label: 'Done',        value: doneTasks,   color: '#3FA66B' },
    { label: 'In Progress', value: inProgTasks, color: '#F5B833' },
    { label: 'To Do',       value: todoTasks.length, color: '#F2685A' },
  ];

  const PRIORITY_SEG = [
    { label: 'High',   value: highPriority,                                          color: '#F2685A' },
    { label: 'Medium', value: tasks.filter((t) => t.priority === 'Medium').length, color: '#F5B833' },
    { label: 'Low',    value: tasks.filter((t) => t.priority === 'Low').length,    color: '#3FA66B' },
  ];

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-8 max-w-7xl mx-auto">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Analytics & Insights
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            Reports
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            Project delivery metrics, task distributions, and team workload analytics.
          </p>
        </div>
      </div>

      {/* ── KPI Stat Cards ──────────────────────────────────────────── */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          label="Total Tasks"
          value={totalTasks}
          icon="📋"
          iconBg="#EFE9FE"
          trend="All workstreams"
          trendColor="text-brand"
        />
        <StatCard
          label="Completed"
          value={doneTasks}
          icon="✅"
          iconBg="#DCF3E4"
          trend={`${Math.round((doneTasks / (totalTasks || 1)) * 100)}% done`}
          trendColor="text-[#2A7D4E]"
        />
        <StatCard
          label="High Priority"
          value={highPriority}
          icon="🔥"
          iconBg="#FDE4E1"
          trend="Urgent items"
          trendColor="text-[#C03D4A]"
        />
        <StatCard
          label="Avg. Progress"
          value={`${avgProgress}%`}
          icon="📊"
          iconBg="#FEF2D6"
          trend="Across roadmaps"
          trendColor="text-[#925C03]"
        />
      </section>

      {/* ── First Analytics Row: Project Progress & Status Donut ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

        {/* Project Progress (8 cols) */}
        <section
          className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="project-progress-heading"
        >
          <div className="mb-6">
            <h3 id="project-progress-heading" className="font-sora font-extrabold text-[#132A1D] text-lg sm:text-xl tracking-tight">
              Project Progress
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Live delivery milestones for active company roadmaps
            </p>
          </div>

          <div className="space-y-5">
            {projects.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-3 h-3 rounded-lg shrink-0 shadow-sm" style={{ background: p.color || '#6D4CF2' }} />
                    <span className="font-sora font-bold text-sm text-[#132A1D] truncate">{p.name}</span>
                  </div>
                  <span className="font-inter text-xs font-bold" style={{ color: p.color || '#6D4CF2' }}>
                    {p.progress || 0}%
                  </span>
                </div>
                <ProgressBar
                  value={p.progress || 0}
                  color={(p.progress || 0) >= 80 ? 'sage' : (p.progress || 0) >= 40 ? 'brand' : 'coral'}
                  size="sm"
                />
                <div className="flex items-center justify-between font-inter text-[11px] text-[#132A1D]/50 mt-2">
                  <span>{p.tasksCompleted || 0}/{p.tasksTotal || 0} tasks delivered</span>
                  <span>Due {p.deadline ? new Date(p.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Task Status Donut (4 cols) */}
        <section
          className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] flex flex-col justify-between"
          aria-labelledby="task-status-heading"
        >
          <div>
            <div className="mb-5">
              <h3 id="task-status-heading" className="font-sora font-extrabold text-[#132A1D] text-lg sm:text-xl tracking-tight">
                Task Status
              </h3>
              <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
                Current workload distribution
              </p>
            </div>

            <div className="flex flex-col items-center justify-center my-4 relative">
              <DonutChart segments={STATUS_SEG} size={150} strokeWidth={20} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-sora font-extrabold text-2xl text-[#132A1D]">{totalTasks}</span>
                <span className="font-inter text-[10px] font-bold uppercase tracking-wider text-[#132A1D]/40">Tasks</span>
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5 pt-4 border-t border-[#132A1D]/8 list-none" role="list">
            {STATUS_SEG.map((s) => (
              <li key={s.label} className="flex items-center justify-between p-2 rounded-xl bg-[#132A1D]/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: s.color }} />
                  <span className="font-inter text-xs font-semibold text-[#132A1D]">{s.label}</span>
                </div>
                <span className="font-inter text-xs font-bold text-[#132A1D]/70">{s.value} tasks</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ── Second Analytics Row: Priority Breakdown & Team Workload ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

        {/* Priority Breakdown */}
        <section
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="priority-breakdown-heading"
        >
          <div className="mb-6">
            <h3 id="priority-breakdown-heading" className="font-sora font-extrabold text-[#132A1D] text-lg sm:text-xl tracking-tight">
              Priority Breakdown
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Workload urgency categorization
            </p>
          </div>

          <div className="space-y-4">
            {PRIORITY_SEG.map((seg) => {
              const pct = Math.round((seg.value / (totalTasks || 1)) * 100);
              return (
                <div key={seg.label} className="p-3.5 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/6">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: seg.color }} />
                      <span className="font-sora font-bold text-xs text-[#132A1D]">{seg.label} Priority</span>
                    </div>
                    <span className="font-inter text-xs font-bold text-[#132A1D]">
                      {seg.value} tasks <span className="text-[#132A1D]/45 font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#132A1D]/8 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: seg.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Workload */}
        <section
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="team-workload-heading"
        >
          <div className="mb-6">
            <h3 id="team-workload-heading" className="font-sora font-extrabold text-[#132A1D] text-lg sm:text-xl tracking-tight">
              Team Workload
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Task distribution per active team contributor
            </p>
          </div>

          <div className="space-y-4">
            {team.map((m) => {
              const assignedTasks = tasks.filter((t) => t.assignee === m.name).length;
              const maxPossible = 10;
              const barWidth = Math.min(Math.round((assignedTasks / maxPossible) * 100), 100);

              return (
                <div key={m.id} className="p-3 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/6 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-sora font-bold text-xs shrink-0 shadow-sm"
                    style={{ background: m.color }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sora font-bold text-xs text-[#132A1D] truncate">{m.name}</span>
                      <span className="font-inter text-xs font-bold text-[#132A1D]/70">{assignedTasks} tasks</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#132A1D]/8 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%`, background: m.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Reports;
