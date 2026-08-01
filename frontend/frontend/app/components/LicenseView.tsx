'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  Plus, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  User, 
  DollarSign, 
  CheckCircle2, 
  Copy,
  Tag
} from 'lucide-react';

interface LicenseItem {
  id: string;
  imageId: string;
  imageTitle: string;
  buyerWallet: string;
  licenseTerms: string;
  type: 'Commercial' | 'Personal' | 'Exclusive';
  price: string;
  status: 'active' | 'expired' | 'revoked';
  watermarkPayload: string;
  createdAt: string;
}

const mockLicenses: LicenseItem[] = [
  {
    id: 'LIC-2026-9042',
    imageId: 'img-1',
    imageTitle: 'Neon Cyberpunk Metropolis',
    buyerWallet: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
    licenseTerms: 'Commercial Web, Print & Digital Campaign Usage Rights',
    type: 'Commercial',
    price: '0.45 POL',
    status: 'active',
    watermarkPayload: 'LENSTRACE:550e8400:0x89205A3A:LIC-9042',
    createdAt: '2026-07-28',
  },
  {
    id: 'LIC-2026-8811',
    imageId: 'img-2',
    imageTitle: 'Alpine Summit Horizon',
    buyerWallet: '0x3F1e6...92B1',
    licenseTerms: 'Personal Non-Commercial Portfolio Usage',
    type: 'Personal',
    price: '0.10 POL',
    status: 'active',
    watermarkPayload: 'LENSTRACE:661f9511:0x3F1e6:LIC-8811',
    createdAt: '2026-07-20',
  },
  {
    id: 'LIC-2026-7200',
    imageId: 'img-3',
    imageTitle: 'Luminous Deep Ocean Odyssey',
    buyerWallet: '0x991A4...11CC',
    licenseTerms: 'Exclusive Global Buyout Rights',
    type: 'Exclusive',
    price: '2.50 POL',
    status: 'active',
    watermarkPayload: 'LENSTRACE:772e0422:0x991A4:LIC-7200',
    createdAt: '2026-06-15',
  },
];

export default function LicenseView() {
  const [licenses, setLicenses] = useState<LicenseItem[]>(mockLicenses);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New License Form
  const [imageTitle, setImageTitle] = useState('Neon Cyberpunk Metropolis');
  const [buyerWallet, setBuyerWallet] = useState('');
  const [type, setType] = useState<'Commercial' | 'Personal' | 'Exclusive'>('Commercial');
  const [price, setPrice] = useState('0.50');
  const [terms, setTerms] = useState('Commercial digital distribution rights with embedded DCT watermark.');

  const handleIssueLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const newLic: LicenseItem = {
      id: `LIC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      imageId: `img-${Date.now()}`,
      imageTitle,
      buyerWallet: buyerWallet || '0x0000000000000000000000000000000000000000',
      licenseTerms: terms,
      type,
      price: `${price} POL`,
      status: 'active',
      watermarkPayload: `LENSTRACE:${Date.now()}:${buyerWallet.substring(0, 8)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setLicenses([newLic, ...licenses]);
    setIsModalOpen(false);
  };

  const filteredLicenses = licenses.filter(l => 
    l.imageTitle.toLowerCase().includes(search.toLowerCase()) ||
    l.buyerWallet.toLowerCase().includes(search.toLowerCase()) ||
    l.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-lime-400" /> Digital License Hub
          </h2>
          <p className="text-xs text-slate-400">Issue, track, and verify digital copyright agreements on Polygon</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-slate-950 shadow-lg shadow-lime-500/20 transition-all flex items-center gap-2 hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Issue New Digital License
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search licenses by ID, asset title, or wallet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>
      </div>

      {/* License Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLicenses.map((lic) => (
          <div 
            key={lic.id}
            className="glass-card glass-card-hover p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-lime-400 font-bold bg-lime-400/10 px-2.5 py-1 rounded-lg border border-lime-400/20">
                  {lic.id}
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  lic.type === 'Commercial' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                  lic.type === 'Exclusive' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  'bg-slate-700/40 text-slate-300 border border-white/10'
                }`}>
                  {lic.type}
                </span>
              </div>

              <h3 className="font-bold text-base text-white">{lic.imageTitle}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{lic.licenseTerms}</p>

              <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/5 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">Buyer Wallet:</span>
                  <span className="text-slate-300">{lic.buyerWallet.substring(0, 10)}...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">Watermark Payload:</span>
                  <span className="text-cyan-300 truncate max-w-[150px]">{lic.watermarkPayload}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">Price:</span>
                  <span className="text-lime-400 font-bold">{lic.price}</span>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Polygon Verified
              </span>
              <span>Issued: {lic.createdAt}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleIssueLicense} className="glass-card max-w-lg w-full p-6 rounded-3xl space-y-5 border border-white/15 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-lime-400" /> Issue Digital License
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 bg-slate-900 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Target Media Asset</label>
              <select
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
              >
                <option>Neon Cyberpunk Metropolis</option>
                <option>Alpine Summit Horizon</option>
                <option>Minimalist Architectural Geometry</option>
                <option>Luminous Deep Ocean Odyssey</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Buyer Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={buyerWallet}
                onChange={(e) => setBuyerWallet(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">License Tier</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                >
                  <option value="Commercial">Commercial</option>
                  <option value="Personal">Personal</option>
                  <option value="Exclusive">Exclusive</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Price (POL)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">License Terms & Scope</label>
              <textarea
                rows={3}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-lime-400 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300"
              >
                Issue License
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
