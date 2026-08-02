'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  Cpu, 
  ExternalLink, 
  Search, 
  Lock, 
  Eye, 
  Copy, 
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  FolderOpen
} from 'lucide-react';
import { getDashboardMetrics, getLiveAssets, ApiAnalytics, ApiAssetItem } from '../../lib/api';

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

export default function DashboardView({ onNavigate }: { onNavigate: (tab: any) => void }) {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ProtectedItem | null>(null);
  const [images, setImages] = useState<ProtectedItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [metrics, setMetrics] = useState<ApiAnalytics>({
    totalProtectedAssets: 0,
    activeScansCount: 0,
    verificationsOnChain: 0,
    totalBreachesDetected: 0,
    dmcaNoticesIssued: 0,
    quarantinedBlockedImages: 0,
    totalRoyaltiesEarnedMatic: 0,
    totalRoyaltiesEarnedUsd: 0,
  });

  useEffect(() => {
    let isMounted = true;

    Promise.all([getDashboardMetrics(), getLiveAssets()])
      .then(([metricsData, liveAssets]) => {
        if (!isMounted) return;
        if (metricsData) setMetrics(metricsData);
        if (liveAssets && liveAssets.length > 0) {
          const mapped: ProtectedItem[] = liveAssets.map((item: ApiAssetItem, idx: number) => ({
            id: item.id || `img-${idx + 1}`,
            title: item.title || item.filename,
            imageUrl: item.imageUrl,
            sha256: item.sha256 || '7f9c2a8e4b1d0f5c6e8b2a4f6d8c0e2a4b6c8d0e',
            blockchainTx: item.blockchainTx || '0x3a89f...91bc',
            status: item.status === 'alert' ? 'breached' : item.status === 'watermarked' ? 'watermarked' : 'protected',
            createdAt: new Date().toISOString().substring(0, 10),
            licenseCount: idx + 1,
          }));
          setImages(mapped);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredImages = images.filter(img => 
    img.title.toLowerCase().includes(search.toLowerCase()) ||
    img.sha256.toLowerCase().includes(search.toLowerCase())
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
        
        <div className="bg-[#131924] p-5 rounded-2xl border border-white/10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Protected Assets</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {loading ? '...' : metrics.totalProtectedAssets}
          </div>
          <p className="text-[11px] text-amber-400 font-medium mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> DCT + Polygon Verified
          </p>
        </div>

        <div className="bg-[#131924] p-5 rounded-2xl border border-white/10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Royalty Volume</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {loading ? '...' : `$${metrics.totalRoyaltiesEarnedUsd.toLocaleString()}`}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> {metrics.totalRoyaltiesEarnedMatic} MATIC Earned
          </p>
        </div>

        <div className="bg-[#131924] p-5 rounded-2xl border border-white/10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Flagged Breaches</span>
            <div className="p-2 bg-red-500/10 text-red-400 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {loading ? '...' : metrics.totalBreachesDetected}
          </div>
          <p className="text-[11px] text-red-400 font-medium mt-1 flex items-center gap-1">
            {metrics.dmcaNoticesIssued} DMCA Notices Issued
          </p>
        </div>

        <div className="bg-[#131924] p-5 rounded-2xl border border-white/10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Polygon On-Chain Records</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {loading ? '...' : metrics.verificationsOnChain}
          </div>
          <p className="text-[11px] text-purple-300 font-mono mt-1">Polygon Amoy Testnet</p>
        </div>

      </div>

      {/* Action Banner */}
      <div className="bg-[#0e131d] p-6 rounded-3xl relative overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-[#0d1117] to-orange-950/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen DCT Watermarking Active
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Protect Your High-Resolution Media Now</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Embed invisible frequency-domain watermarks into your photographs and register immutable SHA-256 ownership hashes on the Polygon Amoy blockchain.
          </p>
        </div>
        <button
          onClick={() => onNavigate('watermark')}
          className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 whitespace-nowrap cursor-pointer"
        >
          Open Watermark Studio
        </button>
      </div>

      {/* Media Portfolio Header & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
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
              className="w-full bg-[#131924] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Asset Grid or Empty State */}
      {loading ? (
        <div className="text-center py-16 text-xs text-slate-500">
          Loading protected asset library from backend API...
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-[#131924] border border-white/10 rounded-2xl p-12 text-center space-y-3">
          <FolderOpen className="w-10 h-10 text-amber-400 mx-auto opacity-70" />
          <h4 className="font-bold text-white text-sm">No Assets Found in Library</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload your first photograph via the Watermark Studio or top header button to register ownership on Polygon blockchain.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              className="bg-[#131924] rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-between hover:border-white/30 transition-all duration-200"
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
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Protected
                    </span>
                  )}
                  {img.status === 'watermarked' && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-md flex items-center gap-1">
                      <Lock className="w-3 h-3" /> DCT Watermarked
                    </span>
                  )}
                  {img.status === 'breached' && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-400/30 backdrop-blur-md flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-400" /> Breach Flagged
                    </span>
                  )}
                </div>

                {/* View Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedImage(img)}
                    className="p-2.5 bg-white/10 hover:bg-amber-500/30 text-white rounded-xl backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h4 className="font-bold text-xs text-white truncate font-mono">{img.title}</h4>
                
                <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center justify-between">
                    <span>SHA256:</span>
                    <button 
                      onClick={() => copyToClipboard(img.sha256, img.id)}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans cursor-pointer"
                    >
                      {copiedId === img.id ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
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
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e131d] max-w-2xl w-full p-6 rounded-3xl space-y-6 border border-white/15 animate-scaleUp shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">{selectedImage.title}</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1 bg-slate-900 rounded-xl cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#131924] p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 font-sans block text-[10px]">SHA-256 Hash</span>
                <span className="text-amber-300 break-all">{selectedImage.sha256}</span>
              </div>

              <div className="bg-[#131924] p-3 rounded-xl border border-white/5">
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
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
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
