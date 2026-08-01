'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, AlertTriangle, ExternalLink } from 'lucide-react';
import { AssetItem } from './AssetInspector';

interface AssetGridProps {
  selectedAsset: AssetItem | null;
  onSelectAsset: (asset: AssetItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const mockAssets: AssetItem[] = [
  {
    id: 'LT-8849-PX9',
    filename: 'urban_exploration_09.jpg',
    title: 'Urban Exploration Night Cityscape',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    status: 'alert',
    protectionType: 'Hidden DWT Watermark',
    licensee: 'Client X',
    sha256: '7f9c2a8e4b1d0f5c6e8b2a4f6d8c0e2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e',
    blockchainTx: '0x7f...3a89e92bc',
    confidence: 98.4,
    incidentUrl: 'instagram.com/p/CxD9_k...',
    incidentTime: '2 hours ago',
    verifiedBlock: '14,892,102',
  },
  {
    id: 'LT-7712-A01',
    filename: 'sunset_shoot_01.jpg',
    title: 'Sunset Mountain Range',
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
    filename: 'studio_session_05.jpg',
    title: 'Studio Session B&W Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    status: 'pending',
    protectionType: 'Not Protected',
    licensee: '-',
    sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    blockchainTx: '0x1120a...55f2',
    confidence: 0,
    verifiedBlock: '14,888,100',
  },
  {
    id: 'LT-3388-C99',
    filename: 'aerial_series_03.jpg',
    title: 'Aerial City Lights Skyline',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce09?auto=format&fit=crop&w=800&q=80',
    status: 'watermarked',
    protectionType: 'Steganographic',
    licensee: 'Agency B',
    sha256: '4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
    blockchainTx: '0x551f0...b23d',
    confidence: 97.8,
    verifiedBlock: '14,885,020',
  },
  {
    id: 'LT-2244-D88',
    filename: 'architecture_raw_11.jpg',
    title: 'Modern Glass Skyscraper Angle',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    status: 'watermarked',
    protectionType: 'DWT Embedded',
    licensee: 'Unlicensed',
    sha256: '8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d',
    blockchainTx: '0x882b9...11aa',
    confidence: 98.9,
    verifiedBlock: '14,880,991',
  },
  {
    id: 'LT-1100-E55',
    filename: 'portrait_editorial_02.jpg',
    title: 'Editorial Studio Model',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    status: 'pending',
    protectionType: 'Queued',
    licensee: '-',
    sha256: '2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
    blockchainTx: '0x441b2...99ee',
    confidence: 0,
    verifiedBlock: '14,875,400',
  },
];

export default function AssetGrid({ selectedAsset, onSelectAsset, searchQuery, setSearchQuery }: AssetGridProps) {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [protectionFilter, setProtectionFilter] = useState('Protection Type');

  const filtered = mockAssets.filter((a) => {
    const matchesSearch = 
      a.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'Alerts' && a.status !== 'alert') return false;
    if (statusFilter === 'Watermarked' && a.status !== 'watermarked') return false;
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* Search Bar & Dropdown Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          
          <div className="flex items-center gap-2 bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white placeholder-slate-500 w-full"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#131924] border border-white/10 rounded-xl px-4 py-2 text-xs text-white appearance-none pr-8 focus:outline-none focus:border-[#00e5a3] cursor-pointer"
            >
              <option>All Status</option>
              <option>Watermarked</option>
              <option>Alerts</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={protectionFilter}
              onChange={(e) => setProtectionFilter(e.target.value)}
              className="bg-[#131924] border border-white/10 rounded-xl px-4 py-2 text-xs text-white appearance-none pr-8 focus:outline-none focus:border-[#00e5a3] cursor-pointer"
            >
              <option>Protection Type</option>
              <option>DWT Embedded</option>
              <option>Steganographic</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>

        <span className="text-xs text-slate-500 font-mono">{filtered.length} results</span>
      </div>

      {/* Grid of 6 Asset Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((asset) => {
          const isSelected = selectedAsset?.id === asset.id;
          const isAlert = asset.status === 'alert';

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className={`bg-[#131924] border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between select-none ${
                isSelected
                  ? 'border-[#00e5a3] ring-1 ring-[#00e5a3]/50 shadow-lg shadow-[#00e5a3]/10'
                  : isAlert
                  ? 'border-red-500/60 ring-1 ring-red-500/40 hover:border-red-500'
                  : 'hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={asset.imageUrl}
                  alt={asset.filename}
                  className="w-full h-full object-cover"
                />

                {/* Top Badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  {/* POL Badge */}
                  <span className="px-2 py-0.5 bg-indigo-900/80 backdrop-blur-md rounded text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                    POL
                  </span>

                  {/* Status Badge */}
                  {asset.status === 'watermarked' && (
                    <span className="px-2.5 py-0.5 bg-emerald-950/80 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Watermarked
                    </span>
                  )}
                  {asset.status === 'pending' && (
                    <span className="px-2.5 py-0.5 bg-amber-950/80 backdrop-blur-md rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Pending
                    </span>
                  )}
                  {asset.status === 'alert' && (
                    <span className="px-2.5 py-0.5 bg-red-950/90 backdrop-blur-md rounded-full text-[10px] font-bold text-red-400 border border-red-500/50 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-400" /> Alert Detected
                    </span>
                  )}
                </div>
              </div>

              {/* Card Meta Body */}
              <div className="p-4 space-y-2.5">
                <h4 className="font-bold text-xs text-white truncate font-mono">{asset.filename}</h4>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{asset.protectionType}</span>
                  {asset.licensee !== '-' && (
                    <span className="px-2 py-0.5 bg-slate-800 text-indigo-300 rounded text-[10px] font-semibold">
                      {asset.licensee}
                    </span>
                  )}
                </div>

                {/* Red Misuse Link */}
                {isAlert && (
                  <div className="pt-2 border-t border-red-500/20 flex items-center justify-between text-[11px] text-red-400 font-bold">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Misuse Detected
                    </span>
                    <span className="hover:underline flex items-center gap-0.5">
                      View Incident <ExternalLink className="w-3 h-3" />
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
