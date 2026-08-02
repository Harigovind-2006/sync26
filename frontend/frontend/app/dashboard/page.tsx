'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import TopMetricsRow from '../components/TopMetricsRow';
import AssetGrid from '../components/AssetGrid';
import AssetInspector, { AssetItem } from '../components/AssetInspector';
import OwnershipLedgerView from '../components/OwnershipLedgerView';
import AlertsView from '../components/AlertsView';
import AnalyticsView from '../components/AnalyticsView';
import UploadModal from '../components/UploadModal';
import { Zap, X } from 'lucide-react';
import { getLiveAssets } from '../../lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [takedownNotice, setTakedownNotice] = useState<string | null>(null);

  useEffect(() => {
    getLiveAssets().then(data => {
      if (data) {
        setAssets(data);
        if (data.length > 0) setSelectedAsset(data[0]);
      }
    }).catch(() => {});
  }, []);

  // Auth Protection: If not logged in, route to /login
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logged = localStorage.getItem('isLoggedIn') === 'true';
      if (!logged) {
        router.push('/login');
      }
    }
  }, [router]);

  const handleGenerateTakedown = (asset: AssetItem) => {
    // Update local state instantly so the UI reflects the new alert status
    const updatedAsset = { ...asset, status: 'alert' as const, incidentUrl: 'instagram.com/p/unauthorized' };
    setAssets(prev => prev.map(a => a.id === asset.id ? updatedAsset : a));
    setSelectedAsset(updatedAsset);

    setTakedownNotice(`AI Web Crawler detected an unauthorized re-upload of ${asset.filename} on Instagram. Breach recorded on Polygon Amoy.`);
    setTimeout(() => {
      setTakedownNotice(null);
    }, 6000);
  };

  return (
    <div className="h-screen w-screen bg-[#0d1117] text-[#f0f6fc] flex overflow-hidden font-sans">
      
      {/* 1. Left Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full min-h-0 min-w-0 overflow-hidden">
        
        {/* 2. Top Header Bar */}
        <TopHeader
          onOpenUpload={() => setIsUploadOpen(true)}
          assetCount={assets.length}
        />

        {/* DMCA Takedown Notification Banner */}
        {takedownNotice && (
          <div className="bg-red-950/90 text-red-200 px-8 py-3 border-b border-red-500/40 flex items-center justify-between text-xs font-semibold animate-fadeIn shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-400 fill-red-400" />
              <span>{takedownNotice}</span>
            </div>
            <button onClick={() => setTakedownNotice(null)} className="text-red-300 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 3. Center Workspace Content & Right Drawer */}
        <div className="flex-1 flex h-full min-h-0 overflow-hidden">
          
          {activeTab === 'ledger' ? (
            <OwnershipLedgerView />
          ) : activeTab === 'alerts' ? (
            <AlertsView />
          ) : activeTab === 'analytics' ? (
            <AnalyticsView />
          ) : (
            <>
              {/* Center Main Asset Grid Area */}
              <main className="flex-1 h-full min-h-0 overflow-y-auto p-8 space-y-6">
                <TopMetricsRow />
                
                <AssetGrid
                  assets={assets}
                  selectedAsset={selectedAsset}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </main>

              {/* Right Side Inspection Drawer */}
              {selectedAsset && (
                <AssetInspector
                  asset={selectedAsset}
                  onClose={() => setSelectedAsset(null)}
                  onGenerateTakedown={handleGenerateTakedown}
                />
              )}
            </>
          )}

        </div>

      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAssetAdded={(newAsset) => {
          setAssets([newAsset, ...assets]);
          setSelectedAsset(newAsset);
        }}
      />

    </div>
  );
}
