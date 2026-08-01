'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DetailWindowProps {
  photo: any;
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function DetailWindow({ photo, onClose, onRemove }: DetailWindowProps) {
  if (!photo) return null;

  // Set default details if missing in standard mock card object
  const sigCode = photo.payloadId || 'PX-SIG-9012A';
  const resolution = photo.res || '3840 x 5760';
  const pixels = photo.pixels || '22,118,400';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Fly-out drawer panel */}
      <motion.div
        className="relative h-full w-full sm:w-[440px] bg-[#111113] border-l border-white/5 shadow-2xl p-8 flex flex-col justify-between font-mono text-xs text-zinc-400 z-10 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-white uppercase font-bold text-[10px] tracking-wider">Asset Details</h3>
            <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
              ✕ Close
            </button>
          </div>

          {/* Thumbnail preview */}
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/5 relative">
            <img src={photo.imageUrl} alt="" className="w-full h-full object-cover filter brightness-90" />
            <span className="absolute bottom-3 left-3 bg-black/85 border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-wider font-extrabold text-[#C8FF2E] rounded">
              Secured
            </span>
          </div>

          {/* Title and metadata */}
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-sm font-bold truncate uppercase">{photo.title}</h2>
            <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
              {photo.description}
            </p>
          </div>

          {/* Grid of parameters */}
          <div className="flex flex-col gap-2.5 bg-black/30 border border-white/5 p-4 rounded-xl">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-500">Signature ID:</span>
              <span className="text-[#C8FF2E] font-bold">{sigCode}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-500">Resolution:</span>
              <span className="text-white">{resolution}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-500">Watermarked Pixels:</span>
              <span className="text-white">{pixels}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-500">Active Scan Rate:</span>
              <span className="text-white">Every 10 mins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Takedown Hooks:</span>
              <span className="text-white">Auto DMCA Payload</span>
            </div>
          </div>

          {/* Crawler History logs */}
          <div className="flex flex-col gap-2">
            <h4 className="text-white uppercase font-bold text-[9px] tracking-wider">Crawl Log Console</h4>
            <div className="bg-black/50 p-4 border border-white/5 rounded-xl font-mono text-[9px] text-zinc-500 leading-relaxed flex flex-col gap-1.5">
              <div>&gt; matching coordinates ledger... 100% OK</div>
              <div>&gt; indexed 4,821 nodes across dataset catalog...</div>
              <div className="text-green-500">&gt; Status: SECURE (No modifications flagged)</div>
            </div>
          </div>
        </div>

        {/* Delete Trigger */}
        <button
          onClick={() => {
            onRemove(photo.id);
            onClose();
          }}
          className="w-full mt-8 py-3.5 border border-red-500/20 hover:border-red-500 text-red-500 hover:bg-red-500/5 font-extrabold text-[9px] uppercase tracking-widest rounded-xl transition-all font-mono"
        >
          Remove Protection & Delete Signature
        </button>
      </motion.div>
    </div>
  );
}
