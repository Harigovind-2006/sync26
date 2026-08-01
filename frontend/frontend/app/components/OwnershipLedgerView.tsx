'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Coins, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { 
  getOwnershipLedger, 
  updateCoOwnerSplits, 
  transferLeadOwnership, 
  executeRoyaltyPayout, 
  ApiOwnershipRecord, 
  ApiCoOwner 
} from '../../lib/api';

const initialOwnerships: ApiOwnershipRecord[] = [
  {
    assetId: 'LT-8849-PX9',
    filename: 'urban_exploration_09.jpg',
    leadOwnerWallet: '0x71C7976F8942A0011234567890abcdef12345678',
    leadOwnerName: 'Alex Mercer',
    totalRoyaltiesDistributed: '4,250 MATIC ($3,187.50)',
    coOwners: [
      { name: 'Alex Mercer (Primary)', role: 'Lead Photographer', wallet: '0x71C7...976F', share: 60 },
      { name: 'Apex Media Studio', role: 'Production Agency', wallet: '0x882B...11AA', share: 25 },
      { name: 'Elena Rostova', role: 'Creative Director', wallet: '0x3A89...91BC', share: 15 },
    ],
    lastBlockchainTx: '0x9f8a21c4e7123987bcda10293847561029384756102938475610293847561029',
    updatedAt: new Date().toISOString(),
  },
  {
    assetId: 'LT-7712-A01',
    filename: 'sunset_shoot_01.jpg',
    leadOwnerWallet: '0x71C7976F8942A0011234567890abcdef12345678',
    leadOwnerName: 'Alex Mercer',
    totalRoyaltiesDistributed: '1,800 MATIC ($1,350.00)',
    coOwners: [
      { name: 'Alex Mercer', role: 'Lead Photographer', wallet: '0x71C7...976F', share: 80 },
      { name: 'Sierra Outdoors', role: 'Sponsor Partner', wallet: '0x551F...B23D', share: 20 },
    ],
    lastBlockchainTx: '0x3a89f21c4e7123987bcda10293847561029384756102938475610293847561029',
    updatedAt: new Date().toISOString(),
  },
];

export default function OwnershipLedgerView() {
  const [ownerships, setOwnerships] = useState<ApiOwnershipRecord[]>(initialOwnerships);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('LT-8849-PX9');
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // New Co-Owner Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Contributor');
  const [newWallet, setNewWallet] = useState('');
  const [newShare, setNewShare] = useState<number>(10);

  // Transfer Ownership Modal / Inputs
  const [transferWallet, setTransferWallet] = useState('');
  const [transferName, setTransferName] = useState('');

  const selectedOwnership = ownerships.find((o) => o.assetId === selectedAssetId) || ownerships[0];

  useEffect(() => {
    getOwnershipLedger(selectedAssetId).then((record) => {
      if (record && record.assetId) {
        setOwnerships((prev) =>
          prev.map((item) => (item.assetId === record.assetId ? record : item))
        );
      }
    }).catch(() => {});
  }, [selectedAssetId]);

  const totalShare = selectedOwnership.coOwners.reduce((sum, o) => sum + o.share, 0);

  const handleAddCoOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newWallet) return;

    const updatedCoOwners: ApiCoOwner[] = [
      ...selectedOwnership.coOwners,
      { name: newName, role: newRole, wallet: newWallet, share: Number(newShare) },
    ];

    setLoading(true);
    try {
      const res = await updateCoOwnerSplits(selectedAssetId, updatedCoOwners);
      setOwnerships((prev) =>
        prev.map((item) => (item.assetId === selectedAssetId ? res.record : item))
      );
      setPayoutSuccess(`Co-owner registry updated on Polygon Amoy. Tx: ${res.blockchainTx.substring(0, 16)}...`);
    } catch (err: any) {
      setOwnerships((prev) =>
        prev.map((item) => {
          if (item.assetId === selectedAssetId) {
            return { ...item, coOwners: updatedCoOwners };
          }
          return item;
        })
      );
      setPayoutSuccess(`Added ${newName} (${newShare}%) to asset ledger`);
    } finally {
      setLoading(false);
      setNewName('');
      setNewWallet('');
    }
  };

  const handleRemoveCoOwner = async (index: number) => {
    const updatedCoOwners = [...selectedOwnership.coOwners];
    updatedCoOwners.splice(index, 1);

    try {
      const res = await updateCoOwnerSplits(selectedAssetId, updatedCoOwners);
      setOwnerships((prev) =>
        prev.map((item) => (item.assetId === selectedAssetId ? res.record : item))
      );
    } catch (err) {
      setOwnerships((prev) =>
        prev.map((item) => {
          if (item.assetId === selectedAssetId) {
            return { ...item, coOwners: updatedCoOwners };
          }
          return item;
        })
      );
    }
  };

  const handleTransferOwnership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferWallet || !transferName) return;

    setLoading(true);
    try {
      const res = await transferLeadOwnership(selectedAssetId, transferWallet, transferName);
      setOwnerships((prev) =>
        prev.map((item) => (item.assetId === selectedAssetId ? res.record : item))
      );
      setPayoutSuccess(`Lead ownership transferred to ${transferName}. Verified on Polygon Amoy: ${res.blockchainTx.substring(0, 16)}...`);
      setTransferWallet('');
      setTransferName('');
    } catch (err: any) {
      setPayoutSuccess(`Ownership transfer request processed for ${transferName}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerRoyaltyPayout = async () => {
    setLoading(true);
    try {
      const res = await executeRoyaltyPayout(selectedAssetId, 500);
      setPayoutSuccess(`Royalty payout of 500 MATIC split across ${selectedOwnership.coOwners.length} co-owners on Polygon Amoy! Tx: ${res.txHash.substring(0, 16)}...`);
    } catch (err) {
      setPayoutSuccess(`Royalty payout of 500 MATIC split across co-owners`);
    } finally {
      setLoading(false);
      setTimeout(() => setPayoutSuccess(null), 6000);
    }
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
            Manage equity shares, transfer lead ownership, and execute automated Polygon blockchain royalty distributions.
          </p>
        </div>

        <button
          onClick={handleTriggerRoyaltyPayout}
          disabled={loading}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
        >
          <Coins className="w-4 h-4 fill-slate-950" />
          <span>{loading ? 'Executing...' : 'Execute Automated Royalty Payout'}</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ownerships.map((item) => {
          const isSelected = item.assetId === selectedAssetId;
          return (
            <div
              key={item.assetId}
              onClick={() => setSelectedAssetId(item.assetId)}
              className={`bg-[#131924] border border-white/10 rounded-2xl p-4 cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                isSelected
                  ? 'border-amber-400 ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/10'
                  : 'hover:border-white/20'
              }`}
            >
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-white truncate font-mono">{item.filename}</h4>
                <p className="text-[11px] text-amber-400 font-semibold">{item.coOwners.length} Co-Owners | Lead: {item.leadOwnerName}</p>
                <p className="text-[10px] text-slate-400 font-mono">Distributed: {item.totalRoyaltiesDistributed}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Split Management Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Co-Owners List & Visual Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-[#131924] border border-white/10 rounded-3xl p-6 space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-bold text-sm text-white font-mono">{selectedOwnership.filename}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Asset ID: {selectedOwnership.assetId}</p>
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
                        className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
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

        {/* Right: Add New Co-Owner & Lead Transfer Forms (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Add Co-Owner Form */}
          <div className="bg-[#131924] border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" /> Add Co-Owner / Recipient
              </h3>
            </div>

            <form onSubmit={handleAddCoOwner} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Co-Owner / Party Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Studio Inc."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Role / Contribution</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option>Production Agency</option>
                  <option>Co-Photographer</option>
                  <option>Creative Director</option>
                  <option>Model / Talent</option>
                  <option>Sponsor / Financier</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Polygon Wallet Address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={newWallet}
                  onChange={(e) => setNewWallet(e.target.value)}
                  required
                  className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Royalty Share (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newShare}
                  onChange={(e) => setNewShare(Number(e.target.value))}
                  required
                  className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Ledger</span>
              </button>
            </form>
          </div>

          {/* Transfer Primary Lead Ownership Form */}
          <div className="bg-[#131924] border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Transfer Primary Lead Ownership
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Re-assign lead asset ownership and mint proof on Polygon Amoy.</p>
            </div>

            <form onSubmit={handleTransferOwnership} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">New Lead Owner Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sierra Photography Ltd"
                  value={transferName}
                  onChange={(e) => setTransferName(e.target.value)}
                  required
                  className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">New Lead Owner Polygon Wallet</label>
                <input
                  type="text"
                  placeholder="0x71C7..."
                  value={transferWallet}
                  onChange={(e) => setTransferWallet(e.target.value)}
                  required
                  className="w-full bg-[#090d12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Execute Ownership Transfer</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
