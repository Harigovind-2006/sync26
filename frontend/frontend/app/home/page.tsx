'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import {
  Search, Filter, ArrowUpDown, Upload, Eye, ShieldCheck,
  Download, Info, CheckCircle2, LayoutGrid, List, X, Plus,
  Fingerprint, Shield, Lock, Sparkles, Bell, ArrowRight
} from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProtectedImageCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'Protected' | 'Verified' | 'Encrypted' | 'Watermarked' | 'AI Scanned' | 'Owner Verified';
  date: string;
  size: string;
  watermarkId: string;
  resolution: string;
  owner: string;
}

const PROTECTED_GALLERY: ProtectedImageCard[] = [
  {
    id: 'gallery-1',
    title: 'Wedding Photography',
    description: 'High-resolution bridal portrait gallery protected with invisible DCT color-channel watermarks.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    status: 'Protected',
    date: '2 hours ago',
    size: '14.2 MB',
    watermarkId: 'LR-WM-99F2A1',
    resolution: '6000 × 4000',
    owner: 'Lakxam Rekha Studio',
  },
  {
    id: 'gallery-2',
    title: 'Company Logo',
    description: 'Official vector brand identity asset embedded with cryptographic ownership verification key.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    status: 'Verified',
    date: '5 hours ago',
    size: '2.8 MB',
    watermarkId: 'LR-WM-88B3C4',
    resolution: '3840 × 2160',
    owner: 'Enterprise Brand Inc.',
  },
  {
    id: 'gallery-3',
    title: 'Landscape Collection',
    description: 'Fine art panoramic mountain landscape with invisible digital rights management signature.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    status: 'Watermarked',
    date: '1 day ago',
    size: '18.5 MB',
    watermarkId: 'LR-WM-77A91D',
    owner: 'Nature Focus Studio',
    resolution: '7680 × 4320',
  },
  {
    id: 'gallery-4',
    title: 'Artwork Portfolio',
    description: '3D digital sculpture concept render protected with AES-256 encrypted metadata and AI scan.',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
    status: 'Encrypted',
    date: '2 days ago',
    size: '9.4 MB',
    watermarkId: 'LR-WM-55E22P',
    resolution: '4096 × 2304',
    owner: 'Vance Digital Art',
  },
  {
    id: 'gallery-5',
    title: 'Product Design',
    description: 'Industrial consumer hardware prototype CAD render monitored by real-time tamper-detection AI.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1000&q=80',
    status: 'AI Scanned',
    date: '3 days ago',
    size: '11.1 MB',
    watermarkId: 'LR-WM-44K99Z',
    resolution: '3440 × 1440',
    owner: 'Hardware Labs Co.',
  },
  {
    id: 'gallery-6',
    title: 'Research Diagram',
    description: 'Proprietary AI neural architecture schematic protected against web scraping and unauthorized training.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
    status: 'Owner Verified',
    date: '4 days ago',
    size: '4.6 MB',
    watermarkId: 'LR-WM-33X77M',
    resolution: '2560 × 1440',
    owner: 'Lakxam AI Institute',
  },
];

const TECH_TAGS = [
  'Invisible Watermark',
  'AI Protection',
  'Cryptography',
  'Ownership Verification',
  'Tamper Detection',
  'Secure Storage',
  'Image Authentication',
  'Digital Rights',
  'Metadata Protection',
];

export default function HomeDashboardPage() {
  const { user } = useAuth();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<'newest' | 'oldest' | 'title' | 'size'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<ProtectedImageCard | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter & Sort
  const filteredGallery = useMemo(() => {
    return PROTECTED_GALLERY
      .filter((img) => {
        const matchesSearch =
          img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.watermarkId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'All' || img.status === selectedFilter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (selectedSort === 'title') return a.title.localeCompare(b.title);
        if (selectedSort === 'size') return parseFloat(b.size) - parseFloat(a.size);
        if (selectedSort === 'oldest') return a.id.localeCompare(b.id);
        return b.id.localeCompare(a.id);
      });
  }, [searchQuery, selectedFilter, selectedSort]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const renderStatusBadge = (status: ProtectedImageCard['status']) => {
    const styles = {
      Protected: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      Verified: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      Watermarked: 'bg-[#9b51e0]/15 text-[#9b51e0] border-[#9b51e0]/30',
      Encrypted: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      'AI Scanned': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      'Owner Verified': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-md ${styles[status]}`}>
        ● {status}
      </span>
    );
  };

  return (
    <DashboardLayout>
      {/* Top Bar */}
      <div className="sticky top-0 z-30 h-16 border-b border-white/[0.06] bg-[#07070A]/85 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#9b51e0] animate-pulse" />
          <span className="text-sm font-semibold text-white tracking-wide">Lakxam Rekha Workspace</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-600 hover:text-white transition-colors">
            <Bell className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-bold text-xs shadow-md">
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <span className="text-xs text-zinc-300 font-medium hidden sm:block">{user?.name ?? 'Creator'}</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-10 z-50 px-4 py-3 rounded-xl bg-[#0d0d14] border border-[#9b51e0]/40 text-white text-xs font-semibold shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          2. LARGE HERO BANNER (70-80% Viewport Height)
      ══════════════════════════════════════════════════════ */}
      <div className="pt-8 pb-4">
        <div className="w-[96%] max-w-[1440px] min-h-[75vh] mx-auto rounded-[40px] border border-[#9b51e0]/25 bg-gradient-to-br from-[#9b51e0]/12 via-[#090912]/95 to-[#00b0ff]/10 backdrop-blur-2xl p-8 sm:p-14 lg:p-16 shadow-2xl shadow-black/90 relative overflow-hidden flex flex-col justify-center">

          {/* Animated Background Rays & Floating Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#9b51e0]/15 to-[#00b0ff]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#9b51e0]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

          {/* HERO TWO-COLUMN LAYOUT: Left (45%), Right (55%) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ── LEFT SIDE (45% -> lg:col-span-5) ── */}
            <div className="lg:col-span-5 space-y-6">

              {/* Small Label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9b51e0]/30 bg-[#9b51e0]/10 text-[#9b51e0] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> AI-Powered Digital Ownership Platform
              </div>

              {/* Large Heading & Tagline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-3">
                  Lakxam Rekha
                </h1>
                <p className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b51e0] via-[#c084fc] to-[#00b0ff]">
                  Protect Every Pixel. Preserve Every Creator.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                Lakxam Rekha is an AI-powered platform that secures digital images using invisible watermarking, cryptographic ownership verification, AI-based tamper detection, and encrypted image protection. It helps creators, photographers, artists, researchers, and organizations prove ownership while maintaining image quality.
              </p>

              {/* Animated Technology Tags */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {TECH_TAGS.map((tag, idx) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.06, y: -2 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + idx * 0.03, duration: 0.4 }}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#9b51e0]/40 hover:bg-[#9b51e0]/15 text-xs font-medium text-zinc-300 hover:text-white cursor-default transition-all duration-200 shadow-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/signup"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] text-black font-extrabold text-sm hover:brightness-110 active:scale-[0.97] transition-all shadow-xl shadow-[#9b51e0]/25 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/upload"
                  className="px-8 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white font-bold text-sm hover:bg-white/[0.08] hover:border-white/30 transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#00b0ff]" /> Upload Image
                </Link>
              </div>
            </div>

            {/* ── RIGHT SIDE (55% -> lg:col-span-7): Overlapping Floating Image Collage ── */}
            <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] w-full flex items-center justify-center">

              {/* Central Glowing Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9b51e0]/20 to-[#00b0ff]/20 rounded-3xl blur-3xl scale-95 pointer-events-none animate-pulse" />

              {/* COLLAGE IMAGE 1: Digital Artwork / AI (Main Left Center) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 left-2 sm:left-6 w-[220px] sm:w-[270px] rounded-2xl border border-[#9b51e0]/40 bg-[#0d0d16] p-2.5 shadow-2xl z-20 backdrop-blur-md"
              >
                <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" alt="Digital Artwork" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] text-emerald-400 font-bold backdrop-blur-md">
                    ● WATERMARKED
                  </div>
                </div>
                <div className="pt-2 px-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">Digital Artwork</span>
                  <span className="text-[10px] text-zinc-400 font-mono">LR-WM-99</span>
                </div>
              </motion.div>

              {/* COLLAGE IMAGE 2: Photography / Camera (Top Right) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-0 right-2 sm:right-8 w-[200px] sm:w-[240px] rounded-2xl border border-[#00b0ff]/40 bg-[#0d0d16] p-2.5 shadow-2xl z-10 backdrop-blur-md"
              >
                <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" alt="Photography Studio" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] text-cyan-400 font-bold backdrop-blur-md">
                    ● VERIFIED
                  </div>
                </div>
                <div className="pt-2 px-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">Commercial Photo</span>
                  <span className="text-[10px] text-zinc-400 font-mono">RAW 6K</span>
                </div>
              </motion.div>

              {/* COLLAGE IMAGE 3: Neural AI / Computer Vision (Bottom Center Right) */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-2 right-4 sm:right-12 w-[230px] sm:w-[280px] rounded-2xl border border-purple-500/40 bg-[#0d0d16] p-2.5 shadow-2xl z-30 backdrop-blur-md"
              >
                <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80" alt="AI Interface" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-[9px] text-purple-300 font-bold backdrop-blur-md">
                    ● AI SCAN ACTIVE
                  </div>
                </div>
                <div className="pt-2 px-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">AI Neural Diagram</span>
                  <span className="text-[10px] text-emerald-400 font-mono">AES-256 ✓</span>
                </div>
              </motion.div>

              {/* COLLAGE FLOATING WIDGET 4: Encryption & Security Interface (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-4 left-4 sm:left-12 p-3.5 rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl shadow-2xl z-40 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-bold flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-white">Cryptographic Signature</p>
                  <p className="text-[10px] text-emerald-400 font-mono">Tamper Proof Verified ✓</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. TOOLBAR (120px Whitespace Above)
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-[80px] pt-[80px] pb-[60px] space-y-[40px]">

        {/* TOOLBAR */}
        <div className="p-4 rounded-[24px] border border-white/[0.08] bg-[#0c0c14]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">

          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search protected images..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#9b51e0]/40 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Dropdown */}
            <div className="relative flex items-center">
              <Filter className="absolute left-3.5 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="pl-9 pr-8 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 focus:outline-none appearance-none cursor-pointer hover:border-white/15 transition-colors"
              >
                <option value="All">All Categories</option>
                <option value="Protected">Protected</option>
                <option value="Verified">Verified</option>
                <option value="Watermarked">Watermarked</option>
                <option value="Encrypted">Encrypted</option>
                <option value="AI Scanned">AI Scanned</option>
                <option value="Owner Verified">Owner Verified</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3.5 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="pl-9 pr-8 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 focus:outline-none appearance-none cursor-pointer hover:border-white/15 transition-colors"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="title">Sort: Title A-Z</option>
                <option value="size">Sort: Size</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#9b51e0] text-black shadow-md' : 'text-zinc-500 hover:text-white'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#9b51e0] text-black shadow-md' : 'text-zinc-500 hover:text-white'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Button */}
            <Link
              href="/upload"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] text-black font-bold text-xs hover:brightness-110 active:scale-[0.97] transition-all shadow-lg shadow-[#9b51e0]/20"
            >
              <Plus className="w-4 h-4" /> Upload Image
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            4. PROTECTED IMAGE GALLERY (3-column cards)
        ══════════════════════════════════════════════════════ */}
        {filteredGallery.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-[120px] flex flex-col items-center justify-center text-center rounded-[32px] border border-white/[0.07] bg-white/[0.015] p-12">
            <div className="w-20 h-20 rounded-3xl bg-[#9b51e0]/15 border border-[#9b51e0]/30 flex items-center justify-center text-[#9b51e0] mb-6 shadow-2xl">
              <Fingerprint className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">No Protected Images Found</h3>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed mb-8">
              No protected images match your current filter settings or search query.
            </p>
            <Link
              href="/upload"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] text-black font-bold text-xs hover:brightness-110 transition-all shadow-lg"
            >
              Upload New Image
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID MODE — 3 columns, 40px gap, large 70% height image */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
            {filteredGallery.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedImage(img)}
                className="group relative h-[500px] rounded-[24px] border border-white/[0.08] bg-[#0c0c14]/90 backdrop-blur-xl overflow-hidden shadow-2xl hover:border-[#9b51e0]/40 hover:shadow-[#9b51e0]/15 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* LARGE IMAGE PREVIEW (70% height ~350px) */}
                <div className="relative w-full h-[350px] bg-zinc-950 overflow-hidden flex-shrink-0">
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-black/30 opacity-70" />

                  <div className="absolute top-4 right-4 z-10">
                    {renderStatusBadge(img.status)}
                  </div>

                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-zinc-400 font-mono">
                    {img.watermarkId}
                  </div>

                  {/* HOVER OVERLAY WITH 4 ACTION BUTTONS */}
                  <div className="absolute inset-0 bg-[#07070A]/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                      className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-[#9b51e0] hover:text-black text-white transition-all transform hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-[10px] font-bold">View</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); showToast(`Verified: ${img.watermarkId} is authentic ✓`); }}
                      className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-[#00b0ff] hover:text-black text-white transition-all transform hover:scale-105"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-bold">Verify</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); showToast(`Downloading: ${img.title}`); }}
                      className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-emerald-400 hover:text-black text-white transition-all transform hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-[10px] font-bold">Download</span>
                    </button>
                    <Link
                      href="/results"
                      onClick={(e) => e.stopPropagation()}
                      className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-purple-400 hover:text-black text-white transition-all transform hover:scale-105"
                    >
                      <Info className="w-4 h-4" />
                      <span className="text-[10px] font-bold">Details</span>
                    </Link>
                  </div>
                </div>

                {/* CONTENT BELOW IMAGE (30% height ~150px) */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#9b51e0] transition-colors line-clamp-1 mb-1">
                      {img.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {img.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="font-mono">{img.resolution}</span>
                    <div className="flex items-center gap-2">
                      <span>{img.size}</span>
                      <span>·</span>
                      <span>{img.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* LIST MODE */
          <div className="space-y-4">
            {filteredGallery.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group p-4 rounded-[20px] border border-white/[0.08] bg-[#0c0c14]/90 backdrop-blur-xl hover:border-[#9b51e0]/30 transition-all flex items-center gap-6 cursor-pointer"
              >
                <div className="w-28 h-20 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-bold text-white group-hover:text-[#9b51e0] transition-colors truncate">{img.title}</h3>
                    {renderStatusBadge(img.status)}
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1 mb-1">{img.description}</p>
                  <p className="text-[11px] text-zinc-600 font-mono">{img.watermarkId} · {img.resolution} · {img.size} · {img.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }} className="p-2.5 rounded-lg border border-white/10 hover:bg-[#9b51e0] hover:text-black text-zinc-400 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <Link href="/results" onClick={(e) => e.stopPropagation()} className="p-2.5 rounded-lg border border-white/10 hover:bg-[#00b0ff] hover:text-black text-zinc-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* IMAGE DETAIL MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-[32px] border border-white/10 bg-[#0d0d14] p-8 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 h-64 md:h-80 flex items-center justify-center">
                  <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full h-full object-contain" />
                  <div className="absolute top-3 left-3">{renderStatusBadge(selectedImage.status)}</div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-xs text-[#9b51e0] font-mono mb-1">{selectedImage.watermarkId}</div>
                    <h2 className="text-xl font-extrabold text-white mb-2">{selectedImage.title}</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{selectedImage.description}</p>
                  </div>

                  <div className="space-y-2.5 p-4 rounded-xl border border-white/[0.06] bg-[#07070A]/50 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Owner Name:</span>
                      <span className="text-zinc-200 font-semibold">{selectedImage.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Resolution:</span>
                      <span className="text-zinc-200 font-mono">{selectedImage.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">File Size:</span>
                      <span className="text-zinc-200 font-mono">{selectedImage.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Encryption:</span>
                      <span className="text-emerald-400 font-semibold">AES-256-GCM ✓</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Link
                      href="/results"
                      className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] text-black font-bold text-xs hover:brightness-110 transition-all shadow-md"
                    >
                      View Full Analysis Report
                    </Link>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-5 py-3 rounded-xl border border-white/10 text-zinc-400 font-semibold text-xs hover:text-white transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </DashboardLayout>
  );
}
