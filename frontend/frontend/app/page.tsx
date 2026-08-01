'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { articles, authors } from './data/articles';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');
  const [recommendedOnly, setRecommendedOnly] = useState<boolean>(false);

  // Core category list
  const categories = ['All', 'Art', 'Technology', 'Copywriting', 'AI', 'Creativity', 'Marketing'];

  // Filter Logic
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAuthor =
        selectedAuthor === 'All' || article.author.slug === selectedAuthor;

      const matchesRecommended = !recommendedOnly || article.recommended;

      return matchesCategory && matchesSearch && matchesAuthor && matchesRecommended;
    });
  }, [selectedCategory, searchQuery, selectedAuthor, recommendedOnly]);

  return (
    <div className="min-h-screen bg-brand-dark text-foreground flex flex-col relative overflow-hidden">
      {/* Background Neon Scribbles SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-100,200 C300,50 600,600 800,250 C1000,-100 1300,400 1700,100"
            fill="none"
            stroke="#c5ff2e"
            strokeWidth="2"
            className="scribble-animation"
          />
          <path
            d="M100,800 C400,600 800,900 1100,500 C1400,100 1500,800 1900,450"
            fill="none"
            stroke="#c5ff2e"
            strokeWidth="1.5"
            className="scribble-animation"
            style={{ animationDelay: '-1.5s' }}
          />
        </svg>
      </div>

      <Header />

      <main className="flex-1 w-full pt-32 pb-24 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full mb-16 relative flex flex-col items-center select-none text-center">
          {/* Giant Wordmark Title */}
          <div className="relative w-full py-8 flex flex-col items-center justify-center">
            <h1 className="text-[12vw] font-black leading-none uppercase tracking-tighter text-zinc-900/50 select-none pointer-events-none font-sans flex items-center justify-center">
              NEXUS
              {/* Floating logo N in center */}
              <div className="mx-4 w-[10vw] h-[10vw] max-w-[120px] max-h-[120px] min-w-[50px] min-h-[50px] bg-zinc-950 border-2 border-brand-neon rounded-[2.5vw] flex items-center justify-center shadow-2xl shadow-brand-neon/20 hover:rotate-12 transition-transform duration-300 pointer-events-auto cursor-pointer">
                <span className="text-white text-[5vw] max-text-6xl font-black">N</span>
              </div>
              MAG
            </h1>

            {/* Scattered rotating floating pills */}
            <div className="absolute top-4 left-[15%] rotate-[-12deg] bg-brand-neon text-black font-bold uppercase text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-md animate-bounce hover:scale-105 transition-transform duration-200">
              Copywriting
            </div>
            <div className="absolute top-1/2 right-[10%] rotate-[8deg] bg-zinc-950 border border-white/10 text-white font-bold uppercase text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200">
              AI
            </div>
            <div className="absolute bottom-4 left-[25%] rotate-[5deg] bg-zinc-950 border border-white/10 text-white font-bold uppercase text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200">
              Marketing
            </div>
            <div className="absolute top-8 right-[25%] rotate-[-6deg] bg-brand-neon text-black font-bold uppercase text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200">
              Design
            </div>
          </div>

          {/* Description Glass Container */}
          <div className="w-full max-w-4xl mt-8 p-8 sm:p-12 glass-panel rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 text-left items-center border border-white/5">
            <div className="md:col-span-6 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <h2 className="text-xl sm:text-2xl font-black leading-tight text-white tracking-tight">
                NEXUSMAG
              </h2>
              <p className="text-brand-neon font-bold text-xs uppercase tracking-wider mt-1.5">
                Magazine for creators
              </p>
            </div>
            <div className="md:col-span-6">
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Following trends in marketing, AI, design, copywriting, and art. We select only the ideas and analyses worth your reading time. No corporate fluff, just raw insights.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="w-full max-w-6xl mb-12 p-6 glass-panel rounded-2xl flex flex-col gap-6">
          {/* Keyword Search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search articles, keywords, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 focus:border-brand-neon focus:ring-1 focus:ring-brand-neon rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-all"
              />
              <svg
                className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Dropdown Filters and Toggle */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
              {/* Author Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Author:</span>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-neon transition-colors"
                >
                  <option value="All">All Authors</option>
                  {Object.values(authors).map((author) => (
                    <option key={author.slug} value={author.slug}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recommended Toggle */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={recommendedOnly}
                  onChange={(e) => setRecommendedOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-neon peer-checked:after:bg-black peer-checked:after:border-transparent relative"></div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 peer-checked:text-brand-neon transition-colors">
                  Recommended Only
                </span>
              </label>
            </div>
          </div>

          {/* Category Badges Grid */}
          <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand-neon text-black font-extrabold shadow-md shadow-brand-neon/10'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* Article Cards Grid */}
        <section className="w-full max-w-6xl">
          {filteredArticles.length === 0 ? (
            <div className="w-full py-16 text-center glass-panel rounded-2xl border border-white/5">
              <svg
                className="w-12 h-12 text-zinc-600 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-base font-semibold text-white">No articles found</h3>
              <p className="text-zinc-500 text-xs mt-1">Try resetting your filters or modifying your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="flex flex-col bg-zinc-950/60 border border-white/5 rounded-2xl overflow-hidden group hover:border-brand-neon/30 hover:shadow-xl hover:shadow-brand-neon/[0.02] transition-all duration-300"
                >
                  {/* Card Image */}
                  <Link href={`/${article.slug}`} className="relative aspect-[3/2] overflow-hidden bg-zinc-900 block">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Category Overlay Tag */}
                    <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-wider font-extrabold text-brand-neon rounded-md">
                      {article.category}
                    </span>
                    {/* Recommended Tag */}
                    {article.recommended && (
                      <span className="absolute top-4 right-4 bg-brand-neon text-black px-2 py-0.5 text-[9px] uppercase tracking-wider font-extrabold rounded-md shadow-md">
                        Featured
                      </span>
                    )}
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 gap-3.5">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                      <span>{article.publishedAt}</span>
                      <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                      <span>{article.readTime} min read</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-neon transition-colors duration-200 line-clamp-2">
                      <Link href={`/${article.slug}`}>{article.title}</Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.subtitle}
                    </p>

                    {/* Footer / Author */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <Link href={`/${article.author.slug}`} className="flex items-center gap-2 group/author">
                        <img
                          src={article.author.avatarUrl}
                          alt={article.author.name}
                          className="w-6 h-6 rounded-full object-cover filter grayscale"
                        />
                        <span className="text-[11px] font-semibold text-zinc-400 group-hover/author:text-white transition-colors">
                          {article.author.name}
                        </span>
                      </Link>

                      <Link
                        href={`/${article.slug}`}
                        className="text-[10px] font-bold text-brand-neon uppercase tracking-wider flex items-center gap-1 hover:translate-x-1 transition-transform"
                      >
                        Read
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
