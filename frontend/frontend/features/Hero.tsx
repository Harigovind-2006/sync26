'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-[#090909]">
      
      {/* Floating Background Glow Blobs */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-[#C8FF2E]/5 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 10,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#00f3ff]/5 rounded-full blur-[140px] pointer-events-none"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 12,
          ease: 'easeInOut',
        }}
      />

      {/* Hero Content Container */}
      <motion.div
        className="z-10 max-w-4xl flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tag */}
        <motion.span
          className="text-[9px] uppercase font-bold text-[#C8FF2E] tracking-widest bg-[#C8FF2E]/10 border border-[#C8FF2E]/20 px-3.5 py-1 rounded-full font-mono"
          variants={itemVariants}
        >
          Secure Steganography Protocol
        </motion.span>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tight text-white leading-tight uppercase"
          variants={itemVariants}
        >
          Cryptographic <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF2E] to-[#00f3ff]">
            Pixel-Level
          </span>{' '}
          Watermarking
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-zinc-500 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed"
          variants={itemVariants}
        >
          PIXIE encodes spatial signatures directly into individual pixel frequencies. Our autonomous crawler networks scan the web, triggering instant notification protocols if your portraits are scraped, modified, or deepfaked.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex items-center gap-4 mt-4 font-mono text-[10px] uppercase tracking-widest font-bold"
          variants={itemVariants}
        >
          <Link
            href="/cooperation#inquiry"
            className="px-6 py-3.5 bg-[#C8FF2E] hover:bg-[#b5eb25] text-black rounded-full transition-all duration-300 shadow-lg shadow-[#C8FF2E]/10 interactive-hover"
          >
            Protect My Work
          </Link>
          <a
            href="#grid-gallery"
            className="px-6 py-3.5 border border-white/10 hover:border-white/20 text-white rounded-full transition-all duration-300 interactive-hover"
          >
            Explore Case Files
          </a>
        </motion.div>
      </motion.div>

      {/* Centered Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 font-mono text-[8px] uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="animate-bounce">Scroll Down</span>
        <div className="w-1 h-8 rounded-full bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 h-3 bg-[#C8FF2E] rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

    </section>
  );
}
