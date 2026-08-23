import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/app/StatCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useProjects } from '../context/ProjectContext.jsx';

const ACTIVITY = [
  { id: 'a1', text: 'Marked "Design homepage hero section" as Done', time: '2 hours ago', icon: '✅', bg: 'bg-[#DCF3E4]' },
  { id: 'a2', text: 'Created task "App wireframes — onboarding flow"', time: '5 hours ago', icon: '➕', bg: 'bg-[#EFE9FE]' },
  { id: 'a3', text: 'Updated "Set up event registration form"',        time: 'Yesterday',   icon: '📝', bg: 'bg-[#FEF2D6]' },
  { id: 'a4', text: 'Commented on "Implement component library"',      time: '2 days ago',  icon: '💬', bg: 'bg-[#FDE4E1]' },
];

const STATUS_VARIANT = {
  'To Do':       'coral',
  'Planning':    'lemon',
  'In Progress': 'lemon',
  'Done':        'sage',
  'Completed':   'sage',
};

/**
 * Profile — 3D-styled user profile page connected to central ProjectContext.
 */
function Profile() {
  const navigate = useNavigate();
  const { currentUser, registeredUser } = useAuth();
  const { tasks, projects } = useProjects();
  const activeUser = currentUser || registeredUser;

  const userName = activeUser?.name || 'Ananya K.';
  const userRole = activeUser?.role || 'Student';
  const userEmail = activeUser?.email || 'ananya.k@projecthub.app';

  const userInitials = (userName || 'AK')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AK';

  const myTasks   = tasks.filter((t) => !t.assignee || t.assignee.includes('Ananya') || t.assignee === userName);
  const doneTasks = myTasks.filter((t) => t.status === 'Done').length;
  const inProg    = myTasks.filter((t) => t.status === 'In Progress').length;
  const myProjects = projects.filter((p) =>
    myTasks.some((t) => t.projectName === p.name)
  );

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(
    'ProjectHub member focused on organizing projects, managing tasks and collaborating with teams across agile sprints.'
  );

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-8 max-w-7xl mx-auto">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Account Identity
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            My Profile
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            Personal productivity statistics, assigned work items, and sprint engagement.
          </p>
        </div>
      </div>

      {/* ── Main Profile Hero Card ──────────────────────────────────── */}
      <div
        className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] flex flex-col md:flex-row gap-6 items-start overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-[#F5B833] to-[#3FA66B]" />

        {/* Large Avatar */}
        <div className="shrink-0">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-sora font-extrabold text-white text-3xl shadow-xl shadow-brand/30 border-4 border-white"
            style={{ background: '#6D4CF2' }}
          >
            {userInitials}
          </div>
        </div>

        {/* Info & Bio */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-sora font-extrabold text-[#132A1D] text-xl sm:text-2xl tracking-tight">
                {userName}
              </h3>
              <p className="font-inter text-xs sm:text-sm font-semibold text-brand mt-0.5">
                {userRole} · ProjectHub Member
              </p>
              <p className="font-inter text-xs text-[#132A1D]/50 mt-0.5">
                {userEmail}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing((e) => !e)}
                className="font-inter font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 bg-[#132A1D]/6 hover:bg-[#132A1D]/10 text-[#132A1D] transition-all active:scale-95 cursor-pointer"
              >
                {editing ? 'Save Bio' : 'Edit Profile'}
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="font-inter font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand border border-brand/20 transition-all active:scale-95 cursor-pointer"
              >
                Account Settings →
              </button>
            </div>
          </div>

          {/* Bio editor */}
          <div className="mt-4">
            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className="w-full font-inter text-sm text-[#132A1D] rounded-xl p-3 bg-[#F8F4EA] border border-[#132A1D]/15 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 outline-none resize-none"
              />
            ) : (
              <p className="font-inter text-[#132A1D]/70 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {bio}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#132A1D]/6 text-[11px] font-inter text-[#132A1D]/45">
            <span>📅 Member since January 2026</span>
            <span>📍 Active in {myProjects.length || 1} Workspace Roadmaps</span>
          </div>
        </div>
      </div>

      {/* ── Stats Row ────────────────────────────────────────────────── */}
      <section aria-label="Personal Statistics" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          label="My Tasks"
          value={myTasks.length}
          icon="📋"
          iconBg="#EFE9FE"
          trend="Assigned items"
          trendColor="text-brand"
        />
        <StatCard
          label="Completed"
          value={doneTasks}
          icon="✅"
          iconBg="#DCF3E4"
          trend="Successfully closed"
          trendColor="text-[#2A7D4E]"
        />
        <StatCard
          label="In Progress"
          value={inProg}
          icon="🚀"
          iconBg="#FEF2D6"
          trend="Under active work"
          trendColor="text-[#925C03]"
        />
        <StatCard
          label="My Projects"
          value={myProjects.length || 2}
          icon="📁"
          iconBg="#FDE4E1"
          trend="Active workspaces"
          trendColor="text-[#C03D4A]"
        />
      </section>

      {/* ── Lower Split: My Tasks Backlog & Recent Activity ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

        {/* My Tasks (7 cols) */}
        <section
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="profile-tasks-heading"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 id="profile-tasks-heading" className="font-sora font-extrabold text-[#132A1D] text-lg tracking-tight">
                My Tasks Backlog
              </h3>
              <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
                Items assigned directly to you
              </p>
            </div>
            <span className="font-inter font-bold text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand">
              {myTasks.length} tasks
            </span>
          </div>

          <ul className="flex flex-col gap-2.5 list-none" role="list">
            {myTasks.length === 0 ? (
              <p className="font-inter text-[#132A1D]/40 text-xs py-4 text-center">
                No tasks assigned to your profile yet.
              </p>
            ) : (
              myTasks.slice(0, 5).map((t) => (
                <li
                  key={t.id}
                  className="p-3.5 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/6 flex items-center justify-between gap-3 hover:bg-[#132A1D]/[0.04] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-sora font-bold text-xs text-[#132A1D] truncate leading-snug">
                      {t.title}
                    </p>
                    <p className="font-inter text-[11px] text-[#132A1D]/50 mt-0.5 truncate">
                      {t.projectName || 'General Project'}
                    </p>
                  </div>
                  <Badge variant={STATUS_VARIANT[t.status] ?? 'ink'} size="sm">
                    {t.status}
                  </Badge>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Recent Activity Timeline (5 cols) */}
        <section
          className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="profile-activity-heading"
        >
          <div className="mb-5">
            <h3 id="profile-activity-heading" className="font-sora font-extrabold text-[#132A1D] text-lg tracking-tight">
              Recent Activity
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Your recent interactions and submissions
            </p>
          </div>

          <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#132A1D]/10">
            {ACTIVITY.map(({ id, text, time, icon, bg }) => (
              <div key={id} className="relative flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 shadow-sm ${bg} -ml-5 ring-4 ring-white`}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-inter font-medium text-xs text-[#132A1D] leading-snug">
                    {text}
                  </p>
                  <p className="font-inter text-[10px] text-[#132A1D]/40 mt-0.5">
                    {time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
