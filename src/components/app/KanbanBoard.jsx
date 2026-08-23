import React from 'react';
import TaskCard from './TaskCard.jsx';

const COLUMNS = [
  {
    status: 'To Do',
    label:  'To Do',
    dotColor: '#F2685A',
    headerBg: 'bg-[#F2685A]/12 text-[#C03D4A] border-[#F2685A]/25',
    countBg: 'bg-[#F2685A]/20 text-[#C03D4A]',
  },
  {
    status: 'In Progress',
    label:  'In Progress',
    dotColor: '#F5B833',
    headerBg: 'bg-[#F5B833]/15 text-[#925C03] border-[#F5B833]/30',
    countBg: 'bg-[#F5B833]/25 text-[#925C03]',
  },
  {
    status: 'Done',
    label:  'Done',
    dotColor: '#3FA66B',
    headerBg: 'bg-[#3FA66B]/12 text-[#2A7D4E] border-[#3FA66B]/25',
    countBg: 'bg-[#3FA66B]/20 text-[#2A7D4E]',
  },
];

/**
 * KanbanColumn — Single soft-3D column of a Kanban board.
 */
function KanbanColumn({ column, tasks, onEdit, onDelete, onStatusChange }) {
  const { label, dotColor, headerBg, countBg } = column;

  return (
    <div className="flex flex-col gap-3 min-w-0 bg-[#132A1D]/[0.025] rounded-3xl p-3.5 border border-[#132A1D]/6 shadow-sm">
      {/* Column header */}
      <div
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border shadow-sm ${headerBg}`}
      >
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
        <span className="font-sora font-bold text-sm tracking-tight">{label}</span>
        <span
          className={`ml-auto font-inter font-bold text-xs rounded-full px-2.5 py-0.5 shadow-sm ${countBg}`}
        >
          {tasks.length}
        </span>
      </div>

      {/* Task cards stack */}
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <div
            className="rounded-2xl flex items-center justify-center py-12 border-2 border-dashed border-[#132A1D]/10 bg-white/40 shadow-inner"
          >
            <p className="font-inter text-xs text-[#132A1D]/40 text-center font-medium">
              No tasks in {label}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

/**
 * KanbanBoard — 3D-styled three-column Kanban view.
 */
function KanbanBoard({ tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5" aria-label="Kanban board">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.status);
        return (
          <KanbanColumn
            key={col.status}
            column={col}
            tasks={colTasks}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        );
      })}
    </div>
  );
}

export default KanbanBoard;
