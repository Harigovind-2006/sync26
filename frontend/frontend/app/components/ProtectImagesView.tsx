'use client';

import React, { useState, useEffect } from 'react';
import { getLiveAssets, ApiAssetItem } from '../../lib/api';
import { AssetItem } from './AssetInspector';
import { AlertTriangle, ExternalLink, ShieldCheck, Lock, Clock, Sparkles } from 'lucide-react';

interface ProtectImagesViewProps {
  selectedAsset: AssetItem | null;
  onSelectAsset: (asset: AssetItem) => void;
  searchQuery: string;
}

export default function ProtectImagesView({ selectedAsset, onSelectAsset, searchQuery }: ProtectImagesViewProps) {
  const [filterPill, setFilterPill] = useState<'all' | 'watermarked' | 'alerts' | 'polygon'>('all');
  const [assets, setAssets] = useState<ApiAssetItem[]>([]);

  useEffect(() => {
    getLiveAssets().then((data) => {
      if (data) setAssets(data);
    }).catch(() => {});
  }, []);

  const filteredAssets = assets.filter((a) => {
    const matchesSearch = 
      a.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterPill === 'watermarked') return a.status === 'watermarked';
    if (filterPill === 'alerts') return a.status === 'alert';
    return true;
  });

  return (
    <div className="p-8 space-y-8 flex-1 overflow-y-auto">
      
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-3">
        
        <button
          onClick={() => setFilterPill('all')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            filterPill === 'all'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
              : 'bg-[#161e2e] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          All Assets (1,248)
        </button>

        <button
          onClick={() => setFilterPill('watermarked')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            filterPill === 'watermarked'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
              : 'bg-[#161e2e] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Watermarked (892)
        </button>

        <button
          onClick={() => setFilterPill('alerts')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            filterPill === 'alerts'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
              : 'bg-[#161e2e] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Alerts (12)
        </button>

        <button
          onClick={() => setFilterPill('polygon')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            filterPill === 'polygon'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
              : 'bg-[#161e2e] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Polygon Network
        </button>

      </div>

      {/* Spacious Asset Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => {
          const isSelected = selectedAsset?.id === asset.id;
          const isAlert = asset.status === 'alert';

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className={`lens-glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between select-none relative ${
                isSelected
                  ? 'border-sky-400 ring-2 ring-sky-400/40 shadow-xl shadow-sky-500/10'
                  : isAlert
                  ? 'border-red-500/50 hover:border-red-500'
                  : 'hover:border-white/20'
              }`}
            >
              {/* Image Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={asset.imageUrl}
                  alt={asset.filename}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {/* Filename overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-xs font-mono text-white truncate max-w-[80%] border border-white/10">
                    {asset.filename}
                  </span>

                  {isAlert && (
                    <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center shadow-lg">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body & Status */}
              <div className="p-5 space-y-4">
                
                {/* Status Badge */}
                <div>
                  {asset.status === 'watermarked' && (
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-2 uppercase tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      WATERMARKED
                    </span>
                  )}
                  {asset.status === 'pending' && (
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      PENDING
                    </span>
                  )}
                  {asset.status === 'alert' && (
                    <span className="text-xs font-bold text-red-400 flex items-center gap-2 uppercase tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      ALERT DETECTED
                    </span>
                  )}
                </div>

                {/* Protection & Licensee Row */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Protection</span>
                    <span className="text-slate-200 font-semibold">{asset.protectionType}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>Licensee</span>
                    <span className="text-slate-200 font-semibold">{asset.licensee}</span>
                  </div>
                </div>

                {/* Alert Misuse Banner */}
                {isAlert && (
                  <div className="pt-3 border-t border-red-500/20 flex items-center justify-between text-xs text-red-400 font-bold">
                    <span>Misuse Detected</span>
                    <span className="flex items-center gap-1 hover:underline">
                      View Incident <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
