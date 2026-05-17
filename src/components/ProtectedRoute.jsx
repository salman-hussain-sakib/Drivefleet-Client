'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          {/* Inner ring */}
          <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent border-r-accent animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-semibold tracking-wide text-muted uppercase animate-pulse">
          Loading DriveFleet...
        </p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
