'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from './components/Footer';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    { title: 'AI Image Protection', desc: 'Secure coordinates mapping blocks commercial scraping vectors.' },
    { title: 'Invisible Digital Watermark', desc: 'Cryptographic steganography woven directly inside pixel channels.' },
    { title: 'Ownership Verification', desc: 'Denial-proof ledger lookup provides absolute authentication records.' },
    { title: 'Tamper Detection', desc: 'Crawler notifies you of deepfakes, crop adjustments, and face-swaps.' },
    { title: 'Secure Cloud Storage', desc: 'Encrypted storage blocks unauthorized metadata extractions.' },
    { title: 'Instant Image Analysis', desc: 'Verify ownership credentials from external files in seconds.' }
  ];

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Establish your secure cryptographic creator profile.' },
    { num: '02', title: 'Login Securely', desc: 'Authenticate with Multi-Factor or Social tokens.' },
    { num: '03', title: 'Upload Image', desc: 'Drag-and-drop JPG, PNG, WEBP files up to 20MB.' },
    { num: '04', title: 'AI Watermarking', desc: 'PIXIE engine embeds invisible steganography payloads.' },
    { num: '05', title: 'Secure Management', desc: 'Manage protected images and download files.' }
  ];

  const testimonials = [
    { quote: "Standard EXIF metadata takes seconds to strip. Lakxam Rekha embeds copyright signatures directly in the pixels. It saved my fashion portfolio from AI model scraping.", author: "Anna Dvorakova", role: "Landscape Photographer" },
    { quote: "When a deepfaked face-swap of our campaign started circulating on media, Lakxam Rekha crawled and identified it within 5 minutes, allowing our legal team to act immediately.", author: "Julian Mercer", role: "Safety Lead, luxury brand" }
  ];

  const faqs = [
    { q: "Is the watermark visible to viewers?", a: "No, the watermark is completely invisible to the human eye. It operates by making micro-adjustments in spatial pixel frequency bands, maintaining full image rendering quality." },
    { q: "Does the signature survive cropping or compression?", a: "Yes. Because signature payloads are distributed redundantly across multiple color frequency blocks, the watermark survives cropping down to 15%, image conversion, and high-compression rates." },
    { q: "How does the notification crawler operate?", a: "Our globally distributed web scraping network indexes public image directories, forums, and dataset portals, matching extracted pixels against our registered signatures." }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-[#f8f9fa] flex flex-col relative overflow-hidden font-sans">
      
      {/* Decorative gradient spot glows */}
      <div className="absolute top-[10%] left-[-15%] w-[500px] h-[500px] bg-[#9b51e0]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] bg-[#00b0ff]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-12">
        <motion.div
          className="max-w-4xl flex flex-col items-center gap-6 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[9px] uppercase font-bold text-[#00b0ff] tracking-widest bg-[#00b0ff]/10 border border-[#00b0ff]/20 px-3.5 py-1 rounded-full font-mono">
            Cryptographic Digital Rights
          </span>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-[#9b51e0]">
            Protect Your Digital <br /> Ownership with AI
          </h1>
          
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xl leading-relaxed">
            Upload images, generate invisible ownership signatures, verify authenticity, and secure your intellectual property against unauthorized deepfakes and AI model training scrapers.
          </p>

          <div className="flex items-center gap-4 mt-4 font-mono text-[9px] uppercase tracking-widest font-bold">
            <Link href="/signup" className="px-6 py-3.5 bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] text-black rounded-full hover:brightness-110 transition-all shadow-lg shadow-[#9b51e0]/10">
              Get Started
            </Link>
            <a href="#features" className="px-6 py-3.5 border border-white/10 hover:border-white/20 text-white rounded-full transition-all">
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full z-10" id="features">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">Security Features</h2>
          <p className="text-zinc-500 text-xs mt-1">Multi-layered cryptographic defense shields for artists and photographers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-[#090812]/40 border border-white/5 p-6 rounded-[24px] hover:border-[#9b51e0]/30 transition-colors duration-300">
              <h3 className="font-mono text-white text-xs font-bold uppercase mb-2">{feat.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed font-sans">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">How It Works</h2>
          <p className="text-zinc-500 text-xs mt-1">Secure watermark lifecycle from upload to real-time notification warnings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((st, idx) => (
            <div key={idx} className="bg-[#090812]/20 border border-white/5 p-5 rounded-[24px] relative">
              <span className="text-2xl font-mono font-black text-[#9b51e0]/20 absolute top-4 right-4">{st.num}</span>
              <h3 className="font-mono text-white text-xs font-bold uppercase mb-2 mt-4">{st.title}</h3>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-20 px-6 max-w-4xl mx-auto w-full z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">Secured Creators</h2>
          <p className="text-zinc-500 text-xs mt-1">What photographers and security officers are saying about us.</p>
        </div>

        <div className="flex flex-col gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#090812]/40 border border-[#9b51e0]/10 p-8 rounded-[24px] relative">
              <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                <span className="text-[#00b0ff] font-bold">{t.author}</span>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="py-20 px-6 max-w-3xl mx-auto w-full z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">FAQ Section</h2>
          <p className="text-zinc-500 text-xs mt-1 font-sans">Common queries regarding our cryptographic algorithms.</p>
        </div>

        <div className="flex flex-col gap-4 font-sans text-xs">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#090812]/40 border border-white/5 rounded-2xl overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-5 font-semibold text-white flex justify-between items-center outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-[#9b51e0] font-bold font-mono">{activeFaq === idx ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pt-1 text-zinc-500 leading-relaxed font-normal">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
