'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export default function Tiraz() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f8f9fa] flex flex-col relative overflow-hidden">
      <Header />

      <main className="flex-1 w-full pt-32 pb-24 px-6 sm:px-12 md:px-16 max-w-3xl mx-auto z-10">
        <h1 className="editorial-title text-4xl sm:text-5xl font-normal text-white mb-6">Masthead / Imprint (Tiráž)</h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8">
          Information in accordance with Section 5 of the Czech Act on Certain Information Society Services and other press laws.
        </p>

        <div className="bg-[#121215]/20 border border-white/5 p-8 rounded-2xl flex flex-col gap-6 text-xs sm:text-sm text-zinc-300">
          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Publisher & Operator</h2>
            <p className="font-semibold text-white">Jan Kudláček</p>
            <p>Registered Address: Bahno-Příkopy 1283</p>
            <p>738 01 Frýdek-Místek</p>
            <p>Czech Republic</p>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Business Registration</h2>
            <p>Registered in the Czech Trade Register (Živnostenský rejstřík)</p>
            <p>Business Identification Number (IČ): 06322794</p>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Contact Details</h2>
            <p>Email: <a href="mailto:info@nexusmag.eu" className="text-[#c5ff2e] hover:underline">info@nexusmag.eu</a></p>
            <p>Website: <a href="https://www.nexusmag.eu" className="text-[#c5ff2e] hover:underline">www.nexusmag.eu</a></p>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Editor-in-Chief</h2>
            <p>Jan Kudláček</p>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Disclaimer</h2>
            <p className="leading-relaxed">
              We are responsible for our own content on these pages. Although our articles are prepared with the greatest care, we cannot guarantee the complete accuracy, completeness, or timeliness of the information. All links to external websites are checked, but we do not assume responsibility for external contents.
            </p>
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
