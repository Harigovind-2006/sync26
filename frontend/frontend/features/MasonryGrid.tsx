'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Card from './Card';
import { CardItem } from '../types';

interface MasonryGridProps {
  items: CardItem[];
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Distribute items up to current pagination index
  const visibleItems = useMemo(() => {
    const list: CardItem[] = [];
    // If we run out of mock items, loop them to simulate infinite database scrolling
    for (let i = 0; i < visibleCount; i++) {
      const originalItem = items[i % items.length];
      list.push({
        ...originalItem,
        id: `${originalItem.id}-${i}`, // Make IDs unique for duplicated scrolls
      });
    }
    return list;
  }, [items, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore && visibleCount < 30) {
          setIsLoadingMore(true);
          
          // Simulate latency fetching data
          setTimeout(() => {
            setVisibleCount((prev) => prev + 3);
            setIsLoadingMore(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoadingMore, visibleCount]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-4" id="grid-gallery">
      {/* CSS Column Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 [column-fill:_balance] w-full">
        {visibleItems.map((item, idx) => (
          <div key={item.id} className="break-inside-avoid mb-8">
            <Card item={item} index={idx} />
          </div>
        ))}
      </div>

      {/* Infinite Scroll Trigger & Skeleton loader */}
      <div ref={loaderRef} className="w-full flex justify-center py-12">
        {isLoadingMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full bg-white/[0.01] border border-white/5 rounded-[24px] p-6 flex flex-col gap-4 animate-pulse"
              >
                <div className="aspect-[3/4] w-full bg-white/5 rounded-xl"></div>
                <div className="h-4 bg-white/5 rounded w-1/3"></div>
                <div className="h-6 bg-white/5 rounded w-3/4"></div>
                <div className="h-4 bg-white/5 rounded w-full"></div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                  <div className="w-5 h-5 rounded-full bg-white/5"></div>
                  <div className="h-3 bg-white/5 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
