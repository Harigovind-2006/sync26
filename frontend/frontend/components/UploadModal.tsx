'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: (newPhoto: any) => void;
}

export default function UploadModal({ onClose, onUploadSuccess }: UploadModalProps) {
  const [photoName, setPhotoName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [encodeStep, setEncodeStep] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoName.trim()) return;

    setIsProcessing(true);
    
    const steps = [
      'Generating cryptographic hash keys...',
      'Mapping RGB color spaces in low frequency bands...',
      'Weaving spatial signature signatures...',
      'Synchronizing metadata ledger...',
      'Success! File secured in crawler network.'
    ];

    let currentStep = 0;
    setEncodeStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setEncodeStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsProcessing(false);

        // Select a random premium Unsplash placeholder image to simulate successful upload
        const randomImages = [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400&h=400',
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400&h=400',
          'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=400&h=400'
        ];
        const randomUrl = randomImages[Math.floor(Math.random() * randomImages.length)];

        // Append generated photo payload
        const randomSig = `PX-SIG-${Math.floor(1000 + Math.random() * 9000)}B`;
        const dateStr = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        onUploadSuccess({
          id: String(Date.now()),
          slug: `secure-${photoName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: photoName,
          description: `Protected asset secured on ${dateStr}. System monitoring crawler logs actively.`,
          category: 'Art',
          imageUrl: randomUrl,
          aspectRatio: 'aspect-[1/1]',
          publishedAt: dateStr,
          readTime: 5,
          author: {
            name: 'Console Operator',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
            role: 'Security Staff',
            slug: 'operator'
          },
          payloadId: randomSig,
          res: '4000 x 4000',
          pixels: '16,000,000'
        });
        
        onClose();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Outer panel container */}
      <motion.div
        className="w-full max-w-md bg-[#111113] border border-white/5 p-8 rounded-[24px] shadow-2xl relative font-mono text-xs text-zinc-400 flex flex-col gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-white uppercase font-bold text-[10px] tracking-wider">Secure New File</h3>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        {isProcessing ? (
          <div className="py-12 flex flex-col items-center gap-4 text-center">
            <div className="relative w-24 h-24 rounded-xl border border-white/10 overflow-hidden bg-black/35 flex items-center justify-center">
              <div className="scanner-line"></div>
              <div className="scanner-grid"></div>
            </div>
            <div className="text-[10px] text-[#C8FF2E] animate-pulse">
              {encodeStep}
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="uppercase font-bold text-[9px] tracking-wider">Asset Label Name</label>
              <input
                type="text"
                value={photoName}
                onChange={(e) => setPhotoName(e.target.value)}
                required
                placeholder="e.g. fashion_portrait_spring_campaign"
                className="px-4 py-3 bg-black border border-white/10 rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none focus:border-[#C8FF2E] transition-all font-sans"
              />
            </div>

            <div className="border border-dashed border-white/10 rounded-xl p-8 text-center flex flex-col items-center gap-2 bg-black/25">
              <svg className="w-8 h-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-[10px] text-zinc-500">Drag image here or click selector</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C8FF2E] hover:bg-[#b5eb25] text-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all duration-200 mt-2 font-mono"
            >
              Encode & Secure Watermark
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
