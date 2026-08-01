'use client';

import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('nexusmag_cookie_consent');
    if (!consent) {
      // Delay visibility slightly for clean entry animation
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nexusmag_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('nexusmag_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-12 md:right-auto md:max-w-xl z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl shadow-black/90 backdrop-blur-md">
        <h3 className="text-sm font-bold text-white mb-2">Cookie settings</h3>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our{' '}
          <a href="#" className="underline text-white hover:text-brand-neon transition-colors">
            Cookie Policy
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-2.5 justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-semibold rounded-lg transition-all"
          >
            Decline All
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-brand-neon hover:bg-brand-neon-hover text-black text-xs font-bold rounded-lg transition-all duration-200"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
