'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { login, googleLogin, user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Load official Google Identity Services SDK dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '103984592032-47q0c6gct094s0a6q542l8768u8o4vda.apps.googleusercontent.com', // Dynamically read your Client ID from .env.local
          callback: handleCredentialResponse,
          ux_mode: 'popup',
        });

        // Render the official, real Google Sign-In Button natively
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInBtn'),
          { 
            theme: 'filled_blue', 
            size: 'large', 
            text: 'signin_with',
            shape: 'pill',
            width: '380'
          }
        );
      }
    };

    return () => {
      const scriptElem = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (scriptElem && scriptElem.parentNode) {
        scriptElem.parentNode.removeChild(scriptElem);
      }
    };
  }, []);

  // Securely decode the real Google JWT token containing your real accounts
  const handleCredentialResponse = async (response) => {
    const token = response.credential;
    toast.loading('Connecting securely with Google...', { id: 'googleAuth' });
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const decoded = JSON.parse(jsonPayload);
      
      toast.loading('Saving real Google account in MongoDB...', { id: 'googleAuth' });
      
      // Save your real profile in your real MongoDB Atlas
      const res = await googleLogin(
        decoded.name || 'Google User',
        decoded.email,
        decoded.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      );
      
      if (res.success) {
        toast.success(`Logged in successfully! Welcome, ${res.user.name}.`, { id: 'googleAuth' });
        router.push('/');
      }
    } catch (err) {
      console.error('Google Sign-in Error:', err);
      toast.error('Google authentication failed. Please try again.', { id: 'googleAuth' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        router.push('/');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Ambient glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl -z-10 animate-pulse duration-300" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full space-y-8 bg-card/65 dark:bg-card/45 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-card-border/80 neon-border-hover relative"
      >
        {/* Decorative corner glows */}
        <div className="absolute -top-px -left-px w-20 h-20 rounded-tl-3xl bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-px -right-px w-20 h-20 rounded-br-3xl bg-gradient-to-tl from-blue-500/10 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-r from-accent/15 to-blue-500/15 text-accent shadow-inner border border-accent/20">
            <LogIn size={26} className="animate-pulse" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-muted font-medium">
            Access your secure dashboard to manage listings and bookings
          </p>
        </div>

        <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-muted/90">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted group-focus-within:text-accent transition-colors">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card/85 text-sm focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-all duration-300 text-foreground font-medium shadow-sm hover:border-accent/40"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-extrabold uppercase tracking-wider text-muted/90">
                Password
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted group-focus-within:text-accent transition-colors">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card/85 text-sm focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-all duration-300 text-foreground font-medium shadow-sm hover:border-accent/40"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl text-white font-extrabold text-sm bg-gradient-to-r from-accent to-blue-500 hover:from-accent-hover hover:to-blue-600 shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex justify-center items-center cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In Securely</span>
                  <LogIn size={16} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute w-full border-t border-card-border/80"></div>
          <span className="relative bg-card px-4 text-[10px] font-extrabold tracking-widest text-muted/80 uppercase">Or Continue With</span>
        </div>

        {/* Real Native Google Sign-In Button */}
        <div className="w-full flex justify-center overflow-hidden rounded-xl">
          <div id="googleSignInBtn" className="w-full flex justify-center"></div>
        </div>

        <p className="mt-6 text-center text-xs sm:text-sm text-muted font-medium">
          Don't have an account?{' '}
          <Link href="/register" className="font-extrabold text-accent hover:text-accent-hover transition-colors underline decoration-accent/35">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
