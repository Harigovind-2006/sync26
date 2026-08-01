'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';
import { 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  Code, 
  Layers, 
  GitBranch, 
  Lock, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Server,
  FileCode,
  Terminal,
  Activity
} from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-[#f0f6fc] flex flex-col relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-sky-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none z-0"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-6xl mx-auto px-6 md:px-12 space-y-16 z-10">
        
        {/* Header Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold">
            <Layers className="w-4 h-4" /> LAXMAN REKHA TECHNICAL BLUEPRINT
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Full System <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">Architecture</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            An end-to-end technical overview of Laxman Rekha's decoupled Node.js/Express backend, Python DCT frequency steganography engine, Supabase PostgreSQL storage, and Polygon Amoy smart contract integration.
          </p>
        </div>

        {/* System Data Flow Diagram */}
        <div className="bg-[#0e131d] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-amber-400" /> End-to-End Pipeline Dataflow
            </h2>
            <span className="px-2.5 py-1 text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
              Production Stack v2.4.1
            </span>
          </div>

          {/* Visual Data Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center text-xs">
            
            <div className="bg-[#131924] p-4 rounded-2xl border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold text-white">Client Upload</h4>
              <p className="text-[11px] text-slate-400">Next.js UI sends raw photograph via Express Multer</p>
            </div>

            <div className="bg-[#131924] p-4 rounded-2xl border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold text-white">Python DCT</h4>
              <p className="text-[11px] text-slate-400">`embed.py` runs SciPy 8x8 DCT frequency transform</p>
            </div>

            <div className="bg-[#131924] p-4 rounded-2xl border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center font-bold">3</div>
              <h4 className="font-bold text-white">Polygon Ledger</h4>
              <p className="text-[11px] text-slate-400">SHA-256 hash & buyer ID minted on Polygon Amoy</p>
            </div>

            <div className="bg-[#131924] p-4 rounded-2xl border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold">4</div>
              <h4 className="font-bold text-white">Supabase Store</h4>
              <p className="text-[11px] text-slate-400">PostgreSQL DB & S3 Storage buckets indexing</p>
            </div>

            <div className="bg-[#131924] p-4 rounded-2xl border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 mx-auto flex items-center justify-center font-bold">5</div>
              <h4 className="font-bold text-white">DMCA Takedown</h4>
              <p className="text-[11px] text-slate-400">Forensic crawler flags breach & broadcasts legal notice</p>
            </div>

          </div>
        </div>

        {/* 4 Architectural Pillars Deep Dive */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-white">Architectural Subsystems</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Subsystem 1: Node.js & Express MVC Core */}
            <div className="bg-[#0b0f17] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Node.js Express MVC API Core</h3>
                  <p className="text-[11px] text-slate-500 font-mono">backend/src/app.ts · TypeScript ES2022</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean Model-View-Controller architecture built with Express.js and TypeScript. Features JWT authentication middleware (`auth.middleware.ts`), Zod request payload validation (`schemas/`), Multer file upload handlers, and centralized error handling middleware.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">Express.js 4</span>
                <span className="px-2.5 py-1 bg-slate-900 text-amber-400 rounded-lg border border-amber-500/20">TypeScript</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">JWT Auth</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">Zod Validation</span>
              </div>
            </div>

            {/* Subsystem 2: Python DCT Steganography */}
            <div className="bg-[#0b0f17] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Python DCT Steganography Engine</h3>
                  <p className="text-[11px] text-slate-500 font-mono">python/embed.py & extract.py · child_process.spawn()</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Watermarking is NOT implemented in JavaScript. Instead, Node.js spawns Python sub-processes running OpenCV, NumPy, and SciPy to perform 2D Discrete Cosine Transform (DCT) matrix transformations, embedding buyer payload bits directly into YCbCr mid-frequency coefficients.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2.5 py-1 bg-slate-900 text-sky-400 rounded-lg border border-sky-500/20">Python 3.11</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">SciPy 2D-DCT</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">OpenCV</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">child_process.spawn</span>
              </div>
            </div>

            {/* Subsystem 3: Polygon Amoy Blockchain */}
            <div className="bg-[#0b0f17] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Polygon Amoy Provenance Ledger</h3>
                  <p className="text-[11px] text-slate-500 font-mono">src/services/blockchain.service.ts · Ethers.js v6</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cryptographic SHA-256 fingerprints of original photographs are registered on Polygon PoS testnet. Smart contract transactions generate immutable transaction hashes and block verification IDs that serve as court-admissible legal proof of creation.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2.5 py-1 bg-slate-900 text-purple-400 rounded-lg border border-purple-500/20">Polygon Amoy</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">Ethers.js</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">SHA-256 Hash</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">Polygonscan API</span>
              </div>
            </div>

            {/* Subsystem 4: Supabase PostgreSQL & Storage */}
            <div className="bg-[#0b0f17] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Supabase PostgreSQL & Object Storage</h3>
                  <p className="text-[11px] text-slate-500 font-mono">src/config/supabase.ts · @supabase/supabase-js</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-performance relational storage housing `buyers`, `images`, `licenses`, and `breach_reports` tables. Supabase Object Storage isolates original unwatermarked media (`originals/`), watermarked assets (`watermarked/`), and suspect breach media (`suspects/`).
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2.5 py-1 bg-slate-900 text-emerald-400 rounded-lg border border-emerald-500/20">PostgreSQL</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">Supabase Storage</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/5">Row Level Security</span>
              </div>
            </div>

          </div>
        </div>

        {/* Security & Verification Callout */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-sky-500/10 border border-amber-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" /> Tested & Verified Architecture
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Zero TypeScript compilation errors (`npx tsc --noEmit`), fully compliant Express MVC pattern, and decoupled micro-services ready for production deployment.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap shadow-lg shadow-amber-400/20"
          >
            <span>Launch Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
