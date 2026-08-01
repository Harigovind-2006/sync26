'use client';

import React, { useEffect, useState } from 'react';
import { getDashboardMetrics, ApiAnalytics } from '../../lib/api';

export default function TopMetricsRow() {
  const [metricsData, setMetricsData] = useState<ApiAnalytics>({
    totalProtectedAssets: 48,
    activeScansCount: 1420,
    verificationsOnChain: 48,
    totalBreachesDetected: 12,
    dmcaNoticesIssued: 8,
    quarantinedBlockedImages: 3,
    totalRoyaltiesEarnedMatic: 4250,
    totalRoyaltiesEarnedUsd: 3187.5,
  });

  useEffect(() => {
    getDashboardMetrics().then((data) => {
      if (data) setMetricsData(data);
    });
  }, []);

  const metrics = [
    {
      title: 'PROTECTED ASSETS',
      value: String(metricsData.totalProtectedAssets),
      subtitle: 'DCT + Polygon Verified',
      color: 'text-[#00e5a3]',
    },
    {
      title: 'ACTIVE SCANS',
      value: metricsData.activeScansCount.toLocaleString(),
      subtitle: 'AI Crawlers Monitoring',
      color: 'text-sky-400',
    },
    {
      title: 'BREACH ALERTS',
      value: String(metricsData.totalBreachesDetected),
      subtitle: `${metricsData.dmcaNoticesIssued} DMCA Notices Issued`,
      color: 'text-red-400',
    },
    {
      title: 'ON-CHAIN RECORDS',
      value: String(metricsData.verificationsOnChain),
      subtitle: 'Polygon Amoy Blockchain',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((m) => (
        <div 
          key={m.title} 
          className="bg-[#131924] border border-white/10 rounded-2xl p-5 space-y-2 shadow-lg shadow-black/20"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.title}</p>
          <div className={`text-3xl font-black ${m.color} font-sans`}>{m.value}</div>
          <p className="text-[11px] text-slate-400 font-medium">{m.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
