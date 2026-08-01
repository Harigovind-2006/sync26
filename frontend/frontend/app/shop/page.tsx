'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export default function ShopPage() {
  const plans = [
    {
      id: 1,
      title: 'Creator Plan',
      description: 'Ideal for freelance photographers, designers, and independent digital creators.',
      price: '$19',
      period: '/ month',
      tag: 'Personal',
      features: [
        'Up to 500 images watermarked/mo',
        'Standard frequency steganography',
        'Daily crawler scanning logs',
        'Pre-compiled DMCA email templates',
      ],
      image: 'https://images.unsplash.com/photo-1541462608141-2f5203690acf?auto=format&fit=crop&q=80&w=400&h=300',
    },
    {
      id: 2,
      title: 'Studio Plan',
      description: 'For boutique agencies, fashion portfolios, and professional design studios.',
      price: '$59',
      period: '/ month',
      tag: 'Popular',
      features: [
        'Up to 5,000 images watermarked/mo',
        'High-density spatial weaving',
        'Real-time SMS & Email alerts',
        'Developer API access (1 key)',
      ],
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400&h=300',
    },
    {
      id: 3,
      title: 'Enterprise Plan',
      description: 'For stock platforms, corporate safety cells, and high-volume media houses.',
      price: '$199',
      period: '/ month',
      tag: 'Corporate',
      features: [
        'Unlimited image watermarking',
        'Deepfake facial vector tracing logs',
        'Real-time webhook alert callbacks',
        'Auto-takedown mitigation hooks',
      ],
      image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=400&h=300',
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#f8f9fa] flex flex-col relative overflow-hidden">
      <Header />

      {/* Decorative background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="flex-1 w-full pt-28 pb-20 px-6 sm:px-12 md:px-16 max-w-5xl mx-auto z-10">
        
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase font-bold text-[#00f3ff] tracking-widest bg-[#00f3ff]/10 px-3 py-1 rounded-full font-mono">
            Licensing & Capacity Tiers
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl font-normal text-white tracking-tight leading-tight">
            Security Pricing Plans
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-xl">
            Select the processing capacity you need to cryptographically watermark and monitor your visual art collection. Upgradable or customizable at any time.
          </p>
        </section>

        {/* Pricing Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 font-mono text-xs">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-[#0a0a0c] border rounded-2xl overflow-hidden hover:border-[#00f3ff]/20 transition-all flex flex-col group ${
                plan.tag === 'Popular' ? 'border-[#00f3ff]/30 shadow-lg shadow-[#00f3ff]/5' : 'border-white/5'
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-900 relative">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500 filter brightness-90"
                />
                <span className="absolute top-3 left-3 bg-black border border-white/10 px-2 py-0.5 text-[8px] uppercase tracking-wider font-extrabold text-[#00f3ff] rounded">
                  {plan.tag}
                </span>
              </div>
              
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {plan.title}
                  </h3>
                  <p className="text-zinc-500 text-[11px] leading-relaxed font-sans mt-1.5">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 py-2 border-y border-white/5 my-2">
                  <span className="text-2xl font-bold text-[#00f3ff]">{plan.price}</span>
                  <span className="text-zinc-500 text-[10px]">{plan.period}</span>
                </div>

                <ul className="flex flex-col gap-2 text-zinc-400 font-sans text-[11px]">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full mt-auto pt-4">
                  <a
                    href="/cooperation#inquiry"
                    className="block text-center py-2.5 bg-[#00f3ff] hover:bg-[#00b0ff] text-black text-[9px] font-bold uppercase tracking-widest rounded transition-all duration-200"
                  >
                    Select Plan
                  </a>
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
