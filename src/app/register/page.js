'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { User, Mail, Link as LinkIcon, Lock, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function Register() {
  const { register, googleLogin, user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUpper: false,
    hasLower: false,
    isMinLength: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Live password validation criteria updater
  useEffect(() => {
    const pwd = formData.password;
    setPasswordCriteria({
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      isMinLength: pwd.length >= 6,
    });
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordValid = passwordCriteria.hasUpper && passwordCriteria.hasLower && passwordCriteria.isMinLength;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!isPasswordValid) {
      toast.error('Please meet all password validation criteria.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register(
        formData.name,
        formData.email,
        formData.photoURL,
        formData.password
      );
      if (res.success) {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      toast.loading('Connecting with Google...', { id: 'googleAuth' });
      // Simulate Google authentication callback
      const mockGoogleUser = {
        name: 'Sakib Ahmed',
        email: 'sakib@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      };

      const res = await googleLogin(mockGoogleUser.name, mockGoogleUser.email, mockGoogleUser.photoURL);
      if (res.success) {
        toast.success(`Welcome, ${res.user.name}! Connected via Google.`, { id: 'googleAuth' });
        router.push('/');
      }
    } catch (err) {
      toast.error(err.message || 'Google Login failed.', { id: 'googleAuth' });
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-card-border/20">
      <div className="max-w-md w-full space-y-8 glass-panel p-8 rounded-3xl shadow-xl border border-card-border">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-accent/10 text-accent mb-4">
            <Sparkles size={28} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-muted">
            Join DriveFleet and rent premium vehicles instantly
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
                  <User size={18} />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 text-foreground"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 text-foreground"
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div>
              <label htmlFor="photoURL" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Profile Photo URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
                  <LinkIcon size={18} />
                </span>
                <input
                  id="photoURL"
                  name="photoURL"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 text-foreground"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 text-foreground"
                />
              </div>

              {/* Password validation indicators (Strict Requirement) */}
              <div className="mt-3 p-3.5 rounded-xl border border-card-border bg-card-border/10 space-y-2">
                <p className="text-[11px] font-bold tracking-wider uppercase text-muted flex items-center">
                  <ShieldAlert size={12} className="mr-1.5 text-accent" /> Password Requirements
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className={`flex items-center text-xs ${passwordCriteria.hasUpper ? 'text-green-500' : 'text-muted'}`}>
                    {passwordCriteria.hasUpper ? <Check size={14} className="mr-1" /> : <X size={14} className="mr-1" />}
                    1 Uppercase
                  </span>
                  <span className={`flex items-center text-xs ${passwordCriteria.hasLower ? 'text-green-500' : 'text-muted'}`}>
                    {passwordCriteria.hasLower ? <Check size={14} className="mr-1" /> : <X size={14} className="mr-1" />}
                    1 Lowercase
                  </span>
                  <span className={`flex items-center text-xs ${passwordCriteria.isMinLength ? 'text-green-500' : 'text-muted'}`}>
                    {passwordCriteria.isMinLength ? <Check size={14} className="mr-1" /> : <X size={14} className="mr-1" />}
                    6+ Characters
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition-all duration-200 active:scale-95 flex justify-center items-center ${
                isPasswordValid
                  ? 'bg-accent hover:bg-accent-hover shadow-accent/20 cursor-pointer'
                  : 'bg-muted cursor-not-allowed opacity-50'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Register Account'
              )}
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute w-full border-t border-card-border"></div>
          <span className="relative bg-card px-4 text-xs font-semibold tracking-wider text-muted uppercase">Or continue with</span>
        </div>

        {/* Google Login Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl border border-card-border bg-card text-sm font-semibold hover:bg-card-border/20 active:scale-98 transition-all duration-200 text-foreground"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-accent hover:text-accent-hover transition-colors">
            Login Page
          </Link>
        </p>
      </div>
    </div>
  );
}
