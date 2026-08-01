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
    integrationType: 'REST API',
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
        integrationType: 'REST API',
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
    { value: '&lt; 80ms', label: 'Average Watermark API Latency' },
    { value: '99.99%', label: 'Crawler Core Uptime' },
    { value: 'REST / Webhooks', label: 'Integration Protocols' },
    { value: 'AES-GCM', label: 'Signature Security' },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#f8f9fa] flex flex-col relative overflow-hidden">
      <Header />

      {/* Background neon glow */}
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="flex-1 w-full pt-28 pb-20 px-6 sm:px-12 md:px-16 max-w-5xl mx-auto z-10">
        
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase font-bold text-[#00f3ff] tracking-widest bg-[#00f3ff]/10 px-3 py-1 rounded-full font-mono">
            API Documentation & Integrations
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl font-normal text-white tracking-tight leading-tight">
            Developer API & Webhooks
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-xl">
            Automate pixel watermarking and monitor callbacks. Integrate Pixie directly into your ingestion pipelines, CMS, or user-upload filters to secure digital rights at scale.
          </p>
        </section>

        {/* API stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 font-mono">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-6 bg-[#0a0a0c] border border-white/5 rounded-2xl text-center flex flex-col justify-center">
              <span className="text-2xl font-bold text-[#00f3ff] tracking-tight mb-1" dangerouslySetInnerHTML={{ __html: metric.value }}>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">
                {metric.label}
              </span>
            </div>
          ))}
        </section>

        {/* Details and form */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start font-mono text-xs">
          
          {/* Ad Options Detail */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-base font-bold text-white tracking-tight uppercase">
              API Formats
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00f3ff] font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xs uppercase font-bold text-white mb-1">Batch REST Endpoint</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                    Post multiple image files to `/v1/watermark`. Returns watermarked image buffers containing spatial steganography signatures.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00f3ff] font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xs uppercase font-bold text-white mb-1">Crawler Webhooks</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                    Configure endpoint URLs to receive POST alerts the moment our crawler network flags derivatives or deepfaked copies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00f3ff] font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xs uppercase font-bold text-white mb-1">Ownership Decoders</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                    Verify external files via `/v1/decode` to retrieve metadata payloads and confirm original artist signatures.
                  </p>
                </div>
              </div>
            </div>

            {/* API Doc Download */}
            <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col gap-3 mt-4">
              <h4 className="text-[9px] font-bold uppercase tracking-wider text-white">Interactive Docs</h4>
              <p className="text-[11px] text-zinc-500 font-sans">
                Review complete REST API specs, header requirements, response schemas, and webhook payload structures.
              </p>
              <a
                href="#"
                className="w-full text-center px-4 py-2.5 bg-black border border-white/10 hover:border-[#00f3ff]/30 text-white hover:text-[#00f3ff] text-[9px] font-bold uppercase tracking-wider rounded-xl transition-all duration-200"
              >
                View OpenAPI Docs (Swagger)
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="md:col-span-7 bg-[#0a0a0c] border border-white/5 p-8 rounded-3xl" id="inquiry">
            <h2 className="text-base font-bold text-white tracking-tight mb-1 uppercase">
              Request API Access Key
            </h2>
            <p className="text-xs text-zinc-500 mb-6 font-sans">
              Apply for developer keys to integrate Pixie watermarking. Standard keys are dispatched within 24 hours.
            </p>

            {formSubmitted ? (
              <div className="p-8 text-center bg-[#00f3ff]/5 border border-[#00f3ff]/20 rounded-2xl flex flex-col items-center gap-3">
                <svg className="w-10 h-10 text-[#00f3ff] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xs font-bold text-white">Application Received!</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm font-sans">
                  Our developer relations team is reviewing your integration parameters. Check your email for status credentials shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="px-4 py-2.5 bg-black border border-white/10 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#00f3ff] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="ACME Corp"
                      className="px-4 py-2.5 bg-black border border-white/10 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#00f3ff] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@company.com"
                      className="px-4 py-2.5 bg-black border border-white/10 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#00f3ff] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Integration Format</label>
                    <select
                      name="integrationType"
                      value={formData.integrationType}
                      onChange={handleChange}
                      className="px-4 py-2.5 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00f3ff] transition-all"
                    >
                      <option value="REST API">REST API Endpoint</option>
                      <option value="Webhooks">Crawler Webhooks</option>
                      <option value="Batch SDK">Offline Processing SDK</option>
                      <option value="Enterprise">Full Cloud Integration</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Integration Summary</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your visual assets volume, crawl frequency requirements, and integration timeline..."
                    className="px-4 py-2.5 bg-black border border-white/10 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#00f3ff] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 bg-[#00f3ff] hover:bg-[#00b0ff] text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-200"
                >
                  Request API Access
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
