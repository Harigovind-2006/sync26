'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldAlert, X, ExternalLink } from 'lucide-react';

interface BreachPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  filename?: string;
}

export default function BreachPopup({ isOpen, onClose, message, filename }: BreachPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Auto close after 8 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, 8000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      {/* Dark overlay backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-md bg-[#0d1117] border border-red-500/50 rounded-2xl shadow-2xl shadow-red-500/20 overflow-hidden flex flex-col pointer-events-auto transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}
      >
        {/* Animated header background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-red-500/20 to-transparent pointer-events-none" />
        
        {/* Close button */}
        <button 
          onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-10 flex flex-col items-center text-center relative z-10 space-y-5">
          {/* Pulsing Alert Icon */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-red-500/20 rounded-full animate-ping" />
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/40 rounded-full flex items-center justify-center backdrop-blur-md relative z-10 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Breach Detected!</h2>
            {filename && (
              <p className="text-sm font-mono text-red-400 font-bold bg-red-500/10 py-1 px-3 rounded inline-block border border-red-500/20">
                {filename}
              </p>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-[#131924] p-4 rounded-xl border border-white/5">
            {message}
          </p>

          <button 
            onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
            className="w-full mt-2 bg-red-500 hover:bg-red-400 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            Acknowledge Alert
          </button>
        </div>
      </div>
    </div>
  );
}
