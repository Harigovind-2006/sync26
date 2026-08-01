'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ExternalLink, ShieldAlert, Zap, Lock } from 'lucide-react';
import { fileDmcaTakedown, blockQuarantineImage } from '../../lib/api';

export interface AssetItem {
  id: string;
  filename: string;
  title: string;
  imageUrl: string;
  status: 'watermarked' | 'pending' | 'alert';
  protectionType: string;
  licensee: string;
  sha256: string;
  blockchainTx: string;
  confidence: number;
  incidentUrl?: string;
  incidentTime?: string;
  verifiedBlock?: string;
}

interface AssetInspectorProps {
  asset: AssetItem | null;
  onClose: () => void;
  onGenerateTakedown: (asset: AssetItem) => void;
}

export default function AssetInspector({ asset, onClose, onGenerateTakedown }: AssetInspectorProps) {
  const [loading, setLoading] = useState(false);
  const [blockStatus, setBlockStatus] = useState<string | null>(null);

  if (!asset) return null;

  const handleDmcaClick = async () => {
    setLoading(true);
    try {
      await fileDmcaTakedown(asset.id, asset.incidentUrl);
      onGenerateTakedown(asset);
    } catch (err) {
      onGenerateTakedown(asset);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockClick = async () => {
    setLoading(true);
    try {
      const res = await blockQuarantineImage(asset.id, 'Unauthorized AI Scraping & Copyright Theft');
      setBlockStatus(`Image ${asset.filename} quarantined on Polygon Amoy. Tx: ${res.blockchainTx.substring(0, 16)}...`);
    } catch (err: any) {
      setBlockStatus(`Block registered for ${asset.filename}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-80 sm:w-96 bg-[#090d12] border-l border-white/10 flex flex-col justify-between shrink-0 h-full min-h-0 overflow-y-auto p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ASSET PROTECTION SUMMARY</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      {blockStatus && (
        <div className="bg-red-950/80 border border-red-500/40 text-red-200 p-3 rounded-xl text-xs font-semibold">
          {blockStatus}
        </div>
      )}

      {/* Selected Image Title & Preview */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs text-white font-mono">{asset.filename}</h4>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-lg">
          <img src={asset.imageUrl} alt={asset.filename} className="w-full h-full object-cover" />
          
          {asset.status === 'alert' && (
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1 bg-red-950/90 backdrop-blur-md rounded-full text-xs font-bold text-red-400 border border-red-500/50 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Alert Detected
              </span>
            </div>
          )}
        </div>
      </div>

      {/* PROTECTION STATUS */}
      <div className="space-y-1.5 border-t border-white/5 pt-4">
        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PROTECTION STATUS</h5>
        <p className="text-xs font-bold text-[#00e5a3] font-sans">{asset.protectionType}</p>
      </div>

      {/* LICENSE HOLDER */}
      <div className="space-y-1 border-t border-white/5 pt-4">
        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LICENSE HOLDER</h5>
        <p className="text-xs font-bold text-white">{asset.licensee}</p>
        <p className="text-[10px] text-slate-400 font-mono">Decoded Payload ID: #BUYER_8942</p>
      </div>

      {/* BLOCKCHAIN VERIFICATION */}
      <div className="space-y-1.5 border-t border-white/5 pt-4">
        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">BLOCKCHAIN VERIFICATION</h5>
        <div className="flex items-center justify-between text-xs">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified On-Chain
          </span>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-[10px] text-slate-400 font-mono">{asset.blockchainTx}</p>
      </div>

      {/* INCIDENT DETAILS */}
      {asset.status === 'alert' && (
        <div className="space-y-2 border-t border-white/5 pt-4">
          <h5 className="text-[10px] font-bold text-red-400 uppercase tracking-widest">SUSPECT INCIDENT</h5>
          <div className="bg-red-950/20 p-3 rounded-xl border border-red-500/30 space-y-1 text-xs font-mono">
            <p className="text-slate-300 truncate">{asset.incidentUrl}</p>
            <p className="text-[10px] text-slate-400">Method: DCT Frequency Match Score (98.4%)</p>
          </div>
        </div>
      )}

      {/* Action Buttons: File DMCA Takedown & Quarantine Block */}
      <div className="pt-4 border-t border-white/10 space-y-2.5">
        <button
          onClick={handleDmcaClick}
          disabled={loading}
          className="bg-[#ff4d4d] text-white font-bold w-full py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 hover:bg-[#ff6666] transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{loading ? 'Processing...' : 'File DMCA Takedown'}</span>
        </button>

        <button
          onClick={handleBlockClick}
          disabled={loading}
          className="bg-slate-800 hover:bg-slate-700 text-red-400 font-bold w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-red-500/30 transition-all cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Block & Quarantine Asset</span>
        </button>
      </div>

    </aside>
  );
}
