import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/app/StatCard.jsx';
import ProjectCard from '../components/app/ProjectCard.jsx';
import ProjectFormModal from '../components/app/ProjectFormModal.jsx';
import Badge from '../components/ui/Badge.jsx';
import { formatDate } from '../utils/helpers.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useProjects } from '../context/ProjectContext.jsx';

/* ─── Timeline Recent Activity Data ──────────────────────────────── */
const ACTIVITY = [
  { id: 'a1', icon: '✅', text: 'Ananya completed Homepage hero task', time: '2 hours ago', color: '#DCF3E4', badge: 'Completed' },
  { id: 'a2', icon: '🚀', text: 'Rohan created a project "Mobile App Development"', time: '5 hours ago', color: '#EFE9FE', badge: 'New Project' },
  { id: 'a3', icon: '📝', text: 'Meera updated UI event registration form', time: 'Yesterday', color: '#FEF2D6', badge: 'Updated' },
  { id: 'a4', icon: '✨', text: 'Marketing Campaign sprint moved to Review', time: '2 days ago', color: '#FDE4E1', badge: 'Sprint Review' },
];

const STATUS_VARIANT = { 'To Do': 'ink', 'Planning': 'lemon', 'In Progress': 'brand', 'Review': 'lemon', 'Done': 'sage', 'Completed': 'sage' };

/**
 * Dashboard — 3D-inspired ProjectHub Workspace Dashboard connected to central ProjectContext.
 */
function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, registeredUser } = useAuth();
  const { projects, tasks, addProject, updateProject, deleteProject } = useProjects();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState(null);

  /* ── Dynamic statistics derived from central state ─────────────── */
  const totalProjects    = projects.length;
  const activeProjects   = projects.filter((p) => p.status === 'In Progress').length;
  const completedTasks   = tasks.filter((t) => t.status === 'Done').length;
  const pendingTasks     = tasks.filter((t) => t.status !== 'Done').length;

  /* ── Dynamic task filtering ─────────────────────────────────────── */
  const todoTasks       = tasks.filter((t) => t.status === 'To Do');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const doneTasks       = tasks.filter((t) => t.status === 'Done');

  /* ── Upcoming deadlines ─────────────────────────────────────────── */
  const upcoming = [...projects]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  /* ── Handlers ───────────────────────────────────────────────────── */
  function handleSaveProject(data) {
    if (editing) {
      updateProject(editing.id, data);
    } else {
      addProject(data);
    }
    setEditing(null);
  }

  function handleEditProject(project) {
    setEditing(project);
    setModalOpen(true);
  }

  function handleDeleteProject(id) {
    deleteProject(id);
  }

  /* ── Time Greeting & User Name ──────────────────────────────────── */
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const userName = currentUser?.name || registeredUser?.name || 'Project User';
  const firstName = userName.split(' ')[0] || 'User';

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-8 max-w-7xl mx-auto">

      {/* ══════════════════════════════════════════════════════════════
          HERO / HEADER SECTION WITH 3D FLOATING PROJECT WIDGET
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-[#132A1D]/8 shadow-[0_6px_30px_-6px_rgba(19,42,29,0.07),0_1px_3px_rgba(19,42,29,0.04)] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Ambient Gradient Glow Accents */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{ background: '#6D4CF2' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: '#3FA66B' }}
          aria-hidden="true"
        />

        {/* Left: Greeting & Headline */}
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-3.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            Workspace Active · ProjectHub 3.0
          </div>
          
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
            {greeting}, {firstName} 👋
          </h2>
          
          <p className="font-inter text-[#132A1D]/60 text-sm sm:text-base mt-2 leading-relaxed">
            Here's what's happening with your projects today. You have <strong className="text-[#132A1D] font-semibold">{activeProjects} active projects</strong> and <strong className="text-[#132A1D] font-semibold">{pendingTasks} tasks</strong> to deliver.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              id="dashboard-new-project-btn"
              onClick={() => { setEditing(null); setModalOpen(true); }}
              className="inline-flex items-center gap-2 font-inter font-bold text-sm text-white rounded-2xl px-5 py-3 shadow-lg shadow-[#132A1D]/15 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              style={{ background: '#132A1D' }}
            >
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M7 1v12M1 7h12" />
              </svg>
              <span>New Project</span>
            </button>
            <button
              onClick={() => navigate('/tasks')}
              className="inline-flex items-center gap-1.5 font-inter font-semibold text-xs sm:text-sm text-[#132A1D]/75 hover:text-[#132A1D] px-4 py-3 rounded-2xl bg-[#132A1D]/5 hover:bg-[#132A1D]/10 transition-colors cursor-pointer"
            >
              <span>View Active Tasks</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right: Floating 3D Project-Management Visual Widget */}
        <div className="relative z-10 hidden md:flex flex-col gap-3 min-w-[280px] lg:max-w-xs shrink-0">
          <div className="bg-[#132A1D]/[0.03] backdrop-blur-md rounded-2xl p-4 border border-[#132A1D]/10 shadow-[0_8px_24px_-4px_rgba(19,42,29,0.08)] transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold font-inter px-2.5 py-0.5 rounded-full bg-[#3FA66B]/15 text-[#2A7D4E] border border-[#3FA66B]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3FA66B] animate-ping" />
                Sprint on Track
              </span>
              <span className="font-sora font-extrabold text-xs text-[#6D4CF2]">85%</span>
            </div>

            <p className="font-sora font-bold text-xs text-[#132A1D] truncate">
              {projects[0]?.name || 'Core Platform Sprint'}
            </p>

            {/* Gradient progress bar */}
            <div className="w-full h-2 rounded-full bg-[#132A1D]/10 overflow-hidden my-2 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6D4CF2] via-[#F5B833] to-[#3FA66B]"
                style={{ width: `${projects[0]?.progress || 85}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-inter text-[#132A1D]/50 font-medium">
              <span>{completedTasks} completed</span>
              <span>{totalProjects} active projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          STATISTIC CARDS (DYNAMIC VALUES & PREMIUM DEPTH)
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Workspace metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          label="Total Projects"
          value={totalProjects}
          icon="📁"
          iconBg="#EFE9FE"
          trend={`${activeProjects} active`}
          trendColor="text-brand"
        />
        <StatCard
          label="Active Projects"
          value={activeProjects}
          icon="🚀"
          iconBg="#DCF3E4"
          trend="In progress"
          trendColor="text-[#2A7D4E]"
        />
        <StatCard
          label="Completed Tasks"
          value={completedTasks}
          icon="✅"
          iconBg="#DCF3E4"
          trend={`of ${tasks.length} total`}
          trendColor="text-[#2A7D4E]"
        />
        <StatCard
          label="Pending Tasks"
          value={pendingTasks}
          icon="⏳"
          iconBg="#FDE4E1"
          trend="Need attention"
          trendColor="text-[#C03D4A]"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RECENT PROJECTS
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="recent-projects-heading">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h3 id="recent-projects-heading" className="font-sora font-bold text-[#132A1D] text-lg sm:text-xl tracking-tight">
              Recent Projects
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Active roadmaps and delivery milestones
            </p>
          </div>
          <button
            onClick={() => navigate('/projects')}
            className="font-inter text-xs sm:text-sm text-brand font-bold hover:text-brand-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View all</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TASK OVERVIEW + UPCOMING DEADLINES
      ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Task Overview (2 cols on lg) */}
        <section
          className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="task-overview-heading"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 id="task-overview-heading" className="font-sora font-bold text-[#132A1D] text-base sm:text-lg tracking-tight">
                Task Overview
              </h3>
              <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
                Current workload dynamically calculated across stages
              </p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              className="font-inter text-xs sm:text-sm text-brand font-bold hover:text-brand-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'To Do',       tasks: todoTasks,       bg: 'bg-[#F2685A]/10 border-[#F2685A]/20 text-[#C03D4A]', dot: '#F2685A' },
              { label: 'In Progress', tasks: inProgressTasks, bg: 'bg-[#F5B833]/12 border-[#F5B833]/25 text-[#925C03]', dot: '#F5B833' },
              { label: 'Completed',   tasks: doneTasks,        bg: 'bg-[#3FA66B]/10 border-[#3FA66B]/20 text-[#2A7D4E]', dot: '#3FA66B' },
            ].map(({ label, tasks: col, bg, dot }) => (
              <div key={label} className="bg-[#132A1D]/[0.02] rounded-2xl p-4 border border-[#132A1D]/6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: dot }} aria-hidden="true" />
                    <span className="font-sora font-bold text-[#132A1D] text-xs">{label}</span>
                    <span className="ml-auto font-inter text-xs font-bold text-[#132A1D]/60 bg-white px-2.5 py-0.5 rounded-full border border-[#132A1D]/8 shadow-sm">
                      {col.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {col.slice(0, 4).map((t) => (
                      <div
                        key={t.id}
                        className={`rounded-xl px-3 py-2.5 font-inter text-xs font-semibold leading-snug border shadow-sm ${bg}`}
                      >
                        {t.title}
                      </div>
                    ))}
                    {col.length === 0 && (
                      <div className="rounded-xl px-3 py-5 font-inter text-xs text-[#132A1D]/30 text-center border border-dashed border-[#132A1D]/15 bg-white/50">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section
          className="bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="deadlines-heading"
        >
          <div className="mb-4">
            <h3 id="deadlines-heading" className="font-sora font-bold text-[#132A1D] text-base sm:text-lg tracking-tight">
              Upcoming Deadlines
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Target delivery milestones
            </p>
          </div>
          <ul className="flex flex-col gap-3 list-none" role="list">
            {upcoming.map((p) => (
              <li
                key={p.id}
                className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-[#132A1D]/[0.025] transition-colors border-b border-[#132A1D]/5 last:border-0"
              >
                <span
                  className="w-3 h-3 rounded-lg flex-shrink-0 mt-1 shadow-sm"
                  style={{ background: p.color }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-sora font-bold text-[#132A1D] text-xs truncate">{p.name}</p>
                  <p className="font-inter text-[#132A1D]/50 text-[11px] font-medium mt-0.5">
                    {formatDate(p.deadline)}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANT[p.status] ?? 'ink'} size="sm">
                  {p.status}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TIMELINE-STYLE RECENT ACTIVITY SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
        aria-labelledby="activity-heading"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 id="activity-heading" className="font-sora font-bold text-[#132A1D] text-lg sm:text-xl tracking-tight">
              Recent Activity
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Chronological feed of team achievements and updates
            </p>
          </div>
          <span className="text-xs font-inter font-bold text-[#132A1D]/40 bg-[#132A1D]/5 px-3 py-1 rounded-full">
            Real-time Feed
          </span>
        </div>

        {/* Timeline container with vertical connecting line */}
        <div className="relative pl-6 sm:pl-8 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#132A1D]/10">
          <ul className="flex flex-col gap-6 list-none" role="list">
            {ACTIVITY.map(({ id, icon, text, time, color, badge }) => (
              <li key={id} className="relative flex items-start gap-4 group">
                
                {/* Timeline node icon */}
                <div
                  className="absolute -left-6 sm:-left-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm shadow-md border-2 border-white transform group-hover:scale-110 transition-transform duration-200"
                  style={{ background: color }}
                  aria-hidden="true"
                >
                  {icon}
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-[#132A1D]/[0.02] hover:bg-[#132A1D]/[0.04] p-3.5 sm:p-4 rounded-2xl border border-[#132A1D]/6 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-inter font-semibold text-[#132A1D] text-xs sm:text-sm leading-snug">
                      {text}
                    </p>
                    <p className="font-inter text-[#132A1D]/40 text-[11px] font-medium mt-1">
                      {time}
                    </p>
                  </div>
                  {badge && (
                    <span className="self-start sm:self-center px-2.5 py-0.5 rounded-lg bg-white border border-[#132A1D]/8 text-[#132A1D]/70 font-inter font-semibold text-[11px] shadow-sm shrink-0">
                      {badge}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Project Modal ────────────────────────────────────────────── */}
      <ProjectFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        project={editing}
        onSave={handleSaveProject}
      />
    </div>
  );
}

export default Dashboard;
