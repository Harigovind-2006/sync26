'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Lock, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Code,
  Globe,
  Award
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-[#f0f6fc] flex flex-col relative overflow-x-hidden">
      
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-5xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5" /> ABOUT LAXMAN REKHA
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            The Impenetrable Boundary for <span className="text-amber-400">Digital Copyright</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Named after the legendary protective boundary that could never be crossed, Laxman Rekha provides photographers with unbreakable digital ownership verification.
          </p>
        </div>

        {/* Mission Statement Card */}
        <div className="bg-[#0e131d] border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" /> Our Mission & Vision
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In an era where AI generative models and web scrapers effortlessly copy high-resolution digital art, traditional visual watermarks fail. They clutter photography, are easily cropped out, or can be removed by generative AI tools.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Laxman Rekha solves this by embedding invisible signals directly into the Discrete Cosine Transform (DCT) frequency coefficients of images and anchoring the SHA-256 birth certificate on the Polygon Amoy blockchain.
          </p>
        </div>

        {/* Technical Architecture Deep Dive */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Full System Architecture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">1. Discrete Cosine Transform (DCT)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Using Python OpenCV and SciPy, Laxman Rekha transforms image YCbCr luminance channels into 8x8 DCT frequency blocks. Buyer and artist signatures are embedded in mid-frequency coefficients to ensure human imperceptibility and robustness against compression.
              </p>
            </div>

            <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">2. Polygon Amoy Blockchain Smart Contracts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Once watermarked, the image SHA-256 hash, creator wallet address, timestamp, and licensing terms are minted as an immutable record on Polygon PoS testnet via Ethers.js.
              </p>
            </div>

            <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">3. Forensic Breach & Re-upload Crawlers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated background tasks monitor online platforms and social media. When a suspect image is identified, Laxman Rekha extracts frequency signals and evaluates confidence match scores.
              </p>
            </div>

            <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">4. Instant DMCA Takedown Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If an illegal re-upload is verified, Laxman Rekha generates a legally formatted DMCA Takedown Notice complete with transaction hashes to expedite content removal.
              </p>
            </div>

          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-[#0e131d] border border-white/10 rounded-2xl p-5 space-y-2">
              <h4 className="font-bold text-sm text-white">Does the watermark change how my photo looks?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No. Laxman Rekha embeds data strictly in frequency-domain coefficients that are invisible to human perception. Your photograph retains its exact visual fidelity.
              </p>
            </div>

            <div className="bg-[#0e131d] border border-white/10 rounded-2xl p-5 space-y-2">
              <h4 className="font-bold text-sm text-white">What happens if someone compresses or resizes my image?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Because DCT operates in frequency space rather than raw pixel values, the embedded payload survives standard JPEG compression, scaling, and color adjustments.
              </p>
            </div>

            <div className="bg-[#0e131d] border border-white/10 rounded-2xl p-5 space-y-2">
              <h4 className="font-bold text-sm text-white">Why use the Polygon Blockchain?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Polygon provides ultra-fast finality and negligible transaction fees while benefiting from Ethereum's security model, allowing instant immutable copyright timestamps.
              </p>
            </div>
          </div>
        </div>

        {/* Back / Action */}
        <div className="text-center pt-8">
          <Link
            href="/dashboard"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs inline-flex items-center gap-2 shadow-lg shadow-amber-400/20"
          >
            <span>Go to Laxman Rekha Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
