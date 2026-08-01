'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/nexusmagcz/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/nexus-mag/' },
    { name: 'Facebook', href: 'https://www.facebook.com/nexusmagcz' },
    { name: 'YouTube', href: 'https://www.youtube.com/@NexusMagCZ' },
  ];

  return (
    <footer className="w-full bg-[#08090a] border-t border-white/5 py-16 px-6 sm:px-16 flex flex-col items-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand details */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center bg-white text-black font-extrabold rounded-sm text-xs">
              N
            </div>
            <span className="font-extrabold tracking-widest text-sm text-white">NEXUSMAG</span>
          </Link>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-6">
            Exploring the intersection of AI, technology, design, copywriting, art, and marketing. Smart content without corporate clichés.
          </p>
        </div>

        {/* Categories / Navigation links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Sections</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
            <li>
              <Link href="/" className="hover:text-brand-neon transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/cooperation" className="hover:text-brand-neon transition-colors">Cooperation & Partnerships</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-neon transition-colors">About Us / Manifesto</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter subscription panel */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Stay Updated</h4>
          <p className="text-zinc-400 text-xs leading-5">
            Subscribe to our newsletter for exclusive insights, tips, and trends curated by creators.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-neon hover:bg-brand-neon-hover text-black text-xs font-bold rounded-lg transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-brand-neon text-xs font-semibold animate-pulse">
              Awesome! You have successfully subscribed to NEXUSMAG.
            </p>
          )}
        </div>
      </div>

      {/* Border separator and copyright */}
      <div className="w-full max-w-5xl mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[11px] text-zinc-500">
          © {new Date().getFullYear()} NEXUSMAG. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
