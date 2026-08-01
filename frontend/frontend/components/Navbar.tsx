'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/#features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/cooperation', label: 'Contact' },
    { href: '/login', label: 'Login' },
  ];

  return (
    <AnimatePresence>
      <motion.header
        className="fixed top-6 left-1/2 z-40 w-[90%] max-w-4xl -translate-x-1/2"
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ type: 'spring' as const, stiffness: 260, damping: 25 }}
      >
        <div className="flex h-14 items-center justify-between px-6 bg-[#090812]/75 border border-[#9b51e0]/10 rounded-full backdrop-blur-lg shadow-xl shadow-black/40">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group font-mono text-xs">
            <div className="w-5 h-5 bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] text-black font-extrabold rounded flex items-center justify-center text-[10px]">
              L
            </div>
            <span className="font-black tracking-widest text-white uppercase text-[11px]">
              LAKXAM REKHA
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-widest font-bold">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? 'text-[#9b51e0]'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            href="/signup"
            className="px-4 py-1.5 bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] hover:brightness-110 text-black font-extrabold text-[9px] uppercase tracking-widest rounded-full transition-all duration-200 font-mono shadow-md"
          >
            Get Started
          </Link>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
