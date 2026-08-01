'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchDropdownProps {
  searchVal: string;
  onSearchChange: (val: string) => void;
  selectedCat: string;
  onCategoryChange: (val: string) => void;
}

export default function SearchDropdown({
  searchVal,
  onSearchChange,
  selectedCat,
  onCategoryChange,
}: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['All', 'AI', 'Art', 'News', 'Technology', 'Marketing'];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl mx-auto mb-12 font-mono text-xs z-20 relative">
      
      {/* Live Search Input */}
      <div className="relative w-full sm:w-80">
        <input
          type="text"
          placeholder="Search incident database..."
          value={searchVal}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#090909]/60 border border-white/5 focus:border-[#C8FF2E] rounded-full text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
        />
        <svg
          className="w-4 h-4 text-zinc-600 absolute left-4 top-3.5"
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

      {/* Category Dropdown */}
      <div className="relative w-full sm:w-48">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-3 bg-[#090909]/60 border border-white/5 hover:border-white/10 rounded-full text-white font-medium focus:outline-none"
        >
          <span>{selectedCat === 'All' ? 'All Categories' : selectedCat}</span>
          <motion.svg
            className="w-4 h-4 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-14 left-0 right-0 z-30 bg-[#090909]/95 border border-white/5 rounded-2xl p-2 shadow-2xl backdrop-blur-md overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onCategoryChange(cat);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold uppercase transition-colors text-[10px] tracking-wider ${
                      selectedCat === cat
                        ? 'bg-[#C8FF2E] text-black'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
