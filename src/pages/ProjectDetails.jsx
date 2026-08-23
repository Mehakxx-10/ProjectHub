import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext.jsx';
import Badge from '../components/ui/Badge.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import Modal from '../components/ui/Modal.jsx';
import ProjectFormModal from '../components/app/ProjectFormModal.jsx';

const STATUS_VARIANT = {
  'To Do':       'coral',
  'Planning':    'lemon',
  'In Progress': 'brand',
  'Review':      'lemon',
  'Completed':   'sage',
  'Done':        'sage',
};

const PRIORITY_VARIANT = {
  High:   'coral',
  Medium: 'lemon',
  Low:    'sage',
};

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 10H5M10 15l-5-5 5-5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M5 1.5v3M11 1.5v3M2 7h12" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H2v-3l8.5-8.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h10M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M12.5 4v9a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3.5 13V4" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F2685A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

/**
 * ProjectDetails — Complete Project Details page showing full project overview,
 * progress bar, deadline, associated tasks, team assignees, and activity history.
 */
function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, tasks, updateProject, deleteProject } = useProjects();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Lookup project from shared state
  const project = projects.find((p) => p.id === projectId);

  // If project not found (e.g. Invalid direct URL access or deleted)
  if (!project) {
    return (
      <div className="p-6 sm:p-10 max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06)] flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F2685A]/10 flex items-center justify-center text-3xl mb-4">
            🔍
          </div>
          <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-[#132A1D] mb-2">
            Project Not Found
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm max-w-sm mb-6 leading-relaxed">
            The project you're looking for does not exist or may have been deleted.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-inter font-bold text-sm text-white px-5 py-3 rounded-2xl shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#132A1D' }}
          >
            <ArrowLeftIcon />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  // Associated project tasks
  const projectTasks = tasks.filter(
    (t) => t.projectId === project.id || t.projectName === project.name
  );
  const completedProjectTasks = projectTasks.filter((t) => t.status === 'Done');

  // Compute live progress if tasks exist, otherwise use project.progress
  const liveProgress =
    projectTasks.length > 0
      ? Math.round((completedProjectTasks.length / projectTasks.length) * 100)
      : project.progress || 0;

  // Derive active team members from tasks or project object
  const assignees = Array.from(
    new Set(
      [
        ...(project.teamMembers || []),
        ...projectTasks.map((t) => t.assignee).filter(Boolean),
      ]
    )
  );

  function handleSaveProject(data) {
    updateProject(project.id, data);
  }

  function handleConfirmDelete() {
    deleteProject(project.id);
    setDeleteModalOpen(false);
    navigate('/projects');
  }

  const createdDateFormatted = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Aug 2026';

  const deadlineFormatted = project.deadline
    ? new Date(project.deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No deadline';

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-8 max-w-7xl mx-auto">

      {/* ── Top Navigation Bar ───────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-inter font-bold text-sm text-[#132A1D]/70 hover:text-[#132A1D] px-3.5 py-2 rounded-xl bg-white border border-[#132A1D]/8 shadow-sm hover:shadow hover:-translate-x-0.5 transition-all"
        >
          <ArrowLeftIcon />
          <span>Back to Projects</span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 font-inter font-bold text-xs sm:text-sm text-[#132A1D] px-4 py-2.5 rounded-xl bg-white border border-[#132A1D]/10 shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
          >
            <EditIcon />
            <span>Edit Project</span>
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 font-inter font-bold text-xs sm:text-sm text-[#F2685A] px-4 py-2.5 rounded-xl bg-white border border-[#F2685A]/20 shadow-sm hover:bg-[#F2685A]/10 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
          >
            <TrashIcon />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* ── Main Project Header Card ─────────────────────────────────── */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] overflow-hidden">
        {/* Top tri-color highlight bar */}
        <div
          className="absolute inset-x-0 top-0 h-[4px]"
          style={{
            background: `linear-gradient(90deg, ${project.color || '#6D4CF2'}, #F5B833, #3FA66B)`,
          }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="w-3.5 h-3.5 rounded-lg shrink-0 shadow-sm"
                style={{ background: project.color || '#6D4CF2' }}
              />
              <Badge variant={STATUS_VARIANT[project.status] ?? 'brand'} size="sm">
                {project.status}
              </Badge>
              <Badge variant={PRIORITY_VARIANT[project.priority] ?? 'lemon'} size="sm">
                {project.priority} Priority
              </Badge>
            </div>

            <h1 className="font-sora font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#132A1D] tracking-tight">
              {project.name}
            </h1>

            <p className="font-inter text-sm sm:text-base text-[#132A1D]/70 max-w-3xl leading-relaxed">
              {project.description || 'No description provided for this project.'}
            </p>
          </div>
        </div>

        {/* Large Progress Indicator */}
        <div className="mt-8 pt-6 border-t border-[#132A1D]/8 bg-[#132A1D]/[0.015] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-sora font-bold text-xs sm:text-sm text-[#132A1D] uppercase tracking-wider">
                Project Progress
              </span>
              <p className="font-inter text-xs text-[#132A1D]/50 mt-0.5">
                {completedProjectTasks.length} of {projectTasks.length || project.tasksTotal || 0} tasks completed
              </p>
            </div>
            <span className="font-sora font-extrabold text-2xl sm:text-3xl text-brand">
              {liveProgress}%
            </span>
          </div>

          <ProgressBar
            value={liveProgress}
            color={liveProgress >= 80 ? 'sage' : liveProgress >= 40 ? 'brand' : 'coral'}
            size="md"
          />
        </div>
      </div>

      {/* ── Project Information Metadata Cards ──────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white rounded-3xl p-5 border border-[#132A1D]/8 shadow-[0_4px_16px_-4px_rgba(19,42,29,0.06)] flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold font-inter text-[#132A1D]/40 uppercase tracking-wider mb-2">
            <CalendarIcon />
            <span>Target Deadline</span>
          </div>
          <p className="font-sora font-extrabold text-base sm:text-lg text-[#132A1D]">
            {deadlineFormatted}
          </p>
          <p className="font-inter text-[11px] text-[#132A1D]/50 mt-1">Scheduled delivery</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#132A1D]/8 shadow-[0_4px_16px_-4px_rgba(19,42,29,0.06)] flex flex-col justify-between">
          <span className="text-xs font-bold font-inter text-[#132A1D]/40 uppercase tracking-wider mb-2">
            Priority Level
          </span>
          <p className="font-sora font-extrabold text-base sm:text-lg text-[#132A1D]">
            {project.priority} Priority
          </p>
          <p className="font-inter text-[11px] text-coral font-medium mt-1">Roadmap importance</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#132A1D]/8 shadow-[0_4px_16px_-4px_rgba(19,42,29,0.06)] flex flex-col justify-between">
          <span className="text-xs font-bold font-inter text-[#132A1D]/40 uppercase tracking-wider mb-2">
            Current Status
          </span>
          <p className="font-sora font-extrabold text-base sm:text-lg text-[#132A1D]">
            {project.status}
          </p>
          <p className="font-inter text-[11px] text-[#3FA66B] font-medium mt-1">Active lifecycle</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#132A1D]/8 shadow-[0_4px_16px_-4px_rgba(19,42,29,0.06)] flex flex-col justify-between">
          <span className="text-xs font-bold font-inter text-[#132A1D]/40 uppercase tracking-wider mb-2">
            Created Date
          </span>
          <p className="font-sora font-extrabold text-base sm:text-lg text-[#132A1D]">
            {createdDateFormatted}
          </p>
          <p className="font-inter text-[11px] text-[#132A1D]/50 mt-1">Workspace initiation</p>
        </div>
      </div>

      {/* ── Lower Split: Project Tasks Backlog + Team & Activity ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

        {/* ── Left: Project Tasks (7 cols) ────────────────────────────── */}
        <section
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
          aria-labelledby="project-tasks-heading"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 id="project-tasks-heading" className="font-sora font-extrabold text-[#132A1D] text-lg sm:text-xl tracking-tight">
                Project Tasks
              </h3>
              <p className="font-inter text-[#132A1D]/50 text-xs mt-0.5">
                Work items specifically linked to {project.name}
              </p>
            </div>
            <span className="font-inter font-bold text-xs px-3 py-1 rounded-full bg-brand-50 text-brand">
              {projectTasks.length} {projectTasks.length === 1 ? 'Task' : 'Tasks'}
            </span>
          </div>

          {projectTasks.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/6 text-center">
              <span className="text-3xl mb-2 block">📋</span>
              <h4 className="font-sora font-bold text-sm text-[#132A1D]">No tasks yet</h4>
              <p className="font-inter text-xs text-[#132A1D]/50 mt-1 max-w-sm mx-auto leading-relaxed">
                Add tasks in the Tasks section and assign them to this project to track delivery milestones here.
              </p>
              <Link
                to="/tasks"
                className="inline-flex items-center gap-1.5 mt-4 font-inter font-bold text-xs text-brand hover:underline"
              >
                Go to Tasks board →
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-3 list-none" role="list">
              {projectTasks.map((t) => (
                <li
                  key={t.id}
                  className="p-4 rounded-2xl bg-[#132A1D]/[0.02] border border-[#132A1D]/6 flex items-start justify-between gap-3 hover:bg-[#132A1D]/[0.04] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          t.status === 'Done'
                            ? 'bg-[#3FA66B]'
                            : t.status === 'In Progress'
                            ? 'bg-[#F5B833]'
                            : 'bg-[#F2685A]'
                        }`}
                      />
                      <h5 className="font-sora font-bold text-xs sm:text-sm text-[#132A1D] truncate leading-snug">
                        {t.title}
                      </h5>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-[11px] font-inter text-[#132A1D]/50">
                      <span>👤 {t.assignee || 'Unassigned'}</span>
                      <span>📅 Due {t.deadline || 'Pending'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant={STATUS_VARIANT[t.status] ?? 'ink'} size="sm">
                      {t.status}
                    </Badge>
                    <span className="font-inter text-[10px] font-semibold text-[#132A1D]/45">
                      {t.priority}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ── Right: Team & Activity (5 cols) ─────────────────────────── */}
        <div className="lg:col-span-5 space-y-7">

          {/* Assigned Team Members Card */}
          <section
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
            aria-labelledby="project-team-heading"
          >
            <h3 id="project-team-heading" className="font-sora font-extrabold text-[#132A1D] text-base sm:text-lg tracking-tight mb-4">
              Project Contributors
            </h3>

            {assignees.length === 0 ? (
              <p className="font-inter text-[#132A1D]/50 text-xs py-2">
                No team members assigned yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {assignees.map((name) => {
                  const initials = name
                    .split(' ')
                    .map((p) => p[0])
                    .filter(Boolean)
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);
                  return (
                    <div
                      key={name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#132A1D]/[0.03] border border-[#132A1D]/8 text-xs font-inter font-semibold text-[#132A1D]"
                    >
                      <div className="w-5 h-5 rounded-md bg-brand text-white font-sora font-bold text-[9px] flex items-center justify-center">
                        {initials}
                      </div>
                      <span>{name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Project Activity Log Card */}
          <section
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)]"
            aria-labelledby="project-activity-heading"
          >
            <h3 id="project-activity-heading" className="font-sora font-extrabold text-[#132A1D] text-base sm:text-lg tracking-tight mb-4">
              Project Activity
            </h3>

            <div className="relative pl-5 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#132A1D]/10">
              <div className="relative flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 bg-[#DCF3E4] -ml-5 ring-4 ring-white">
                  ✨
                </div>
                <div>
                  <p className="font-inter font-semibold text-xs text-[#132A1D]">
                    Project created as "{project.name}"
                  </p>
                  <p className="font-inter text-[10px] text-[#132A1D]/40 mt-0.5">
                    {createdDateFormatted}
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 bg-[#EFE9FE] -ml-5 ring-4 ring-white">
                  📊
                </div>
                <div>
                  <p className="font-inter font-semibold text-xs text-[#132A1D]">
                    Status set to {project.status} ({liveProgress}% completion)
                  </p>
                  <p className="font-inter text-[10px] text-[#132A1D]/40 mt-0.5">
                    Updated recently
                  </p>
                </div>
              </div>

              {projectTasks.length > 0 && (
                <div className="relative flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 bg-[#FEF2D6] -ml-5 ring-4 ring-white">
                    🎯
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-xs text-[#132A1D]">
                      {projectTasks.length} workstream tasks registered
                    </p>
                    <p className="font-inter text-[10px] text-[#132A1D]/40 mt-0.5">
                      Sprint active
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ── Edit Project Modal ──────────────────────────────────────── */}
      <ProjectFormModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={project}
        onSave={handleSaveProject}
      />

      {/* ── Delete Confirmation Modal ───────────────────────────────── */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Project"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#F2685A]/10 shrink-0">
              <WarningIcon />
            </div>
            <div>
              <h4 className="font-sora font-bold text-sm text-[#132A1D]">
                Delete "{project.name}"?
              </h4>
              <p className="font-inter text-xs text-[#132A1D]/60 mt-1 leading-relaxed">
                Are you sure you want to delete this project? This will remove it from the central project state across Dashboard, Projects, and Reports.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#132A1D]/8 mt-2">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              className="font-inter font-semibold text-xs text-[#132A1D]/60 hover:text-[#132A1D] px-4 py-2.5 rounded-xl hover:bg-[#132A1D]/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="font-inter font-bold text-xs text-white px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ background: '#F2685A' }}
            >
              Delete Project
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectDetails;
