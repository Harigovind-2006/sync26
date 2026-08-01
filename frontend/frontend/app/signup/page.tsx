'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validations
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!acceptTerms) {
      setErrorMsg('You must accept the Terms of Service.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await signup(name, email, password);
      if (success) {
        // Redirect to Login Page
        router.push('/login');
      } else {
        setErrorMsg('Registration failed. Try again.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-[#f8f9fa] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Decorative background glow spots */}
      <div className="absolute top-[20%] left-[-15%] w-[400px] h-[400px] bg-[#9b51e0]/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] bg-[#00b0ff]/5 rounded-full blur-[130px] pointer-events-none"></div>

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

      {/* Signup Container Card */}
      <motion.div
        className="w-full max-w-md bg-[#090812]/50 border border-[#9b51e0]/10 p-8 rounded-[24px] shadow-2xl backdrop-blur-md relative z-10 flex flex-col gap-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] text-black font-extrabold rounded-xl flex items-center justify-center text-sm shadow-md shadow-[#9b51e0]/10">
            L
          </div>
          <div>
            <h1 className="font-sans text-sm uppercase font-extrabold tracking-wider text-white">Create Account</h1>
            <p className="text-zinc-500 text-[10px] mt-0.5">Register for Lakxam Rekha secure protocol</p>
          </div>
        </div>

        {/* Validation Errors alert */}
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono rounded-xl leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Register form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
          <div className="flex flex-col gap-1">
            <label className="font-bold">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Doe"
              className="px-4 py-2.5 bg-black/60 border border-white/5 focus:border-[#9b51e0] rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none transition-all font-sans"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane@example.com"
              className="px-4 py-2.5 bg-black/60 border border-white/5 focus:border-[#9b51e0] rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none transition-all font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••"
                className="px-4 py-2.5 bg-black/60 border border-white/5 focus:border-[#9b51e0] rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none transition-all font-sans"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••"
                className="px-4 py-2.5 bg-black/60 border border-white/5 focus:border-[#9b51e0] rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none transition-all font-sans"
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none font-sans text-[10px] text-zinc-400 py-1 lowercase">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-3.5 h-3.5 bg-black border border-white/10 rounded focus:ring-0 text-[#9b51e0] checked:bg-[#9b51e0] cursor-pointer"
            />
            <span>I accept the <a href="#" className="text-[#00b0ff] hover:underline uppercase text-[9px] tracking-wider font-bold">Terms of Service</a> & GDPR Policy</span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] hover:brightness-110 text-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all duration-200 mt-2 font-mono flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Existing login link */}
        <div className="text-center text-[10px] text-zinc-500 font-sans border-t border-white/5 pt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-[#9b51e0] font-bold hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
