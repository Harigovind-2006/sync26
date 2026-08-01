'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f8f9fa] flex flex-col relative overflow-hidden">
      <Header />

      <main className="flex-1 w-full pt-32 pb-24 px-6 sm:px-12 md:px-16 max-w-3xl mx-auto z-10">
        <h1 className="editorial-title text-4xl sm:text-5xl font-normal text-white mb-6">Cookie Policy</h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8">
          This policy explains how NEXUSMAG uses cookies and similar tracking technologies to improve your reading experience.
        </p>

        <div className="bg-[#121215]/20 border border-white/5 p-8 rounded-2xl flex flex-col gap-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">1. What are cookies?</h2>
            <p>
              Cookies are small text files stored on your browser or device when you visit websites. They help us recognize your settings, keep you signed in (if applicable), and understand how you interact with our articles.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">2. How we use cookies</h2>
            <p className="mb-2">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li><strong>Essential cookies:</strong> Required to enable standard navigation and basic platform features.</li>
              <li><strong>Analytical cookies:</strong> Help us measure readership stats, click-through rates, and average reading time so we can prioritize writing topic areas that you enjoy.</li>
              <li><strong>Functional settings:</strong> Remember your choices, such as filters or search settings.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">3. Managing your consent</h2>
            <p>
              You can accept or decline non-essential cookies via our consent banner at any time, or configure your browser to reject cookies. However, disabling certain categories may impact navigation.
            </p>
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
