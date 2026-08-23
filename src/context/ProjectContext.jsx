import React, { createContext, useContext, useState } from 'react';
import { initialProjects } from '../data/projects.js';
import { initialTasks } from '../data/tasks.js';
import { uid } from '../utils/helpers.js';

const ProjectContext = createContext(null);

const PROJECT_COLORS = ['#6D4CF2', '#3FA66B', '#F5B833', '#F2685A', '#132A1D'];

/**
 * ProjectProvider — Centralized in-memory project and task state for ProjectHub.
 * Keeps projects and tasks persistent across all page navigations.
 */
export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);

  /* ── Project CRUD Operations ────────────────────────────────────── */

  function addProject(projectData) {
    const colorIdx = projects.length % PROJECT_COLORS.length;
    const newProject = {
      id: uid(),
      name: projectData.name,
      description: projectData.description || '',
      deadline: projectData.deadline || '',
      priority: projectData.priority || 'Medium',
      status: projectData.status || 'In Progress',
      progress: 0,
      tasksTotal: 0,
      tasksCompleted: 0,
      color: PROJECT_COLORS[colorIdx],
      teamMembers: projectData.teamMembers || [],
      createdAt: new Date().toISOString(),
      ...projectData,
    };
    // Ensure id is set if not passed
    if (!newProject.id) newProject.id = uid();

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  }

  function updateProject(id, updatedData) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
    // If project name changed, sync task.projectName
    if (updatedData.name) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.projectId === id ? { ...t, projectName: updatedData.name } : t
        )
      );
    }
  }

  function deleteProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    // Also remove associated tasks
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
  }

  function getProjectById(id) {
    return projects.find((p) => p.id === id);
  }

  /* ── Task CRUD Operations ───────────────────────────────────────── */

  function addTask(taskData) {
    const newTask = {
      id: uid(),
      title: taskData.title,
      description: taskData.description || '',
      projectId: taskData.projectId || '',
      projectName: taskData.projectName || '',
      assignee: taskData.assignee || '',
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'To Do',
      deadline: taskData.deadline || '',
      createdAt: new Date().toISOString(),
      ...taskData,
    };
    if (!newTask.id) newTask.id = uid();

    setTasks((prev) => [newTask, ...prev]);

    // Recalculate project tasks total
    if (newTask.projectId) {
      setProjects((prevProjects) =>
        prevProjects.map((proj) => {
          if (proj.id === newTask.projectId) {
            const newTotal = (proj.tasksTotal || 0) + 1;
            const newCompleted =
              newTask.status === 'Done'
                ? (proj.tasksCompleted || 0) + 1
                : proj.tasksCompleted || 0;
            const newProg = Math.round((newCompleted / newTotal) * 100);
            return {
              ...proj,
              tasksTotal: newTotal,
              tasksCompleted: newCompleted,
              progress: newProg,
            };
          }
          return proj;
        })
      );
    }

    return newTask;
  }

  function updateTask(id, updatedData) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  }

  function updateTaskStatus(id, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        tasks,
        addProject,
        updateProject,
        deleteProject,
        getProjectById,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return ctx;
}
