'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const platformLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'About Us', href: '/about' },
    { name: 'Developer API', href: '/cooperation' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/terms#privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Imprint', href: '/tiraz' },
  ];

  return (
    <footer className="w-full bg-[#050508] border-t border-[#9b51e0]/10 pt-16 pb-12 px-6 sm:px-12 md:px-24 text-zinc-500 font-sans text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group font-mono text-xs">
            <div className="w-5 h-5 bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] text-black font-extrabold rounded flex items-center justify-center text-[10px]">
              L
            </div>
            <span className="font-black tracking-widest text-white uppercase text-[11px]">
              LAKXAM REKHA
            </span>
          </Link>
          <p className="text-zinc-500 leading-relaxed max-w-sm">
            Lakxam Rekha embeds invisible, cryptographic steganography signatures inside pixel matrices. Our background scraper node networks scan web platforms to protect your visual copyrights.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 flex flex-col gap-3 font-mono">
          <h4 className="text-[9px] font-bold uppercase tracking-wider text-white">Platform</h4>
          <ul className="flex flex-col gap-2 text-[10px]">
            {platformLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-[#9b51e0] transition-colors duration-200">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Legal & Policy Links */}
        <div className="md:col-span-3 flex flex-col gap-3 font-mono">
          <h4 className="text-[9px] font-bold uppercase tracking-wider text-white">Legal</h4>
          <ul className="flex flex-col gap-2 text-[10px]">
            {legalLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-[#9b51e0] transition-colors duration-200">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom details */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-zinc-600 text-[10px] leading-relaxed font-mono">
        <div className="max-w-2xl flex flex-col gap-2">
          <p>
            Images processed by Lakxam Rekha carry pixel-level signatures. Any unauthorized reproduction, commercial scraping, or deepfaking of protected assets will trigger crawler logs and takedown warnings.
          </p>
          <p>
            Lakxam Rekha security services are operated by Jan Kudláček, with registered office at Bahno-Příkopy 1283, 738 01 Frýdek-Místek, Czech Republic. Business ID (IČ): 06322794.
          </p>
        </div>
        <div className="flex flex-col gap-1 md:text-right shrink-0">
          <p>© {new Date().getFullYear()} Lakxam Rekha. All rights reserved.</p>
          <p className="text-[#9b51e0]/40 font-semibold uppercase tracking-wider">Language: English | Theme: Lakxam Gradients</p>
        </div>
      </div>
    </footer>
  );
}
