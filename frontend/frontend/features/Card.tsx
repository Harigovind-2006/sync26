'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CardItem } from '../types';

interface CardProps {
  item: CardItem;
  index: number;
}

export default function Card({ item, index }: CardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 18,
        delay: index * 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ 
        scale: 1.03,
        borderColor: 'rgba(200, 255, 46, 0.35)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px 0 rgba(200, 255, 46, 0.15)'
      }}
      className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white/[0.02] border border-white/5 transition-all duration-300 select-none cursor-pointer"
    >
      {/* Cover Image Container */}
      <Link href={`/${item.slug}`} className="block relative overflow-hidden w-full bg-zinc-950">
        <div className={`${item.aspectRatio} w-full`}>
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
          />
        </div>
        {/* Category Overlay */}
        <span className="absolute top-4 left-4 bg-black/85 border border-white/10 px-3 py-1 text-[8px] uppercase tracking-wider font-extrabold text-[#C8FF2E] rounded-full font-mono">
          {item.category}
        </span>
      </Link>

      {/* Content Container */}
      <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
        <div className="flex flex-col gap-2">
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-[9px] text-zinc-500 uppercase font-bold tracking-wider font-mono">
            <span>{item.publishedAt}</span>
            <span>•</span>
            <span>{item.readTime} min read</span>
          </div>

          {/* Title */}
          <h3 className="font-mono text-xs sm:text-sm font-bold text-white group-hover:text-[#C8FF2E] transition-colors leading-snug">
            <Link href={`/${item.slug}`}>{item.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-3 font-sans">
            {item.description}
          </p>
        </div>

        {/* Footer Row (Author Details) */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-white/5 mt-4">
          <img
            src={item.author.avatarUrl}
            alt={item.author.name}
            className="w-5 h-5 rounded-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <span className="text-[9px] font-mono font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">
            {item.author.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
