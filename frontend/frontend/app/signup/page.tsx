'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { signupUser } from '../../lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex@photostudio.io');
  const [password, setPassword] = useState('securepass123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await signupUser(name, email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        if (res?.token) localStorage.setItem('token', res.token);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#f0f6fc] flex flex-col justify-between items-center relative overflow-hidden p-6">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-3xl pointer-events-none rounded-full"></div>

      <div className="pt-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xl font-black text-white">Laxman<span className="text-amber-400">Rekha</span></span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#0e131d] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl z-10 my-12">
        
        <div className="text-center space-y-2">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[11px] font-bold inline-block">
            CREATE ACCOUNT
          </span>
          <h2 className="text-2xl font-black text-white">Protect Your Portfolio</h2>
          <p className="text-xs text-slate-400">Join Laxman Rekha to secure your photographs.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/80 border border-red-500/40 text-red-200 p-3 rounded-xl text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#131924] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#131924] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#131924] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Create Free Creator Account'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-400 font-bold hover:underline">Sign in</Link>
        </p>

      </div>

      <p className="pb-6 text-xs text-slate-600">© 2026 Laxman Rekha. All rights reserved.</p>

    </div>
  );
}
