'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Download, Share2, ShieldCheck, Bell, Search, ArrowLeft, Copy, CheckCircle2, Fingerprint } from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fade = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.08, ease },
});

const wmId = 'LR-WM-' + Math.random().toString(36).substring(2, 10).toUpperCase();
const ownerId = 'LR-OWN-' + Math.random().toString(36).substring(2, 10).toUpperCase();

export default function ResultsPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div className="sticky top-0 z-20 h-14 border-b border-white/[0.06] bg-[#07070A]/90 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Link href="/upload" className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="w-px h-4 bg-white/[0.08]" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
            <input type="text" placeholder="Search..." className="pl-8 pr-4 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400 placeholder:text-zinc-700 focus:outline-none w-44 hidden sm:block" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-600 hover:text-white transition-colors">
            <Bell className="w-3.5 h-3.5" />
          </button>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-bold text-xs">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
        </div>
      </div>

      <div className="p-8 max-w-[1100px]">

        {/* Header */}
        <motion.div {...fade(0)} className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/6 text-green-400 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3 h-3" /> Protection Complete
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Image Protection Results</h1>
          <p className="text-[15px] text-zinc-600 mt-1.5">Your invisible watermark has been successfully embedded.</p>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Images */}
          <div className="space-y-5">

            {/* Comparison slider */}
            <motion.div {...fade(1)} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/[0.05] flex items-center justify-between">
                <p className="text-xs font-semibold text-zinc-400">Comparison</p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                  <span>Original</span>
                  <div className="w-12 h-1 rounded-full bg-white/[0.06] relative">
                    <div className="h-full rounded-full bg-[#9b51e0]" style={{ width: `${100 - sliderPos}%` }} />
                  </div>
                  <span>Protected</span>
                </div>
              </div>

              {/* Slider */}
              <div className="relative h-56 bg-zinc-950 overflow-hidden select-none">
                {/* Original side */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-zinc-700 font-mono">Original Image</p>
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.05] flex items-center justify-center mx-auto mt-3">
                      <svg className="w-6 h-6 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                    </div>
                  </div>
                </div>

                {/* Protected side */}
                <div className="absolute inset-0 overflow-hidden flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                  <div className="absolute inset-0 bg-[#9b51e0]/5" />
                  <div className="relative text-center z-10">
                    <p className="text-xs text-[#9b51e0] font-mono">Protected Image</p>
                    <div className="w-12 h-12 rounded-xl bg-[#9b51e0]/15 border border-[#9b51e0]/20 flex items-center justify-center mx-auto mt-3">
                      <Fingerprint className="w-6 h-6 text-[#9b51e0]" />
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div className="absolute top-0 bottom-0 w-px bg-[#9b51e0]/60 shadow-[0_0_8px_#9b51e0]" style={{ left: `${sliderPos}%` }} />

                {/* Drag handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#9b51e0] border-2 border-white/20 flex items-center justify-center cursor-ew-resize shadow-xl z-10"
                  style={{ left: `${sliderPos}%` }}>
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" /></svg>
                </div>

                {/* Slider input overlay */}
                <input type="range" min={0} max={100} value={sliderPos}
                  onChange={e => setSliderPos(+e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div {...fade(2)} className="grid grid-cols-3 gap-3">
              {[
                { icon: Download, label: 'Download', color: 'hover:border-[#9b51e0]/25 hover:text-[#9b51e0]' },
                { icon: ShieldCheck, label: 'Verify', color: 'hover:border-[#00b0ff]/25 hover:text-[#00b0ff]' },
                { icon: Share2, label: 'Share', color: 'hover:border-green-500/25 hover:text-green-400' },
              ].map(a => (
                <button key={a.label} className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] text-zinc-600 transition-all ${a.color}`}>
                  <a.icon className="w-4 h-4" />
                  <span className="text-[12px] font-medium">{a.label}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right — Details */}
          <div className="space-y-5">

            {/* Ownership IDs */}
            <motion.div {...fade(1)} className="p-6 rounded-2xl border border-[#9b51e0]/15 bg-[#9b51e0]/4">
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Fingerprint className="w-3 h-3 text-[#9b51e0]" />Ownership Identity
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Watermark ID', value: wmId },
                  { label: 'Owner ID', value: ownerId },
                  { label: 'Owner', value: user?.name ?? 'Anonymous Creator' },
                ].map(row => (
                  <div key={row.label}>
                    <p className="text-[10px] text-zinc-700 uppercase tracking-wider mb-1">{row.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-300 font-mono flex-1 truncate">{row.value}</span>
                      {row.value.startsWith('LR-') && (
                        <button onClick={() => copy(row.value, row.label)} className="text-zinc-700 hover:text-[#9b51e0] transition-colors flex-shrink-0">
                          {copied === row.label ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical details */}
            <motion.div {...fade(2)} className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Details</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Timestamp', value: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) },
                  { label: 'Algorithm', value: 'DCT Steganography' },
                  { label: 'Encryption', value: 'AES-256-GCM' },
                  { label: 'File', value: 'protected_image.jpg' },
                  { label: 'Resolution', value: '3840 × 2160 px' },
                  { label: 'Size', value: '4.2 MB' },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-zinc-600">{row.label}</span>
                    <span className="text-zinc-300 font-mono">{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Verification status */}
            <motion.div {...fade(3)} className="p-5 rounded-2xl border border-green-500/12 bg-green-500/4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/15 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Protection Active</p>
                <p className="text-xs text-zinc-600 mt-0.5">Invisible watermark embedded with AES-256 encryption</p>
              </div>
            </motion.div>

            <motion.div {...fade(4)}>
              <Link href="/upload" className="flex items-center justify-center w-full py-3 rounded-xl border border-white/[0.07] text-zinc-500 hover:text-white hover:border-white/15 text-sm font-medium transition-all">
                Upload Another Image
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
