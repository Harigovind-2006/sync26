'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, LogOut } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logged = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(logged);
    }
  }, []);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      router.push('/login');
    }
  };

  return (
    <header className="w-full h-20 px-6 md:px-12 border-b border-white/10 flex items-center justify-between bg-[#070a0f]/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-sky-400 p-[1.5px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#070a0f] rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
        </div>
        <div>
          <span className="text-xl font-black tracking-tight text-white block leading-none font-sans">
            Laxman<span className="text-amber-400">Rekha</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider">DIGITAL COPYRIGHT AI</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-amber-400 transition-colors">
          About
        </Link>
        <Link href="/architecture" className="hover:text-amber-400 transition-colors">
          Architecture
        </Link>
      </nav>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <button
            onClick={handleSignOut}
            className="text-xs font-bold text-slate-400 hover:text-red-400 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        )}

        <Link
          href="/login"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:scale-105 transition-all cursor-pointer"
        >
          <span>Launch App</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </header>
  );
}
