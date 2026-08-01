'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export default function Cooperation() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    coopType: 'Advertising',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        coopType: 'Advertising',
        message: '',
      });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const metrics = [
    { value: '50K+', label: 'Monthly Readers' },
    { value: '12K+', label: 'Newsletter Subscribers' },
    { value: '4.8%', label: 'Avg Click-Through Rate' },
    { value: '15 Min', label: 'Average Read Time' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-foreground flex flex-col relative overflow-hidden">
      <Header />

      {/* Decorative neon gradient glow in background */}
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-brand-neon/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="flex-1 w-full pt-32 pb-24 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto z-10">
        {/* Intro Section */}
        <section className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase font-bold text-brand-neon tracking-widest bg-brand-neon/10 px-3 py-1 rounded-full">
            Partnerships
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Cooperation & Advertising
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            NEXUSMAG connects your brand with a highly engaged audience of creative professionals, digital developers, designers, copywriters, and tech leaders. We offer custom content campaigns, banner placements, and newsletter sponsorship.
          </p>
        </div>

        {/* Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-6 glass-panel rounded-2xl border border-white/5 text-center flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-black text-brand-neon tracking-tight mb-1">
                {metric.value}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                {metric.label}
              </span>
            </div>
          ))}
        </section>

        {/* Details & Form Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Ad Options Detail */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sponsorship Formats
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-neon font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Sponsored Content</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Custom-written articles, case studies, or developer interviews tailored to demonstrate your product value naturally.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-neon font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Newsletter Spotlight</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Feature your service directly in our weekly newsletter sent to 12K+ verified active creative professionals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-neon font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Banner Placements</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Sleek display placements integrated cleanly into our content template without disrupting user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* MediaKit Download */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-3 mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Need more detail?</h4>
              <p className="text-xs text-zinc-400">
                Download our full MediaKit for complete audience demographics, performance statistics, and advertising rates.
              </p>
              <a
                href="#"
                className="w-full text-center px-4 py-2.5 bg-zinc-950 border border-white/10 hover:border-brand-neon/30 text-white hover:text-brand-neon text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200"
              >
                Download MediaKit (PDF)
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="md:col-span-7 glass-panel p-8 rounded-3xl border border-white/5">
            <h2 className="text-xl font-black text-white tracking-tight mb-1">
              Send an Inquiry
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Let us know what you want to achieve, and we will get back to you with a custom proposal in 24 hours.
            </p>

            {formSubmitted ? (
              <div className="p-8 text-center bg-brand-neon/5 border border-brand-neon/20 rounded-2xl flex flex-col items-center gap-3">
                <svg className="w-10 h-10 text-brand-neon animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm font-bold text-white">Inquiry received!</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                  Thank you for reaching out. We will review your proposal and get in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-brand-neon transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="ACME Corp"
                      className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-brand-neon transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@company.com"
                      className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-brand-neon transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Partnership Format</label>
                    <select
                      name="coopType"
                      value={formData.coopType}
                      onChange={handleChange}
                      className="px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-neon transition-all"
                    >
                      <option value="Advertising">Advertising / Banner placement</option>
                      <option value="Sponsorship">Sponsored Content / Articles</option>
                      <option value="Newsletter">Newsletter Sponsorship</option>
                      <option value="Other">Other Collaboration</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your goals, budget, or preferred timing..."
                    className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-brand-neon transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 bg-brand-neon hover:bg-brand-neon-hover text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
