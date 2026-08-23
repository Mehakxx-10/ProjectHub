import React, { useState } from 'react';
import StatCard from '../components/app/StatCard.jsx';
import TeamMemberCard from '../components/app/TeamMemberCard.jsx';
import { initialTeam } from '../data/team.js';
import { percentage } from '../utils/helpers.js';

/**
 * Team — 3D-styled Team overview page showing member workload, progress, and status.
 */
function Team() {
  const [team] = useState(initialTeam);

  const totalCompleted = team.reduce((s, m) => s + m.tasksCompleted, 0);
  const totalTasks     = team.reduce((s, m) => s + m.tasksTotal,     0);
  const onlineCount    = team.filter((m) => m.status === 'online').length;
  const completionRate = percentage(totalCompleted, totalTasks);

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-8 max-w-7xl mx-auto">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Team Directory
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            Team
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            Manage your team and track everyone's progress across active workstreams.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white border border-[#132A1D]/8 shadow-sm flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#3FA66B] animate-pulse" />
          <span className="font-inter text-xs font-bold text-[#132A1D]">
            {team.length} members · <span className="text-[#2A7D4E]">{onlineCount} online now</span>
          </span>
        </div>
      </div>

      {/* ── Summary Stat Cards ───────────────────────────────────────── */}
      <section aria-label="Team metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          label="Total Members"
          value={team.length}
          icon="👥"
          iconBg="#EFE9FE"
          trend={`${onlineCount} active`}
          trendColor="text-brand"
        />
        <StatCard
          label="Online Now"
          value={onlineCount}
          icon="🟢"
          iconBg="#DCF3E4"
          trend="Available"
          trendColor="text-[#2A7D4E]"
        />
        <StatCard
          label="Tasks Completed"
          value={totalCompleted}
          icon="✅"
          iconBg="#DCF3E4"
          trend={`of ${totalTasks} assigned`}
          trendColor="text-[#2A7D4E]"
        />
        <StatCard
          label="Completion Rate"
          value={`${completionRate}%`}
          icon="📊"
          iconBg="#FEF2D6"
          trend="Team efficiency"
          trendColor="text-[#925C03]"
        />
      </section>

      {/* ── Members Grid ────────────────────────────────────────────── */}
      <section aria-labelledby="team-members-heading">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h3 id="team-members-heading" className="font-sora font-bold text-[#132A1D] text-lg sm:text-xl tracking-tight">
              Team Members
            </h3>
            <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
              Individual assignments and capacity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Team;
