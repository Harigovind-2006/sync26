'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface TopHeaderProps {
  onOpenUpload: () => void;
  assetCount: number;
}

export default function TopHeader({ onOpenUpload, assetCount }: TopHeaderProps) {
  return (
    <header className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-[#0d1117] shrink-0">
      
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Manage Assets</h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{assetCount} assets · {assetCount} protected</p>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onOpenUpload}
        className="bg-[#00e5a3] text-[#051b14] font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-[#00e5a3]/20 hover:bg-[#14f3b2] hover:shadow-[#00e5a3]/35 hover:scale-[1.02] transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Upload & Watermark New Image</span>
      </button>

    </header>
  );
}
