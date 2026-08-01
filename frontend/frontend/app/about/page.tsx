'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-dark text-foreground flex flex-col relative overflow-hidden">
      <Header />

      {/* Background neon blur details */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-brand-neon/10 rounded-full blur-[100px] pointer-events-none"></div>

      <main className="flex-1 w-full pt-32 pb-24 px-6 sm:px-12 md:px-16 max-w-4xl mx-auto z-10 flex flex-col justify-center">
        {/* About Manifesto */}
        <section className="flex flex-col gap-8 mb-16">
          <span className="text-[10px] uppercase font-bold text-brand-neon tracking-widest bg-brand-neon/10 px-3 py-1 rounded-full w-max">
            Manifesto
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-zinc-500 tracking-wider">
            What is NEXUSMAG?
          </h1>

          <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight sm:leading-snug tracking-tight">
            NEXUSMAG is a digital magazine for people who <span className="text-brand-neon font-black">create</span>. For copywriters, designers, marketers, strategists, artists, and curious minds who refuse to choose between creativity and technology — because they know that the most interesting things happen precisely where these worlds meet.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-16">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-extrabold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-neon rounded-full"></span>
              Smart Content
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We say no to corporate jargon, empty buzzwords, and AI-generated filler text. Every article is written by experienced professionals and edited for depth.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-extrabold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-neon rounded-full"></span>
              Independent Focus
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our reviews and critiques are completely independent. We call out what works and what doesn&apos;t, providing reviews you can actually trust.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-extrabold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-neon rounded-full"></span>
              Practical Value
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We don&apos;t just comment on trends; we explain how to apply them. Expect step-by-step guides, workflow files, prompts, and templates.
            </p>
          </div>
        </section>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
