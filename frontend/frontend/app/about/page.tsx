'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export default function About() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#f8f9fa] flex flex-col relative overflow-hidden">
      <Header />

      {/* Decorative background glow */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="flex-1 w-full pt-28 pb-20 px-6 sm:px-12 md:px-16 max-w-4xl mx-auto z-10">
        
        {/* Intro */}
        <section className="flex flex-col gap-6 mb-16" id="algorithm">
          <span className="text-[9px] uppercase font-bold text-[#00f3ff] tracking-widest bg-[#00f3ff]/10 px-3 py-1 rounded-full w-max font-mono">
            Spatial Steganography
          </span>

          <h1 className="editorial-title text-4xl sm:text-6xl font-normal text-white tracking-tight leading-tight">
            How Pixie Works
          </h1>

          <p className="text-lg sm:text-2xl font-light text-zinc-400 leading-relaxed tracking-wide font-sans">
            Unlike traditional metadata containers (EXIF/IPTC) or visible overlays which are easily cropped, compressed, or wiped, Pixie writes cryptographic signatures directly into the color space frequencies of individual pixels.
          </p>
        </section>

        {/* Algorithm steps grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-16 mb-20 font-mono text-xs">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full"></span>
              1. Spatial Shift
            </h3>
            <p className="text-zinc-500 leading-relaxed font-sans">
              Pixie converts images into the frequency domain. We shift color values of low-frequency pixel arrays. The adjustments are completely invisible to the human eye but highly structured to machine decoders.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full"></span>
              2. Redundancy Weave
            </h3>
            <p className="text-zinc-500 leading-relaxed font-sans">
              The signature payload is woven across multiple grid cells. Even if an image is cropped down to 15%, compressed to low-quality JPEG, or rescaled, the signature remains extractable.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full"></span>
              3. Model Resistance
            </h3>
            <p className="text-zinc-500 leading-relaxed font-sans">
              Because our watermarks are embedded at the pixel level, they survive model training weights. If an AI generator uses your image in its training set, generated outputs will carry decoded traces of your signature.
            </p>
          </div>
        </section>

        {/* Scraper Network Explainer */}
        <section className="w-full border-t border-white/5 pt-16 mb-12 font-mono text-xs" id="crawler">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-500">Autonomous Web Crawlers</h2>
              <p className="text-zinc-500 text-[11px] mt-2 font-sans">Our scraping nodes catalog the web to protect your rights.</p>
            </div>
            
            <div className="flex-1 flex flex-col gap-6 text-zinc-400 font-sans text-sm leading-relaxed">
              <p>
                Pixie deploys a proprietary, distributed web-scraping crawler network that indexes public social media channels, stock photography platforms, visual forums, and generative model dataset checkpoints.
              </p>
              <p>
                When our decoders extract a signature match, we run a pixel-differential analysis comparing the detected asset against your original file. This highlights modifications—identifying if the image was cropped, color-altered, or used in generative face-swap/deepfake edits.
              </p>
              <div className="p-4 bg-[#121215]/20 border border-white/5 rounded-xl text-zinc-300 font-mono text-xs flex items-center justify-between">
                <span>Network Crawler Nodes: 124 Active</span>
                <span className="text-[#00f3ff] font-bold">Scanning Live</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
