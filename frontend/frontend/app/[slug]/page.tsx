'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { mockCards, mockAuthors } from '../../lib/mockData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DynamicPage({ params }: PageProps) {
  const { slug } = use(params);

  const author = mockAuthors[slug];
  const authorArticles = author
    ? mockCards.filter((a) => a.author.slug === slug)
    : [];

  const article = mockCards.find((a) => a.slug === slug);

  const recommendedArticles = article
    ? mockCards.filter((a) => a.slug !== article.slug).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-[#020205] text-[#f8f9fa] flex flex-col relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 w-full pt-28 pb-24 px-6 sm:px-12 md:px-16 max-w-4xl mx-auto z-10">

        {/* AUTHOR PROFILE PAGE LAYOUT */}
        {author && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#090812] border border-[#9b51e0]/10 rounded-2xl flex items-center justify-center shadow-lg relative mb-6">
              <span className="text-[#00b0ff] text-3xl font-mono font-black">L</span>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border border-zinc-950 overflow-hidden">
                <img src={author.avatarUrl} alt="" className="w-full h-full object-cover filter grayscale" />
              </div>
            </div>

            <div className="text-center max-w-xl flex flex-col items-center gap-3 mb-16 font-mono text-xs">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{author.name}</h1>
              <p className="text-[#9b51e0] font-bold text-xs uppercase tracking-widest">{author.role}</p>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mt-2 font-sans">{author.bio}</p>
            </div>

            <div className="w-full font-mono text-xs">
              <h2 className="text-[9px] uppercase font-extrabold tracking-widest text-zinc-500 mb-6 border-b border-white/5 pb-3">
                Authored Case Studies & Briefings
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {authorArticles.map((art) => (
                  <article key={art.slug} className="bg-[#090812]/40 border border-white/5 rounded-[24px] overflow-hidden group hover:border-[#9b51e0]/20 transition-all duration-300 flex flex-col">
                    <Link href={`/${art.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-zinc-900">
                      <img src={art.imageUrl} alt={art.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 filter brightness-90" />
                      <span className="absolute top-4 left-4 bg-black border border-white/10 px-2 py-0.5 text-[8px] uppercase tracking-wider font-extrabold text-[#00b0ff] rounded">
                        {art.category}
                      </span>
                    </Link>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-2.5 text-[9px] text-zinc-500 uppercase font-bold tracking-wider">
                        <span>{art.publishedAt}</span>
                        <span>•</span>
                        <span>{art.readTime} min read</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#9b51e0] transition-colors leading-snug">
                        <Link href={`/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-zinc-500 text-xs font-sans leading-relaxed line-clamp-2">{art.description}</p>
                      <Link href={`/${art.slug}`} className="text-[9px] font-bold text-[#9b51e0] uppercase tracking-wider mt-auto pt-4 border-t border-white/5 flex items-center gap-1 hover:translate-x-1 transition-transform">
                        Read Briefing
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ARTICLE DETAIL LAYOUT */}
        {article && (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2.5 text-[9px] sm:text-[10px] text-[#9b51e0] uppercase tracking-widest font-extrabold mb-4 font-mono">
              <span>{article.category}</span>
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
              <span className="text-zinc-500">{article.publishedAt}</span>
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
              <span className="text-zinc-500">{article.readTime} min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-white tracking-tight leading-tight max-w-3xl mb-6">
              {article.title}
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base text-center max-w-2xl leading-relaxed mb-10">
              {article.description}
            </p>

            <div className="w-full aspect-[16/9] mb-12 rounded-[24px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
              <img src={article.imageUrl} alt="" className="w-full h-full object-cover filter brightness-90" />
            </div>

            <div className="w-full bg-[#090812]/40 border border-white/5 p-6 sm:p-10 rounded-[24px] mb-12">
              <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-white/5 w-full font-mono text-xs">
                <Link href={`/${article.author.slug}`}>
                  <img src={article.author.avatarUrl} alt={article.author.name} className="w-10 h-10 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300" />
                </Link>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Security Analyst</span>
                  <Link href={`/${article.author.slug}`} className="text-xs font-bold text-white hover:text-[#9b51e0] transition-colors">{article.author.name}</Link>
                  <span className="text-[10px] text-zinc-500">{article.author.role}</span>
                </div>
              </div>

              <div className="flex flex-col gap-6 text-zinc-400 text-xs sm:text-sm leading-relaxed">
                <p>As AI generative models and web-scraping crawler arrays grow in size, protecting copyrighted visual creations becomes a primary security mandate. Standard metadata headers are stripped in seconds by hosting platforms, leaving images anonymous and vulnerable to theft.</p>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-6 mb-2 font-mono uppercase">Pixel frequency domain signatures</h2>
                <p>Lakxam Rekha embeds multi-bit cryptographic signatures directly into spatial frequency spaces using discrete cosine transform color-shifting. These pixel shifts are completely below human visual perception thresholds but are easily readable by our decoders, even after resizing, cropping, and high-compression conversion.</p>
                <blockquote className="pl-5 border-l-2 border-[#9b51e0] my-5 text-white italic text-xs sm:text-sm bg-[#9b51e0]/5 py-3 pr-3 rounded-r-lg font-mono">
                  &ldquo;Steganographic watermarking provides creator verification that remains resilient, creating undeniable proof of digital rights infringement.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="w-full border-t border-white/5 pt-12">
              <h3 className="text-[9px] uppercase font-extrabold tracking-widest text-zinc-500 mb-6 text-center font-mono">Related Security Briefings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full font-mono text-[10px]">
                {recommendedArticles.map((rec) => (
                  <Link key={rec.slug} href={`/${rec.slug}`} className="flex flex-col bg-[#090812]/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-[#9b51e0]/20 transition-all">
                    <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                      <img src={rec.imageUrl} alt="" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 filter brightness-90" />
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <span className="text-[8px] uppercase font-bold text-[#00b0ff] tracking-wider">{rec.category}</span>
                      <h4 className="text-[10px] sm:text-xs font-bold text-white group-hover:text-[#9b51e0] transition-colors line-clamp-2 leading-snug">{rec.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 404 FALLBACK */}
        {!author && !article && (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-4 font-mono text-xs">
            <div className="w-16 h-16 bg-[#090812] border border-[#9b51e0]/10 rounded-2xl flex items-center justify-center text-2xl font-black text-[#9b51e0]">?</div>
            <h1 className="text-xl font-bold text-white tracking-tight">Registry Entry Not Found</h1>
            <p className="text-zinc-600 text-xs max-w-xs leading-relaxed font-sans">No matching case file or analyst profile belongs to this key. Verify parameters and retry.</p>
            <Link href="/" className="px-5 py-2.5 bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] text-black text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">
              Back to Console
            </Link>
          </div>
        )}
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
