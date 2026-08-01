'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import PublicFooter from './components/PublicFooter';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Search, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Lock,
  EyeOff,
  Flame,
  FileCheck
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-[#f0f6fc] flex flex-col relative overflow-x-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none z-0"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-24 z-10">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-8 mb-24">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold shadow-lg">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>LAXMAN REKHA — AI DIGITAL COPYRIGHT BOUNDARY</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight">
            Draw an Impenetrable <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">Digital Boundary</span> Around Your Photography
          </h1>

          {/* Subtitle / Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Laxman Rekha protects photographers from image theft using invisible frequency-domain (DCT) watermarking, cryptographic SHA-256 provenance on Polygon blockchain, and real-time AI breach detection.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-orange-500/25 hover:scale-105 transition-all"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="bg-[#131924] hover:bg-[#1a2232] text-white font-bold px-8 py-4 rounded-2xl text-sm border border-white/10 transition-all hover:border-white/20"
            >
              Read Architecture & Mission
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-12 border-t border-white/10">
            <div>
              <p className="text-3xl font-black text-amber-400 font-mono">100%</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Invisible DCT Watermark</p>
            </div>
            <div>
              <p className="text-3xl font-black text-sky-400 font-mono">Polygon</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Immutable Blockchain Ledger</p>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400 font-mono">&lt; 2s</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Python Extraction Speed</p>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-400 font-mono">98.4%</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Forensic Breach Detection</p>
            </div>
          </div>

        </section>

        {/* WHAT LAXMAN REKHA DOES - FEATURE GRID */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Complete Protection Suite</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">What Does Laxman Rekha Do?</h3>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              A multi-layered digital security barrier designed specifically for professional photographers and digital content creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-[#0e131d] border border-white/10 hover:border-amber-500/40 rounded-3xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <EyeOff className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">1. Invisible DCT Watermarking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Embeds encrypted buyer & artist signatures inside image frequency coefficients. Remains completely imperceptible to human eyes and survives cropping or JPEG compression.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0e131d] border border-white/10 hover:border-sky-500/40 rounded-3xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">2. Polygon Blockchain Proof</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates a cryptographic SHA-256 fingerprint for every image asset and anchors it permanently on the Polygon Amoy blockchain as immutable proof of creation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0e131d] border border-white/10 hover:border-orange-500/40 rounded-3xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">3. Forensic Breach Detection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI web crawlers constantly scan social media, marketplace platforms, and unauthorized websites to extract frequency signatures and spot illegal re-uploads.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#0e131d] border border-white/10 hover:border-red-500/40 rounded-3xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">4. One-Click DMCA Takedown</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When a breach is detected, Laxman Rekha auto-generates legally binding DMCA takedown notices backed by Polygon blockchain ledger verification.
              </p>
            </div>

          </div>

        </section>

        {/* HOW IT WORKS TIMELINE */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="bg-[#0b0f17] border border-white/10 rounded-3xl p-8 md:p-12 space-y-12">
            
            <div className="text-center space-y-2">
              <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">Simple 4-Step Workflow</h2>
              <h3 className="text-3xl font-black text-white">How Laxman Rekha Works</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              
              <div className="space-y-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">1</span>
                <h4 className="font-bold text-white text-base">Upload Photo</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload your high-resolution original image to Supabase secure storage.
                </p>
              </div>

              <div className="space-y-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">2</span>
                <h4 className="font-bold text-white text-base">Embed Watermark</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Python child process runs DCT frequency steganography to embed invisible payload.
                </p>
              </div>

              <div className="space-y-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">3</span>
                <h4 className="font-bold text-white text-base">Register Hash</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SHA-256 fingerprint is recorded on Polygon Amoy smart contract.
                </p>
              </div>

              <div className="space-y-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">4</span>
                <h4 className="font-bold text-white text-base">Monitor & Protect</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI engine flags unauthorized uploads and enables instant DMCA takedown notice dispatch.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-sky-500/20 border border-amber-500/30 rounded-3xl p-12 space-y-6 shadow-2xl">
            <h2 className="text-3xl font-black text-white">Ready to Protect Your Digital Legacy?</h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              Join thousands of creators who trust Laxman Rekha to guard their images against digital piracy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-7 py-3.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <span>Launch Laxman Rekha Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-3.5 rounded-xl text-xs border border-white/15"
              >
                Creator Login
              </Link>
            </div>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
