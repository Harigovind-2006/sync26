'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  Cpu, 
  ExternalLink, 
  Search, 
  Filter, 
  Lock, 
  Eye, 
  Copy, 
  CheckCircle2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ProtectedItem {
  id: string;
  title: string;
  imageUrl: string;
  sha256: string;
  blockchainTx: string;
  status: 'protected' | 'watermarked' | 'breached';
  createdAt: string;
  licenseCount: number;
}

const mockImages: ProtectedItem[] = [
  {
    id: 'img-1',
    title: 'Neon Cyberpunk Metropolis',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    sha256: '7f9c2a8e4b1d0f5c6e8b2a4f6d8c0e2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e',
    blockchainTx: '0x3a89f...91bc',
    status: 'protected',
    createdAt: '2026-08-01',
    licenseCount: 4,
  },
  {
    id: 'img-2',
    title: 'Alpine Summit Horizon',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    sha256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    blockchainTx: '0x712a3...e45f',
    status: 'protected',
    createdAt: '2026-07-30',
    licenseCount: 2,
  },
  {
    id: 'img-3',
    title: 'Minimalist Architectural Geometry',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    blockchainTx: '0x992b1...77aa',
    status: 'breached',
    createdAt: '2026-07-28',
    licenseCount: 1,
  },
  {
    id: 'img-4',
    title: 'Luminous Deep Ocean Odyssey',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    sha256: '4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
    blockchainTx: '0x551f0...b23d',
    status: 'watermarked',
    createdAt: '2026-07-25',
    licenseCount: 0,
  },
];

export default function DashboardView({ onNavigate }: { onNavigate: (tab: any) => void }) {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ProtectedItem | null>(null);

  const filteredImages = mockImages.filter(img => 
    img.title.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Protected Assets</span>
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">1,248</div>
          <p className="text-[11px] text-cyan-400 font-medium mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> +14 registered today
          </p>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Active Licenses</span>
            <div className="p-2 bg-lime-500/10 text-lime-400 rounded-xl">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">382</div>
          <p className="text-[11px] text-lime-400 font-medium mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> $12.4k volume earned
          </p>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Flagged Breaches</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">3</div>
          <p className="text-[11px] text-amber-400 font-medium mt-1 flex items-center gap-1">
            Requires copyright action
          </p>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Polygon Chain Height</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">#59.2M</div>
          <p className="text-[11px] text-purple-300 font-mono mt-1">Amoy Testnet Syncing</p>
        </div>

      </div>

      {/* Action Banner */}
      <div className="glass-card p-6 rounded-3xl relative overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen DCT Watermarking Active
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Protect Your High-Resolution Media Now</h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Embed invisible frequency-domain watermarks into your photographs and register immutable SHA-256 ownership hashes on the Polygon Amoy blockchain.
          </p>
        </div>
        <button
          onClick={() => onNavigate('watermark')}
          className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 whitespace-nowrap"
        >
          Open Watermark Studio
        </button>
      </div>

      {/* Media Portfolio Header & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">Protected Asset Library</h3>
          <p className="text-xs text-slate-400">Manage your copyrighted media & blockchain verify status</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search images or SHA256..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div 
            key={img.id}
            className="glass-card glass-card-hover rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-between"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <img 
                src={img.imageUrl} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                {img.status === 'protected' && (
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Protected
                  </span>
                )}
                {img.status === 'watermarked' && (
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-lime-500/20 text-lime-300 border border-lime-400/30 backdrop-blur-md flex items-center gap-1">
                    <Lock className="w-3 h-3" /> DCT Watermarked
                  </span>
                )}
                {img.status === 'breached' && (
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-md flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-400" /> Breach Flagged
                  </span>
                )}
              </div>

              {/* View Overlay */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedImage(img)}
                  className="p-2.5 bg-white/10 hover:bg-cyan-500/30 text-white rounded-xl backdrop-blur-md border border-white/20 transition-all hover:scale-110"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <h4 className="font-bold text-sm text-white line-clamp-1">{img.title}</h4>
              
              <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center justify-between">
                  <span>SHA256:</span>
                  <button 
                    onClick={() => copyToClipboard(img.sha256, img.id)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-sans"
                  >
                    {copiedId === img.id ? <CheckCircle2 className="w-3 h-3 text-lime-400" /> : <Copy className="w-3 h-3" />}
                    {img.sha256.substring(0, 8)}...
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Polygon Tx:</span>
                  <span className="text-purple-400 flex items-center gap-1 font-sans">
                    {img.blockchainTx}
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span>{img.licenseCount} Active Licenses</span>
                <span>{img.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-6 rounded-3xl space-y-6 border border-white/15 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">{selectedImage.title}</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-3 py-1 bg-slate-900 rounded-xl"
              >
                ✕ Close
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 font-sans block text-[10px]">SHA-256 Hash</span>
                <span className="text-cyan-300 break-all">{selectedImage.sha256}</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 font-sans block text-[10px]">Polygon Amoy Tx</span>
                <span className="text-purple-300 font-sans flex items-center gap-1">
                  {selectedImage.blockchainTx} <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 font-sans">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  onNavigate('licensing');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 transition-colors"
              >
                Issue Digital License
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
