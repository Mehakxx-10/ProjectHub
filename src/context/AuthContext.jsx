import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider — Pure frontend state-based authentication for ProjectHub (CA1).
 * In-memory only: No backend, no Firebase, no database, no localStorage.
 */
export function AuthProvider({ children }) {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const isRegistered = Boolean(registeredUser);
  const isAuthenticated = Boolean(currentUser);

  /**
   * Register a new user in the current session.
   * @param {{ name: string, email: string, password: string, role: string }} userData
   */
  function register(userData) {
    const cleanUser = {
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      role: userData.role,
    };
    setRegisteredUser(cleanUser);
    return { success: true };
  }

  /**
   * Log in against the session's registered user.
   * @param {string} email
   * @param {string} password
   * @returns {{ success: boolean, error?: string }}
   */
  function login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!registeredUser) {
      return {
        success: false,
        error: 'Please create an account before logging in.',
      };
    }

    if (
      cleanEmail !== registeredUser.email ||
      password !== registeredUser.password
    ) {
      return {
        success: false,
        error: 'Invalid email or password.',
      };
    }

    // Credentials match
    const userSession = {
      name: registeredUser.name,
      email: registeredUser.email,
      role: registeredUser.role,
    };
    setCurrentUser(userSession);
    return { success: true };
  }

  /**
   * Log out the current user.
   */
  function logout() {
    setCurrentUser(null);
  }

  const value = {
    registeredUser,
    isRegistered,
    currentUser,
    isAuthenticated,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to consume AuthContext.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
