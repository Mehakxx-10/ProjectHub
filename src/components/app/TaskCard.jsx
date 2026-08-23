import React from 'react';
import Badge from '../ui/Badge.jsx';
import { formatDate } from '../../utils/helpers.js';

const PRIORITY_VARIANT = { High: 'coral', Medium: 'lemon', Low: 'sage' };

const PRIORITY_BAR = {
  High:   'bg-[#F2685A]',
  Medium: 'bg-[#F5B833]',
  Low:    'bg-[#3FA66B]',
};

function IconEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" />
    </svg>
  );
}

function IconDelete() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="2" width="12" height="11" rx="1.5" />
      <path d="M1 6h12M5 1v2M9 1v2" />
    </svg>
  );
}

/**
 * TaskCard — Soft-3D elevated task card with priority indicator, assignee badge, and hover controls.
 */
function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const { id, title, projectName, assignee, priority, deadline, status } = task;

  const STATUSES = ['To Do', 'In Progress', 'Done'];

  const initials = (assignee || 'TU')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <article
      className="group relative bg-white rounded-2xl p-4 flex flex-col gap-3 border border-[#132A1D]/8 shadow-[0_3px_12px_-2px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] hover:-translate-y-1 hover:shadow-[0_10px_25px_-4px_rgba(19,42,29,0.12),0_2px_8px_rgba(19,42,29,0.06)] transition-all duration-200 overflow-hidden"
      aria-label={`Task: ${title}`}
    >
      {/* Top subtle surface highlight */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* Left priority accent indicator */}
      <div
        className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${PRIORITY_BAR[priority] ?? 'bg-[#6D4CF2]'}`}
        aria-hidden="true"
      />

      {/* Header: Title + Action Buttons */}
      <div className="flex items-start justify-between gap-2 pl-2">
        <h4 className="font-sora font-semibold text-[#132A1D] text-sm leading-snug flex-1 group-hover:text-brand transition-colors">
          {title}
        </h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded-lg text-[#132A1D]/40 hover:text-brand hover:bg-brand-50 shadow-sm border border-transparent hover:border-brand/15 transition-all cursor-pointer"
            aria-label={`Edit ${title}`}
            title="Edit Task"
          >
            <IconEdit />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 rounded-lg text-[#132A1D]/40 hover:text-coral hover:bg-coral-50 shadow-sm border border-transparent hover:border-coral/15 transition-all cursor-pointer"
            aria-label={`Delete ${title}`}
            title="Delete Task"
          >
            <IconDelete />
          </button>
        </div>
      </div>

      {/* Project name pill */}
      {projectName && (
        <span className="font-inter text-[11px] text-brand font-semibold bg-brand-50 border border-brand/15 rounded-lg px-2.5 py-0.5 self-start shadow-sm ml-2">
          {projectName}
        </span>
      )}

      {/* Priority + Deadline */}
      <div className="flex items-center justify-between pl-2">
        <Badge variant={PRIORITY_VARIANT[priority] ?? 'ink'} size="sm">
          {priority}
        </Badge>
        <span className="flex items-center gap-1.5 text-[#132A1D]/50 text-xs font-inter font-medium">
          <IconCalendar />
          {formatDate(deadline)}
        </span>
      </div>

      {/* Assignee + Status change */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#132A1D]/6 pl-2">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-sora font-bold shadow-sm flex-shrink-0"
            style={{ background: '#6D4CF2', fontSize: '9px' }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <span className="font-inter text-xs font-medium text-[#132A1D]/60 truncate max-w-[90px]">
            {assignee || 'Unassigned'}
          </span>
        </div>

        {/* Quick status change dropdown */}
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          className="text-xs font-inter font-semibold rounded-lg border border-[#132A1D]/12 bg-[#F8F4EA] text-[#132A1D]/80 transition-all hover:border-[#132A1D]/25 focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none cursor-pointer py-1 px-2 shadow-sm"
          aria-label="Change task status"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}

export default TaskCard;
