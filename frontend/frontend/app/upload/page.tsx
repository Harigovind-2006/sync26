'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useImages } from '../../context/ImageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { addPhoto } = useImages();

  // Navigation protection
  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  // States
  const [phase, setPhase] = useState<'idle' | 'processing' | 'result'>('idle');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [resolution, setResolution] = useState('');
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [watermarkId, setWatermarkId] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const processingSteps = [
    { text: 'Uploading image buffer...', minProgress: 0 },
    { text: 'Generating unique spatial watermark...', minProgress: 20 },
    { text: 'Embedding invisible signature payload...', minProgress: 50 },
    { text: 'Encrypting ownership metadata ledger...', minProgress: 75 },
    { text: 'Saving assets securely...', minProgress: 90 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 20MB
    const limit = 20 * 1024 * 1024;
    if (file.size > limit) {
      alert('File size exceeds the 20 MB limit.');
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    
    // Pick random resolution mockup
    const resolutions = ['3840 x 2160', '4000 x 3000', '6000 x 4000'];
    setResolution(resolutions[Math.floor(Math.random() * resolutions.length)]);

    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
      startProcessing();
    };
    reader.readAsDataURL(file);
  };

  const startProcessing = () => {
    setPhase('processing');
    setProgress(0);
    setStepText(processingSteps[0].text);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        
        // Find matching step based on progress
        const currentStep = [...processingSteps].reverse().find(s => next >= s.minProgress);
        if (currentStep) setStepText(currentStep.text);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const sig = `PX-SIG-${Math.floor(1000 + Math.random() * 9000)}L`;
            setWatermarkId(sig);
            setPhase('result');
            
            // Add secured photo to global Context
            addPhoto({
              id: String(Date.now()),
              slug: `secure-${fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
              title: fileName.replace(/\.[^/.]+$/, ''),
              description: `AI secured asset. Protected signature ${sig} monitoring internet.`,
              category: 'Art',
              imageUrl: imageUrl,
              aspectRatio: 'aspect-[1/1]',
              publishedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              readTime: 4,
              author: {
                name: user?.name || 'Operator',
                role: 'Security Executive',
                avatarUrl: user?.avatarUrl || '',
                slug: 'operator'
              },
              payloadId: sig,
              res: resolution,
              pixels: '12,000,000'
            });

          }, 400);
          return 100;
        }
        return next;
      });
    }, 45);
  };

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-[#020205] text-[#f8f9fa] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <nav className="h-16 border-b border-[#9b51e0]/10 bg-[#090812]/50 backdrop-blur-md sticky top-0 z-30 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group font-mono text-xs">
          <div className="w-5 h-5 bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] text-black font-extrabold rounded flex items-center justify-center text-[10px]">
            L
          </div>
          <span className="font-black tracking-widest text-white uppercase text-[11px]">
            LAKXAM REKHA
          </span>
        </Link>
        <div className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-widest font-bold">
          <Link href="/home" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/upload" className="text-[#9b51e0]">Upload</Link>
          <Link href="/profile" className="text-zinc-400 hover:text-white transition-colors">Profile</Link>
          <button onClick={() => router.push('/')} className="text-zinc-500 hover:text-white transition-colors uppercase font-mono font-bold text-[9px]">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Sandbox upload block */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10 flex flex-col justify-center items-center z-10">
        
        {/* IDLE Drag and Drop area */}
        {phase === 'idle' && (
          <div className="w-full max-w-xl flex flex-col gap-6 text-center font-mono">
            <div>
              <h1 className="text-lg uppercase font-bold text-white tracking-wider">AI Cryptographic Uploader</h1>
              <p className="text-zinc-500 text-xs mt-1 font-sans">Verify, tag, and steganography watermark your high-res files.</p>
            </div>

            <label className="flex flex-col items-center justify-center border border-dashed border-[#9b51e0]/30 hover:border-[#9b51e0]/60 bg-[#090812]/40 rounded-[24px] p-12 cursor-pointer transition-all min-h-[250px] relative overflow-hidden group">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <svg className="w-10 h-10 text-zinc-600 mb-3 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-white text-xs font-bold font-sans">Drag & Drop your image here</span>
              <span className="text-[10px] text-zinc-500 mt-2">Supported: JPG, PNG, JPEG, WEBP. Max 20 MB.</span>
              <span className="px-4 py-2 bg-gradient-to-r from-[#9b51e0]/20 to-[#00b0ff]/20 border border-[#9b51e0]/20 group-hover:border-[#9b51e0]/50 text-white rounded-full mt-6 text-[9px] uppercase tracking-widest font-bold">
                Browse Files
              </span>
            </label>
          </div>
        )}

        {/* PROCESSING Animation view */}
        {phase === 'processing' && (
          <div className="w-full max-w-sm flex flex-col gap-6 text-center font-mono">
            <div className="relative w-32 h-32 rounded-2xl border border-white/5 overflow-hidden bg-black/40 mx-auto flex items-center justify-center shadow-2xl">
              <img src={imageUrl} alt="" className="w-full h-full object-cover filter brightness-50" />
              <div className="scanner-line"></div>
              <div className="scanner-grid"></div>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <span className="text-[#00b0ff] animate-pulse text-[10px] uppercase font-bold tracking-wider">{stepText}</span>
              {/* Progress gauge bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] transition-all duration-75" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-[10px] text-zinc-500">{progress}%</span>
            </div>
          </div>
        )}

        {/* RESULT displays */}
        {phase === 'result' && (
          <div className="w-full max-w-3xl flex flex-col gap-8">
            <div className="text-center font-mono">
              <h2 className="text-[#00ff66] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 animate-bounce">
                <span className="w-2 h-2 bg-[#00ff66] rounded-full"></span>
                Watermark Embedded Successfully
              </h2>
              <p className="text-zinc-500 text-[10px] mt-1 font-sans">Compare visual rendering and retrieve signature hash ledger cards below.</p>
            </div>

            {/* Side-by-side view */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#090812]/40 border border-white/5 p-4 rounded-[24px]">
                <h4 className="font-mono text-zinc-500 text-[9px] uppercase tracking-wider mb-2 text-center">Original Image</h4>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-white/5">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="bg-[#090812]/40 border border-[#9b51e0]/10 p-4 rounded-[24px]">
                <h4 className="font-mono text-[#9b51e0] text-[9px] uppercase tracking-wider mb-2 text-center">Protected Image (Invisible Watermark)</h4>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-white/5 relative">
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#9b51e0]/2 opacity-5 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Signature Metrics panel */}
            <div className="bg-[#090812]/40 border border-white/5 p-6 rounded-[24px] grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-[10px]">
              <div>
                <span className="text-zinc-500 block mb-1">Watermark ID</span>
                <span className="text-[#00b0ff] font-bold">{watermarkId}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Owner Registry ID</span>
                <span className="text-white truncate block">{user.email}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Secured Date</span>
                <span className="text-white block">{new Date().toLocaleString()}</span>
              </div>
            </div>

            {/* Verify alert prompt */}
            {isVerified && (
              <div className="p-4 bg-[#00ff66]/5 border border-[#00ff66]/15 text-[#00ff66] font-mono text-[9px] rounded-xl flex items-center justify-between">
                <span>Ledger Match: Watermark signature authenticated. Registered Owner: {user.name}.</span>
                <button onClick={() => setIsVerified(false)} className="text-white font-bold">✕</button>
              </div>
            )}

            {/* Buttons list */}
            <div className="flex flex-wrap justify-center gap-4 font-mono text-[9px] uppercase tracking-widest font-bold">
              <a
                href={imageUrl}
                download={`secured_${fileName}`}
                className="px-5 py-3 bg-[#00b0ff] hover:bg-[#0090ff] text-black rounded-full shadow-lg shadow-[#00b0ff]/10"
              >
                Download Protected Image
              </a>
              <button
                onClick={() => setIsVerified(true)}
                className="px-5 py-3 border border-[#9b51e0]/30 hover:border-[#9b51e0] text-[#9b51e0] rounded-full"
              >
                Verify Ownership
              </button>
              <button
                onClick={() => {
                  setPhase('idle');
                  setImageUrl('');
                  setFileName('');
                  setIsVerified(false);
                }}
                className="px-5 py-3 border border-white/10 hover:border-white/20 text-white rounded-full"
              >
                Secure Another Image
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
