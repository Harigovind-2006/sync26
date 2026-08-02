'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ExternalLink, ShieldAlert, Zap, Copy, CheckCircle2, X } from 'lucide-react';
import AssetInspector, { AssetItem } from './AssetInspector';
import BreachPopup from './BreachPopup';
import { getLiveAssets, getLiveBreaches, ApiBreachReport } from '../../lib/api';

export default function AlertsView() {
  const [alertAssets, setAlertAssets] = useState<AssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);
  const [takedownNotice, setTakedownNotice] = useState<{message: string, filename: string} | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getLiveAssets(), getLiveBreaches()])
      .then(([assets, breaches]) => {
        if (!isMounted) return;
        
        // Find assets that either have 'alert' status or are present in the breaches list
        const breachMap = new Map<string, ApiBreachReport>();
        breaches.forEach(b => {
          if (b.image_id) breachMap.set(b.image_id, b);
        });

        const alerts = assets
          .filter(a => a.status === 'alert' || breachMap.has(a.id))
          .map(a => {
            const breach = breachMap.get(a.id);
            if (breach) {
              return {
                ...a,
                status: 'alert' as const,
                incidentUrl: breach.suspect_url,
                incidentTime: breach.detected_at ? breach.detected_at.substring(0, 16).replace('T', ' ') + ' UTC' : undefined,
                confidence: breach.match_confidence ? breach.match_confidence * 100 : a.confidence,
              };
            }
            return { ...a, status: 'alert' as const };
          });
          
        setAlertAssets(alerts as AssetItem[]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateTakedown = (asset: AssetItem) => {
    setTakedownNotice({
      message: `DMCA Takedown Notice filed for this image (${asset.incidentUrl || 'unknown-platform.net/post'}) and broadcasted to Polygon Amoy blockchain.`,
      filename: asset.filename
    });
  };

  return (
    <div className="flex flex-1 h-full min-h-0 overflow-hidden">

      {/* ── Left: Alerts Content ── */}
      <main className="flex-1 h-full min-h-0 overflow-y-auto p-8 space-y-6">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">Detection Alerts</h2>
              {alertAssets.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-white text-[11px] font-bold shadow-md shadow-red-500/30 animate-pulse">
                  {alertAssets.length} Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 ml-11">
              Images where unauthorized re-uploads have been detected by AI crawlers.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-32 text-xs text-slate-500">
            Loading detection alerts from backend...
          </div>
        ) : alertAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">All Clear — No Alerts</h3>
              <p className="text-sm text-slate-400 max-w-sm">
                No unauthorized re-uploads have been detected. Your images are protected.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#131924] border border-red-500/20 rounded-2xl p-4">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Detected Breaches</p>
                <p className="text-2xl font-black text-red-400">{alertAssets.length}</p>
              </div>
              <div className="bg-[#131924] border border-white/10 rounded-2xl p-4">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Confidence</p>
                <p className="text-2xl font-black text-amber-400">
                  {(alertAssets.reduce((s, a) => s + (a.confidence ?? 0), 0) / alertAssets.length).toFixed(1)}%
                </p>
              </div>
              <div className="bg-[#131924] border border-white/10 rounded-2xl p-4">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Platforms Flagged</p>
                <p className="text-2xl font-black text-white">{alertAssets.filter((a) => a.incidentUrl).length}</p>
              </div>
            </div>

            {/* Alert Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {alertAssets.map((asset) => {
                const isSelected = selectedAsset?.id === asset.id;
                return (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`bg-[#131924] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col border ${
                      isSelected
                        ? 'border-red-400 ring-2 ring-red-400/30 shadow-xl shadow-red-500/10'
                        : 'border-red-500/40 hover:border-red-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/10'
                    }`}
                  >
                    {/* Image Preview */}
                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                      <img src={asset.imageUrl} alt={asset.filename} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                        <span className="px-2 py-0.5 bg-indigo-900/80 backdrop-blur-md rounded text-[10px] font-bold text-indigo-300 border border-indigo-500/30">POL</span>
                        <span className="px-2.5 py-1 bg-red-950/95 backdrop-blur-md rounded-full text-[10px] font-bold text-red-400 border border-red-500/60 flex items-center gap-1 shadow-md">
                          <AlertTriangle className="w-3 h-3" /> Alert Detected
                        </span>
                      </div>
                      {asset.confidence > 0 && (
                        <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-[10px] font-bold text-red-300 border border-red-500/30 pointer-events-none">
                          {asset.confidence}% Match Confidence
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col">
                      <div>
                        <h4 className="font-bold text-xs text-white font-mono truncate mb-0.5">{asset.filename}</h4>
                        <p className="text-xs text-slate-400 truncate">{asset.title}</p>
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        {asset.incidentUrl && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">Incident URL:</span>
                            <span className="text-red-400 font-mono flex items-center gap-1">
                              {asset.incidentUrl} <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        )}
                        {asset.incidentTime && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">Detected:</span>
                            <span className="text-amber-400 font-semibold">{asset.incidentTime}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Protection:</span>
                          <span className="text-slate-200">{asset.protectionType}</span>
                        </div>
                      </div>

                      <div
                        className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 cursor-pointer group"
                        onClick={(e) => { e.stopPropagation(); handleCopy(asset.sha256, asset.id); }}
                      >
                        <span className="text-[10px] font-mono text-slate-600 truncate group-hover:text-slate-400 transition-colors">
                          SHA: {asset.sha256.slice(0, 20)}...
                        </span>
                        {copiedId === asset.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors shrink-0" />
                        )}
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); handleGenerateTakedown(asset); }}
                        className="w-full mt-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 text-red-400 font-bold text-[11px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Generate DMCA Takedown
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* ── Right: Asset Inspector Panel ── */}
      {selectedAsset && (
        <AssetInspector
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onGenerateTakedown={handleGenerateTakedown}
          onDelete={(id) => {
            setAlertAssets(prev => prev.filter(a => a.id !== id));
            setSelectedAsset(null);
          }}
        />
      )}

      {/* Breach Alert Modal Popup */}
      <BreachPopup
        isOpen={!!takedownNotice}
        onClose={() => setTakedownNotice(null)}
        message={takedownNotice?.message || ''}
        filename={takedownNotice?.filename || ''}
      />

    </div>
  );
}
