'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f8f9fa] flex flex-col relative overflow-hidden">
      <Header />

      <main className="flex-1 w-full pt-32 pb-24 px-6 sm:px-12 md:px-16 max-w-3xl mx-auto z-10">
        <h1 className="editorial-title text-4xl sm:text-5xl font-normal text-white mb-6">Terms of Service & GDPR</h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8">
          This document describes our terms of service, publisher copyrights, and how we handle personal data in compliance with GDPR.
        </p>

        <div className="bg-[#121215]/20 border border-white/5 p-8 rounded-2xl flex flex-col gap-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">1. Intellectual Property & Citation</h2>
            <p>
              The content published on NEXUSMAG (including text, layout designs, and custom infographics) is protected by copyright law. You are welcome to quote our articles, provided that you always supply a visible, clickable hyperlink back to the original article page.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">2. Personal Data Protection (GDPR)</h2>
            <p className="mb-2">
              We process personal data in compliance with the General Data Protection Regulation (GDPR).
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li><strong>Newsletter subscriptions:</strong> When you subscribe, we store only your email address for the purpose of sending updates. You can unsubscribe at any time via the link in the footer of any newsletter email.</li>
              <li><strong>Inquiry forms:</strong> Details sent through our cooperation form are used exclusively to process your inquiry and establish business negotiations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">3. User Rights</h2>
            <p>
              Under GDPR, you have the right to request access to, rectification of, or erasure of your personal data stored with us. For inquiries regarding data protection, please contact us at <a href="mailto:info@nexusmag.eu" className="text-[#c5ff2e] hover:underline">info@nexusmag.eu</a>.
            </p>
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
