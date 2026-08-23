import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing       from './pages/Landing.jsx';
import Register      from './pages/Register.jsx';
import Login         from './pages/Login.jsx';
import Dashboard     from './pages/Dashboard.jsx';
import Projects      from './pages/Projects.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import Tasks         from './pages/Tasks.jsx';
import Team          from './pages/Team.jsx';
import Calendar      from './pages/Calendar.jsx';
import Reports       from './pages/Reports.jsx';
import Notifications from './pages/Notifications.jsx';
import Settings      from './pages/Settings.jsx';
import Profile       from './pages/Profile.jsx';
import AppLayout     from './components/layout/AppLayout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProjectProvider } from './context/ProjectContext.jsx';

/**
 * App — routing shell with AuthProvider and centralized ProjectProvider.
 */
function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Routes>
          {/* Public marketing & auth pages */}
          <Route path="/"         element={<Landing />}  />
          <Route path="/register" element={<Register />} />
          <Route path="/login"    element={<Login />}    />

          {/* Protected App pages — wrapped in ProtectedRoute & AppLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard"            element={<Dashboard />}      />
              <Route path="/projects"             element={<Projects />}       />
              <Route path="/projects/:projectId"  element={<ProjectDetails />}  />
              <Route path="/tasks"                element={<Tasks />}          />
              <Route path="/team"                 element={<Team />}           />
              <Route path="/calendar"             element={<Calendar />}       />
              <Route path="/reports"              element={<Reports />}        />
              <Route path="/notifications"        element={<Notifications />}  />
              <Route path="/settings"             element={<Settings />}       />
              <Route path="/profile"              element={<Profile />}        />
            </Route>
          </Route>
        </Routes>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
