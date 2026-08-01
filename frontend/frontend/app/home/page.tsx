'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const securityFeatures = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
      </svg>
    ),
    title: 'Invisible AI Watermarking',
    desc: 'Embed unique invisible ownership signatures into every uploaded image without affecting visual quality.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'AES-256 Encryption',
    desc: 'Protect uploaded files and metadata using military-grade AES-256 encryption standards.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'End-to-End Secure Upload',
    desc: 'Images remain encrypted during upload and storage using HTTPS and secure transmission protocols.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: 'Ownership Verification',
    desc: 'Instantly verify the original owner using secure watermark decoding and cryptographic ownership records.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: 'Tamper Detection',
    desc: 'AI detects unauthorized edits, modifications, removals, or attempts to manipulate protected images.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    title: 'Modification Tracking',
    desc: 'Maintain a secure history of image changes for authenticity assurance and forensic analysis.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Secure Authentication',
    desc: 'JWT tokens, bcrypt password hashing, session management, and optional multi-factor authentication.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Role-Based Access Control',
    desc: 'Different permission levels for creators, organizations, administrators, and verification officers.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
    title: 'Privacy Protection',
    desc: 'No public exposure of uploaded files. User data and media remain private and securely stored.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: 'Cloud Backup',
    desc: 'Encrypted backups ensure digital assets remain protected against accidental loss or corruption.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: 'Audit Logs',
    desc: 'Complete logs of uploads, ownership verification requests, and all security events are maintained.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'Future AI Monitoring',
    desc: 'Upcoming versions will monitor the web for protected images and alert owners of unauthorized copies or modifications.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#07070A] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#9b51e0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-white font-sans flex flex-col overflow-x-hidden">

      {/* ─── DECORATIVE GLOWS ─── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-[#9b51e0]/8 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#00b0ff]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-[#9b51e0]/5 rounded-full blur-[120px]" />
      </div>

      {/* ─── NAV ─── */}
      <nav className="relative z-30 w-full h-20 border-b border-white/[0.06] bg-[#07070A]/70 backdrop-blur-xl sticky top-0 flex items-center px-10 justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-black text-base shadow-lg shadow-[#9b51e0]/20">
            L
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#9b51e0] transition-colors">
            Lakxam Rekha
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {[
            { label: 'Dashboard', href: '/home', active: true },
            { label: 'Upload', href: '/upload' },
            { label: 'Profile', href: '/profile' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                item.active ? 'text-[#9b51e0]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="text-sm font-semibold text-zinc-500 hover:text-red-400 tracking-wide transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-15 py-20" style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '80px', paddingBottom: '60px' }}>

        {/* ── HERO / WELCOME SECTION ── */}
        <motion.section
          className="text-center mb-24"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9b51e0]/25 bg-[#9b51e0]/8 text-[#9b51e0] text-sm font-semibold tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9b51e0] animate-pulse" />
            AI-Powered Image Protection Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b51e0] via-[#c084fc] to-[#00b0ff]">
              Lakxam Rekha
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-2xl sm:text-3xl font-semibold text-zinc-300 mb-6"
          >
            Protecting Every Pixel.{' '}
            <span className="text-[#00b0ff]">Preserving Every Creator.</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-lg sm:text-xl text-zinc-500 max-w-3xl mx-auto leading-relaxed"
          >
            Lakxam Rekha is an AI-powered platform that protects digital ownership through invisible watermarking, ownership verification, intelligent security, and advanced image authentication.
          </motion.p>
        </motion.section>

        {/* ── ABOUT SECTION ── */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
        >
          <div className="relative rounded-[28px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-12 lg:p-16 overflow-hidden shadow-2xl shadow-black/40">
            {/* card inner glow */}
            <div className="absolute top-0 left-0 w-[350px] h-[200px] bg-[#9b51e0]/6 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9b51e0]/20 bg-[#9b51e0]/8 text-[#9b51e0] text-xs font-bold uppercase tracking-widest mb-6">
                About
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white mb-10">
                About Lakxam Rekha
              </h2>

              <div className="space-y-6 text-[19px] leading-[1.8] text-zinc-400 max-w-4xl">
                <p>
                  Lakxam Rekha is an AI-powered digital ownership platform designed to help creators, photographers, artists, designers, and organizations protect their visual content from unauthorized use. The platform combines advanced image processing with invisible digital watermarking to establish verifiable ownership while preserving the original appearance of every image.
                </p>
                <p>
                  When a user uploads an image, Lakxam Rekha securely generates a unique ownership signature and embeds it as an invisible watermark. This hidden identifier allows the image owner to verify authenticity, prove ownership, and maintain a permanent digital record without affecting image quality.
                </p>
                <p>
                  Beyond watermarking, Lakxam Rekha aims to build a trusted ecosystem for digital content protection. Future capabilities include AI-based tamper detection, ownership verification, modification tracking, and automated alerts when protected images are altered or shared online. These features are designed to help creators safeguard their intellectual property in an increasingly digital world.
                </p>
                <p>
                  The platform prioritizes privacy and security by using encrypted storage, secure authentication, and modern cybersecurity practices to protect both user accounts and uploaded content.
                </p>
              </div>

              {/* Mission & Vision grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="rounded-[20px] border border-[#9b51e0]/15 bg-[#9b51e0]/5 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#9b51e0]/15 flex items-center justify-center text-[#9b51e0]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Mission</h3>
                  </div>
                  <p className="text-[17px] text-zinc-400 leading-relaxed">
                    To empower creators with intelligent technology that protects digital ownership, preserves creative rights, and builds trust in the authenticity of digital media.
                  </p>
                </div>
                <div className="rounded-[20px] border border-[#00b0ff]/15 bg-[#00b0ff]/5 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#00b0ff]/15 flex items-center justify-center text-[#00b0ff]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Vision</h3>
                  </div>
                  <p className="text-[17px] text-zinc-400 leading-relaxed">
                    To become a global standard for AI-powered image ownership verification, enabling every creator to confidently publish, share, and protect their digital assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── SECURITY FEATURES SECTION ── */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
        >
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00b0ff]/20 bg-[#00b0ff]/8 text-[#00b0ff] text-xs font-bold uppercase tracking-widest mb-5">
              Security
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Built on military-grade cryptography and AI-powered detection to protect every image you upload.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {securityFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative rounded-[24px] border border-white/[0.06] hover:border-[#9b51e0]/35 bg-white/[0.02] hover:bg-[#9b51e0]/5 backdrop-blur-md p-7 flex flex-col gap-4 cursor-default transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-[#9b51e0]/10"
              >
                {/* glow on hover */}
                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#9b51e0]/5 to-transparent" />

                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-[#9b51e0]/15 to-[#00b0ff]/10 border border-[#9b51e0]/20 flex items-center justify-center text-[#9b51e0] group-hover:scale-105 transition-transform duration-300 shadow-md shadow-[#9b51e0]/10">
                  {feat.icon}
                </div>
                <h3 className="text-[20px] font-bold text-white leading-snug">{feat.title}</h3>
                <p className="text-[16px] text-zinc-500 group-hover:text-zinc-400 leading-relaxed transition-colors duration-300 flex-1">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── UPLOAD CTA ── */}
        <motion.section
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          custom={0}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-[20px] blur-2xl bg-gradient-to-r from-[#9b51e0]/30 to-[#00b0ff]/30 scale-110" />
            <Link
              href="/upload"
              className="relative inline-flex items-center gap-3 px-12 py-5 rounded-[20px] bg-gradient-to-r from-[#9b51e0] to-[#00b0ff] text-black font-extrabold text-xl tracking-tight hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-2xl shadow-[#9b51e0]/25"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Secure Your First Image
            </Link>
          </div>
          <p className="text-zinc-600 text-base mt-5">
            Drag, drop, and watermark in under 30 seconds.
          </p>
        </motion.section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 w-full border-t border-white/[0.05] bg-[#05050A]/80 backdrop-blur-xl pt-16 pb-10 px-10 sm:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

            {/* Brand col */}
            <div className="md:col-span-5">
              <Link href="/" className="flex items-center gap-3 group mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-black text-lg shadow-lg shadow-[#9b51e0]/20">
                  L
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Lakxam Rekha</span>
              </Link>
              <p className="text-[17px] text-zinc-500 leading-relaxed max-w-xs">
                Protecting Every Pixel.<br />
                <span className="text-[#00b0ff]">Preserving Every Creator.</span>
              </p>
            </div>

            {/* Links */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Platform</h4>
              <ul className="space-y-3 text-[16px]">
                {[
                  { label: 'Dashboard', href: '/home' },
                  { label: 'Upload', href: '/upload' },
                  { label: 'Profile', href: '/profile' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-zinc-500 hover:text-[#9b51e0] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Legal</h4>
              <ul className="space-y-3 text-[16px]">
                {[
                  { label: 'Privacy Policy', href: '/terms' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Contact', href: '/cooperation' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-zinc-500 hover:text-[#9b51e0] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Connect</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'GitHub', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg> },
                  { label: 'LinkedIn', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label: 'Email', href: 'mailto:contact@lakxamrekha.ai', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
                ].map((s) => (
                  <a key={s.label} href={s.href} className="flex items-center gap-2.5 text-[15px] text-zinc-500 hover:text-[#9b51e0] transition-colors group">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-[#9b51e0]/30 flex items-center justify-center transition-colors">
                      {s.icon}
                    </span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[15px] text-zinc-600">© 2026 Lakxam Rekha. All Rights Reserved.</p>
            <p className="text-[13px] text-zinc-700 font-mono uppercase tracking-widest">
              Powered by AI · AES-256 Encrypted
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
