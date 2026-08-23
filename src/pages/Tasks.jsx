import React, { useState, useMemo } from 'react';
import TaskListView from '../components/app/TaskListView.jsx';
import KanbanBoard from '../components/app/KanbanBoard.jsx';
import TaskFormModal from '../components/app/TaskFormModal.jsx';
import ViewToggle from '../components/app/ViewToggle.jsx';
import Modal from '../components/ui/Modal.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useProjects } from '../context/ProjectContext.jsx';

const STATUS_OPTIONS   = ['All', 'To Do', 'In Progress', 'Done'];
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
 * Tasks — 3D-styled task management page connected to centralized ProjectContext.
 */
function Tasks() {
  const {
    tasks,
    projects,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  } = useProjects();

  const [view,     setView]     = useState('list');    // 'list' | 'kanban'
  const [search,   setSearch]   = useState('');
  const [statusFilter,   setStatusFilter]   = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  /* ── Derived: filtered tasks using filter() and find() ───────────── */
  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        (t.projectName ?? '').toLowerCase().includes(q) ||
        (t.assignee ?? '').toLowerCase().includes(q);

      const matchStatus   = statusFilter   === 'All' || t.status   === statusFilter;
      const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  /* ── Handlers demonstrating state mutations ──────────────────────── */
  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(task) {
    setEditing(task);
    setModalOpen(true);
  }

  function handleDeletePrompt(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) setTaskToDelete(task);
  }

  function confirmDelete() {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  }

  function handleSave(data) {
    if (editing) {
      updateTask(editing.id, data);
    } else {
      addTask(data);
    }
    setEditing(null);
  }

  function handleStatusChange(taskId, newStatus) {
    updateTaskStatus(taskId, newStatus);
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
            Active Sprint Execution
          </div>
          <h2 className="font-sora font-extrabold text-[#132A1D] text-2xl sm:text-3xl tracking-tight">
            Tasks
          </h2>
          <p className="font-inter text-[#132A1D]/55 text-sm mt-1 max-w-lg">
            Stay on top of every piece of work across your roadmaps.
          </p>
        </div>

        {/* Visually Prominent + Add Task Button */}
        <button
          id="add-task-btn"
          onClick={openCreate}
          className="inline-flex items-center gap-2 font-inter font-bold text-sm text-white rounded-2xl px-6 py-3.5 shadow-xl shadow-[#132A1D]/20 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer shrink-0"
          style={{ background: '#132A1D' }}
        >
          <PlusIcon />
          <span>+ Add Task</span>
        </button>
      </div>

      {/* ── Premium Floating Search, Filter & View Toolbar ─────────── */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Left: Search & Dropdown Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              id="tasks-search"
              type="text"
              placeholder="Search tasks by title, project, assignee…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-inter text-sm text-[#132A1D] rounded-xl pl-10 pr-4 py-3 bg-[#F8F4EA] border border-[#132A1D]/10 shadow-inner focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              aria-label="Search tasks"
            />
          </div>

          {/* Status Filter */}
          <select
            id="tasks-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="font-inter text-xs sm:text-sm font-semibold text-[#132A1D] bg-[#F8F4EA] border border-[#132A1D]/10 rounded-xl px-3.5 py-3 outline-none hover:border-[#132A1D]/25 focus:border-brand focus:ring-2 focus:ring-brand/20 cursor-pointer shadow-sm"
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
            id="tasks-priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="font-inter text-xs sm:text-sm font-semibold text-[#132A1D] bg-[#F8F4EA] border border-[#132A1D]/10 rounded-xl px-3.5 py-3 outline-none hover:border-[#132A1D]/25 focus:border-brand focus:ring-2 focus:ring-brand/20 cursor-pointer shadow-sm"
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
              className="font-inter text-xs font-bold text-[#F2685A] hover:text-[#C03D4A] px-3.5 py-3 rounded-xl bg-[#F2685A]/10 hover:bg-[#F2685A]/20 transition-all whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right: 3D Segmented View Toggle */}
        <div className="flex items-center justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#132A1D]/8">
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      {/* ── Results Count Meta ───────────────────────────────────────── */}
      <div className="flex items-center justify-between px-1">
        <p className="font-inter text-xs font-semibold text-[#132A1D]/50">
          Showing <span className="text-[#132A1D] font-bold">{filtered.length}</span> of {tasks.length} tasks
        </p>
      </div>

      {/* ── Main Task View Area (List or Dynamic Kanban) ─────────────── */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description={
            hasActiveFilters
              ? 'Try changing your search or filters.'
              : 'Add your first task to start organizing your sprint backlog.'
          }
          action={
            hasActiveFilters
              ? { label: 'Clear filters', onClick: clearFilters, variant: 'ghost' }
              : { label: '+ Add Task', onClick: openCreate }
          }
        />
      ) : view === 'list' ? (
        <TaskListView
          tasks={filtered}
          onEdit={openEdit}
          onDelete={handleDeletePrompt}
        />
      ) : (
        <KanbanBoard
          tasks={filtered}
          onEdit={openEdit}
          onDelete={handleDeletePrompt}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* ── Create / Edit Task Modal ─────────────────────────────────── */}
      <TaskFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        task={editing}
        projects={projects}
        onSave={handleSave}
      />

      {/* ── Delete Confirmation Modal ───────────────────────────────── */}
      <Modal
        isOpen={Boolean(taskToDelete)}
        onClose={() => setTaskToDelete(null)}
        title="Delete Task"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#F2685A]/10 shrink-0">
              <WarningIcon />
            </div>
            <div>
              <h4 className="font-sora font-bold text-sm text-[#132A1D]">
                Delete "{taskToDelete?.title}"?
              </h4>
              <p className="font-inter text-xs text-[#132A1D]/60 mt-1 leading-relaxed">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#132A1D]/8 mt-2">
            <button
              type="button"
              onClick={() => setTaskToDelete(null)}
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
              Delete Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Tasks;
