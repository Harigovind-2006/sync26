'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Percent, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ExternalLink,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface CoOwner {
  name: string;
  role: string;
  wallet: string;
  share: number;
}

interface AssetOwnership {
  id: string;
  filename: string;
  title: string;
  imageUrl: string;
  totalRoyalties: string;
  coOwners: CoOwner[];
}

const mockOwnerships: AssetOwnership[] = [
  {
    id: 'LT-8849-PX9',
    filename: 'urban_exploration_09.jpg',
    title: 'Urban Exploration Night Cityscape',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    totalRoyalties: '4,250 MATIC ($3,187.50)',
    coOwners: [
      { name: 'Alex Mercer (Primary)', role: 'Lead Photographer', wallet: '0x71C7...976F', share: 60 },
      { name: 'Apex Media Studio', role: 'Production Agency', wallet: '0x882B...11AA', share: 25 },
      { name: 'Elena Rostova', role: 'Creative Director', wallet: '0x3A89...91BC', share: 15 },
    ],
  },
  {
    id: 'LT-7712-A01',
    filename: 'sunset_shoot_01.jpg',
    title: 'Sunset Horizon Mountain Shoot',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    totalRoyalties: '1,800 MATIC ($1,350.00)',
    coOwners: [
      { name: 'Alex Mercer', role: 'Lead Photographer', wallet: '0x71C7...976F', share: 80 },
      { name: 'Sierra Outdoors', role: 'Sponsor Partner', wallet: '0x551F...B23D', share: 20 },
    ],
  },
  {
    id: 'LT-3388-C99',
    filename: 'aerial_series_03.jpg',
    title: 'Aerial City Lights Skyline',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce09?auto=format&fit=crop&w=800&q=80',
    totalRoyalties: '2,900 MATIC ($2,175.00)',
    coOwners: [
      { name: 'Alex Mercer', role: 'Lead Photographer', wallet: '0x71C7...976F', share: 50 },
      { name: 'DroneOps Collective', role: 'Aerial Unit', wallet: '0x992C...44EF', share: 50 },
    ],
  },
];

export default function OwnershipLedgerView() {
  const [ownerships, setOwnerships] = useState<AssetOwnership[]>(mockOwnerships);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(mockOwnerships[0].id);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);

  // New Co-Owner Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Contributor');
  const [newWallet, setNewWallet] = useState('');
  const [newShare, setNewShare] = useState<number>(10);

  const selectedOwnership = ownerships.find((o) => o.id === selectedAssetId) || ownerships[0];

  const totalShare = selectedOwnership.coOwners.reduce((sum, o) => sum + o.share, 0);

  const handleAddCoOwner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newWallet) return;

    setOwnerships((prev) =>
      prev.map((item) => {
        if (item.id === selectedAssetId) {
          return {
            ...item,
            coOwners: [
              ...item.coOwners,
              {
                name: newName,
                role: newRole,
                wallet: newWallet,
                share: Number(newShare),
              },
            ],
          };
        }
        return item;
      })
    );

    setNewName('');
    setNewWallet('');
  };

  const handleRemoveCoOwner = (index: number) => {
    setOwnerships((prev) =>
      prev.map((item) => {
        if (item.id === selectedAssetId) {
          const updated = [...item.coOwners];
          updated.splice(index, 1);
          return { ...item, coOwners: updated };
        }
        return item;
      })
    );
  };

  const handleTriggerRoyaltyPayout = () => {
    setPayoutSuccess(`Royalty payout of 500 MATIC successfully split across ${selectedOwnership.coOwners.length} co-owners on Polygon Amoy! Transaction hash: 0x9f8...a21c`);
    setTimeout(() => {
      setPayoutSuccess(null);
    }, 6000);
  };

  return (
    <div className="p-8 space-y-8 flex-1 h-full min-h-0 overflow-y-auto">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" /> Multi-Creator Co-Ownership & Royalty Splits
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage equity shares and automated Polygon blockchain royalty distributions across photography teams.
          </p>
        </div>

        <button
          onClick={handleTriggerRoyaltyPayout}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
        >
          <Coins className="w-4 h-4 fill-slate-950" />
          <span>Execute Automated Royalty Payout</span>
        </button>
      </div>

      {payoutSuccess && (
        <div className="bg-emerald-950/90 text-emerald-200 px-6 py-3 rounded-2xl border border-emerald-500/40 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{payoutSuccess}</span>
          </div>
        </div>
      )}

      {/* Asset Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ownerships.map((item) => {
          const isSelected = item.id === selectedAssetId;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAssetId(item.id)}
              className={`bg-[#131924] border border-white/10 rounded-2xl p-4 cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                isSelected
                  ? 'border-amber-400 ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/10'
                  : 'hover:border-white/20'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.filename}
                className="w-16 h-16 rounded-xl object-cover border border-white/10"
              />
              <div className="flex-1 overflow-hidden space-y-1">
                <h4 className="font-bold text-xs text-white truncate font-mono">{item.filename}</h4>
                <p className="text-[11px] text-amber-400 font-semibold">{item.coOwners.length} Co-Owners</p>
                <p className="text-[10px] text-slate-400 font-mono">{item.totalRoyalties}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Split Management Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Co-Owners List & Visual Breakdown (8 cols) */}
        <div className="lg:col-span-7 bg-[#131924] border border-white/10 rounded-3xl p-6 space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-bold text-sm text-white font-mono">{selectedOwnership.filename}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Asset ID: {selectedOwnership.id}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Share Allocated</span>
              <span className={`text-sm font-bold font-mono ${totalShare === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {totalShare}% / 100%
              </span>
            </div>
          </div>

          {/* Visual Percentage Progress Bar */}
          <div className="space-y-2">
            <div className="flex h-3 rounded-full overflow-hidden bg-slate-900 border border-white/10">
              {selectedOwnership.coOwners.map((owner, idx) => {
                const colors = ['bg-amber-400', 'bg-sky-400', 'bg-emerald-400', 'bg-purple-400', 'bg-orange-400'];
                const c = colors[idx % colors.length];
                return (
                  <div
                    key={idx}
                    style={{ width: `${owner.share}%` }}
                    className={`${c} h-full transition-all duration-300`}
                    title={`${owner.name}: ${owner.share}%`}
                  ></div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 text-[11px] pt-1">
              {selectedOwnership.coOwners.map((owner, idx) => {
                const colors = ['text-amber-400', 'text-sky-400', 'text-emerald-400', 'text-purple-400', 'text-orange-400'];
                const c = colors[idx % colors.length];
                return (
                  <span key={idx} className="flex items-center gap-1.5 font-medium">
                    <span className={`w-2 h-2 rounded-full ${c.replace('text-', 'bg-')}`}></span>
                    <span className="text-white font-bold">{owner.share}%</span>
                    <span className="text-slate-400">({owner.name})</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Co-Owners List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Co-Owner Registry & Wallets</h4>

            <div className="space-y-3">
              {selectedOwnership.coOwners.map((owner, idx) => (
                <div
                  key={idx}
                  className="bg-[#090d12] border border-white/5 rounded-2xl p-4 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{owner.name}</span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-semibold">
                        {owner.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <span>{owner.wallet}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-base font-extrabold text-amber-400 font-mono">{owner.share}%</span>
                      <span className="text-[10px] text-slate-500 block">Royalty Share</span>
                    </div>

                    {idx > 0 && (
                      <button
                        onClick={() => handleRemoveCoOwner(idx)}
                        className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Add New Co-Owner Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#131924] border border-white/10 rounded-3xl p-6 space-y-5">
          
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" /> Add Co-Owner / Royalty Recipient
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Add team members, studios, models, or agency partners to automatically receive split payouts.
            </p>
          </div>

          <form onSubmit={handleAddCoOwner} className="space-y-4">
            
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Co-Owner / Party Name</label>
              <input
                type="text"
                placeholder="e.g. Apex Studio Inc."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Role / Contribution</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option>Production Agency</option>
                <option>Co-Photographer</option>
                <option>Creative Director</option>
                <option>Model / Talent</option>
                <option>Sponsor / Financier</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Polygon Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={newWallet}
                onChange={(e) => setNewWallet(e.target.value)}
                required
                className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Royalty Percentage Share (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={newShare}
                onChange={(e) => setNewShare(Number(e.target.value))}
                required
                className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Co-Owner to Ledger</span>
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
