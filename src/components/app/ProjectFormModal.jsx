import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal.jsx';

const STATUSES  = ['Planning', 'In Progress', 'Review', 'Completed'];
const PRIORITIES = ['High', 'Medium', 'Low'];

const EMPTY_FORM = {
  name:        '',
  description: '',
  deadline:    '',
  priority:    'Medium',
  status:      'In Progress',
};

/**
 * ProjectFormModal — 3D-styled create or edit project modal with controlled inputs and validation.
 */
function ProjectFormModal({ isOpen, onClose, project = null, onSave }) {
  const isEdit = Boolean(project);

  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  /* Sync form when editing */
  useEffect(() => {
    if (isOpen) {
      if (project) {
        // Map 'To Do' -> 'Planning', 'Done' -> 'Completed' if needed
        let initialStatus = project.status;
        if (initialStatus === 'To Do') initialStatus = 'Planning';
        if (initialStatus === 'Done') initialStatus = 'Completed';

        setForm({
          name:        project.name || '',
          description: project.description || '',
          deadline:    project.deadline || '',
          priority:    project.priority || 'Medium',
          status:      initialStatus || 'In Progress',
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setErrors({});
    }
  }, [isOpen, project]);

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  function validate() {
    const e = {};
    if (!form.name.trim())        e.name        = 'Project name is required.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (!form.deadline)           e.deadline    = 'Deadline is required.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    onSave({
      ...(project ?? {}),
      name:        form.name.trim(),
      description: form.description.trim(),
      deadline:    form.deadline,
      priority:    form.priority,
      status:      form.status,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Project' : 'Create New Project'}
      size="md"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

        {/* Project Name */}
        <div>
          <label htmlFor="proj-name" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
            Project Name <span className="text-[#F2685A]" aria-hidden="true">*</span>
          </label>
          <input
            id="proj-name"
            type="text"
            placeholder="e.g. Website Redesign & Branding"
            value={form.name}
            onChange={handleChange('name')}
            className={`w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-3 bg-[#F8F4EA] border transition-all outline-none ${
              errors.name
                ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
            }`}
          />
          {errors.name && (
            <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
              <span>•</span> {errors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="proj-desc" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
            Description <span className="text-[#F2685A]" aria-hidden="true">*</span>
          </label>
          <textarea
            id="proj-desc"
            rows={3}
            placeholder="Briefly describe the key objectives and scope of this project..."
            value={form.description}
            onChange={handleChange('description')}
            className={`w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-3 bg-[#F8F4EA] border transition-all outline-none resize-none ${
              errors.description
                ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
            }`}
          />
          {errors.description && (
            <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
              <span>•</span> {errors.description}
            </p>
          )}
        </div>

        {/* Deadline + Priority Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Deadline */}
          <div>
            <label htmlFor="proj-deadline" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
              Target Deadline <span className="text-[#F2685A]" aria-hidden="true">*</span>
            </label>
            <input
              id="proj-deadline"
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

          {/* Priority */}
          <div>
            <label htmlFor="proj-priority" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
              Priority
            </label>
            <select
              id="proj-priority"
              value={form.priority}
              onChange={handleChange('priority')}
              className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border border-[#132A1D]/12 transition-all outline-none hover:border-[#132A1D]/25 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 cursor-pointer"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p} Priority
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="proj-status" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
            Project Status
          </label>
          <select
            id="proj-status"
            value={form.status}
            onChange={handleChange('status')}
            className="w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-2.5 bg-[#F8F4EA] border border-[#132A1D]/12 transition-all outline-none hover:border-[#132A1D]/25 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 cursor-pointer"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
            id={isEdit ? 'proj-save-btn' : 'proj-create-btn'}
            className="font-inter font-semibold text-sm text-white rounded-xl px-5 py-2.5 shadow-md shadow-[#132A1D]/15 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
            style={{ background: '#132A1D' }}
          >
            {isEdit ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ProjectFormModal;
