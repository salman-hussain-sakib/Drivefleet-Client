'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Settings, User, Mail, Calendar, Phone, ArrowLeft, Save, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    phone: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      toast.error('Please log in to access settings.');
      router.push('/login');
    }
  }, [user, loading, router]);

  // Set default form values from user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        dateOfBirth: user.dateOfBirth || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex-1 flex justify-center items-center py-32 bg-background">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateProfile(
        formData.name,
        formData.email,
        user.photoURL || '',
        formData.dateOfBirth,
        formData.phone
      );
      if (res.success) {
        toast.success('Settings updated successfully!');
        router.push('/profile');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-foreground">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl -z-10 animate-pulse duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl -z-10 animate-pulse duration-300" />

      <div className="max-w-2xl mx-auto space-y-6 relative">
        {/* Back Link */}
        <Link 
          href="/profile" 
          className="inline-flex items-center space-x-2 text-sm font-semibold text-muted hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Profile</span>
        </Link>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card/65 dark:bg-card/45 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-card-border/80 neon-border-hover relative"
        >
          {/* Decorative Corner Glows */}
          <div className="absolute -top-px -left-px w-20 h-20 rounded-tl-3xl bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-px -right-px w-20 h-20 rounded-br-3xl bg-gradient-to-tl from-blue-500/10 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-accent/15 to-blue-500/15 text-accent shadow-inner border border-accent/20">
              <Settings size={24} className="animate-spin duration-3000" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">Account Settings</h2>
              <p className="text-xs sm:text-sm text-muted font-medium">Update your profile parameters and contact coordinates</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted/90">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted group-focus-within:text-accent transition-colors">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Sakib Ahmed"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card/85 text-sm focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-all duration-300 text-foreground font-medium shadow-sm hover:border-accent/40"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted/90">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted group-focus-within:text-accent transition-colors">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sakib@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card/85 text-sm focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-all duration-300 text-foreground font-medium shadow-sm hover:border-accent/40"
                  />
                </div>
              </div>

              {/* Date of Birth Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted/90">
                  Date of Birth
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted group-focus-within:text-accent transition-colors">
                    <Calendar size={16} />
                  </span>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card/85 text-sm focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-all duration-300 text-foreground font-medium shadow-sm hover:border-accent/40"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted/90">
                  Phone Number
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted group-focus-within:text-accent transition-colors">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+8801XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card/85 text-sm focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-all duration-300 text-foreground font-medium shadow-sm hover:border-accent/40"
                  />
                </div>
              </div>
            </div>

            {/* Note alert */}
            <div className="p-4 rounded-2xl border border-card-border/60 bg-card-border/10 flex items-start space-x-3">
              <ShieldAlert size={18} className="text-accent shrink-0 mt-0.5" />
              <p className="text-[11px] font-semibold text-muted/80 leading-relaxed">
                Important: If you modify your primary email address, your active auth token session will be securely regenerated and updated instantly. Other accounts will not be able to claim your old email once modified.
              </p>
            </div>

            <div className="pt-4 border-t border-card-border/80 flex justify-end space-x-4">
              <Link
                href="/profile"
                className="py-3 px-6 rounded-xl border border-card-border hover:bg-card-border/20 text-sm font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="py-3 px-6 rounded-xl text-white font-extrabold text-sm bg-gradient-to-r from-accent to-blue-500 hover:from-accent-hover hover:to-blue-600 shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center cursor-pointer"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Save Settings</span>
                    <Save size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
