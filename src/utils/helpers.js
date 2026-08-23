/**
 * helpers.js — General-purpose utility functions for ProjectHub.
 * Keep pure: no React imports, no side effects.
 */

/**
 * Format a number with locale-aware comma separators.
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (typeof num !== 'number') return '0';
  return num.toLocaleString();
}

/**
 * Clamp a numeric value between min and max (inclusive).
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Truncate a string to maxLength characters, appending an ellipsis.
 * @param {string} str
 * @param {number} [maxLength=80]
 * @returns {string}
 */
export function truncate(str, maxLength = 80) {
  if (!str || str.length <= maxLength) return str ?? '';
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Derive initials from a full name (max 2 characters, uppercased).
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Calculate a percentage, safely handling division by zero.
 * @param {number} value
 * @param {number} total
 * @returns {number}  0–100 integer
 */
export function percentage(value, total) {
  if (!total || total === 0) return 0;
  return Math.round(clamp((value / total) * 100, 0, 100));
}

/**
 * Debounce a function: delays invocation until after `delay` ms
 * have passed since the last call.
 * @param {Function} fn
 * @param {number} [delay=300]
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Generate a short random alphanumeric ID (7 chars).
 * Not cryptographically secure — suitable for UI keys only.
 * @returns {string}
 */
export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

/**
 * Format a Date object or ISO string as "MMM D, YYYY".
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Slugify a string: lowercase, spaces → hyphens, remove special chars.
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Pluralise a word based on count.
 * @param {number} count
 * @param {string} singular
 * @param {string} [plural]
 * @returns {string}
 */
export function pluralise(count, singular, plural) {
  const word = count === 1 ? singular : (plural ?? singular + 's');
  return `${count} ${word}`;
}
