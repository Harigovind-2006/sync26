'use client';

import React, { useState, useMemo } from 'react';
import SearchDropdown from './SearchDropdown';
import MasonryGrid from './MasonryGrid';
import ScannerDemo from '../components/ScannerDemo';
import { mockCards, mockAlerts } from '../lib/mockData';

export default function HomeContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter case studies based on user inputs
  const filteredCards = useMemo(() => {
    return mockCards.filter((card) => {
      const matchesCategory =
        selectedCategory === 'All' || card.category === selectedCategory;
      
      const matchesSearch =
        searchQuery.trim() === '' ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full flex-1 flex flex-col pt-12 pb-24 px-6 max-w-7xl mx-auto z-10">
      
      {/* Sandbox Scanner Simulation */}
      <section className="w-full mb-16">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-2">
          <h2 className="text-[10px] uppercase font-extrabold tracking-widest text-zinc-500 font-mono">
            Interactive Spatial Pixel Checker
          </h2>
          <span className="text-[9px] uppercase font-bold text-[#C8FF2E] font-mono">Simulate Checks</span>
        </div>
        <ScannerDemo />
      </section>

      {/* Live Alerts Feed Console */}
      <section className="w-full mb-16 font-mono text-[10px]">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-2">
          <h2 className="text-[10px] uppercase font-extrabold tracking-widest text-zinc-500">
            Live Web Crawler Flags Feed
          </h2>
          <span className="text-[9px] uppercase font-bold text-[#C8FF2E] animate-pulse flex items-center gap-1">
            <span className="w-1 h-1 bg-[#C8FF2E] rounded-full"></span> Active Scrapers
          </span>
        </div>

        <div className="bg-[#111113]/40 border border-white/5 rounded-2xl overflow-hidden text-zinc-400">
          <div className="grid grid-cols-12 gap-2 bg-white/[0.01] border-b border-white/5 p-4 uppercase font-bold text-[9px] tracking-wider text-zinc-500">
            <div className="col-span-2">Alert ID</div>
            <div className="col-span-3">Protected Asset</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-3">Edit Flagged</div>
            <div className="col-span-2 text-right">Logged</div>
          </div>

          <div className="flex flex-col">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="grid grid-cols-12 gap-2 p-4 items-center border-b border-white/5 hover:bg-white/[0.01] transition-all"
              >
                <div className="col-span-2 text-[#00f3ff] font-bold">{alert.id}</div>
                <div className="col-span-3 text-white truncate pr-2">{alert.fileName}</div>
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                      alert.status === 'Flagged'
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                        : 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/20'
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
                <div className="col-span-3 truncate pr-2">{alert.modification}</div>
                <div className="col-span-2 text-zinc-600 text-right">{alert.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Search and Masonry Gallery */}
      <section className="w-full pt-8 border-t border-white/5">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-2">
          <h2 className="text-[10px] uppercase font-extrabold tracking-widest text-zinc-500 font-mono">
            Security Incident Logs & Case Studies
          </h2>
          <span className="text-[9px] uppercase font-bold text-zinc-600 font-mono">Chronological grid</span>
        </div>

        {/* Live Search and Dropdown filters */}
        <SearchDropdown
          searchVal={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCat={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Masonry Pinterest Grid */}
        <MasonryGrid items={filteredCards} />
      </section>

    </div>
  );
}
