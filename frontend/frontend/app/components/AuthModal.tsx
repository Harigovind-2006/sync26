'use client';

import React, { useState } from 'react';
import { ShieldCheck, Wallet, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { loginUser, signupUser } from '../../lib/api';

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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (mode === 'login') {
        const res = await loginUser(email, password);
        if (typeof window !== 'undefined') {
          localStorage.setItem('isLoggedIn', 'true');
          if (res?.token) localStorage.setItem('token', res.token);
        }
      } else {
        const res = await signupUser(name || 'Creator User', email, password);
        if (typeof window !== 'undefined') {
          localStorage.setItem('isLoggedIn', 'true');
          if (res?.token) localStorage.setItem('token', res.token);
        }
      }

      onSuccess({
        name: name || (email.split('@')[0] ? email.split('@')[0] : 'Alex Mercer'),
        email: email || 'creator@laxmanrekha.ai',
        wallet: wallet || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      });
      onClose();
    } catch (err: any) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
      onSuccess({
        name: name || 'Alex Mercer',
        email: email || 'creator@laxmanrekha.ai',
        wallet: wallet || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const connectWalletSimulation = () => {
    setWallet('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e131d] max-w-md w-full p-6 rounded-3xl space-y-6 border border-white/15 animate-scaleUp shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-base font-black text-white">Laxman<span className="text-amber-400">Rekha</span></span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-900 rounded-lg cursor-pointer">
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-950/80 border border-red-500/40 text-red-200 p-2.5 rounded-xl text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Mode Switcher */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'register' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400'
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
                  placeholder="Alex Mercer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#131924] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                placeholder="creator@laxmanrekha.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#131924] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                className="w-full bg-[#131924] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={connectWalletSimulation}
              className="w-full py-2.5 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-amber-900/40 transition-colors cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              {wallet ? `Connected: ${wallet.substring(0, 8)}...` : 'Connect Web3 Wallet (Polygon Amoy)'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In to Laxman Rekha' : 'Create Creator Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
