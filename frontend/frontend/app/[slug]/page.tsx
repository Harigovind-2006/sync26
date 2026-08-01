'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { articles, authors, Article } from '../data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DynamicPage({ params }: PageProps) {
  const { slug } = use(params);

  // 1. Check if the slug belongs to an author
  const author = authors[slug];
  const authorArticles = author
    ? articles.filter((a) => a.author.slug === slug)
    : [];

  // 2. Check if the slug belongs to an article
  const article = articles.find((a) => a.slug === slug);

  // 3. Recommended articles for article detail page (excluding the current one)
  const recommendedArticles = article
    ? articles.filter((a) => a.slug !== slug).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-brand-dark text-foreground flex flex-col relative overflow-hidden">
      <Header />

      {/* Background visual element */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-neon/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[150px]"></div>
      </div>

      <main className="flex-1 w-full pt-32 pb-24 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto z-10">
        {/* AUTHOR PROFILE PAGE LAYOUT */}
        {author && (
          <div className="flex flex-col items-center">
            {/* Header Graphics Section */}
            <div className="w-full flex items-center justify-center gap-4 py-8 mb-6 relative select-none">
              {/* Flanking Grayscale Avatars */}
              <div className="hidden md:flex gap-4 items-center">
                <img src={author.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover filter grayscale opacity-25" />
                <img src={author.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover filter grayscale opacity-45" />
                <img src={author.avatarUrl} alt="" className="w-14 h-14 rounded-full object-cover filter grayscale opacity-65" />
              </div>

              {/* Central Logo 'N' */}
              <div className="w-24 h-24 bg-zinc-950 border-2 border-brand-neon rounded-3xl flex items-center justify-center shadow-xl shadow-brand-neon/10 relative">
                <span className="text-white text-4xl font-black">N</span>
                {/* Miniature grayscale avatar in bottom corner */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-zinc-950 overflow-hidden">
                  <img src={author.avatarUrl} alt="" className="w-full h-full object-cover filter grayscale" />
                </div>
              </div>

              {/* Flanking Grayscale Avatars */}
              <div className="hidden md:flex gap-4 items-center">
                <img src={author.avatarUrl} alt="" className="w-14 h-14 rounded-full object-cover filter grayscale opacity-65" />
                <img src={author.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover filter grayscale opacity-45" />
                <img src={author.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover filter grayscale opacity-25" />
              </div>
            </div>

            {/* Author Title and Bio Panel */}
            <div className="text-center max-w-2xl flex flex-col items-center gap-4 mb-16">
              <div className="flex items-center gap-3 justify-center">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Articles by {author.name}
                </h1>
                <div className="px-3 py-1 bg-white/10 text-brand-neon text-xs font-bold rounded-lg uppercase">
                  {author.articleCount} articles
                </div>
              </div>
              <p className="text-brand-neon font-bold text-xs uppercase tracking-widest">{author.role}</p>
              <p className="text-zinc-400 text-sm leading-relaxed mt-2">{author.bio}</p>

              {/* Social Link */}
              {author.linkedinUrl && (
                <a
                  href={author.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs font-bold text-white hover:text-brand-neon uppercase tracking-wider flex items-center gap-1 border border-white/10 px-4 py-2 rounded-full hover:border-brand-neon/30 transition-all duration-200"
                >
                  LinkedIn Profile
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            {/* Articles List */}
            <div className="w-full">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-500 mb-8 border-b border-white/5 pb-4">
                Published works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {authorArticles.map((art) => (
                  <article
                    key={art.slug}
                    className="flex flex-col bg-zinc-950/60 border border-white/5 rounded-2xl overflow-hidden group hover:border-brand-neon/30 hover:shadow-xl hover:shadow-brand-neon/[0.02] transition-all duration-300"
                  >
                    <Link href={`/${art.slug}`} className="relative aspect-[3/2] overflow-hidden bg-zinc-900 block">
                      <img src={art.imageUrl} alt={art.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-wider font-extrabold text-brand-neon rounded-md">
                        {art.category}
                      </span>
                    </Link>
                    <div className="p-6 flex flex-col flex-1 gap-3">
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                        <span>{art.publishedAt}</span>
                        <span>•</span>
                        <span>{art.readTime} min read</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-neon transition-colors duration-200">
                        <Link href={`/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2">{art.subtitle}</p>
                      <Link href={`/${art.slug}`} className="text-[10px] font-bold text-brand-neon uppercase tracking-wider mt-auto pt-4 border-t border-white/5 flex items-center gap-1 hover:translate-x-1 transition-transform">
                        Read Article
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            {/* Meta Tags */}
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-brand-neon uppercase tracking-widest font-extrabold mb-4">
              <span>{article.category}</span>
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
              <span className="text-zinc-400">{article.publishedAt}</span>
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
              <span className="text-zinc-400">{article.readTime} min read</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-center text-white tracking-tight leading-tight max-w-4xl mb-6">
              {article.title}
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg text-center max-w-3xl leading-relaxed mb-12">
              {article.subtitle}
            </p>

            {/* Vertical Shutter Slice Image Header Effect */}
            <div className="w-full max-w-4xl aspect-[16/10] sm:aspect-[21/9] mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative shutter-container cursor-pointer select-none">
              <div className="w-full h-full flex">
                {Array.from({ length: article.sliceCount }).map((_, idx) => {
                  const sliceWidthPercent = 100 / article.sliceCount;
                  const offsetPercent = idx * sliceWidthPercent;
                  return (
                    <div
                      key={idx}
                      className="h-full flex-1 relative overflow-hidden shutter-slice"
                      style={{
                        transitionDelay: `${idx * 0.04}s`,
                      }}
                    >
                      <div
                        className="absolute top-0 bottom-0"
                        style={{
                          left: `-${idx * 100}%`,
                          width: `${article.sliceCount * 100}%`,
                          backgroundImage: `url(${article.imageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Article Content Container */}
            <div className="w-full max-w-3xl glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 mb-16">
              {/* Author Badge */}
              <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-white/10 w-full">
                <Link href={`/${article.author.slug}`}>
                  <img
                    src={article.author.avatarUrl}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </Link>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Written by</span>
                  <Link href={`/${article.author.slug}`} className="text-sm font-bold text-white hover:text-brand-neon transition-colors">
                    {article.author.name}
                  </Link>
                  <span className="text-[11px] text-zinc-400">{article.author.role}</span>
                </div>
              </div>

              {/* Dynamic Content Rendering */}
              <div className="flex flex-col gap-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
                {article.content.map((block, idx) => {
                  switch (block.type) {
                    case 'paragraph':
                      return <p key={idx}>{block.text}</p>;
                    case 'heading':
                      return (
                        <h2 key={idx} className="text-xl sm:text-2xl font-black text-white tracking-tight mt-6 mb-2">
                          {block.text}
                        </h2>
                      );
                    case 'subheading':
                      return (
                        <h3 key={idx} className="text-base sm:text-lg font-bold text-white tracking-tight mt-4">
                          {block.text}
                        </h3>
                      );
                    case 'quote':
                      return (
                        <blockquote
                          key={idx}
                          className="pl-6 border-l-4 border-brand-neon my-6 text-white italic text-base sm:text-lg bg-white/[0.02] py-4 pr-4 rounded-r-xl"
                        >
                          &ldquo;{block.text}&rdquo;
                        </blockquote>
                      );
                    case 'list':
                      return (
                        <ul key={idx} className="list-disc pl-6 flex flex-col gap-2 my-2 text-zinc-400">
                          {block.items?.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>

            {/* Recommended Next Articles */}
            <div className="w-full border-t border-white/5 pt-16">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-zinc-500 mb-8 text-center">
                Read next in NEXUSMAG
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {recommendedArticles.map((rec) => (
                  <Link
                    key={rec.slug}
                    href={`/${rec.slug}`}
                    className="flex flex-col bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-brand-neon/30 transition-all duration-350"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                      <img src={rec.imageUrl} alt="" className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex flex-col gap-2">
                      <span className="text-[9px] uppercase font-bold text-brand-neon tracking-wider">{rec.category}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-neon transition-colors duration-200 line-clamp-2">
                        {rec.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 404 PAGE NOT FOUND FALLBACK */}
        {!author && !article && (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
            <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-brand-neon">
              ?
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              We couldn&apos;t find the article or profile page you were looking for. It may have been relocated or translated.
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-brand-neon hover:bg-brand-neon-hover text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
