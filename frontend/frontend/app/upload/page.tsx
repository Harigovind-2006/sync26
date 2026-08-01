'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import {
  Upload, Shield, CheckCircle2, Loader2, X, Bell, Search,
  ArrowRight, ImagePlus, ToggleLeft, ToggleRight,
} from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
type Phase = 'idle' | 'preview' | 'processing' | 'done';
const processSteps = ['Uploading', 'AI Analysis', 'Generating Watermark', 'Encrypting', 'Saving', 'Complete'];

interface Cfg {
  watermark: boolean;
  tamper: boolean;
  timestamp: boolean;
  metadata: boolean;
  strength: number;
  encryption: string;
  ownerName: string;
  ownerEmail: string;
  ownerId: string;
}

export default function UploadPage() {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>('idle');
  const [imgUrl, setImgUrl] = useState('');
  const [imgName, setImgName] = useState('');
  const [imgSize, setImgSize] = useState('');
  const [imgDims, setImgDims] = useState('');
  const [imgFmt, setImgFmt] = useState('');
  const [step, setStep] = useState(0);
  const [wmId, setWmId] = useState('');
  const [drag, setDrag] = useState(false);

  const [cfg, setCfg] = useState<Cfg>({
    watermark: true, tamper: true, timestamp: true, metadata: true,
    strength: 75, encryption: 'AES-256',
    ownerName: user?.name ?? '',
    ownerEmail: user?.email ?? '',
    ownerId: 'LR-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  });

  const handleFile = useCallback((file: File) => {
    if (!file.type.match(/image\/(png|jpeg|jpg|webp)/)) return;
    if (file.size > 20 * 1024 * 1024) return;
    setImgName(file.name);
    setImgSize((file.size / 1024 / 1024).toFixed(2) + ' MB');
    setImgFmt(file.type.split('/')[1].toUpperCase());
    const r = new FileReader();
    r.onload = () => {
      const url = r.result as string;
      setImgUrl(url);
      const i = new Image();
      i.onload = () => setImgDims(`${i.width} × ${i.height}`);
      i.src = url;
      setPhase('preview');
    };
    r.readAsDataURL(file);
  }, []);

  const protect = () => {
    setPhase('processing');
    setStep(0);
    setWmId('WM-' + Math.random().toString(36).substring(2, 10).toUpperCase());
    processSteps.forEach((_, i) => {
      setTimeout(() => {
        setStep(i);
        if (i === processSteps.length - 1) setTimeout(() => setPhase('done'), 700);
      }, i * 900);
    });
  };

  const reset = () => { setPhase('idle'); setImgUrl(''); setImgName(''); setImgSize(''); setImgDims(''); };

  const tog = (k: keyof Cfg) => setCfg(c => ({ ...c, [k]: !c[k as keyof Cfg] }));

  function Tog({ k }: { k: 'watermark' | 'tamper' | 'timestamp' | 'metadata' }) {
    return (
      <button onClick={() => tog(k)} className="flex-shrink-0">
        {cfg[k]
          ? <ToggleRight className="w-8 h-8 text-[#9b51e0]" />
          : <ToggleLeft className="w-8 h-8 text-zinc-700" />}
      </button>
    );
  }

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div className="sticky top-0 z-20 h-14 border-b border-white/[0.06] bg-[#07070A]/90 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input type="text" placeholder="Search..." className="pl-8 pr-4 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400 placeholder:text-zinc-700 focus:outline-none w-44 transition-colors" />
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

      {/* ── Page body: 2-column grid ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">

          {/* Page header */}
          <div className="mb-8">
            <p className="text-xs text-[#9b51e0] font-bold uppercase tracking-widest mb-2">Upload</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Upload & Protect Image</h1>
            <p className="text-[15px] text-zinc-600 mt-1.5 max-w-[500px]">
              Upload any PNG, JPEG, or WEBP image. Our AI will generate an invisible ownership watermark and encrypt your file.
            </p>
          </div>

          <AnimatePresence mode="wait">

            {/* ════════════════════════════════════════
                IDLE  —  large drop zone + right panel
            ════════════════════════════════════════ */}
            {phase === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                  {/* Main — drop zone (2 cols) */}
                  <label
                    onDragOver={e => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                    className={`xl:col-span-2 flex flex-col items-center justify-center min-h-[480px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${drag ? 'border-[#9b51e0] bg-[#9b51e0]/6 scale-[1.005]' : 'border-white/[0.08] bg-white/[0.015] hover:border-[#9b51e0]/25 hover:bg-[#9b51e0]/3'}`}
                  >
                    <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

                    {/* Upload illustration */}
                    <div className={`w-20 h-20 rounded-[22px] flex items-center justify-center mb-7 transition-all duration-300 ${drag ? 'bg-[#9b51e0]/20 text-[#9b51e0]' : 'bg-white/[0.04] text-zinc-600'}`}>
                      <ImagePlus className="w-9 h-9" />
                    </div>

                    <p className="text-[22px] font-bold text-white mb-2.5">
                      {drag ? 'Release to Upload' : 'Drag & Drop Your Image'}
                    </p>
                    <p className="text-[15px] text-zinc-600 mb-8">or click anywhere here to browse files</p>

                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 text-sm font-medium hover:text-white hover:border-white/20 transition-all">
                      <Upload className="w-4 h-4" /> Browse Files
                    </div>

                    {/* Supported formats */}
                    <div className="flex flex-wrap justify-center gap-2.5 mt-10">
                      {[['PNG','PNG image'],['JPEG','Joint photograph'],['JPG','JPEG variant'],['WEBP','Web image']].map(([f]) => (
                        <span key={f} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-zinc-600 font-mono">{f}</span>
                      ))}
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-zinc-600">Max 20 MB</span>
                    </div>
                  </label>

                  {/* Right panel — settings (1 col) */}
                  <div className="space-y-5">
                    <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                      <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-5">Protection Settings</p>
                      <div className="space-y-4">
                        {[
                          { label: 'Invisible Watermark', k: 'watermark' as const },
                          { label: 'AI Tamper Detection', k: 'tamper' as const },
                          { label: 'Auto Timestamp', k: 'timestamp' as const },
                          { label: 'Secure Metadata', k: 'metadata' as const },
                        ].map(row => (
                          <div key={row.label} className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">{row.label}</span>
                            <Tog k={row.k} />
                          </div>
                        ))}

                        <div className="pt-2">
                          <label className="text-xs text-zinc-600 mb-2 block">Strength: <span className="text-[#9b51e0] font-bold">{cfg.strength}%</span></label>
                          <input type="range" min={25} max={100} step={5} value={cfg.strength}
                            onChange={e => setCfg(c => ({ ...c, strength: +e.target.value }))}
                            className="w-full accent-[#9b51e0] cursor-pointer" />
                        </div>

                        <div className="pt-1 space-y-3">
                          {[
                            { label: 'Encryption', val: cfg.encryption, is: 'select' },
                            { label: 'Owner Name', val: cfg.ownerName, key: 'ownerName' },
                            { label: 'Owner Email', val: cfg.ownerEmail, key: 'ownerEmail' },
                          ].map(row => (
                            <div key={row.label}>
                              <label className="text-[10px] text-zinc-700 uppercase tracking-wider block mb-1">{row.label}</label>
                              {row.is === 'select' ? (
                                <select className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white focus:outline-none">
                                  <option>AES-256</option><option>AES-128</option>
                                </select>
                              ) : (
                                <input value={row.val} onChange={e => setCfg(c => ({ ...c, [row.key!]: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white focus:outline-none focus:border-[#9b51e0]/25 transition-colors" />
                              )}
                            </div>
                          ))}
                          <div>
                            <label className="text-[10px] text-zinc-700 uppercase tracking-wider block mb-1">Owner ID</label>
                            <div className="flex gap-2">
                              <input readOnly value={cfg.ownerId} className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-xs text-zinc-500 font-mono focus:outline-none" />
                              <button onClick={() => setCfg(c => ({ ...c, ownerId: 'LR-' + Math.random().toString(36).substring(2, 8).toUpperCase() }))}
                                className="px-3 py-2 rounded-lg border border-white/[0.07] text-zinc-600 hover:text-white text-xs transition-colors">↺</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-[#9b51e0]/10 bg-[#9b51e0]/4">
                      <p className="text-xs text-zinc-600 leading-relaxed">Your images are <span className="text-zinc-400 font-medium">never publicly shared</span>. All files are private and encrypted.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                PREVIEW  —  image preview + settings
            ════════════════════════════════════════ */}
            {phase === 'preview' && (
              <motion.div key="preview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                  {/* Left 2 cols — image panels + action */}
                  <div className="xl:col-span-2 space-y-6">

                    {/* Image grid — original + protected preview side by side */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Original */}
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-500">Original Image</span>
                          <button onClick={reset} className="text-zinc-600 hover:text-white transition-colors"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="relative h-52 bg-zinc-950">
                          <img src={imgUrl} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="px-4 py-3 border-t border-white/[0.05]">
                          <p className="text-[11px] text-zinc-500 font-mono truncate">{imgName}</p>
                          <p className="text-[10px] text-zinc-700 mt-0.5">{imgDims} · {imgSize} · {imgFmt}</p>
                        </div>
                      </div>

                      {/* Protected preview */}
                      <div className="rounded-2xl border border-[#9b51e0]/15 bg-white/[0.02] overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#9b51e0]">Protected Preview</span>
                          <span className="text-[10px] text-[#9b51e0]/60 font-mono">Watermarked</span>
                        </div>
                        <div className="relative h-52 bg-zinc-950 overflow-hidden">
                          <img src={imgUrl} alt="" className="w-full h-full object-contain opacity-90 brightness-95" />
                          <div className="absolute inset-0 bg-[#9b51e0]/6" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="text-[#9b51e0]/8 text-5xl font-black rotate-[-25deg] select-none tracking-widest">PROTECTED</p>
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-[#9b51e0]/20 border border-[#9b51e0]/25 text-[9px] text-[#9b51e0] font-mono">🔮 Watermarked</div>
                        </div>
                        <div className="px-4 py-3 border-t border-white/[0.05] space-y-1">
                          <div className="flex justify-between text-[10px]"><span className="text-zinc-700">Watermark</span><span className="text-green-400">● Active</span></div>
                          <div className="flex justify-between text-[10px]"><span className="text-zinc-700">Encryption</span><span className="text-green-400">● {cfg.encryption}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <button onClick={protect}
                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-[#07070A] font-bold text-[15px] hover:bg-zinc-100 active:scale-[0.97] transition-all shadow-lg shadow-white/5">
                        <Shield className="w-4 h-4" /> Generate Watermark & Protect
                      </button>
                      <button onClick={reset} className="px-5 py-4 rounded-xl border border-white/[0.07] text-zinc-600 hover:text-white hover:border-white/15 text-sm transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Right col — protection settings */}
                  <div className="space-y-5">
                    <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                      <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-5">Protection Settings</p>
                      <div className="space-y-4">
                        {[
                          { label: 'Invisible Watermark', k: 'watermark' as const },
                          { label: 'AI Tamper Detection', k: 'tamper' as const },
                          { label: 'Auto Timestamp', k: 'timestamp' as const },
                          { label: 'Secure Metadata', k: 'metadata' as const },
                        ].map(row => (
                          <div key={row.label} className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">{row.label}</span>
                            <Tog k={row.k} />
                          </div>
                        ))}

                        <div className="pt-1">
                          <label className="text-xs text-zinc-600 mb-2 block">Strength: <span className="text-[#9b51e0] font-bold">{cfg.strength}%</span></label>
                          <input type="range" min={25} max={100} step={5} value={cfg.strength}
                            onChange={e => setCfg(c => ({ ...c, strength: +e.target.value }))}
                            className="w-full accent-[#9b51e0] cursor-pointer" />
                        </div>

                        <div className="pt-1 space-y-3">
                          <div>
                            <label className="text-[10px] text-zinc-700 uppercase tracking-wider block mb-1">Owner Name</label>
                            <input value={cfg.ownerName} onChange={e => setCfg(c => ({ ...c, ownerName: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white focus:outline-none focus:border-[#9b51e0]/25 transition-colors" />
                          </div>
                          <div>
                            <label className="text-[10px] text-zinc-700 uppercase tracking-wider block mb-1">Owner Email</label>
                            <input value={cfg.ownerEmail} onChange={e => setCfg(c => ({ ...c, ownerEmail: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white focus:outline-none focus:border-[#9b51e0]/25 transition-colors" />
                          </div>
                          <div>
                            <label className="text-[10px] text-zinc-700 uppercase tracking-wider block mb-1">Owner ID</label>
                            <p className="text-xs text-zinc-500 font-mono px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">{cfg.ownerId}</p>
                          </div>
                          <div>
                            <label className="text-[10px] text-zinc-700 uppercase tracking-wider block mb-1">Encryption</label>
                            <select className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white focus:outline-none">
                              <option>AES-256</option><option>AES-128</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                PROCESSING
            ════════════════════════════════════════ */}
            {phase === 'processing' && (
              <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="max-w-[480px] mx-auto py-16">
                  <div className="p-10 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                    <div className="flex flex-col items-center mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#9b51e0]/10 border border-[#9b51e0]/15 flex items-center justify-center mb-4">
                        <Loader2 className="w-6 h-6 text-[#9b51e0] animate-spin" />
                      </div>
                      <h3 className="text-[18px] font-bold text-white">Protecting Your Image</h3>
                      <p className="text-sm text-zinc-600 mt-1">{processSteps[step]}</p>
                    </div>
                    <div className="space-y-2.5">
                      {processSteps.map((s, i) => (
                        <div key={s} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${i === step ? 'bg-[#9b51e0]/8 border border-[#9b51e0]/12' : i < step ? 'opacity-40' : 'opacity-20'}`}>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                            {i < step ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : i === step ? <Loader2 className="w-3.5 h-3.5 text-[#9b51e0] animate-spin" /> : <span className="text-[10px] text-zinc-700 font-bold">{i+1}</span>}
                          </div>
                          <span className={`text-sm ${i === step ? 'text-white font-medium' : 'text-zinc-600'}`}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════
                DONE
            ════════════════════════════════════════ */}
            {phase === 'done' && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}>
                <div className="max-w-[480px] mx-auto py-16">
                  <div className="p-10 rounded-2xl border border-green-500/12 bg-green-500/4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/12 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-7 h-7 text-green-400" />
                    </div>
                    <h3 className="text-[20px] font-bold text-white mb-1.5">Image Protected</h3>
                    <p className="text-sm text-zinc-500 mb-8">Invisible watermark successfully embedded.</p>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 mb-7 text-left space-y-2.5">
                      {[['File',imgName],['Watermark ID',wmId],['Owner',cfg.ownerName],['Encryption',cfg.encryption],['Status','Protected ✓']].map(([l,v]) => (
                        <div key={l} className="flex justify-between text-sm">
                          <span className="text-zinc-600">{l}</span>
                          <span className="text-white font-mono text-xs">{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Link href="/results" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#07070A] font-bold text-sm hover:bg-zinc-100 transition-all">
                        View Results <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button onClick={reset} className="px-5 py-2.5 rounded-xl border border-white/[0.07] text-zinc-500 hover:text-white text-sm transition-all">
                        Upload Another
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
