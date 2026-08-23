import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/* ─── SVG Icons ──────────────────────────────────────────────────── */
function LogoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" rx="2.5" fill="#6D4CF2" />
      <rect x="12" y="1" width="9" height="9" rx="2.5" fill="#6D4CF2" fillOpacity="0.45" />
      <rect x="1" y="12" width="9" height="9" rx="2.5" fill="#6D4CF2" fillOpacity="0.45" />
      <rect x="12" y="12" width="9" height="9" rx="2.5" fill="#6D4CF2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="12" height="10" rx="2" />
      <path d="M2 5l6 4 6-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="2" />
      <path d="M5 7V5a3 3 0 016 0v2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7z" />
      <circle cx="10" cy="10" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3l14 14M8.5 8.5a3 3 0 004.24 4.24M10 3C5 3 1.73 7.11 1 10c.5 1.98 2.2 4.5 5 5.8M10 17c5 0 8.27-4.11 9-7-.5-1.98-2.2-4.5-5-5.8" />
    </svg>
  );
}

/* ─── Organic Background Bubble Shapes (Matching Home Page) ──────── */
function RegisterBackgroundBlobs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Large green bubble — upper-right background */}
      <div
        style={{
          position: 'absolute',
          top: '-90px',
          right: '-50px',
          width: '380px',
          height: '380px',
          background: '#4CAF7D',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          opacity: 0.9,
        }}
      />

      {/* Gold / yellow accent bubble — middle left background */}
      <div
        style={{
          position: 'absolute',
          top: '220px',
          left: '-40px',
          width: '200px',
          height: '200px',
          background: '#F0B429',
          borderRadius: '70% 30% 70% 30% / 30% 50% 50% 70%',
          opacity: 0.85,
        }}
      />

      {/* Large orange / red bubble — lower-right background */}
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          right: '-30px',
          width: '300px',
          height: '300px',
          background: '#E8543E',
          borderRadius: '43% 57% 50% 50% / 50% 38% 62% 50%',
          opacity: 0.9,
        }}
      />

      {/* Small green bubble — lower-left background */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '50px',
          width: '110px',
          height: '110px',
          background: '#4CAF7D',
          borderRadius: '50%',
          opacity: 0.9,
        }}
      />
    </div>
  );
}

const ROLE_OPTIONS = ['Student', 'Team Member', 'Project Manager'];

/**
 * Register — Centered registration experience matching the Home page visual theme
 * with organic background shapes, clean white card, and warm cream background.
 */
function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Student',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };
  }

  function validate() {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = 'Full Name cannot be empty.';
    }

    if (!form.email.trim()) {
      errs.email = 'Email cannot be empty.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!form.role) {
      errs.role = 'Please select a role.';
    }

    if (!form.password) {
      errs.password = 'Password cannot be empty.';
    } else if (form.password.length < 6) {
      errs.password = 'Password should have minimum 6 characters.';
    }

    if (!form.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Confirm Password must match Password.';
    }

    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    // Register user inside AuthContext
    register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    // Navigate to Login with confirmation notification
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/login', {
        state: {
          registeredEmail: form.email.trim(),
          successMessage: 'Account created successfully. Please log in to continue.',
        },
      });
    }, 280);
  }

  return (
    <div className="relative min-h-screen bg-[#F8F4EA] flex flex-col justify-between selection:bg-brand/20 overflow-x-hidden">
      
      {/* ── Decorative Background Bubbles (Home Page Aesthetic) ───── */}
      <RegisterBackgroundBlobs />

      {/* ── Top Header Bar ──────────────────────────────────────────── */}
      <header className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" aria-label="ProjectHub Home">
          <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors shadow-sm border border-brand/15">
            <LogoIcon />
          </div>
          <span className="font-sora font-extrabold text-xl text-[#132A1D] tracking-tight">
            Project<span className="text-brand">Hub</span>
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#132A1D]/70 hover:text-[#132A1D] text-sm font-semibold font-inter transition-all px-3.5 py-2 rounded-xl bg-white border border-[#132A1D]/8 shadow-sm hover:shadow hover:-translate-x-0.5 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 2L4 7l5 5" />
          </svg>
          Back to Home
        </Link>
      </header>

      {/* ── Main Centered Registration Card ─────────────────────────── */}
      <main className="relative flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex items-center justify-center z-10">
        <div className="w-full max-w-xl bg-white rounded-3xl p-7 sm:p-10 border border-[#132A1D]/8 shadow-[0_12px_40px_-8px_rgba(19,42,29,0.08),0_2px_6px_rgba(19,42,29,0.04)] relative">
          
          {/* Subtle top brand accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-[#6D4CF2] via-[#F5B833] to-[#3FA66B]" />

          {/* Form Heading & Subtitle */}
          <div className="mb-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand/20 text-brand text-xs font-bold font-inter uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Free Registration
            </div>
            <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-[#132A1D] tracking-tight">
              Create your ProjectHub account
            </h1>
            <p className="font-inter text-sm text-[#132A1D]/60 mt-1.5">
              Start organizing your projects, tasks and roadmaps in one workspace.
            </p>
          </div>

          {/* Form Element */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                Full Name <span className="text-[#F2685A]" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#132A1D]/40 pointer-events-none">
                  <UserIcon />
                </span>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="e.g. Ananya Kumar"
                  value={form.name}
                  onChange={handleChange('name')}
                  autoComplete="name"
                  className={`w-full font-inter text-sm text-[#132A1D] rounded-xl pl-10 pr-4 py-3 bg-[#F8F4EA] border transition-all outline-none ${
                    errors.name
                      ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                      : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
                  <span>•</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="reg-email" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                Email Address <span className="text-[#F2685A]" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#132A1D]/40 pointer-events-none">
                  <MailIcon />
                </span>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="ananya@company.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  autoComplete="email"
                  className={`w-full font-inter text-sm text-[#132A1D] rounded-xl pl-10 pr-4 py-3 bg-[#F8F4EA] border transition-all outline-none ${
                    errors.email
                      ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                      : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
                  <span>•</span> {errors.email}
                </p>
              )}
            </div>

            {/* Role / User Type Selection */}
            <div>
              <label htmlFor="reg-role" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                Role / User Type <span className="text-[#F2685A]" aria-hidden="true">*</span>
              </label>
              <select
                id="reg-role"
                value={form.role}
                onChange={handleChange('role')}
                className={`w-full font-inter text-sm text-[#132A1D] rounded-xl px-4 py-3 bg-[#F8F4EA] border transition-all outline-none cursor-pointer ${
                  errors.role
                    ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                    : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                }`}
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="font-inter text-xs text-[#F2685A] mt-1.5 flex items-center gap-1 font-medium">
                  <span>•</span> {errors.role}
                </p>
              )}
            </div>

            {/* Password & Confirm Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Password */}
              <div>
                <label htmlFor="reg-password" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                  Password <span className="text-[#F2685A]" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#132A1D]/40 pointer-events-none">
                    <LockIcon />
                  </span>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 chars"
                    value={form.password}
                    onChange={handleChange('password')}
                    autoComplete="new-password"
                    className={`w-full font-inter text-sm text-[#132A1D] rounded-xl pl-10 pr-10 py-3 bg-[#F8F4EA] border transition-all outline-none ${
                      errors.password
                        ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                        : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#132A1D]/45 hover:text-[#132A1D] p-1 transition-colors cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p className="font-inter text-xs text-[#F2685A] mt-1.5 font-medium leading-tight">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="reg-confirm" className="block font-inter font-semibold text-xs text-[#132A1D]/80 mb-1.5 uppercase tracking-wider">
                  Confirm Password <span className="text-[#F2685A]" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#132A1D]/40 pointer-events-none">
                    <LockIcon />
                  </span>
                  <input
                    id="reg-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    autoComplete="new-password"
                    className={`w-full font-inter text-sm text-[#132A1D] rounded-xl pl-10 pr-10 py-3 bg-[#F8F4EA] border transition-all outline-none ${
                      errors.confirmPassword
                        ? 'border-[#F2685A] bg-[#FFF5F5] focus:ring-2 focus:ring-[#F2685A]/20'
                        : 'border-[#132A1D]/12 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#132A1D]/45 hover:text-[#132A1D] p-1 transition-colors cursor-pointer"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="font-inter text-xs text-[#F2685A] mt-1.5 font-medium leading-tight">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              id="register-submit-btn"
              disabled={isSubmitting}
              className="w-full mt-3 rounded-2xl py-3.5 px-6 font-inter font-bold text-sm text-white transition-all duration-200 hover:opacity-95 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#132A1D]/15 cursor-pointer"
              style={{ background: '#132A1D' }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          {/* Login Navigation Link */}
          <div className="mt-6 pt-5 border-t border-[#132A1D]/8 text-center font-inter text-sm text-[#132A1D]/60">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-brand hover:text-brand-600 transition-colors ml-1 cursor-pointer"
            >
              Log in
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center font-inter text-xs text-[#132A1D]/40 z-10">
        © {new Date().getFullYear()} ProjectHub · All rights reserved
      </footer>
    </div>
  );
}

export default Register;
