'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  ExternalLink,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function WatermarkView() {
  const [subTab, setSubTab] = useState<'embed' | 'extract'>('embed');

  // Embed form state
  const [title, setTitle] = useState('');
  const [ownerName, setOwnerName] = useState('Elena Rostova Photography');
  const [licenseType, setLicenseType] = useState('Commercial Standard');
  const [embedFile, setEmbedFile] = useState<File | null>(null);
  const [embedPreview, setEmbedPreview] = useState<string | null>(null);
  const [isEmbedding, setIsEmbedding] = useState(false);
  const [embeddedResult, setEmbeddedResult] = useState<any>(null);

  // Extract state
  const [extractFile, setExtractFile] = useState<File | null>(null);
  const [extractPreview, setExtractPreview] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedResult, setExtractedResult] = useState<any>(null);

  const handleEmbedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEmbedFile(file);
      setEmbedPreview(URL.createObjectURL(file));
      setEmbeddedResult(null);
    }
  };

  const handleExtractFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setExtractFile(file);
      setExtractPreview(URL.createObjectURL(file));
      setExtractedResult(null);
    }
  };

  const runEmbedSimulation = () => {
    if (!embedPreview) return;
    setIsEmbedding(true);
    setTimeout(() => {
      setIsEmbedding(false);
      setEmbeddedResult({
        watermarkedUrl: embedPreview,
        payload: `LENSTRACE:550e8400-e29b-41d4-a716-446655440000:${ownerName}`,
        sha256: 'a3f8c9b2d1e0f4a7c8b9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',
        blockchainTx: '0x8f2a41b99c0012e34fa56b78901234567890abcd',
        polygonBlock: '59,204,119',
        timestamp: new Date().toISOString(),
      });
    }, 2500);
  };

  const runExtractSimulation = () => {
    if (!extractPreview) return;
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtractedResult({
        payload: 'LENSTRACE:550e8400-e29b-41d4-a716-446655440000:Elena Rostova',
        confidence: 0.984,
        owner: 'Elena Rostova Photography',
        ownerWallet: '0x71C...39A2',
        licenseId: 'LIC-2026-9042',
        licenseTerms: 'Commercial High-Resolution Web & Print',
        registeredDate: '2026-06-14',
        blockchainVerified: true,
        polygonTx: '0x8f2a41b99c0012e34fa56b78901234567890abcd',
      });
    }, 2200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Studio Header Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" /> DCT Watermark Studio
          </h2>
          <p className="text-xs text-slate-400">Discrete Cosine Transform Frequency-Domain Watermarking</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setSubTab('embed')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              subTab === 'embed'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Embed Watermark
          </button>

          <button
            onClick={() => setSubTab('extract')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              subTab === 'extract'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" /> Extract & Detect
          </button>
        </div>
      </div>

      {/* SUBTAB 1: EMBED WATERMARK */}
      {subTab === 'embed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Embed Config Form */}
          <div className="lg:col-span-5 glass-card p-6 rounded-3xl space-y-5 border border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" /> Copyright Signature Form
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Asset Title</label>
              <input
                type="text"
                placeholder="e.g. Neon Horizon Cityscape"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Copyright Holder Name</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">License Preset</label>
              <select
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option>Commercial Standard</option>
                <option>Personal Exclusive</option>
                <option>Editorial Media Use</option>
              </select>
            </div>

            {/* Drag & Drop Upload */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Select Original Image File</label>
              <label className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all text-center group">
                <Upload className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Click or drag image here</span>
                <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, WEBP up to 25MB</span>
                <input type="file" accept="image/*" onChange={handleEmbedFileChange} className="hidden" />
              </label>
            </div>

            <button
              onClick={runEmbedSimulation}
              disabled={!embedPreview || isEmbedding}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isEmbedding ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-slate-950" />
                  Spawning Python DCT Process...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" /> Embed & Register on Polygon
                </>
              )}
            </button>
          </div>

          {/* Embed Preview & Output Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 rounded-3xl space-y-4 border border-white/10">
              <h3 className="text-sm font-bold text-slate-300 flex items-center justify-between">
                <span>Image Processing View</span>
                {embedFile && <span className="text-xs text-cyan-400 font-mono">{embedFile.name}</span>}
              </h3>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center">
                {embedPreview ? (
                  <img src={embedPreview} alt="Original Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8 text-slate-500 space-y-2">
                    <Layers className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-xs">Upload an image on the left to start embedding</p>
                  </div>
                )}

                {isEmbedding && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-mono text-cyan-300">Computing Frequency Coefficients (Python DCT)...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Embedded Result Display */}
            {embeddedResult && (
              <div className="glass-card p-6 rounded-3xl border border-lime-500/30 bg-gradient-to-br from-slate-900 to-lime-950/20 space-y-4 animate-slideDown">
                <div className="flex items-center gap-2 text-lime-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> DCT Watermark Embedded & Registered on Polygon Amoy!
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-sans block">Watermark Payload Header</span>
                    <span className="text-cyan-300 break-all">{embeddedResult.payload}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-sans block">Cryptographic SHA-256</span>
                    <span className="text-slate-300 break-all">{embeddedResult.sha256.substring(0, 24)}...</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-sans block">Polygon Amoy Block</span>
                    <span className="text-purple-300 font-sans">#{embeddedResult.polygonBlock}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-sans block">Transaction Hash</span>
                    <span className="text-purple-400 font-sans flex items-center gap-1">
                      {embeddedResult.blockchainTx.substring(0, 16)}... <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUBTAB 2: EXTRACT & DETECT */}
      {subTab === 'extract' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Extract Upload Panel */}
          <div className="lg:col-span-5 glass-card p-6 rounded-3xl space-y-5 border border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-cyan-400" /> Suspect Image Scanner
            </h3>
            <p className="text-xs text-slate-400">
              Upload a downloaded or suspect image. Our backend will execute Python DCT extraction scripts to verify hidden payloads and match ownership licenses.
            </p>

            <label className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all text-center group">
              <Upload className="w-10 h-10 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Select Suspect Image to Scan</span>
              <span className="text-[10px] text-slate-400 mt-1">Extracts hidden frequency domain signatures</span>
              <input type="file" accept="image/*" onChange={handleExtractFileChange} className="hidden" />
            </label>

            {extractPreview && (
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10">
                <img src={extractPreview} alt="Suspect preview" className="w-full h-full object-cover" />
              </div>
            )}

            <button
              onClick={runExtractSimulation}
              disabled={!extractPreview || isExtracting}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isExtracting ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-slate-950" />
                  Running Python Frequency Scan...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Extract Hidden Watermark
                </>
              )}
            </button>
          </div>

          {/* Extract Result Output */}
          <div className="lg:col-span-7">
            {extractedResult ? (
              <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 space-y-6 animate-fadeIn">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                    <ShieldCheck className="w-6 h-6" /> Watermark Payload Match Confirmed!
                  </div>
                  <span className="px-3 py-1 bg-lime-400/20 text-lime-400 border border-lime-400/30 rounded-xl text-xs font-bold font-mono">
                    {(extractedResult.confidence * 100).toFixed(1)}% Confidence
                  </span>
                </div>

                <div className="space-y-3 bg-slate-900/80 p-4 rounded-2xl border border-white/5 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-sans">Extracted Payload:</span>
                    <span className="text-cyan-300">{extractedResult.payload}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-sans">Registered Owner:</span>
                    <span className="text-white font-bold font-sans">{extractedResult.owner}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-sans">Owner Wallet Address:</span>
                    <span className="text-purple-300">{extractedResult.ownerWallet}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-sans">Associated License ID:</span>
                    <span className="text-lime-300">{extractedResult.licenseId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Polygon Blockchain Tx:</span>
                    <span className="text-purple-400 font-sans flex items-center gap-1">
                      {extractedResult.polygonTx.substring(0, 16)}... <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="glass-card p-12 rounded-3xl border border-white/10 text-center space-y-3 text-slate-500">
                <Search className="w-12 h-12 mx-auto text-slate-600" />
                <h4 className="text-sm font-bold text-white">No Image Scanned Yet</h4>
                <p className="text-xs max-w-sm mx-auto">
                  Select a suspect image on the left and click "Extract Hidden Watermark" to scan frequency domain coefficients.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
