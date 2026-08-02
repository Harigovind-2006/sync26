'use client';

import React, { useState } from 'react';
import { Upload, X, Shield, Cpu, Zap, CheckCircle2 } from 'lucide-react';
import { AssetItem } from './AssetInspector';
import { uploadImage } from '../../lib/api';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetAdded: (newAsset: AssetItem) => void;
}

export default function UploadModal({ isOpen, onClose, onAssetAdded }: UploadModalProps) {
  const [filename, setFilename] = useState('');
  const [licensee, setLicensee] = useState('Client A');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setFilename(f.name);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const created = await uploadImage(file, filename || file.name);
      onAssetAdded(created);
      onClose();
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="lenstrace-panel max-w-lg w-full p-6 rounded-3xl space-y-5 border border-white/15 animate-scaleUp">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#48c4c7]" /> Upload & Watermark New Image
          </h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Select Original Media File</label>
          <label className="border-2 border-dashed border-[#48c4c7]/30 hover:border-[#48c4c7] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#13181b] hover:bg-[#182024] transition-all text-center group">
            <Upload className="w-8 h-8 text-[#48c4c7] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-white">Click to upload original photograph</span>
            <span className="text-[10px] text-slate-400 mt-1">Embeds DCT frequency watermark & records SHA-256</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {preview && (
          <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Licensee / Client Name</label>
          <input
            type="text"
            placeholder="Client A"
            value={licensee}
            onChange={(e) => setLicensee(e.target.value)}
            className="w-full bg-[#13181b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#48c4c7]"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!preview || loading}
            className="lenstrace-btn-teal px-5 py-2 rounded-xl text-xs flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-slate-950" />
                <span>Processing Watermark & Polygon Hash...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Embed & Register</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
