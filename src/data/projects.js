/**
 * projects.js — Seed data for ProjectHub CA1.
 * In a real app this would come from an API; for CA1 we use static seed
 * data and manage state entirely with React useState.
 */

export const initialProjects = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description:
      'Complete overhaul of the company website with a modern design system, improved UX, and performance optimisations.',
    status: 'In Progress',
    priority: 'High',
    progress: 68,
    deadline: '2026-09-15',
    tasksTotal: 24,
    tasksCompleted: 16,
    color: '#6D4CF2',
  },
  {
    id: 'p2',
    name: 'College Event Portal',
    description:
      'Online platform for college events — registrations, announcements, schedule management, and volunteer coordination.',
    status: 'In Progress',
    priority: 'High',
    progress: 42,
    deadline: '2026-09-30',
    tasksTotal: 18,
    tasksCompleted: 8,
    color: '#3FA66B',
  },
  {
    id: 'p3',
    name: 'Marketing Campaign',
    description:
      'Q3 digital marketing campaign including social media strategy, email sequences, and landing page A/B testing.',
    status: 'Review',
    priority: 'Medium',
    progress: 85,
    deadline: '2026-08-30',
    tasksTotal: 20,
    tasksCompleted: 17,
    color: '#F5B833',
  },
  {
    id: 'p4',
    name: 'Mobile App Development',
    description:
      'React Native mobile app for iOS and Android. Features: push notifications, offline mode, biometric auth.',
    status: 'To Do',
    priority: 'Medium',
    progress: 12,
    deadline: '2026-11-20',
    tasksTotal: 32,
    tasksCompleted: 4,
    color: '#F2685A',
  },
];
