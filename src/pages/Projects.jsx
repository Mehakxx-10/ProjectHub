import React, { useState, useMemo } from 'react';
import ProjectCard from '../components/app/ProjectCard.jsx';
import ProjectFormModal from '../components/app/ProjectFormModal.jsx';
import Modal from '../components/ui/Modal.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useProjects } from '../context/ProjectContext.jsx';

const STATUS_OPTIONS = ['All', 'Planning', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="rgba(19,42,29,0.4)" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <circle cx="9" cy="9" r="7" />
      <path d="M16 16l-3.5-3.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M7 1v12M1 7h12" />
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
 * Projects — Soft 3D-elevated Project Management page connected to centralized ProjectContext.
 */
function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();

  const [search,   setSearch]   = useState('');
  const [statusFilter,   setStatusFilter]   = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  /* ── Derived: filtered projects across name and description ─────── */
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q);

      // Status filter normalization: 'Planning' matches 'Planning' & 'To Do', 'Completed' matches 'Completed', 'Done', 'Review'
      let matchStatus = true;
      if (statusFilter !== 'All') {
        if (statusFilter === 'Planning') {
          matchStatus = p.status === 'Planning' || p.status === 'To Do';
        } else if (statusFilter === 'Completed') {
          matchStatus = p.status === 'Completed' || p.status === 'Done' || p.status === 'Review';
        } else {
          matchStatus = p.status === statusFilter;
        }
      }

      const matchPriority = priorityFilter === 'All' || p.priority === priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [projects, search, statusFilter, priorityFilter]);

  /* ── Handlers ───────────────────────────────────────────────────── */
  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(project) {
    setEditing(project);
    setModalOpen(true);
  }

  function handleDeletePrompt(id) {
    const proj = projects.find((p) => p.id === id);
    if (proj) setProjectToDelete(proj);
  }

  function confirmDelete() {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  }

  function handleSave(data) {
    if (editing) {
      updateProject(editing.id, data);
    } else {
      addProject(data);
    }
    setEditing(null);
  }

  function clearFilters() {
    setSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
  }

  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'All' || priorityFilter !== 'All';

  return (
    <div className="p-5 sm:p-7 lg:p-9 space-y-7 max-w-7xl mx-auto">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand/15 text-brand text-xs font-semibold font-inter mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Project Hub Workspace
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            Projects
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            Manage and track everything your team is working on.
          </p>
        </div>

        {/* Visually Prominent + New Project Button */}
        <button
          id="new-project-btn"
          onClick={openCreate}
          className="inline-flex items-center gap-2 font-inter font-bold text-sm text-white rounded-2xl px-6 py-3.5 shadow-xl shadow-[#132A1D]/20 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer shrink-0"
          style={{ background: '#132A1D' }}
        >
          <PlusIcon />
          <span>+ New Project</span>
        </button>
      </div>

      {/* ── Modern Floating Search & Filter Toolbar ─────────────────── */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] flex flex-col md:flex-row items-center gap-3.5">
        
        {/* Search Projects Input */}
        <div className="relative flex-1 w-full">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            id="projects-search"
            type="text"
            placeholder="Search projects by name or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full font-inter text-sm text-[#132A1D] rounded-xl pl-10 pr-4 py-3 bg-[#F8F4EA] border border-[#132A1D]/10 shadow-inner focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
            aria-label="Search projects"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
          {/* Status Filter */}
          <select
            id="projects-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="font-inter text-xs sm:text-sm font-semibold text-[#132A1D] bg-[#F8F4EA] border border-[#132A1D]/10 rounded-xl px-3.5 py-3 outline-none hover:border-[#132A1D]/25 focus:border-brand focus:ring-2 focus:ring-brand/20 cursor-pointer shadow-sm w-full sm:w-auto"
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            id="projects-priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="font-inter text-xs sm:text-sm font-semibold text-[#132A1D] bg-[#F8F4EA] border border-[#132A1D]/10 rounded-xl px-3.5 py-3 outline-none hover:border-[#132A1D]/25 focus:border-brand focus:ring-2 focus:ring-brand/20 cursor-pointer shadow-sm w-full sm:w-auto"
            aria-label="Filter by priority"
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'All Priorities' : `${p} Priority`}
              </option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="font-inter text-xs font-bold text-[#F2685A] hover:text-[#C03D4A] px-3.5 py-3 rounded-xl bg-[#F2685A]/10 hover:bg-[#F2685A]/20 transition-all whitespace-nowrap cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Results Count Meta ───────────────────────────────────────── */}
      <div className="flex items-center justify-between px-1">
        <p className="font-inter text-xs font-semibold text-[#132A1D]/50">
          Showing <span className="text-[#132A1D] font-bold">{filtered.length}</span> of {projects.length} projects
        </p>
      </div>

      {/* ── 3D Project Cards Grid ────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEdit}
              onDelete={handleDeletePrompt}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects found"
          description={
            hasActiveFilters
              ? 'Try changing your search or filters.'
              : 'Create your first project to get started organizing roadmaps and team tasks.'
          }
          action={
            hasActiveFilters
              ? { label: 'Clear filters', onClick: clearFilters, variant: 'ghost' }
              : { label: '+ New Project', onClick: openCreate }
          }
        />
      )}

      {/* ── Create / Edit Project Modal ─────────────────────────────── */}
      <ProjectFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        project={editing}
        onSave={handleSave}
      />

      {/* ── Delete Confirmation Modal ───────────────────────────────── */}
      <Modal
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
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
                Delete "{projectToDelete?.name}"?
              </h4>
              <p className="font-inter text-xs text-[#132A1D]/60 mt-1 leading-relaxed">
                Are you sure you want to delete this project? This will remove it from the central project state.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#132A1D]/8 mt-2">
            <button
              type="button"
              onClick={() => setProjectToDelete(null)}
              className="font-inter font-semibold text-xs text-[#132A1D]/60 hover:text-[#132A1D] px-4 py-2.5 rounded-xl hover:bg-[#132A1D]/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
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

export default Projects;
