'use client';

import React, { useState } from 'react';
import {
  ShieldCheck, AlertTriangle, Clock, TrendingUp, TrendingDown,
  Image as ImageIcon, Globe, BarChart2, Activity, Layers,
  CheckCircle2, Lock, Database, Zap, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { mockAssets } from './AssetGrid';

// ──────────────────────────────────────────────────────────
// Derived stats from mockAssets
// ──────────────────────────────────────────────────────────
const total = mockAssets.length;
const watermarked = mockAssets.filter((a) => a.status === 'watermarked').length;
const alerts = mockAssets.filter((a) => a.status === 'alert').length;
const pending = mockAssets.filter((a) => a.status === 'pending').length;
const avgConfidence =
  mockAssets.reduce((sum, a) => sum + (a.confidence ?? 0), 0) / total;

// ──────────────────────────────────────────────────────────
// Static time-series mock (last 7 days)
// ──────────────────────────────────────────────────────────
const WEEKLY = [
  { day: 'Mon', uploads: 3, alerts: 0, verified: 3 },
  { day: 'Tue', uploads: 5, alerts: 1, verified: 4 },
  { day: 'Wed', uploads: 2, alerts: 0, verified: 2 },
  { day: 'Thu', uploads: 7, alerts: 1, verified: 6 },
  { day: 'Fri', uploads: 4, alerts: 0, verified: 4 },
  { day: 'Sat', uploads: 1, alerts: 0, verified: 1 },
  { day: 'Sun', uploads: 2, alerts: 0, verified: 2 },
];
const maxUploads = Math.max(...WEEKLY.map((d) => d.uploads));

// ──────────────────────────────────────────────────────────
// Protection coverage breakdown
// ──────────────────────────────────────────────────────────
const PROTECTION_BREAKDOWN = [
  { label: 'DWT Embedded', count: 3, color: 'bg-emerald-400', pct: 50 },
  { label: 'Steganographic', count: 1, color: 'bg-sky-400', pct: 17 },
  { label: 'Hidden DWT Watermark', count: 1, color: 'bg-amber-400', pct: 17 },
  { label: 'Not Protected / Queued', count: 2, color: 'bg-slate-500', pct: 16 },
];

// ──────────────────────────────────────────────────────────
// Recent activity feed
// ──────────────────────────────────────────────────────────
const ACTIVITY = [
  { icon: AlertTriangle, color: 'text-red-400 bg-red-500/10', label: 'Breach detected on instagram.com/p/CxD9_k...', time: '2h ago' },
  { icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10', label: 'aerial_series_03.jpg verified on Polygon block #14,885,020', time: '6h ago' },
  { icon: CheckCircle2, color: 'text-sky-400 bg-sky-500/10', label: 'sunset_shoot_01.jpg watermark embedded (DWT)', time: '1d ago' },
  { icon: Lock, color: 'text-amber-400 bg-amber-500/10', label: 'architecture_raw_11.jpg blockchain hash anchored', time: '2d ago' },
  { icon: Clock, color: 'text-slate-400 bg-slate-500/10', label: 'studio_session_05.jpg queued for protection', time: '3d ago' },
];

// ──────────────────────────────────────────────────────────
// Metric card component
// ──────────────────────────────────────────────────────────
function MetricCard({
  icon: Icon, label, value, sub, color, trend, trendUp
}: {
  icon: React.ElementType; label: string; value: string | number;
  sub?: string; color: string; trend?: string; trendUp?: boolean;
}) {
  return (
    <div className="bg-[#131924] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-[11px] font-bold ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {trendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-black text-white">{value}</p>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">{label}</p>
        {sub && <p className="text-[10px] text-slate-600 mt-1 font-mono">{sub}</p>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Mini bar chart column
// ──────────────────────────────────────────────────────────
function BarColumn({ d, max }: { d: typeof WEEKLY[0]; max: number }) {
  const uploadH = Math.round((d.uploads / max) * 100);
  const alertH = Math.round((d.alerts / max) * 100);
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1 group">
      <div className="w-full flex flex-col justify-end gap-0.5 h-28 relative">
        {/* Upload bar */}
        <div
          className="w-full rounded-t-md bg-amber-400/80 group-hover:bg-amber-400 transition-all duration-300"
          style={{ height: `${uploadH}%` }}
        />
        {/* Alert overlay */}
        {alertH > 0 && (
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-md bg-red-500/70"
            style={{ height: `${alertH}%` }}
          />
        )}
      </div>
      <span className="text-[10px] font-bold text-slate-500">{d.day}</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Main AnalyticsView export
// ──────────────────────────────────────────────────────────
export default function AnalyticsView() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <main className="flex-1 h-full min-h-0 overflow-y-auto p-8 space-y-8">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Analytics Overview</h2>
            <p className="text-xs text-slate-400">Overall protection metrics for your digital asset portfolio.</p>
          </div>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1 bg-[#131924] border border-white/10 rounded-xl p-1">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                range === r
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── TOP METRICS GRID (6 cards) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard
          icon={ImageIcon}
          label="Total Assets"
          value={total}
          sub="Uploaded to portfolio"
          color="bg-slate-700/60 text-slate-300"
          trend="+2 this week"
          trendUp
        />
        <MetricCard
          icon={ShieldCheck}
          label="Watermarked"
          value={watermarked}
          sub="DCT / Steganographic"
          color="bg-emerald-500/15 text-emerald-400"
          trend="+1 this week"
          trendUp
        />
        <MetricCard
          icon={AlertTriangle}
          label="Active Alerts"
          value={alerts}
          sub="Unauthorized re-uploads found"
          color="bg-red-500/15 text-red-400"
          trend="1 new"
          trendUp={false}
        />
        <MetricCard
          icon={Clock}
          label="Pending Protection"
          value={pending}
          sub="Awaiting watermark embed"
          color="bg-amber-500/15 text-amber-400"
        />
        <MetricCard
          icon={Activity}
          label="Avg Confidence"
          value={`${avgConfidence.toFixed(1)}%`}
          sub="Forensic watermark match score"
          color="bg-sky-500/15 text-sky-400"
          trend="+0.3% vs last week"
          trendUp
        />
        <MetricCard
          icon={Database}
          label="Blockchain Records"
          value={total}
          sub="Polygon Amoy verified"
          color="bg-indigo-500/15 text-indigo-400"
          trend="All on-chain"
          trendUp
        />
      </div>

      {/* ── ROW 2: Bar Chart + Protection Breakdown ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Weekly Upload & Alert Activity Chart */}
        <div className="lg:col-span-3 bg-[#131924] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">Weekly Upload & Alert Activity</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Uploads vs breach alerts over the past 7 days</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400/80 inline-block" />Uploads</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500/70 inline-block" />Alerts</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-36 px-2 pt-2">
            {WEEKLY.map((d) => (
              <BarColumn key={d.day} d={d} max={maxUploads} />
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-white/5 pt-3">
            <span>Total uploads this week: <span className="text-white font-bold">{WEEKLY.reduce((s, d) => s + d.uploads, 0)}</span></span>
            <span>Alerts this week: <span className="text-red-400 font-bold">{WEEKLY.reduce((s, d) => s + d.alerts, 0)}</span></span>
          </div>
        </div>

        {/* Protection Type Breakdown */}
        <div className="lg:col-span-2 bg-[#131924] border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="text-sm font-black text-white">Protection Type Breakdown</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">By watermark method across all assets</p>
          </div>
          <div className="space-y-3.5 pt-1">
            {PROTECTION_BREAKDOWN.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-semibold">{item.label}</span>
                  <span className="text-slate-400 font-mono">{item.count} · {item.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-white/5 text-[11px] text-slate-500">
            Total: <span className="text-white font-bold">{total} assets</span> across 4 protection methods
          </div>
        </div>

      </div>

      {/* ── ROW 3: Coverage Ring + Security Health + Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Coverage Overview Card */}
        <div className="bg-[#131924] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-black text-white">Coverage Overview</h3>

          {/* Donut-style visual using CSS */}
          <div className="flex items-center justify-center py-4">
            <div className="relative w-32 h-32">
              {/* Background circle */}
              <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                {/* Watermarked arc (amber) */}
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray={`${(watermarked / total) * 100} 100`}
                  strokeLinecap="round"
                />
                {/* Alerts arc (red) - offset after watermarked */}
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray={`${(alerts / total) * 100} 100`}
                  strokeDashoffset={`-${(watermarked / total) * 100}`}
                  strokeLinecap="round"
                />
                {/* Pending arc (slate) */}
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#475569"
                  strokeWidth="3"
                  strokeDasharray={`${(pending / total) * 100} 100`}
                  strokeDashoffset={`-${((watermarked + alerts) / total) * 100}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">{Math.round((watermarked / total) * 100)}%</span>
                <span className="text-[10px] text-slate-400">Protected</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Watermarked</span>
              <span className="text-white font-bold">{watermarked} assets</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Breach Alert</span>
              <span className="text-red-400 font-bold">{alerts} asset</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />Pending</span>
              <span className="text-slate-400 font-bold">{pending} assets</span>
            </div>
          </div>
        </div>

        {/* Security Health Score */}
        <div className="bg-[#131924] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-black text-white">Security Health Score</h3>

          {[
            { label: 'Watermark Coverage', score: Math.round((watermarked / total) * 100), color: 'bg-emerald-400' },
            { label: 'Blockchain Anchoring', score: 100, color: 'bg-sky-400' },
            { label: 'Breach Response', score: 85, color: 'bg-amber-400' },
            { label: 'Confidence Accuracy', score: Math.round(avgConfidence), color: 'bg-purple-400' },
          ].map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">{item.label}</span>
                <span className="font-black text-white">{item.score}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.score}%`, transition: 'width 1s ease-out' }}
                />
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-500">Overall Health</span>
            <span className="text-emerald-400 font-black text-sm">Good ✓</span>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-[#131924] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-black text-white">Recent Activity</h3>

          <div className="space-y-3">
            {ACTIVITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-xl ${item.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-200 leading-relaxed">{item.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── ROW 4: Platform Stats Footer ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Polygon Amoy Network', value: 'Active', icon: Globe, color: 'text-sky-400', dot: 'bg-emerald-400' },
          { label: 'DCT Extraction Speed', value: '< 2s', icon: Zap, color: 'text-amber-400', dot: 'bg-amber-400' },
          { label: 'AI Crawler Status', value: 'Running', icon: Activity, color: 'text-emerald-400', dot: 'bg-emerald-400' },
          { label: 'Verified Blocks', value: '4 on-chain', icon: Layers, color: 'text-purple-400', dot: 'bg-purple-400' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-[#131924] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`} />
                  <p className="text-xs font-black text-white">{item.value}</p>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
