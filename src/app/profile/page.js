'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Camera, Settings, ArrowLeft, ShieldCheck, Calendar, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();

  const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false);
  const [photoURLInput, setPhotoURLInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [hasImageError, setHasImageError] = useState(false);

  // Redirect to login if not logged in and done loading
  useEffect(() => {
    if (!loading && !user) {
      toast.error('Please log in to view your profile.');
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setPhotoURLInput(user.photoURL || '');
      setHasImageError(false); // CRITICAL FIX: Reset image error state so the new URL can attempt to load!
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex-1 flex justify-center items-center py-32 bg-slate-950">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    if (!photoURLInput) {
      toast.error('Please enter a valid photo URL.');
      return;
    }

    setIsUpdating(true);
    try {
      const res = await updateProfile(
        user.name,
        user.email,
        photoURLInput,
        user.dateOfBirth || '',
        user.phone || ''
      );
      if (res.success) {
        toast.success('Profile picture updated successfully!');
        setHasImageError(false); // Reset error state on success
        setIsEditPhotoOpen(false);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update profile picture.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/20 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-accent/5 blur-3xl -z-10 animate-pulse duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl -z-10 animate-pulse duration-300" />

      <div className="max-w-3xl mx-auto space-y-8 relative">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-sm font-semibold text-muted hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Card Header & Profile Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-card/65 backdrop-blur-xl rounded-3xl border border-card-border overflow-hidden shadow-2xl"
        >
          {/* Cover Banner */}
          <div className="h-44 w-full bg-gradient-to-r from-accent via-indigo-600 to-blue-500 relative">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          </div>

          <div className="px-8 pb-8 relative">
            {/* Avatar & Photo Trigger */}
            <div className="relative -mt-20 mb-6 flex justify-between items-end">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-card-border shadow-2xl bg-slate-900 relative">
                  {user.photoURL && !hasImageError ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      onError={() => {
                        setHasImageError(true);
                        toast.error('Failed to load image from URL. Please ensure it is a direct raw image link (ending in .png, .jpg, .webp etc.).', {
                          duration: 4000,
                          position: 'top-center',
                        });
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-blue-500/20 flex items-center justify-center text-accent text-5xl font-black select-none">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsEditPhotoOpen(true)}
                  className="absolute bottom-2 right-2 p-2 rounded-xl bg-accent text-white hover:bg-accent-hover hover:scale-105 shadow-md transition-all cursor-pointer"
                  title="Update Profile Picture"
                >
                  <Camera size={16} />
                </button>
              </div>

              {/* Action Buttons */}
              <Link
                href="/settings"
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-card border border-card-border hover:border-accent/40 text-sm font-extrabold hover:text-accent shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Settings size={16} />
                <span>Edit Settings</span>
              </Link>
            </div>

            {/* Profile Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center">
                  <span>{user.name}</span>
                  <ShieldCheck size={20} className="ml-2 text-accent" />
                </h1>
                <p className="text-sm font-semibold text-muted/90 flex items-center mt-1">
                  <Mail size={14} className="mr-1.5" />
                  <span>{user.email}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-card-border/80">
                <div className="bg-card-border/10 p-4 rounded-2xl border border-card-border/50">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Status</span>
                  <p className="text-sm font-extrabold text-green-500 mt-1 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" /> Verified User
                  </p>
                </div>
                <div className="bg-card-border/10 p-4 rounded-2xl border border-card-border/50">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Date of Birth</span>
                  <p className="text-sm font-extrabold text-foreground mt-1 flex items-center">
                    <Calendar size={14} className="mr-1.5 text-accent" />
                    <span>{user.dateOfBirth || 'Not specified'}</span>
                  </p>
                </div>
                <div className="bg-card-border/10 p-4 rounded-2xl border border-card-border/50">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Phone Number</span>
                  <p className="text-sm font-extrabold text-foreground mt-1 flex items-center">
                    <Phone size={14} className="mr-1.5 text-accent" />
                    <span>{user.phone || 'Not specified'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Photo Dialog Modal */}
      <AnimatePresence>
        {isEditPhotoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsEditPhotoOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl bg-card border border-card-border p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-accent/15 text-accent border border-accent/20">
                  <Camera size={22} className="animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Change Profile Picture</h3>
                <p className="text-xs text-muted">Provide a custom image URL to refresh your avatar</p>
              </div>

              <form onSubmit={handlePhotoUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider">
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={photoURLInput}
                    onChange={(e) => setPhotoURLInput(e.target.value)}
                    className="block w-full px-4 py-2.5 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditPhotoOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-card-border hover:bg-card-border/20 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 py-2.5 px-4 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex justify-center items-center"
                  >
                    {isUpdating ? 'Saving...' : 'Save Picture'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
