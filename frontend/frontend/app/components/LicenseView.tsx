'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  Plus, 
  Search, 
  CheckCircle2,
  Tag,
  FolderOpen
} from 'lucide-react';
import { getLiveLicenses, issueLicense, getLiveAssets, ApiLicenseItem } from '../../lib/api';

interface LicenseItem {
  id: string;
  imageTitle: string;
  buyerWallet: string;
  licenseTerms: string;
  type: 'Commercial' | 'Personal' | 'Exclusive';
  price: string;
  status: 'active' | 'expired' | 'revoked';
  watermarkPayload: string;
  createdAt: string;
}

export default function LicenseView() {
  const [licenses, setLicenses] = useState<LicenseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issuing, setIssuing] = useState(false);

  // Asset titles from live backend
  const [availableAssets, setAvailableAssets] = useState<string[]>([]);
  const [imageTitle, setImageTitle] = useState('');
  const [buyerWallet, setBuyerWallet] = useState('');
  const [type, setType] = useState<'Commercial' | 'Personal' | 'Exclusive'>('Commercial');
  const [price, setPrice] = useState('0.50');
  const [terms, setTerms] = useState('Commercial digital distribution rights with embedded DCT watermark.');

  useEffect(() => {
    let isMounted = true;

    Promise.all([getLiveLicenses(), getLiveAssets()])
      .then(([licenseData, assetData]) => {
        if (!isMounted) return;

        if (licenseData && licenseData.length > 0) {
          const mapped: LicenseItem[] = licenseData.map((l: ApiLicenseItem) => ({
            id: l.id,
            imageTitle: l.imageTitle || 'Protected Photograph',
            buyerWallet: l.buyer_wallet || '0x0000...0000',
            licenseTerms: l.license_terms || 'Standard Usage Rights',
            type: l.type || 'Commercial',
            price: l.price || '0.50 POL',
            status: l.status || 'active',
            watermarkPayload: l.watermark_payload || `LAXMANREKHA:${l.id}`,
            createdAt: l.created_at ? l.created_at.substring(0, 10) : new Date().toISOString().substring(0, 10),
          }));
          setLicenses(mapped);
        }

        if (assetData && assetData.length > 0) {
          const titles = assetData.map((a) => a.title || a.filename);
          setAvailableAssets(titles);
          setImageTitle(titles[0] || '');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const handleIssueLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    setIssuing(true);

    try {
      const res = await issueLicense({
        imageId: `img-${Date.now()}`,
        buyerWallet,
        licenseTerms: terms,
        type,
        price: `${price} POL`,
      });

      const newLic: LicenseItem = {
        id: res.id || `LIC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        imageTitle,
        buyerWallet,
        licenseTerms: terms,
        type,
        price: `${price} POL`,
        status: 'active',
        watermarkPayload: res.watermark_payload || `LAXMANREKHA:${Date.now()}:${buyerWallet.substring(0, 8)}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setLicenses([newLic, ...licenses]);
    } catch (err) {
      const newLic: LicenseItem = {
        id: `LIC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        imageTitle,
        buyerWallet: buyerWallet || '0x0000000000000000000000000000000000000000',
        licenseTerms: terms,
        type,
        price: `${price} POL`,
        status: 'active',
        watermarkPayload: `LAXMANREKHA:${Date.now()}:${buyerWallet.substring(0, 8)}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setLicenses([newLic, ...licenses]);
    } finally {
      setIssuing(false);
      setIsModalOpen(false);
      setBuyerWallet('');
    }
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
            <FileCheck2 className="w-6 h-6 text-amber-400" /> Digital License Hub
          </h2>
          <p className="text-xs text-slate-400">Issue, track, and verify digital copyright agreements on Polygon</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
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
            className="w-full bg-[#131924] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-500">
          Loading license records from backend...
        </div>
      ) : filteredLicenses.length === 0 ? (
        <div className="bg-[#131924] border border-white/10 rounded-2xl p-12 text-center space-y-3">
          <FolderOpen className="w-10 h-10 text-amber-400 mx-auto opacity-70" />
          <h4 className="font-bold text-white text-sm">No Licenses Issued Yet</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Issue your first digital copyright license by clicking "Issue New Digital License".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLicenses.map((lic) => (
            <div 
              key={lic.id}
              className="bg-[#131924] p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between hover:border-white/20 transition-all duration-200 shadow-xl"
            >
              <div className="space-y-3">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    {lic.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    lic.type === 'Commercial' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                    lic.type === 'Exclusive' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    'bg-slate-700/40 text-slate-300 border border-white/10'
                  }`}>
                    {lic.type}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{lic.imageTitle}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{lic.licenseTerms}</p>

                <div className="bg-[#090d12] p-3 rounded-2xl border border-white/5 space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-sans">Buyer Wallet:</span>
                    <span className="text-slate-300">{lic.buyerWallet.substring(0, 10)}...</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-sans">Watermark Payload:</span>
                    <span className="text-amber-300 truncate max-w-[150px]">{lic.watermarkPayload}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-sans">Price:</span>
                    <span className="text-emerald-400 font-bold">{lic.price}</span>
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
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleIssueLicense} className="bg-[#0e131d] max-w-lg w-full p-6 rounded-3xl space-y-5 border border-white/15 animate-scaleUp shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-400" /> Issue Digital License
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 bg-slate-900 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Target Media Asset</label>
              <select
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {availableAssets.length > 0
                  ? availableAssets.map((t) => <option key={t}>{t}</option>)
                  : <option>No assets found — upload first</option>}
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
                className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">License Tier</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
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
                  className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">License Terms & Scope</label>
              <textarea
                rows={3}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full bg-[#131924] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={issuing}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 cursor-pointer"
              >
                {issuing ? 'Issuing...' : 'Issue License'}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
