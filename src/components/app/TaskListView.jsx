import React from 'react';
import Badge from '../ui/Badge.jsx';
import { formatDate } from '../../utils/helpers.js';

const PRIORITY_VARIANT = { High: 'coral', Medium: 'lemon', Low: 'sage' };
const STATUS_VARIANT   = { 'To Do': 'ink', 'In Progress': 'brand', 'Done': 'sage' };

function IconEdit() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" />
    </svg>
  );
}

function IconDelete() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
 * TaskListView — Soft-3D elevated table and responsive card list of tasks.
 */
function TaskListView({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) return null;

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden border border-[#132A1D]/8 shadow-[0_4px_24px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
    >
      {/* ── Table Header ───────────────────────────────────────── */}
      <div
        className="hidden md:grid font-inter font-bold text-[#132A1D]/45 uppercase tracking-wider px-6 py-4"
        style={{
          fontSize: '11px',
          gridTemplateColumns: '2.2fr 1.2fr 1fr 0.8fr 0.9fr 1fr 85px',
          borderBottom: '1px solid rgba(19,42,29,0.07)',
          background: 'rgba(19,42,29,0.02)',
        }}
      >
        <span>Task Title</span>
        <span>Project</span>
        <span>Assignee</span>
        <span>Priority</span>
        <span>Status</span>
        <span>Deadline</span>
        <span className="text-right">Actions</span>
      </div>

      {/* ── Table Rows ───────────────────────────────────────── */}
      <ul className="list-none divide-y divide-[#132A1D]/5" role="list">
        {tasks.map((task) => (
          <li key={task.id} className="transition-colors hover:bg-[#132A1D]/[0.015]">
            {/* Desktop row */}
            <div
              className="hidden md:grid items-center px-6 py-4 group"
              style={{ gridTemplateColumns: '2.2fr 1.2fr 1fr 0.8fr 0.9fr 1fr 85px' }}
            >
              <span className="font-sora font-semibold text-[#132A1D] text-sm truncate pr-4 group-hover:text-brand transition-colors">
                {task.title}
              </span>
              <span className="font-inter text-xs text-brand font-semibold truncate pr-3">
                {task.projectName ? (
                  <span className="bg-brand-50 border border-brand/15 rounded-lg px-2.5 py-1 inline-block">
                    {task.projectName}
                  </span>
                ) : (
                  '—'
                )}
              </span>
              <span className="font-inter text-xs text-[#132A1D]/70 font-medium truncate pr-2 flex items-center gap-1.5">
                {task.assignee ? (
                  <>
                    <span className="w-5 h-5 rounded-full bg-[#6D4CF2] text-white flex items-center justify-center text-[9px] font-bold font-sora shrink-0">
                      {task.assignee.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                    <span className="truncate">{task.assignee}</span>
                  </>
                ) : (
                  '—'
                )}
              </span>
              <span>
                <Badge variant={PRIORITY_VARIANT[task.priority] ?? 'ink'} size="sm">
                  {task.priority}
                </Badge>
              </span>
              <span>
                <Badge variant={STATUS_VARIANT[task.status] ?? 'ink'} dot size="sm">
                  {task.status}
                </Badge>
              </span>
              <span className="font-inter text-xs text-[#132A1D]/50 font-medium">
                {formatDate(task.deadline)}
              </span>
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1.5 rounded-lg text-[#132A1D]/40 hover:text-brand hover:bg-brand-50 shadow-sm border border-transparent hover:border-brand/15 transition-all cursor-pointer"
                  aria-label={`Edit ${task.title}`}
                  title="Edit Task"
                >
                  <IconEdit />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1.5 rounded-lg text-[#132A1D]/40 hover:text-coral hover:bg-coral-50 shadow-sm border border-transparent hover:border-coral/15 transition-all cursor-pointer"
                  aria-label={`Delete ${task.title}`}
                  title="Delete Task"
                >
                  <IconDelete />
                </button>
              </div>
            </div>

            {/* Mobile Card */}
            <div className="md:hidden p-4 flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-sora font-semibold text-[#132A1D] text-sm leading-snug flex-1">
                  {task.title}
                </p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => onEdit(task)}
                    className="p-1.5 rounded-lg text-[#132A1D]/40 hover:text-brand hover:bg-brand-50 transition-all"
                    aria-label={`Edit ${task.title}`}
                  >
                    <IconEdit />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-1.5 rounded-lg text-[#132A1D]/40 hover:text-coral hover:bg-coral-50 transition-all"
                    aria-label={`Delete ${task.title}`}
                  >
                    <IconDelete />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={PRIORITY_VARIANT[task.priority] ?? 'ink'} size="sm">
                  {task.priority}
                </Badge>
                <Badge variant={STATUS_VARIANT[task.status] ?? 'ink'} dot size="sm">
                  {task.status}
                </Badge>
                {task.projectName && (
                  <span className="font-inter text-xs text-brand font-semibold bg-brand-50 border border-brand/15 rounded-lg px-2 py-0.5">
                    {task.projectName}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs font-inter text-[#132A1D]/50 pt-1 border-t border-[#132A1D]/6">
                <span>{task.assignee || 'Unassigned'}</span>
                <span className="flex items-center gap-1">
                  <IconCalendar />
                  {formatDate(task.deadline)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskListView;
