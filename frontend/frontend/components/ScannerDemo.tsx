'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ScannerDemo() {
  const [activeSample, setActiveSample] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [alertSimulationActive, setAlertSimulationActive] = useState(false);
  const [alertStep, setAlertStep] = useState('');

  const samples = [
    {
      id: 1,
      name: 'executive_portrait_hq.jpg',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
      res: '3840 x 5760',
      pixels: '22,118,400',
      payloadId: 'PX-SIG-7719B',
    },
    {
      id: 2,
      name: 'fashion_billboard_print.jpg',
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400&h=400',
      res: '4096 x 2730',
      pixels: '11,182,080',
      payloadId: 'PX-SIG-9240A',
    },
    {
      id: 3,
      name: 'landscape_collection_01.jpg',
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400&h=400',
      res: '6000 x 4000',
      pixels: '24,000,000',
      payloadId: 'PX-SIG-3012D',
    }
  ];

  const runScan = (sampleIdx: number) => {
    setActiveSample(sampleIdx);
    setIsScanning(true);
    setScanResult(null);
    setAlertSimulationActive(false);
    
    const steps = [
      'Initializing verification engine...',
      'Reading spatial coordinates...',
      'Checking steganographic arrays...',
      'Matching signatures against ledger...',
      'Watermark verify COMPLETE.'
    ];

    let currentStep = 0;
    setScanStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setScanStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setScanResult(samples[sampleIdx]);
      }
    }, 500);
  };

  const runAlertSimulation = () => {
    if (!scanResult) return;
    setAlertSimulationActive(true);
    setAlertStep('Deploying autonomous crawler checks...');

    const alertSteps = [
      'Indexing public dataset nodes...',
      'Comparing pixel grids...',
      'WARNING: Deepfake derivative detected.',
      'DISPATCHED: Immediate owner alert sent.'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < alertSteps.length) {
        setAlertStep(alertSteps[currentStep]);
      } else {
        clearInterval(interval);
      }
    }, 700);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
      {/* Left Scanner Box */}
      <div className="lg:col-span-6 bg-[#111113]/40 border border-white/5 rounded-[24px] p-6 flex flex-col justify-between min-h-[380px]">
        <div className="flex items-center gap-3.5 mb-6">
          {samples.map((sample, idx) => (
            <button
              key={sample.id}
              onClick={() => runScan(idx)}
              disabled={isScanning}
              className={`px-3 py-2 border text-[9px] font-mono uppercase tracking-widest rounded-full transition-all ${
                activeSample === idx
                  ? 'border-[#C8FF2E] text-[#C8FF2E] bg-[#C8FF2E]/5'
                  : 'border-white/10 text-zinc-500 hover:text-white'
              }`}
            >
              Portrait {idx + 1}
            </button>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center relative aspect-square max-h-[260px] mx-auto rounded-2xl overflow-hidden bg-black/60 border border-white/5">
          {activeSample !== null ? (
            <>
              <img src={samples[activeSample].url} alt="" className="object-cover w-full h-full filter brightness-75" />
              {isScanning && (
                <>
                  <div className="scanner-line"></div>
                  <div className="scanner-grid"></div>
                </>
              )}
            </>
          ) : (
            <span className="text-zinc-600 font-mono text-[10px] text-center px-6">
              Select portrait array to trace spatial pixels
            </span>
          )}
        </div>
      </div>

      {/* Right Console Output Box */}
      <div className="lg:col-span-6 bg-[#111113]/40 border border-white/5 rounded-[24px] p-6 flex flex-col justify-between font-mono text-[11px] leading-relaxed">
        <div className="flex flex-col gap-4">
          <h3 className="text-white uppercase font-bold text-[10px] tracking-wider border-b border-white/5 pb-2">Verified Ledger Logs</h3>
          
          {isScanning && (
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-zinc-500 animate-pulse">
              <span className="text-[#C8FF2E]">&gt;&nbsp;</span>{scanStep}
            </div>
          )}

          {scanResult && !isScanning && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-1 text-zinc-500">
                <div>File ID:</div>
                <div className="text-white text-right font-bold">{scanResult.name}</div>
                <div>Grid Size:</div>
                <div className="text-white text-right">{scanResult.res}</div>
                <div>Watermark Signatures:</div>
                <div className="text-[#C8FF2E] text-right">{scanResult.payloadId}</div>
              </div>
              <div className="p-3 bg-[#00ff66]/5 border border-[#00ff66]/15 rounded-xl text-[#00ff66] font-bold text-center">
                Pixels Secured & Monitoring Active
              </div>
              <button
                onClick={runAlertSimulation}
                className="w-full py-2 border border-red-500/30 hover:border-red-500 text-red-500 rounded-xl transition-all uppercase text-[9px] tracking-widest font-bold"
              >
                Simulate Deepfake Web Repost
              </button>
            </div>
          )}

          {!isScanning && !scanResult && (
            <div className="text-center text-zinc-600 py-12">Console idle. Awaiting selection...</div>
          )}
        </div>

        {alertSimulationActive && (
          <div className="border-t border-white/5 pt-4 mt-4 text-[10px] text-zinc-500">
            <div className="text-red-500 animate-pulse font-bold mb-1">&gt; {alertStep}</div>
            {alertStep.includes('DISPATCHED') && (
              <div className="text-[#00f3ff] bg-[#00f3ff]/5 p-2 rounded-lg border border-[#00f3ff]/20">
                SMS alert sent to Anna: &quot;Deepfake copy of {scanResult.name} detected on public forum. Autotakedown payload generated.&quot;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
