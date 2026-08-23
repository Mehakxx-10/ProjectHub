import React from 'react';

/* ─── Kanban column data ─────────────────────────────────────────── */
const COLUMNS = [
  {
    id: 'todo',
    label: 'To Do',
    dot: '#E8543E',
    cards: [
      { title: 'Design Homepage', priority: 'High', tag: 'Design', assignee: 'AK', tagColor: '#6D4CF2', tagBg: '#EDE9FE' },
      { title: 'Research Competitors', priority: 'Medium', tag: 'Research', assignee: 'MK', tagColor: '#D97706', tagBg: '#FEF3C7' },
    ],
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    dot: '#F0B429',
    cards: [
      { title: 'Dashboard UI', priority: 'High', tag: 'Frontend', assignee: 'SR', tagColor: '#6D4CF2', tagBg: '#EDE9FE', progress: 60 },
      { title: 'Authentication', priority: 'High', tag: 'Backend', assignee: 'TK', tagColor: '#16A34A', tagBg: '#D1FAE5', progress: 40 },
    ],
  },
  {
    id: 'done',
    label: 'Done',
    dot: '#4CAF7D',
    cards: [
      { title: 'Testing Setup', priority: 'Low', tag: 'QA', assignee: 'JP', tagColor: '#16A34A', tagBg: '#D1FAE5' },
      { title: 'Landing Page', priority: 'Medium', tag: 'Frontend', assignee: 'MK', tagColor: '#6D4CF2', tagBg: '#EDE9FE' },
    ],
  },
];

const PRIORITY_STYLE = {
  High:   { color: '#DC2626', bg: '#FEE2E2' },
  Medium: { color: '#D97706', bg: '#FEF3C7' },
  Low:    { color: '#16A34A', bg: '#D1FAE5' },
};

const AVATAR_COLORS = { AK: '#6D4CF2', MK: '#E8543E', SR: '#4CAF7D', TK: '#F0B429', JP: '#14241C' };

/* ─── Check icon ─────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  );
}

const KANBAN_FEATURES = [
  'Drag-and-drop tasks between any column instantly',
  'Custom columns per project or team workflow',
  'Task cards with priority, assignee, and due date',
  'Progress bars visible inside each card',
];

/* ─── Kanban board UI ────────────────────────────────────────────── */
function KanbanUI() {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-[#F8F4EA]"
      style={{ border: '1.5px solid rgba(15,36,25,0.1)', boxShadow: '0 4px 24px rgba(15,36,25,0.08)' }}
      aria-hidden="true"
    >
      {/* Chrome */}
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ background: 'rgba(15,36,25,0.04)', borderBottom: '1px solid rgba(15,36,25,0.08)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(15,36,25,0.15)' }} />
        <span className="flex-1 text-center font-inter text-[10px]" style={{ color: 'rgba(15,36,25,0.35)' }}>
          Website Redesign — Kanban
        </span>
      </div>

      <div className="p-4 overflow-x-auto">
        <div className="flex gap-3" style={{ minWidth: '580px' }}>
          {COLUMNS.map((col) => (
            <div key={col.id} className="flex-1">
              {/* Column header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: col.dot }} />
                <span className="font-inter font-semibold text-xs" style={{ color: '#0F2419' }}>{col.label}</span>
                <span
                  className="ml-auto font-inter font-semibold text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{ background: `${col.dot}18`, color: col.dot }}
                >
                  {col.cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {col.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl p-3 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ border: '1px solid rgba(15,36,25,0.09)', cursor: 'grab' }}
                  >
                    {/* Tag + priority */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="font-inter font-medium rounded-md px-1.5 py-0.5"
                        style={{ fontSize: '9px', background: card.tagBg, color: card.tagColor }}
                      >
                        {card.tag}
                      </span>
                      <span
                        className="font-inter font-medium rounded-md px-1.5 py-0.5 ml-auto"
                        style={{ fontSize: '9px', ...PRIORITY_STYLE[card.priority] }}
                      >
                        {card.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="font-inter font-medium text-xs mb-2.5 leading-snug" style={{ color: '#0F2419' }}>
                      {card.title}
                    </p>

                    {/* Progress bar */}
                    {card.progress !== undefined && (
                      <div className="mb-2.5">
                        <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(15,36,25,0.08)' }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${card.progress}%`, background: col.dot }} />
                        </div>
                      </div>
                    )}

                    {/* Avatar */}
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white font-sora font-bold"
                      style={{ fontSize: '7px', background: AVATAR_COLORS[card.assignee] ?? '#14241C' }}
                    >
                      {card.assignee}
                    </div>
                  </div>
                ))}

                {/* Add card */}
                <button
                  className="w-full rounded-xl py-2 flex items-center justify-center gap-1 font-inter font-medium text-[10px] transition-all"
                  style={{
                    border: '1px dashed rgba(15,36,25,0.2)',
                    color: 'rgba(15,36,25,0.35)',
                    background: 'transparent',
                  }}
                >
                  + Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * KanbanShowcase — cream section, Kanban board left, text right.
 */
function KanbanShowcase() {
  return (
    <section
      className="py-20 bg-[#F8F4EA]"
      aria-label="Kanban board showcase"
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-14 xl:gap-20">

          {/* Text */}
          <div className="flex-1 max-w-md">
            <p className="font-inter font-semibold text-xs uppercase tracking-widest mb-4" style={{ color: '#6D4CF2' }}>
              Kanban Boards
            </p>
            <h2 className="font-sora font-bold mb-5 leading-tight" style={{ color: '#0F2419', fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>
              Visualise your{' '}
              <span style={{ color: '#6D4CF2' }}>workflow</span>{' '}
              in real time
            </h2>
            <p className="font-inter leading-relaxed mb-8" style={{ color: '#0F2419', opacity: 0.6, fontSize: '0.9375rem' }}>
              Move tasks from idea to done with a drag-and-drop board built for
              modern teams. No friction — just clear, visual progress.
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {KANBAN_FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#EDE9FE', color: '#6D4CF2' }}
                  >
                    <CheckIcon />
                  </div>
                  <span className="font-inter text-sm" style={{ color: '#0F2419', opacity: 0.7 }}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kanban board */}
          <div className="flex-1 w-full">
            <KanbanUI />
          </div>
        </div>
      </div>
    </section>
  );
}

export default KanbanShowcase;
