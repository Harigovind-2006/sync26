'use client';

import React, { useState } from 'react';
import { AssetItem } from './AssetInspector';
import { AlertTriangle, ExternalLink, ShieldCheck, Lock, Clock, Sparkles } from 'lucide-react';

interface ProtectImagesViewProps {
  selectedAsset: AssetItem | null;
  onSelectAsset: (asset: AssetItem) => void;
  searchQuery: string;
}

const mockAssets: AssetItem[] = [
  {
    id: 'LT-8849-PX9',
    filename: 'urban_exploration_09.jpg',
    title: 'Urban Exploration Night Cityscape',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    status: 'alert',
    protectionType: 'DWT Embedded',
    licensee: 'Client X (#BUYER_8942)',
    sha256: '7f9c2a8e4b1d0f5c6e8b2a4f6d8c0e2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e',
    blockchainTx: '0x7f...3a89e92bc',
    confidence: 98.4,
    incidentUrl: 'instagram.com/p/B9x890a...',
    incidentTime: '2 hours ago',
    verifiedBlock: '14,892,102',
  },
  {
    id: 'LT-7712-A01',
    filename: 'sunset_shoot_01.jpg',
    title: 'Sunset Horizon Mountain Shoot',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    status: 'watermarked',
    protectionType: 'DWT Embedded',
    licensee: 'Client A',
    sha256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    blockchainTx: '0x3a89f...91bc',
    confidence: 99.1,
    verifiedBlock: '14,890,442',
  },
  {
    id: 'LT-5509-B44',
    filename: 'studio_session_44.jpg',
    title: 'Fashion Studio Portrait Session',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    status: 'pending',
    protectionType: 'Not Protected',
    licensee: 'Unassigned',
    sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    blockchainTx: '0x1120a...55f2',
    confidence: 0,
    verifiedBlock: '14,888,100',
  },
  {
    id: 'LT-3388-C99',
    filename: 'coastal_waves_12.jpg',
    title: 'Luminous Coastal Ocean Waves',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    status: 'watermarked',
    protectionType: 'DWT Embedded',
    licensee: 'Client B',
    sha256: '4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
    blockchainTx: '0x551f0...b23d',
    confidence: 97.8,
    verifiedBlock: '14,885,020',
  },
];

export default function ProtectImagesView({ selectedAsset, onSelectAsset, searchQuery }: ProtectImagesViewProps) {
  const [filterPill, setFilterPill] = useState<'all' | 'watermarked' | 'alerts' | 'polygon'>('all');

  const filteredAssets = mockAssets.filter((a) => {
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
