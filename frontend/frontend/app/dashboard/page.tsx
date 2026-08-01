'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import UploadModal from '../../components/UploadModal';
import DetailWindow from '../../components/DetailWindow';
import { mockCards, mockAlerts } from '../../lib/mockData';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'history'>('home');
  const [securedPhotos, setSecuredPhotos] = useState<any[]>(mockCards.slice(0, 4));
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const handleRemovePhoto = (id: string) => {
    setSecuredPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#f8f9fa] flex flex-col font-mono text-xs">
      
      {/* Dashboard Top Header Bar */}
      <header className="h-16 border-b border-white/5 px-6 sm:px-12 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-5 h-5 bg-[#C8FF2E] text-black font-extrabold rounded flex items-center justify-center text-[10px]">
            P
          </div>
          <span className="font-black tracking-widest text-white uppercase text-[11px]">
            PIXIE CONSOLE
          </span>
        </Link>
        <Link
          href="/"
          className="px-4 py-2 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white rounded-full transition-colors uppercase text-[9px]"
        >
          Logout
        </Link>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Menu */}
        <aside className="md:col-span-3 flex flex-col gap-2.5">
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full text-left px-5 py-3.5 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
              activeTab === 'home'
                ? 'bg-[#C8FF2E] text-black'
                : 'bg-white/[0.02] border border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>Console Home</span>
            <span className="text-[10px] opacity-70">[{securedPhotos.length}]</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`w-full text-left px-5 py-3.5 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
              activeTab === 'history'
                ? 'bg-[#C8FF2E] text-black'
                : 'bg-white/[0.02] border border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>Crawl History</span>
            <span className="text-[10px] opacity-70">[{mockAlerts.length}]</span>
          </button>
        </aside>

        {/* Right Content Panel */}
        <main className="md:col-span-9 flex flex-col gap-6">
          
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div className="flex flex-col gap-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <div className="text-zinc-500 uppercase font-bold text-[9px] tracking-wider mb-1">Protected Files</div>
                  <div className="text-2xl font-bold text-white">{securedPhotos.length}</div>
                </div>
                <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <div className="text-zinc-500 uppercase font-bold text-[9px] tracking-wider mb-1">Crawl Alerts</div>
                  <div className="text-2xl font-bold text-[#ff3366]">2</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-5 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-zinc-500 uppercase font-bold text-[9px] tracking-wider mb-1">Ledger Status</div>
                    <div className="text-[#C8FF2E] font-bold uppercase">CONNECTED</div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-[#C8FF2E] rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Actions Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mt-4">
                <h3 className="uppercase font-bold text-zinc-500 tracking-wider">Secured Image Ledger</h3>
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 bg-[#C8FF2E] hover:bg-[#b5eb25] text-black font-extrabold rounded-lg tracking-wider"
                >
                  + Secure Photo
                </button>
              </div>

              {/* List grid */}
              {securedPhotos.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl text-zinc-600">
                  No images secured. Click button to upload and steganography scan.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {securedPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="bg-white/[0.01] border border-white/5 hover:border-[#C8FF2E]/30 rounded-2xl overflow-hidden p-4 flex gap-4 items-center cursor-pointer transition-colors"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-white/5">
                        <img src={photo.imageUrl} alt="" className="w-full h-full object-cover filter brightness-90" />
                      </div>
                      <div className="flex-1 truncate">
                        <h4 className="text-white font-bold truncate uppercase">{photo.title}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1 truncate font-sans">{photo.description}</p>
                      </div>
                      <svg className="w-4 h-4 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="flex flex-col gap-4">
              <div className="border-b border-white/5 pb-3">
                <h3 className="uppercase font-bold text-zinc-500 tracking-wider">Crawler Alerts Registry Log</h3>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden text-zinc-400">
                <div className="grid grid-cols-12 gap-2 bg-white/[0.02] border-b border-white/5 p-4 uppercase font-bold text-[9px] tracking-wider text-zinc-500">
                  <div className="col-span-2">Alert ID</div>
                  <div className="col-span-3">Protected Asset</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-3">Edit Modification</div>
                  <div className="col-span-2 text-right">Time Log</div>
                </div>

                <div className="flex flex-col">
                  {mockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="grid grid-cols-12 gap-2 p-4 items-center border-b border-white/5 hover:bg-white/[0.01] transition-all"
                    >
                      <div className="col-span-2 text-[#C8FF2E] font-bold">{alert.id}</div>
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
            </div>
          )}

        </main>
      </div>

      {/* Upload Modal Popup */}
      <AnimatePresence>
        {isUploadOpen && (
          <UploadModal
            onClose={() => setIsUploadOpen(false)}
            onUploadSuccess={(newPhoto) => setSecuredPhotos((prev) => [newPhoto, ...prev])}
          />
        )}
      </AnimatePresence>

      {/* Details Window flyout slide drawer */}
      <AnimatePresence>
        {selectedPhoto && (
          <DetailWindow
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onRemove={handleRemovePhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
