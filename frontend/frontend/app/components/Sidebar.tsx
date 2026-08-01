'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpenCheck, 
  BellRing, 
  BarChart3, 
  Settings,
  Shield,
  Home,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ledger', label: 'Ownership Ledger', icon: BookOpenCheck },
    { id: 'alerts', label: 'Detection Alerts', icon: BellRing, badge: '2' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      router.push('/login');
    }
  };

  return (
    <aside className="w-64 bg-[#090d12] border-r border-white/10 flex flex-col justify-between shrink-0 select-none h-full overflow-y-auto">
      
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/10">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block leading-none font-sans">
                Laxman<span className="text-amber-400">Rekha</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">v2.4.1 AI Security</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between px-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">NAVIGATION</p>
            <Link href="/" className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1">
              <Home className="w-3 h-3" /> Home Page
            </Link>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border-l-4 border-amber-400 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-white/5 bg-[#070a0e]">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30">
              AM
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">Alex Mercer</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Pro Creator Plan</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
}
