import React from 'react';

/**
 * StatCard — Soft-3D elevated dashboard statistic card.
 *
 * @param {object}  props
 * @param {string}  props.label
 * @param {string|number} props.value
 * @param {string}  props.icon      — emoji / icon string
 * @param {string}  props.iconBg    — hex background for icon container
 * @param {string}  [props.trend]   — e.g. "+3 this week"
 * @param {string}  [props.trendColor] — tailwind color class for trend text
 */
function StatCard({ label, value, icon, iconBg, trend, trendColor = 'text-[#2A7D4E]' }) {
  return (
    <article
      className="group relative bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 border border-[#132A1D]/8 shadow-[0_4px_20px_-4px_rgba(19,42,29,0.06),0_1px_3px_rgba(19,42,29,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_30px_-6px_rgba(19,42,29,0.12),0_4px_12px_rgba(19,42,29,0.06)] transition-all duration-300 overflow-hidden"
    >
      {/* Top subtle surface highlight */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* Top Row: Icon Container + Trend Badge */}
      <div className="flex items-center justify-between gap-2">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-black/5 transform group-hover:scale-105 transition-transform duration-200"
          style={{ background: iconBg }}
          aria-hidden="true"
        >
          {icon}
        </div>
        {trend && (
          <span
            className={`text-[11px] font-inter font-semibold px-2.5 py-1 rounded-full bg-[#132A1D]/5 border border-[#132A1D]/8 shadow-sm ${trendColor}`}
          >
            {trend}
          </span>
        )}
      </div>

      {/* Bottom Row: Large Value + Clear Label */}
      <div>
        <div className="font-sora font-extrabold text-[#132A1D] tracking-tight leading-none text-3xl sm:text-[2rem]">
          {value}
        </div>
        <div className="font-inter font-medium text-[#132A1D]/55 text-xs sm:text-sm mt-1.5">
          {label}
        </div>
      </div>
    </article>
  );
}

export default StatCard;
