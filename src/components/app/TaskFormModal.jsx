import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal.jsx';

const STATUSES   = ['To Do', 'In Progress', 'Done'];
const PRIORITIES = ['High', 'Medium', 'Low'];

const EMPTY_FORM = {
  title:       '',
  description: '',
  projectId:   '',
  assignee:    '',
  priority:    'Medium',
  status:      'To Do',
  deadline:    '',
};

/**
 * TaskFormModal — 3D-styled modal for creating and editing tasks.
 */
function TaskFormModal({ isOpen, onClose, task = null, projects = [], onSave }) {
  const isEdit = Boolean(task);

  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(
        task
          ? {
              title:       task.title || '',
              description: task.description ?? '',
              projectId:   task.projectId   ?? '',
              assignee:    task.assignee    ?? '',
              priority:    task.priority || 'Medium',
              status:      task.status || 'To Do',
              deadline:    task.deadline || '',
            }
          : EMPTY_FORM
      );
      setErrors({});
    }
  }, [isOpen, task]);

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  function validate() {
    const e = {};
    if (!form.title.trim())    e.title    = 'Task title is required.';
    if (!form.assignee.trim()) e.assignee = 'Assignee name is required.';
    if (!form.deadline)        e.deadline = 'Deadline is required.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const selectedProject = projects.find((p) => p.id === form.projectId);

    onSave({
      ...(task ?? {}),
      title:       form.title.trim(),
      description: form.description.trim(),
      projectId:   form.projectId,
      projectName: selectedProject?.name ?? '',
      assignee:    form.assignee.trim(),
      priority:    form.priority,
      status:      form.status,
      deadline:    form.deadline,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Create New Task'}
      size="md"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

        {/* Task Title */}
        <div>
          <label htmlFor="task-title" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
            Task Title <span className="text-[#F2685A]" aria-hidden="true">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            placeholder="e.g. Implement authentication routing"
            value={form.title}
            onChange={handleChange('title')}
            className={`w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-3 bg-[#F8F4EA] border transition-all outline-none ${
              errors.title
                ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
            }`}
          />
          {errors.title && (
            <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
              <span>•</span> {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="task-desc" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
            Description
          </label>
          <textarea
            id="task-desc"
            rows={2}
            placeholder="Optional details, acceptance criteria, or notes…"
            value={form.description}
            onChange={handleChange('description')}
            className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border border-[#132A1D]/12 transition-all outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 resize-none"
          />
        </div>

        {/* Project + Assignee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Project */}
          <div>
            <label htmlFor="task-project" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
              Associated Project
            </label>
            <select
              id="task-project"
              value={form.projectId}
              onChange={handleChange('projectId')}
              className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border border-[#132A1D]/12 transition-all outline-none hover:border-[#132A1D]/25 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 cursor-pointer"
            >
              <option value="">— Standalone Task —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Assignee */}
          <div>
            <label htmlFor="task-assignee" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
              Assignee Name <span className="text-[#F2685A]" aria-hidden="true">*</span>
            </label>
            <input
              id="task-assignee"
              type="text"
              placeholder="e.g. Ananya Kumar"
              value={form.assignee}
              onChange={handleChange('assignee')}
              className={`w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border transition-all outline-none ${
                errors.assignee
                  ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                  : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
              }`}
            />
            {errors.assignee && (
              <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
                <span>•</span> {errors.assignee}
              </p>
            )}
          </div>
        </div>

        {/* Priority + Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Priority */}
          <div>
            <label htmlFor="task-priority" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
              Priority Level
            </label>
            <select
              id="task-priority"
              value={form.priority}
              onChange={handleChange('priority')}
              className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border border-[#132A1D]/12 transition-all outline-none hover:border-[#132A1D]/25 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 cursor-pointer"
            >
              {PRIORITIES.map((p) => <option key={p} value={p}>{p} Priority</option>)}
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="task-status" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
              Kanban Status
            </label>
            <select
              id="task-status"
              value={form.status}
              onChange={handleChange('status')}
              className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border border-[#132A1D]/12 transition-all outline-none hover:border-[#132A1D]/25 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 cursor-pointer"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="task-deadline" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
            Due Date <span className="text-[#F2685A]" aria-hidden="true">*</span>
          </label>
          <input
            id="task-deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange('deadline')}
            className={`w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border transition-all outline-none cursor-pointer ${
              errors.deadline
                ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
            }`}
          />
          {errors.deadline && (
            <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
              <span>•</span> {errors.deadline}
            </p>
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#132A1D]/8 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="font-inter font-semibold text-sm text-[#132A1D]/60 hover:text-[#132A1D] px-4 py-2.5 rounded-xl hover:bg-[#132A1D]/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            id={isEdit ? 'task-save-btn' : 'task-create-btn'}
            className="font-inter font-semibold text-sm text-white rounded-xl px-5 py-2.5 shadow-md shadow-[#132A1D]/15 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
            style={{ background: '#132A1D' }}
          >
            {isEdit ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskFormModal;
