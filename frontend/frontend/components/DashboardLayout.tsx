'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [sidebarWidth, setSidebarWidth] = useState(240);

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07070A] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#9b51e0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-white font-sans flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content — offset by sidebar width */}
      <main
        className="flex-1 min-h-screen transition-all duration-300"
        style={{ marginLeft: '240px' }}
      >
        {children}
      </main>
    </div>
  );
}
