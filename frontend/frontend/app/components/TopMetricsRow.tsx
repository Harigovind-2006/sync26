'use client';

import React from 'react';

export default function TopMetricsRow() {
  const metrics = [
    {
      title: 'PROTECTED',
      value: '4',
      subtitle: 'DWT + Blockchain',
      color: 'text-[#00e5a3]',
    },
    {
      title: 'PENDING REVIEW',
      value: '2',
      subtitle: 'Awaiting processing',
      color: 'text-amber-400',
    },
    {
      title: 'ACTIVE ALERTS',
      value: '1',
      subtitle: 'Requires action',
      color: 'text-red-400',
    },
    {
      title: 'ON-CHAIN RECORDS',
      value: '4',
      subtitle: 'Polygon network',
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
