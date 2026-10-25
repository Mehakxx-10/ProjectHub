import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import Dropdown from '../components/ui/Dropdown.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { debounce } from '../utils/helpers.js';

const PER_PAGE = 8;
const SORT_OPTIONS = [
  { value: 'best-match', label: 'Best match' },
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
];

/**
 * GitHubExplorer — mini-project page demonstrating:
 * REST API consumption (fetch), debounced search, pagination,
 * loading / error / retry states, and a local favorites CRUD list.
 */
function GitHubExplorer() {
  const { showToast } = useToast();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('best-match');

  const [status, setStatus] = useState('idle'); // idle | loading | error | success
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [activeUser, setActiveUser] = useState(null);
  const [profileStatus, setProfileStatus] = useState('idle');
  const [profile, setProfile] = useState(null);

  const [favorites, setFavorites] = useState([]);

  // ── Debounce: wait 450ms after typing stops before triggering a search ──
  const debouncedSetQuery = useMemo(
    () => debounce((val) => setDebouncedQuery(val), 450),
    [],
  );

  function handleQueryChange(e) {
    const val = e.target.value;
    setQuery(val);
    setPage(1);
    debouncedSetQuery(val);
  }

  // ── Fetch GitHub users whenever the debounced query or page changes ────
  const abortRef = useRef(null);

  const fetchUsers = useCallback(async (q, pageNum) => {
    if (!q.trim()) {
      setResults([]);
      setTotalCount(0);
      setStatus('idle');
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(q)}&per_page=${PER_PAGE}&page=${pageNum}`,
        { signal: controller.signal },
      );
      if (!res.ok) {
        throw new Error(res.status === 403 ? 'Rate limit hit — wait a bit and retry.' : `GitHub API error (${res.status})`);
      }
      const data = await res.json();
      setResults(data.items || []);
      setTotalCount(data.total_count || 0);
      setStatus('success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setErrorMsg(err.message || 'Something went wrong.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchUsers(debouncedQuery, page);
  }, [debouncedQuery, page, fetchUsers]);

  const sortedResults = useMemo(() => {
    if (sort === 'name-asc') return [...results].sort((a, b) => a.login.localeCompare(b.login));
    if (sort === 'name-desc') return [...results].sort((a, b) => b.login.localeCompare(a.login));
    return results;
  }, [results, sort]);

  const totalPages = Math.max(1, Math.ceil(Math.min(totalCount, 1000) / PER_PAGE));

  // ── View a profile: second fetch, own loading/error state ──────────────
  async function openProfile(user) {
    setActiveUser(user);
    setProfileStatus('loading');
    setProfile(null);
    try {
      const res = await fetch(`https://api.github.com/users/${user.login}`);
      if (!res.ok) throw new Error('Could not load profile.');
      const data = await res.json();
      setProfile(data);
      setProfileStatus('success');
    } catch {
      setProfileStatus('error');
    }
  }

  // ── Favorites: local CRUD (create/delete) with toast feedback ──────────
  function toggleFavorite(user) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === user.id);
      if (exists) {
        showToast(`Removed ${user.login} from favorites`, { tone: 'info' });
        return prev.filter((f) => f.id !== user.id);
      }
      showToast(`Added ${user.login} to favorites`, { tone: 'success' });
      return [...prev, user];
    });
  }
  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-[#132A1D] tracking-tight">
          GitHub Explorer
        </h1>
        <p className="font-inter text-sm text-[#132A1D]/55 mt-1">
          REST API demo — search GitHub users, view profiles, and save favorites.
        </p>
      </div>

      {/* Search + sort toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search GitHub usernames… e.g. torvalds"
            aria-label="Search GitHub users"
            className="w-full rounded-2xl border border-[#132A1D]/12 bg-white px-4 py-3 text-sm font-inter text-[#132A1D] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6D4CF2]/40 focus:border-[#6D4CF2]"
          />
          {status === 'loading' && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#132A1D]/40 font-inter">
              Searching…
            </span>
          )}
        </div>
        <Dropdown label="Sort" options={SORT_OPTIONS} value={sort} onChange={setSort} />
      </div>

      {/* Results */}
      {status === 'idle' && (
        <EmptyState
          title="Start typing to search"
          description='Try a username like "octocat" or "torvalds".'
        />
      )}

      {status === 'error' && (
        <div className="rounded-2xl border border-[#F2685A]/30 bg-[#FFF0F1] p-6 text-center space-y-3">
          <p className="font-inter text-sm font-semibold text-[#C03D4A]">{errorMsg}</p>
          <Button variant="danger" size="sm" onClick={() => fetchUsers(debouncedQuery, page)}>
            Retry
          </Button>
        </div>
      )}

      {status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-busy="true" aria-live="polite">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-[#132A1D]/5 animate-pulse" />
          ))}
        </div>
      )}

      {status === 'success' && sortedResults.length === 0 && (
        <EmptyState title="No users found" description="Try a different search term." />
      )}

      {status === 'success' && sortedResults.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sortedResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 bg-white rounded-2xl border border-[#132A1D]/10 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={user.avatar_url}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-xl shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => openProfile(user)}
                    className="font-sora font-bold text-sm text-[#132A1D] hover:text-[#6D4CF2] truncate block cursor-pointer text-left"
                  >
                    {user.login}
                  </button>
                  <p className="text-xs text-[#132A1D]/45 font-inter">GitHub user</p>
                </div>
                <button
                  onClick={() => toggleFavorite(user)}
                  aria-pressed={isFavorite(user.id)}
                  aria-label={isFavorite(user.id) ? `Remove ${user.login} from favorites` : `Add ${user.login} to favorites`}
                  className={`shrink-0 text-lg cursor-pointer transition-colors ${
                    isFavorite(user.id) ? 'text-[#F4C430]' : 'text-[#132A1D]/20 hover:text-[#F4C430]'
                  }`}
                >
                  ★
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs font-inter text-[#132A1D]/45">
              Page {page} of {totalPages} · {Math.min(totalCount, 1000)} results
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Favorites list — local CRUD demo */}
      {favorites.length > 0 && (
        <div className="pt-4 border-t border-[#132A1D]/8">
          <h2 className="font-sora font-bold text-base text-[#132A1D] mb-3">
            Favorites ({favorites.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {favorites.map((f) => (
              <span
                key={f.id}
                className="inline-flex items-center gap-2 bg-[#F0EDFE] text-[#5B3CD6] rounded-full pl-3 pr-1.5 py-1 text-xs font-inter font-semibold"
              >
                {f.login}
                <button
                  onClick={() => toggleFavorite(f)}
                  aria-label={`Remove ${f.login} from favorites`}
                  className="w-5 h-5 rounded-full hover:bg-[#6D4CF2]/15 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Profile modal — second fetch, own loading/error state */}
      <Modal isOpen={Boolean(activeUser)} onClose={() => setActiveUser(null)} title={activeUser?.login} size="sm">
        {profileStatus === 'loading' && <p className="text-sm text-[#132A1D]/50 font-inter">Loading profile…</p>}
        {profileStatus === 'error' && (
          <div className="space-y-3">
            <p className="text-sm text-[#C03D4A] font-inter">Could not load this profile.</p>
            <Button size="sm" variant="secondary" onClick={() => openProfile(activeUser)}>
              Retry
            </Button>
          </div>
        )}
        {profileStatus === 'success' && profile && (
          <div className="flex items-start gap-4">
            <img src={profile.avatar_url} alt="" width={64} height={64} className="rounded-2xl shrink-0" />
            <div className="min-w-0">
              <p className="font-sora font-bold text-base text-[#132A1D]">{profile.name || profile.login}</p>
              {profile.bio && <p className="text-xs text-[#132A1D]/60 font-inter mt-1">{profile.bio}</p>}
              <p className="text-xs text-[#132A1D]/45 font-inter mt-2">
                {profile.followers} followers · {profile.public_repos} public repos
              </p>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-xs font-bold text-[#6D4CF2] hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default GitHubExplorer;
