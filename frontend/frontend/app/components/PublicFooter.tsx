'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Globe, Share2, MessageSquare } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="w-full bg-[#05070a] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-lg font-black text-white">Laxman<span className="text-amber-400">Rekha</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Draw an impenetrable digital boundary around your photography. Powered by frequency DCT watermarking, Polygon Amoy blockchain proof, and AI breach detection.
          </p>
          <div className="flex items-center gap-4 text-slate-500 pt-2">
            <a href="#" aria-label="Website" className="hover:text-amber-400 transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" aria-label="Share" className="hover:text-amber-400 transition-colors"><Share2 className="w-4 h-4" /></a>
            <a href="#" aria-label="Community" className="hover:text-amber-400 transition-colors"><MessageSquare className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product & Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Home Landing Page</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About System & Mission</Link></li>
            <li><Link href="/architecture" className="hover:text-white transition-colors">Full System Architecture</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Asset Manager Dashboard</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Creator Portal Sign In</Link></li>
          </ul>
        </div>

        {/* Technology */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Security Stack</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>• DCT Frequency Invisible Watermarking</li>
            <li>• Polygon Amoy Testnet Provenance Registry</li>
            <li>• SHA-256 Cryptographic Asset Hashing</li>
            <li>• Automated DMCA Takedown Dispatch</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 Laxman Rekha AI Protection Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <Link href="/architecture" className="hover:text-slate-400">Security Architecture</Link>
        </div>
      </div>
    </footer>
  );
}
