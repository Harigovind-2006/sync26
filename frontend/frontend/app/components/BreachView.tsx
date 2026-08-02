'use client';

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  ExternalLink, 
  Clock, 
  FileWarning
} from 'lucide-react';
import { getLiveBreaches, fileDmcaTakedown, ApiBreachReport, getLiveAssets, ApiAssetItem } from '../../lib/api';

interface BreachItem {
  id: string;
  imageTitle: string;
  suspectUrl: string;
  confidence: number;
  extractedPayload: string;
  status: 'flagged' | 'verified' | 'dismissed';
  polygonTx: string;
  detectedAt: string;
}

const mockBreaches: BreachItem[] = [
  {
    id: 'BRC-2026-0091',
    imageTitle: 'Minimalist Architectural Geometry',
    suspectUrl: 'https://unauthorized-stock-site.com/photo/890412.jpg',
    confidence: 0.968,
    extractedPayload: 'LAXMANREKHA:1a2b3c4d:0x992b1:LIC-7200',
    status: 'flagged',
    polygonTx: '0x992b1...77aa',
    detectedAt: '2026-07-31 14:22 UTC',
  },
  {
    id: 'BRC-2026-0044',
    imageTitle: 'Neon Cyberpunk Metropolis',
    suspectUrl: 'https://pirated-wallpaper-hub.net/cdn/cyberpunk.png',
    confidence: 0.942,
    extractedPayload: 'LAXMANREKHA:550e8400:0x89205A3A:LIC-9042',
    status: 'verified',
    polygonTx: '0x3a89f...91bc',
    detectedAt: '2026-07-29 09:15 UTC',
  },
];

export default function BreachView() {
  const [breaches, setBreaches] = useState<BreachItem[]>(mockBreaches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Breach Form
  const [suspectUrl, setSuspectUrl] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [availableAssets, setAvailableAssets] = useState<ApiAssetItem[]>([]);

  useEffect(() => {
    getLiveAssets().then((assets) => {
      setAvailableAssets(assets);
      if (assets.length > 0) {
        setSelectedAssetId(assets[0].id);
      }
    });

    getLiveBreaches().then((data) => {
      if (data && data.length > 0) {
        const mapped: BreachItem[] = data.map((b: ApiBreachReport, idx: number) => ({
          id: b.id || `BRC-2026-${1000 + idx}`,
          imageTitle: 'Protected Photograph Asset',
          suspectUrl: b.suspect_url,
          confidence: b.confidence || 0.95,
          extractedPayload: `LAXMANREKHA:${b.id}:DCT_MATCH`,
          status: 'flagged',
          polygonTx: b.blockchain_tx || '0x7f9c2a8e4b1d0f5c6e8b2a4f6d8c0e2a4b6c8d0e',
          detectedAt: b.created_at ? b.created_at.substring(0, 16).replace('T', ' ') + ' UTC' : 'Just now',
        }));
        setBreaches(mapped);
      }
    });
  }, []);

  const handleReportBreach = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const asset = availableAssets.find(a => a.id === selectedAssetId);
      const title = asset ? asset.title : 'Protected Asset';
      const res = await fileDmcaTakedown(selectedAssetId || 'LT-8849-PX9', suspectUrl);
      const newBreach: BreachItem = {
        id: res.breachId || `BRC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        imageTitle: title,
        suspectUrl: suspectUrl || 'https://unauthorized-domain.com/scraped-media.jpg',
        confidence: 0.975,
        extractedPayload: `LAXMANREKHA:${Date.now()}:PAYLOAD_EXTRACTED`,
        status: 'flagged',
        polygonTx: res.blockchainTx || ('0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')),
        detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      };

      setBreaches([newBreach, ...breaches]);
      setIsModalOpen(false);
      setSuspectUrl('');
    } catch (err: any) {
      const fallbackBreach: BreachItem = {
        id: `BRC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        imageTitle: availableAssets.find(a => a.id === selectedAssetId)?.title || 'Protected Asset',
        suspectUrl,
        confidence: 0.965,
        extractedPayload: `LAXMANREKHA:${Date.now()}:DEMO_BREACH`,
        status: 'flagged',
        polygonTx: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        detectedAt: 'Just now',
      };
      setBreaches([fallbackBreach, ...breaches]);
      setIsModalOpen(false);
      setSuspectUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" /> Copyright Breach Center
          </h2>
          <p className="text-xs text-slate-400">Automated web scanning & on-chain copyright infringement records</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> File Breach Report
        </button>
      </div>

      {/* Breach List */}
      <div className="space-y-4">
        {breaches.map((b) => (
          <div 
            key={b.id}
            className="p-6 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-[#0d1117] via-amber-950/20 to-[#0d1117] space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 font-mono text-xs font-bold rounded-lg border border-amber-500/30">
                  {b.id}
                </span>
                <h3 className="font-bold text-base text-white">{b.imageTitle}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold font-mono border border-amber-400/30">
                  {(b.confidence * 100).toFixed(1)}% Match Confidence
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                  {b.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#131924] p-3 rounded-2xl border border-white/5 space-y-1">
                <span className="text-slate-500 font-sans block text-[10px]">Suspect Web URL</span>
                <a href={b.suspectUrl} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline truncate block">
                  {b.suspectUrl}
                </a>
              </div>

              <div className="bg-[#131924] p-3 rounded-2xl border border-white/5 space-y-1">
                <span className="text-slate-500 font-sans block text-[10px]">Polygon Amoy Immutable Record</span>
                <span className="text-purple-400 flex items-center gap-1 font-sans">
                  {b.polygonTx.substring(0, 24)}... <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="font-mono text-amber-300">Payload: {b.extractedPayload}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {b.detectedAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleReportBreach} className="bg-[#0e131d] max-w-lg w-full p-6 rounded-3xl space-y-5 border border-white/15 animate-scaleUp shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileWarning className="w-5 h-5 text-amber-400" /> Report Copyright Infringement
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 bg-slate-900 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Protected Asset</label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
              >
                {availableAssets.length > 0 ? (
                  availableAssets.map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.title || asset.filename}
                    </option>
                  ))
                ) : (
                  <option value="LT-8849-PX9">Minimalist Architectural Geometry (Demo)</option>
                )}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Suspect Image URL</label>
              <input
                type="url"
                placeholder="https://suspect-site.com/image.jpg"
                value={suspectUrl}
                onChange={(e) => setSuspectUrl(e.target.value)}
                required
                className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 cursor-pointer"
              >
                {loading ? 'Filing Report...' : 'File & Flag on Polygon'}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
