'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Every alternate section: 120px top+bottom, max 1280px, px 80px */
function Block({ children, border = true }: { children: React.ReactNode; border?: boolean }) {
  return (
    <div className={`py-[120px] ${border ? 'border-t border-white/[0.04]' : ''}`}>
      <div className="max-w-[1280px] mx-auto px-20">
        {children}
      </div>
    </div>
  );
}

/** Alternating 2-col layout */
function Alt({
  badge, heading, body, visual, flip = false,
}: {
  badge: string; heading: string; body: string | React.ReactNode;
  visual: React.ReactNode; flip?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
      <FadeUp className={flip ? 'order-2 lg:order-1' : ''}>
        <p className="text-xs text-[#9b51e0] font-bold uppercase tracking-[0.15em] mb-5">{badge}</p>
        <h2 className="text-[44px] sm:text-[48px] font-extrabold tracking-tight text-white leading-[1.1] mb-7">{heading}</h2>
        {typeof body === 'string'
          ? <p className="text-[17px] text-zinc-500 leading-[1.85] max-w-[520px]">{body}</p>
          : body
        }
      </FadeUp>
      <FadeUp delay={0.12} className={flip ? 'order-1 lg:order-2' : ''}>
        {visual}
      </FadeUp>
    </div>
  );
}

/** Simple glass card visual */
function GlassCard({ emoji, lines }: { emoji: string; lines: string[] }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#9b51e0]/6 rounded-2xl blur-3xl scale-110 pointer-events-none" />
      <div className="relative p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-3xl mb-6 flex-shrink-0">{emoji}</div>
        {lines.map(l => (
          <div key={l} className="flex items-start gap-3">
            <svg className="w-4 h-4 text-[#9b51e0] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span className="text-[15px] text-zinc-400 leading-snug">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Quote card */
function Quote({ text, emoji }: { text: string; emoji: string }) {
  return (
    <div className="relative p-10 rounded-2xl border border-[#9b51e0]/12 bg-[#9b51e0]/4 text-center">
      <div className="text-5xl mb-6">{emoji}</div>
      <p className="text-[19px] font-semibold text-white leading-[1.6] italic max-w-[400px] mx-auto">"{text}"</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function AboutPage() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#07070A] text-white font-sans overflow-x-hidden">

      {/* BG */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-[#9b51e0]/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#00b0ff]/4 rounded-full blur-[160px]" />
      </div>

      {/* Sticky nav */}
      <nav className="relative z-30 sticky top-0 h-16 border-b border-white/[0.06] bg-[#07070A]/85 backdrop-blur-xl flex items-center">
        <div className="max-w-[1280px] mx-auto px-20 w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-black text-sm">L</div>
            <span className="text-[15px] font-bold text-white">Lakxam Rekha</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[['Home','/'],['Features','/#features'],['About','/about'],['Security','/#security'],['Contact','/cooperation']].map(([l,h]) => (
              <a key={l} href={h} className={`text-sm transition-colors ${l==='About' ? 'text-[#9b51e0]' : 'text-zinc-500 hover:text-white'}`}>{l}</a>
            ))}
          </div>
          {isAuthenticated
            ? <button onClick={logout} className="text-sm text-zinc-500 hover:text-white transition-colors">Logout</button>
            : <Link href="/login" className="px-4 py-2 rounded-xl bg-white text-[#07070A] text-sm font-bold hover:bg-zinc-100 transition-all">Login</Link>
          }
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div className="relative z-10">

        {/* ── HERO ── no border-t on first */}
        <Block border={false}>
          <FadeUp className="text-center pt-8 pb-4">
            <p className="text-xs text-[#9b51e0] font-bold uppercase tracking-[0.15em] mb-6">About</p>
            <h1 className="text-[60px] sm:text-[68px] font-extrabold tracking-tight leading-[1.05] mb-6">
              About{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b51e0] to-[#00b0ff]">Lakxam Rekha</span>
            </h1>
            <p className="text-[19px] text-zinc-500 max-w-[500px] mx-auto leading-[1.75]">
              AI-powered invisible watermarking and digital ownership protection for creators worldwide.
            </p>
          </FadeUp>
        </Block>

        {/* ── WHO WE ARE  —  Text Left, Visual Right ── */}
        <Block>
          <Alt
            badge="Our Story"
            heading="Who We Are"
            body="Lakxam Rekha helps creators, photographers, artists, and organizations protect their visual content. We combine invisible AI watermarking with cryptographic ownership proof — without affecting image quality."
            visual={<GlassCard emoji="🔮" lines={['Invisible ownership watermarks','AI-powered image protection','Cryptographic ownership proof','Real-time tamper detection']} />}
          />
        </Block>

        {/* ── MISSION  —  Visual Left, Text Right ── */}
        <Block>
          <Alt flip
            badge="Mission"
            heading="Our Mission"
            body="To empower creators with intelligent technology that protects digital ownership, preserves creative rights, and builds trust in the authenticity of digital media across all platforms."
            visual={<Quote emoji="⚡" text="Empower every creator with intelligent protection technology." />}
          />
        </Block>

        {/* ── VISION  —  Text Left, Visual Right ── */}
        <Block>
          <Alt
            badge="Vision"
            heading="Our Vision"
            body="To become the global standard for AI-powered image ownership verification, enabling every creator to publish and protect their digital assets with complete confidence."
            visual={<Quote emoji="🌐" text="Global standard for digital ownership verification." />}
          />
        </Block>

        {/* ── TECHNOLOGY  —  Visual Left, Text Right ── */}
        <Block>
          <Alt flip
            badge="Technology"
            heading="Our Technology"
            body={
              <div className="space-y-4 max-w-[400px]">
                <p className="text-[17px] text-zinc-500 leading-[1.85]">DCT frequency domain steganography, AES-256 encryption, and computer vision combine to create invisible, verifiable, permanent protection.</p>
              </div>
            }
            visual={
              <div className="space-y-3">
                {[
                  { icon: '🔮', label: 'DCT Steganography', desc: 'Pixel-level invisible ownership watermarks' },
                  { icon: '🤖', label: 'Computer Vision', desc: 'AI-optimised watermark placement' },
                  { icon: '🔐', label: 'AES-256 Encryption', desc: 'Military-grade file encryption' },
                  { icon: '☁️', label: 'Secure Cloud Vault', desc: 'Redundant encrypted storage' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#9b51e0]/15 transition-colors">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[14px] font-semibold text-white">{item.label}</p>
                      <p className="text-[13px] text-zinc-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </Block>

        {/* ── SECURITY ARCHITECTURE  —  Text Left, Table Right ── */}
        <Block>
          <Alt
            badge="Security"
            heading="Security Architecture"
            body="Every layer is secured — from upload to long-term storage. Zero trust by design, with military-grade encryption at every step."
            visual={
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                {[
                  ['Upload Channel', 'HTTPS / TLS 1.3'],
                  ['File Encryption', 'AES-256-GCM'],
                  ['Authentication', 'JWT + bcrypt'],
                  ['Watermark', 'DCT Steganography'],
                  ['Storage', 'Encrypted Cloud Vault'],
                  ['Sessions', 'Secure HTTP-only Cookies'],
                ].map(([l, v], i, arr) => (
                  <div key={l} className={`flex justify-between items-center px-6 py-4 ${i < arr.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                    <span className="text-[14px] text-zinc-500">{l}</span>
                    <span className="text-[13px] text-green-400 font-mono">{v}</span>
                  </div>
                ))}
              </div>
            }
          />
        </Block>

        {/* ── FUTURE GOALS  —  Visual Left, Text Right ── */}
        <Block>
          <Alt flip
            badge="Roadmap"
            heading="Future Goals"
            body="Building toward a world where digital ownership is automatic, verifiable, and universally respected across every platform and jurisdiction."
            visual={
              <div className="space-y-4">
                {[
                  { q: 'Q3 2026', t: 'Core Platform Launch', done: true },
                  { q: 'Q4 2026', t: 'Web Crawler Monitor', done: false },
                  { q: 'Q1 2027', t: 'Real-Time Infringement Alerts', done: false },
                  { q: 'Q2 2027', t: 'Deepfake Detection AI', done: false },
                ].map(item => (
                  <div key={item.q} className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${item.done ? 'border-green-500/12 bg-green-500/4' : 'border-white/[0.05] bg-white/[0.015]'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${item.done ? 'bg-green-500/12 text-green-400' : 'bg-white/[0.04] text-zinc-600'}`}>
                      {item.done ? '✓' : '○'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-zinc-600 mb-0.5">{item.q}</p>
                      <p className="text-[14px] font-semibold text-white">{item.t}</p>
                    </div>
                    {item.done && (
                      <span className="text-[10px] text-green-400 font-bold border border-green-500/20 px-2 py-0.5 rounded-full flex-shrink-0">Live</span>
                    )}
                  </div>
                ))}
              </div>
            }
          />
        </Block>

        {/* ── CONTACT CTA ── */}
        <Block>
          <FadeUp>
            <div className="relative rounded-2xl border border-[#9b51e0]/12 bg-[#9b51e0]/4 px-[80px] py-[80px] text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[160px] bg-[#9b51e0]/8 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10 max-w-[480px] mx-auto flex flex-col items-center gap-8">
                <h2 className="text-[40px] font-extrabold tracking-tight text-white leading-tight">Start Protecting Your Work</h2>
                <p className="text-[17px] text-zinc-500 leading-[1.75]">Upload your images and generate invisible ownership watermarks in seconds.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/signup" className="px-7 py-3.5 rounded-xl bg-white text-[#07070A] font-bold text-[15px] hover:bg-zinc-100 transition-all">
                    Get Started Free
                  </Link>
                  <Link href="/upload" className="px-7 py-3.5 rounded-xl border border-white/10 text-zinc-400 font-medium text-[15px] hover:text-white hover:border-white/20 transition-all">
                    Upload Image
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </Block>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-14">
        <div className="max-w-[1280px] mx-auto px-20 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] flex items-center justify-center text-black font-black text-sm">L</div>
            <span className="text-[15px] font-bold text-white">Lakxam Rekha</span>
          </div>
          <div className="flex flex-wrap justify-center gap-7">
            {[['Home','/'],['Dashboard','/home'],['Upload','/upload'],['Privacy','/terms'],['Contact','/cooperation']].map(([l,h]) => (
              <a key={l} href={h} className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-sm text-zinc-700">© 2026 Lakxam Rekha</p>
        </div>
      </footer>
    </div>
  );
}
