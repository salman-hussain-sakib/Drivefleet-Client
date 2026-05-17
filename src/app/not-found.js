'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-20 px-4 text-center max-w-xl mx-auto space-y-6">
      {/* Animated Icon wrapper */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex p-6 rounded-full bg-red-500/10 text-red-500 mb-2"
      >
        <ShieldAlert size={56} className="animate-bounce duration-3000" />
      </motion.div>

      {/* Main headings */}
      <div className="space-y-2">
        <h1 className="text-7xl font-black tracking-tight text-accent">404</h1>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Route Off the Map!
        </h2>
        <p className="text-xs sm:text-sm text-muted leading-relaxed px-4">
          Oops! The destination you are searching for doesn't exist in the DriveFleet system. You might have hit a wrong detour or private parking space.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-accent text-white text-xs font-bold shadow-md shadow-accent/25 hover:bg-accent-hover active:scale-95 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
        >
          <Home size={14} />
          <span>Go to Home Page</span>
        </Link>
        <Link
          href="/explore"
          className="px-6 py-3 rounded-xl border border-card-border bg-card hover:bg-card-border/20 text-xs font-bold transition-all duration-200 flex items-center space-x-2 text-foreground"
        >
          <Compass size={14} className="text-accent" />
          <span>Explore Vehicles</span>
        </Link>
      </div>
    </div>
  );
}
