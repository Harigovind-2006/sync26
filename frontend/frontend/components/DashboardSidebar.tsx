'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Upload, Images, ShieldCheck, History,
  FileSearch, User, Settings, LogOut, ChevronLeft, ChevronRight, Fingerprint,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',    href: '/home',        icon: LayoutDashboard },
  { label: 'Upload Image', href: '/upload',       icon: Upload },
  { label: 'My Images',    href: '/home',         icon: Images },
  { label: 'Verification', href: '/home',         icon: ShieldCheck },
  { label: 'History',      href: '/home',         icon: History },
  { label: 'Security Logs',href: '/home',         icon: FileSearch },
];

const bottomItems = [
  { label: 'Profile',  href: '/profile', icon: User },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-40 flex flex-col
        border-r border-white/[0.06] bg-[#07070A]/95 backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-[240px]'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-20 px-4 border-b border-white/[0.06] ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center shadow-lg shadow-[#9b51e0]/20">
          <Fingerprint className="w-4 h-4 text-black" />
        </div>
        {!collapsed && (
          <span className="text-[15px] font-bold text-white tracking-tight truncate">Lakxam Rekha</span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-5 px-2 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href) && item.label === 'Dashboard' ? pathname === '/home' : false;
          const exactActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-[12px]
                transition-all duration-200 relative overflow-hidden
                ${exactActive && item.href !== '/home'
                  ? 'bg-[#9b51e0]/15 text-[#9b51e0] border border-[#9b51e0]/20'
                  : 'text-zinc-500 hover:text-white hover:bg-white/[0.05]'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              {/* Active indicator */}
              {exactActive && item.href !== '/home' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#9b51e0] rounded-r-full" />
              )}
              <Icon className={`flex-shrink-0 transition-all duration-200 ${collapsed ? 'w-5 h-5' : 'w-4 h-4'} ${exactActive && item.href !== '/home' ? 'text-[#9b51e0]' : 'group-hover:text-white'}`} />
              {!collapsed && (
                <span className="text-[13px] font-medium truncate">{item.label}</span>
              )}
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#111118] border border-white/10 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="py-4 px-2 border-t border-white/[0.06] flex flex-col gap-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} title={collapsed ? item.label : undefined}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-all duration-200 text-zinc-500 hover:text-white hover:bg-white/[0.05] ${collapsed ? 'justify-center' : ''} relative`}
            >
              <Icon className={`flex-shrink-0 ${collapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
              {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#111118] border border-white/10 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}

        <button onClick={logout} title={collapsed ? 'Logout' : undefined}
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-all duration-200 text-zinc-600 hover:text-red-400 hover:bg-red-500/[0.06] w-full ${collapsed ? 'justify-center' : ''} relative`}
        >
          <LogOut className={`flex-shrink-0 ${collapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
          {!collapsed && <span className="text-[13px] font-medium">Logout</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#111118] border border-white/10 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-[#111118] border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#9b51e0]/40 transition-all shadow-lg z-50"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
