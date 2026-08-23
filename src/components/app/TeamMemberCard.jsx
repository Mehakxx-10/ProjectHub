import React from 'react';
import ProgressBar from '../ui/ProgressBar.jsx';
import { percentage } from '../../utils/helpers.js';

const STATUS_INDICATORS = {
  online:  { bg: 'bg-[#3FA66B]', ring: 'ring-[#3FA66B]/30', label: 'Online' },
  busy:    { bg: 'bg-[#F5B833]', ring: 'ring-[#F5B833]/30', label: 'Busy' },
  offline: { bg: 'bg-[#132A1D]/30', ring: 'ring-[#132A1D]/10', label: 'Offline' },
};

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="12" height="10" rx="2" />
      <path d="M2 5l6 4 6-4" />
    </svg>
  );
}

/**
 * TeamMemberCard — Soft-3D elevated team member card with avatar, role, progress, and project tags.
 */
function TeamMemberCard({ member }) {
  const { name, initials, role, email, tasksCompleted, tasksTotal, projects = [], color = '#6D4CF2', status = 'online' } = member;
  const prog = percentage(tasksCompleted, tasksTotal);
  const statusInfo = STATUS_INDICATORS[status] || STATUS_INDICATORS.online;

  return (
    <div
      className="group relative bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-5 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_32px_-6px_rgba(19,42,29,0.12),0_4px_12px_rgba(19,42,29,0.06)] transition-all duration-300 overflow-hidden"
    >
      {/* Top subtle inner surface highlight */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* Member Profile Row */}
      <div className="flex items-start gap-4">
        {/* Avatar with Status Dot */}
        <div className="relative shrink-0">
          <div
            className="w-13 h-13 rounded-2xl flex items-center justify-center font-sora font-extrabold text-white text-base shadow-md border-2 border-white/50"
            style={{ background: color }}
          >
            {initials}
          </div>
          <span
            className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${statusInfo.bg} ring-2 ${statusInfo.ring}`}
            title={statusInfo.label}
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-sora font-bold text-[#132A1D] text-base leading-snug truncate group-hover:text-brand transition-colors">
              {name}
            </h4>
          </div>
          <p className="font-inter text-xs font-semibold text-[#132A1D]/60 mt-0.5">{role}</p>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 font-inter text-[11px] font-medium text-[#132A1D]/45 hover:text-brand transition-colors mt-1 truncate"
          >
            <MailIcon />
            <span className="truncate">{email}</span>
          </a>
        </div>
      </div>

      {/* Task Completion Progress */}
      <div className="bg-[#132A1D]/[0.02] p-3.5 rounded-2xl border border-[#132A1D]/6">
        <div className="flex items-center justify-between mb-1.5 font-inter text-xs">
          <span className="font-semibold text-[#132A1D]/60">Task Completion</span>
          <span className="font-bold text-[#132A1D]">
            {tasksCompleted}/{tasksTotal} <span className="text-[#132A1D]/45 font-normal">({prog}%)</span>
          </span>
        </div>
        <ProgressBar
          value={prog}
          color={prog >= 80 ? 'sage' : prog >= 40 ? 'brand' : 'coral'}
          size="sm"
        />
      </div>

      {/* Assigned Projects */}
      <div>
        <p className="font-inter text-[10px] font-bold uppercase tracking-wider text-[#132A1D]/40 mb-2">
          Assigned Projects
        </p>
        <div className="flex flex-wrap gap-1.5">
          {projects.map((p) => (
            <span
              key={p}
              className="font-inter text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-white border border-[#132A1D]/8 shadow-sm text-[#132A1D]/75"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
