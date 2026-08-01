'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/cooperation', label: 'Cooperation' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-lg flex flex-col pointer-events-auto">
        {/* Navigation Bar */}
        <div className="h-14 px-6 flex items-center justify-between bg-black border border-white/10 rounded-full shadow-lg shadow-black/50 backdrop-blur-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              width="24"
              height="24"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-110"
            >
              <rect width="40" height="40" rx="8" fill="black" />
              <path
                d="M10 30V10H16.5L23.5 20.5V10H30V30H23.5L16.5 19.5V30H10Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-sans font-extrabold tracking-widest text-sm text-white group-hover:text-brand-neon transition-colors">
              NEXUSMAG
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden sm:flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'text-brand-neon font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="mt-2 p-4 flex flex-col gap-3 bg-black border border-white/10 rounded-2xl shadow-xl shadow-black/85 animate-in fade-in slide-in-from-top-2 duration-200">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-900 text-brand-neon'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
