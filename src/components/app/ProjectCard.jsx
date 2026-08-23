import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import { formatDate } from '../../utils/helpers.js';

/* ─── Priority → badge variant map ──────────────────────────────── */
const PRIORITY_VARIANT = {
  High:   'coral',
  Medium: 'lemon',
  Low:    'sage',
};

/* ─── Status → badge variant map ────────────────────────────────── */
const STATUS_VARIANT = {
  'To Do':       'coral',
  'Planning':    'lemon',
  'In Progress': 'brand',
  'Review':      'lemon',
  'Done':        'sage',
  'Completed':   'sage',
};

/* ─── Progress → colour map ─────────────────────────────────────── */
function progressColor(pct) {
  if (pct >= 80) return 'sage';
  if (pct >= 40) return 'brand';
  return 'coral';
}

/* ─── Icons ──────────────────────────────────────────────────────── */
function IconEdit() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H2v-3l8.5-8.5z" />
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

function IconTasks() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7l2.5 2.5L11 4" />
      <rect x="1" y="1" width="12" height="12" rx="1.5" />
    </svg>
  );
}

/**
 * ProjectCard — Soft 3D-elevated Project Card with clickable navigation to /projects/:id.
 */
function ProjectCard({ project, onEdit, onDelete }) {
  const navigate = useNavigate();
  const {
    id, name, description, status, priority,
    progress = 0, deadline, tasksTotal = 0, tasksCompleted = 0, color = '#6D4CF2',
  } = project;

  const pColor = progressColor(progress);

  function handleCardClick() {
    navigate(`/projects/${id}`);
  }

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_32px_-6px_rgba(19,42,29,0.12),0_4px_12px_rgba(19,42,29,0.06)] transition-all duration-300 cursor-pointer overflow-hidden"
      aria-label={`Project: ${name}`}
    >
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* ── Header Row ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-3.5 h-3.5 rounded-lg flex-shrink-0 shadow-sm"
            style={{ background: color }}
            aria-hidden="true"
          />
          <h3
            className="font-sora font-bold text-[#132A1D] text-base leading-snug truncate group-hover:text-brand transition-colors"
            title={name}
          >
            {name}
          </h3>
        </div>

        {/* Floating Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              className="p-1.5 rounded-lg text-[#132A1D]/40 hover:text-brand hover:bg-brand-50 shadow-sm border border-transparent hover:border-brand/15 transition-all cursor-pointer"
              aria-label={`Edit ${name}`}
              title="Edit Project"
            >
              <IconEdit />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="p-1.5 rounded-lg text-[#132A1D]/40 hover:text-coral hover:bg-coral-50 shadow-sm border border-transparent hover:border-coral/15 transition-all cursor-pointer"
              aria-label={`Delete ${name}`}
              title="Delete Project"
            >
              <IconDelete />
            </button>
          )}
        </div>
      </div>

      {/* ── Description ────────────────────────────────────────── */}
      <p
        className="font-inter text-[#132A1D]/60 text-xs sm:text-sm leading-relaxed"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description || 'No description provided.'}
      </p>

      {/* ── Badges ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant={STATUS_VARIANT[status] ?? 'ink'} dot size="sm">
          {status}
        </Badge>
        <Badge variant={PRIORITY_VARIANT[priority] ?? 'ink'} size="sm">
          {priority} Priority
        </Badge>
      </div>

      {/* ── Progress Meter ─────────────────────────────────────── */}
      <div className="pt-1">
        <ProgressBar
          value={progress}
          color={pColor}
          size="sm"
          label="Overall Progress"
          showValue
        />
      </div>

      {/* ── Footer Meta Row ────────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs font-inter text-[#132A1D]/45 pt-3 border-t border-[#132A1D]/6">
        <span className="flex items-center gap-1.5 font-medium">
          <IconTasks />
          <span>{tasksCompleted}/{tasksTotal} tasks</span>
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <IconCalendar />
          <span>{formatDate(deadline)}</span>
        </span>
      </div>
    </article>
  );
}

export default ProjectCard;
