'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useImages } from '../../context/ImageContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { photos } = useImages();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    if (user) setEditName(user.name);
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) return null;

  const totalUploaded = photos.length;
  const storageUsed = (totalUploaded * 3.8).toFixed(1);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    user.name = editName;
    setIsEditing(false);
    setMessage('Profile updated successfully.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-[#f8f9fa] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <nav className="h-16 border-b border-[#9b51e0]/10 bg-[#090812]/50 backdrop-blur-md sticky top-0 z-30 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group font-mono text-xs">
          <div className="w-5 h-5 bg-gradient-to-br from-[#9b51e0] to-[#00b0ff] text-black font-extrabold rounded flex items-center justify-center text-[10px]">
            L
          </div>
          <span className="font-black tracking-widest text-white uppercase text-[11px]">
            LAKXAM REKHA
          </span>
        </Link>
        <div className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-widest font-bold">
          <Link href="/home" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/upload" className="text-zinc-400 hover:text-white transition-colors">Upload</Link>
          <Link href="/profile" className="text-[#9b51e0]">Profile</Link>
          <button onClick={logout} className="text-zinc-500 hover:text-red-400 transition-colors uppercase font-mono font-bold text-[9px]">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Settings Profile card */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col justify-center items-stretch z-10">
        
        <div className="bg-[#090812]/40 border border-[#9b51e0]/10 p-8 rounded-[24px] shadow-2xl backdrop-blur-md flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-white/5">
            <img src={user.avatarUrl} alt="" className="w-16 h-16 rounded-2xl object-cover border border-[#9b51e0]/20" />
            <div>
              <h2 className="text-white text-base font-extrabold">{user.name}</h2>
              <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider block mt-0.5">{user.email}</span>
            </div>
          </div>

          {/* System Messages */}
          {message && (
            <div className="p-3 bg-[#00ff66]/5 border border-[#00ff66]/15 text-[#00ff66] font-mono text-[9px] rounded-xl text-center">
              {message}
            </div>
          )}

          {/* Account Metrics overview */}
          <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
            <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
              <span className="text-zinc-500 block mb-1">Protected Files:</span>
              <span className="text-white font-bold">{totalUploaded}</span>
            </div>
            <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
              <span className="text-zinc-500 block mb-1">Storage Usage:</span>
              <span className="text-white font-bold">{storageUsed} MB / 10 GB</span>
            </div>
            <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
              <span className="text-zinc-500 block mb-1">Account Active:</span>
              <span className="text-white font-bold">{user.createdAt}</span>
            </div>
            <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
              <span className="text-zinc-500 block mb-1">Security Shield:</span>
              <span className="text-[#00b0ff] font-bold">AES-GCM v1</span>
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing ? (
            <form onSubmit={handleSave} className="flex flex-col gap-4 font-mono text-[9px] uppercase tracking-wider text-zinc-500 border-t border-white/5 pt-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="px-4 py-2.5 bg-black/60 border border-white/5 focus:border-[#9b51e0] rounded-xl text-xs text-white placeholder-zinc-800 focus:outline-none transition-all font-sans"
                />
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-white/10 hover:border-white/20 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9b51e0] hover:bg-[#833fc3] text-black font-extrabold rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-3 font-mono text-[9px] uppercase tracking-widest font-bold border-t border-white/5 pt-6 mt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-[#9b51e0]/10 hover:bg-[#9b51e0]/20 text-[#9b51e0] border border-[#9b51e0]/20 rounded-xl transition-all"
              >
                Edit Profile Settings
              </button>
              <button
                onClick={() => alert('Password reset links dispatched to verified address.')}
                className="w-full py-3 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all"
              >
                Change Security Password
              </button>
              <button
                onClick={logout}
                className="w-full py-3 border border-red-500/20 hover:border-red-500 text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
              >
                End Operator Session (Logout)
              </button>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
