'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogIn, UserPlus, Sparkles, BookOpen, Handshake, Info, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenAuth?: () => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export default function Header({ onOpenAuth, user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Magazine', href: '/', icon: BookOpen },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Cooperation', href: '/cooperation', icon: Handshake },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090a]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-zinc-950 border-2 border-brand-neon rounded-xl flex items-center justify-center shadow-lg shadow-brand-neon/20 group-hover:rotate-6 transition-transform duration-300">
            <span className="text-white text-xl font-black">N</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-widest text-white leading-none group-hover:text-brand-neon transition-colors">
              NEXUS<span className="text-brand-neon">MAG</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase mt-0.5">
              AI • Art • Technology • Copywriting
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-neon text-black shadow-md shadow-brand-neon/20'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons / User Profile */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-3.5 py-1.5 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-brand-neon text-black font-bold text-xs flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{user.email}</p>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="ml-2 text-[11px] font-bold text-zinc-400 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-black bg-brand-neon hover:bg-brand-neon-hover rounded-xl shadow-lg shadow-brand-neon/20 transition-all hover:scale-105"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Join NEXUSMAG
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white bg-white/5 rounded-xl border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-zinc-950/95 border border-white/10 rounded-2xl space-y-3 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-zinc-200 hover:bg-white/10"
              >
                <Icon className="w-4 h-4 text-brand-neon" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-white bg-white/10 rounded-xl"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-black bg-brand-neon rounded-xl"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
