'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Camera, Edit3, Save, X, Shield, Upload, CheckCircle2, AlertTriangle } from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fade = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.08, ease },
});

const uploads = [
  { name: 'portrait_final.jpg', status: 'Protected', size: '3.2 MB', date: 'Aug 1, 2026' },
  { name: 'design_concept.png', status: 'Verified', size: '1.8 MB', date: 'Aug 1, 2026' },
  { name: 'campaign_banner.webp', status: 'Protected', size: '2.1 MB', date: 'Jul 31, 2026' },
  { name: 'executive_photo.jpg', status: 'Flagged', size: '4.5 MB', date: 'Jul 30, 2026' },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? 'Creator');
  const [email, setEmail] = useState(user?.email ?? 'user@lakxamrekha.ai');
  const [bio, setBio] = useState('Digital creator protecting my visual work with Lakxam Rekha.');

  const storageUsed = 248;
  const storageTotal = 2048;
  const storagePct = Math.round((storageUsed / storageTotal) * 100);

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div className="sticky top-0 z-20 h-14 border-b border-white/[0.06] bg-[#07070A]/90 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input type="text" placeholder="Search..." className="pl-8 pr-4 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400 placeholder:text-zinc-700 focus:outline-none w-48" />
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

      <div className="p-8 max-w-[1000px] space-y-8">

        {/* Header */}
        <motion.div {...fade(0)}>
          <p className="text-xs text-[#9b51e0] font-bold uppercase tracking-widest mb-3">Profile</p>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Your Account</h1>
        </motion.div>

        {/* Profile banner */}
        <motion.div {...fade(1)} className="rounded-2xl overflow-hidden border border-white/[0.07]">
          {/* Banner */}
          <div className="relative h-28 bg-gradient-to-r from-[#9b51e0]/15 via-[#00b0ff]/8 to-transparent">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_30px,rgba(155,81,224,0.03)_30px,rgba(155,81,224,0.03)_31px)]" />
          </div>
          {/* Info row */}
          <div className="bg-[#0a0a12]/50 px-7 pb-6">
            <div className="flex items-end justify-between -mt-7">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-black text-2xl border-4 border-[#07070A] shadow-xl">
                  {user?.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <button className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#111118] border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                  <Camera className="w-2.5 h-2.5" />
                </button>
              </div>
              {/* Edit toggle */}
              <button onClick={() => setEditing(!editing)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all mt-7 ${editing ? 'border border-red-500/25 bg-red-500/8 text-red-400' : 'border border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:text-white'}`}>
                {editing ? <><X className="w-3 h-3" />Cancel</> : <><Edit3 className="w-3 h-3" />Edit</>}
              </button>
            </div>
            <div className="mt-3">
              {editing
                ? <input value={name} onChange={e => setName(e.target.value)} className="text-lg font-bold bg-transparent border-b border-[#9b51e0]/30 text-white focus:outline-none w-52 pb-0.5" />
                : <p className="text-lg font-bold text-white">{name}</p>
              }
              <p className="text-xs text-[#9b51e0] mt-0.5">Digital Creator</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(2)}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Uploads', value: '12', icon: <Upload className="w-4 h-4" />, color: '#9b51e0' },
              { label: 'Protected', value: '10', icon: <Shield className="w-4 h-4" />, color: '#00b0ff' },
              { label: 'Verified', value: '8', icon: <CheckCircle2 className="w-4 h-4" />, color: '#10b981' },
              { label: 'Alerts', value: '1', icon: <AlertTriangle className="w-4 h-4" />, color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex flex-col gap-2">
                <span style={{ color: s.color }} className="opacity-70">{s.icon}</span>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-[11px] text-zinc-600">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Profile info + storage */}
        <motion.div {...fade(3)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Account details */}
          <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-5">Account Details</p>
            <div className="space-y-5">
              {[
                { label: 'Full Name', val: name, setter: setName, edit: editing },
                { label: 'Email', val: email, setter: setEmail, edit: editing },
                { label: 'Bio', val: bio, setter: setBio, edit: editing, textarea: true },
              ].map(row => (
                <div key={row.label}>
                  <label className="text-[10px] text-zinc-700 uppercase tracking-wider block mb-1.5">{row.label}</label>
                  {row.edit ? (
                    row.textarea
                      ? <textarea value={row.val} onChange={e => row.setter(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white focus:outline-none focus:border-[#9b51e0]/25 resize-none transition-colors" />
                      : <input value={row.val} onChange={e => row.setter(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white focus:outline-none focus:border-[#9b51e0]/25 transition-colors" />
                  ) : (
                    <p className="text-sm text-zinc-400">{row.val}</p>
                  )}
                </div>
              ))}
              {editing && (
                <button onClick={() => setEditing(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-100 transition-all mt-2">
                  <Save className="w-3.5 h-3.5" />Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Storage + security */}
          <div className="space-y-5">
            {/* Storage */}
            <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-5">Storage Usage</p>
              <div className="flex items-end justify-between mb-3">
                <span className="text-2xl font-extrabold text-white">{storageUsed} MB</span>
                <span className="text-xs text-zinc-600">of {storageTotal} MB</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden mb-2">
                <motion.div initial={{ width: 0 }} animate={{ width: `${storagePct}%` }} transition={{ duration: 1.2, ease }} className="h-full rounded-full bg-gradient-to-r from-[#9b51e0] to-[#00b0ff]" />
              </div>
              <p className="text-[11px] text-zinc-700">{storagePct}% used · {storageTotal - storageUsed} MB free</p>
            </div>

            {/* Security */}
            <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-5">Security Settings</p>
              <div className="space-y-3">
                {[
                  { label: 'Password', value: '●●●●●●●●●', ok: true },
                  { label: 'Two-Factor Auth', value: 'Not Enabled', ok: false },
                  { label: 'Active Session', value: 'Active', ok: true },
                  { label: 'Last Login', value: 'Just now', ok: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-zinc-600">{row.label}</span>
                    <span className={row.ok ? 'text-zinc-300 font-medium text-xs' : 'text-amber-400 text-xs font-medium'}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent uploads */}
        <motion.div {...fade(4)}>
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Recent Uploads</p>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
            {uploads.map((img, i) => (
              <div key={img.name} className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors ${i < uploads.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.05] flex items-center justify-center text-sm flex-shrink-0">🖼️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white truncate">{img.name}</p>
                  <p className="text-[11px] text-zinc-600">{img.size} · {img.date}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                  img.status === 'Protected' ? 'bg-green-500/8 border-green-500/15 text-green-400' :
                  img.status === 'Verified' ? 'bg-[#00b0ff]/8 border-[#00b0ff]/15 text-[#00b0ff]' :
                  'bg-amber-500/8 border-amber-500/15 text-amber-400'
                }`}>{img.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
