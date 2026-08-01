'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validation
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        // Redirect directly to Home Dashboard
        router.push('/home');
      } else {
        setErrorMsg('Invalid email or security password.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-[#f8f9fa] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-[20%] right-[-15%] w-[400px] h-[400px] bg-[#9b51e0]/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] bg-[#00b0ff]/5 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Home
      </Link>

      {/* Login Card */}
      <motion.div
        className="w-full max-w-sm bg-[#090812]/50 border border-[#9b51e0]/10 p-8 rounded-[24px] shadow-2xl backdrop-blur-md relative z-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Brand logo header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] text-black font-extrabold rounded-xl flex items-center justify-center text-sm shadow-md shadow-[#9b51e0]/15">
            L
          </div>
          <div>
            <h1 className="font-sans text-xs uppercase font-extrabold tracking-widest text-white">Lakxam Rekha</h1>
            <p className="text-zinc-500 text-[10px] mt-1 font-mono">Authenticate to access image protection console</p>
          </div>
        </div>

        {/* Errors display */}
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono rounded-xl leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
          <div className="flex flex-col gap-1.5">
            <label className="font-bold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="operator@lakxamrekha.ai"
              className="px-4 py-3 bg-black/60 border border-white/5 focus:border-[#9b51e0] rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none transition-all font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="px-4 py-3 bg-black/60 border border-white/5 focus:border-[#9b51e0] rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none transition-all font-sans"
            />
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between font-sans text-[10px] text-zinc-400 py-1 lowercase">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 bg-black border border-white/10 rounded focus:ring-0 text-[#9b51e0] checked:bg-[#9b51e0] cursor-pointer"
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-[#00b0ff] hover:underline uppercase text-[8px] font-mono tracking-wider font-bold">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] hover:brightness-110 text-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all duration-200 mt-2 font-mono flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        {/* Social Authentication buttons */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5 mt-2 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
          <div className="text-center text-[8px] tracking-widest text-zinc-600 mb-1">Or login with credentials</div>
          
          <div className="grid grid-cols-2 gap-3 text-white text-[10px]">
            {/* Google Login */}
            <button
              onClick={() => {
                login('google@operator.ai', 'google_session');
                router.push('/home');
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] border border-white/5 hover:bg-white/5 rounded-xl transition-all"
            >
              <span>Google</span>
            </button>
            {/* Github Login */}
            <button
              onClick={() => {
                login('github@operator.ai', 'github_session');
                router.push('/home');
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] border border-white/5 hover:bg-white/5 rounded-xl transition-all"
            >
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Link to signup */}
        <div className="text-center text-[10px] text-zinc-500 font-sans border-t border-white/5 pt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#9b51e0] font-bold hover:underline">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
