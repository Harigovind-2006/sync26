'use client';

import React, { useState } from 'react';
import { ShieldCheck, Wallet, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; wallet?: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wallet, setWallet] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name || (email.split('@')[0] ? email.split('@')[0] : 'Elena Rostova'),
      email: email || 'elena@lenstrace.ai',
      wallet: wallet || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    });
    onClose();
  };

  const connectWalletSimulation = () => {
    setWallet('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-6 rounded-3xl space-y-6 border border-white/15 animate-scaleUp">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-base font-black text-white">LENS<span className="text-cyan-400">TRACE</span></span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-900 rounded-lg">
            ✕
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="photographer@lenstrace.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={connectWalletSimulation}
              className="w-full py-2.5 rounded-xl border border-purple-500/30 bg-purple-950/20 text-purple-300 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-purple-900/40 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              {wallet ? `Connected: ${wallet.substring(0, 8)}...` : 'Connect Web3 Wallet (Polygon Amoy)'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            {mode === 'login' ? 'Sign In to LensTrace' : 'Create Photographer Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
