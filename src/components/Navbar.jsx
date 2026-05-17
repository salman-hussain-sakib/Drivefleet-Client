'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Car, Sun, Moon, LogOut, ChevronDown, User, PlusCircle, Briefcase, List, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, logout, theme, toggleTheme } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [desktopImageError, setDesktopImageError] = useState(false);
  const [mobileImageError, setMobileImageError] = useState(false);

  // Reset image error states if user changes
  React.useEffect(() => {
    setDesktopImageError(false);
    setMobileImageError(false);
  }, [user]);

  const isActive = (path) => pathname === path;

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Explore Cars', path: '/explore' },
    { name: 'Add Car', path: '/add-car', private: true },
    { name: 'My Bookings', path: '/my-bookings', private: true },
  ];

  // Filter links based on whether user is logged in
  const visibleLinks = links.filter(link => !link.private || user);

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-card-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-md shadow-accent/20 group-hover:scale-105 transition-transform duration-200">
                <Car size={22} className="group-hover:rotate-6 transition-transform duration-200" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
                DriveFleet
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-accent'
                    : 'text-muted hover:text-foreground hover:bg-card-border/30'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* User Controls & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-card-border/30 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl border border-card-border hover:bg-card-border/20 transition-all duration-200"
                >
                  {user.photoURL && !desktopImageError ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      onError={() => setDesktopImageError(true)}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-xs font-black select-none">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-sm font-semibold max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-card-border bg-card shadow-lg ring-1 ring-black/5 focus:outline-none z-20 py-1 divide-y divide-card-border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* Profile Header Removed as requested */}
                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm hover:bg-card-border/40 transition-colors text-foreground font-semibold"
                        >
                          <User size={16} className="mr-3 text-muted" /> My Profile
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm hover:bg-card-border/40 transition-colors text-foreground font-semibold"
                        >
                          <Settings size={16} className="mr-3 text-muted" /> Settings
                        </Link>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/add-car"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm hover:bg-card-border/40 transition-colors text-foreground"
                        >
                          <PlusCircle size={16} className="mr-3 text-muted" /> Add Car
                        </Link>
                        <Link
                          href="/my-bookings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm hover:bg-card-border/40 transition-colors text-foreground"
                        >
                          <Briefcase size={16} className="mr-3 text-muted" /> My Bookings
                        </Link>
                        <Link
                          href="/my-added-cars"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm hover:bg-card-border/40 transition-colors text-foreground"
                        >
                          <List size={16} className="mr-3 text-muted" /> My Added Cars
                        </Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={async () => {
                            setDropdownOpen(false);
                            await logout();
                            router.push('/');
                          }}
                          className="flex w-full items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors font-semibold"
                        >
                          <LogOut size={16} className="mr-3" /> Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/register"
                  className="px-4 py-2.5 rounded-xl border border-card-border hover:bg-card-border/20 text-muted hover:text-foreground text-sm font-semibold transition-all duration-200"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold shadow-md hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 active:scale-95 transition-all duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-card-border/30 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-card-border/30 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-card-border bg-card animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-accent bg-accent/10'
                    : 'text-muted hover:text-foreground hover:bg-card-border/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="pt-4 pb-3 border-t border-card-border px-4 divide-y divide-card-border">
              <div className="flex items-center space-x-3 pb-3">
                {user.photoURL && !mobileImageError ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    onError={() => setMobileImageError(true)}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-black select-none">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <div className="text-base font-semibold text-foreground">{user.name}</div>
                </div>
              </div>
              <div className="py-2 space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-base font-semibold text-muted hover:text-foreground hover:bg-card-border/30"
                >
                  <User size={18} className="mr-3" /> My Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-base font-semibold text-muted hover:text-foreground hover:bg-card-border/30"
                >
                  <Settings size={18} className="mr-3" /> Settings
                </Link>
                <Link
                  href="/add-car"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-muted hover:text-foreground hover:bg-card-border/30 border-t border-card-border/40 pt-2"
                >
                  <PlusCircle size={18} className="mr-3" /> Add Car
                </Link>
                <Link
                  href="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-muted hover:text-foreground hover:bg-card-border/30"
                >
                  <Briefcase size={18} className="mr-3" /> My Bookings
                </Link>
                <Link
                  href="/my-added-cars"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-muted hover:text-foreground hover:bg-card-border/30"
                >
                  <List size={18} className="mr-3" /> My Added Cars
                </Link>
              </div>
              <div className="pt-2">
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                    router.push('/');
                  }}
                  className="flex w-full items-center px-3 py-2.5 rounded-lg text-base font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={18} className="mr-3" /> Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-card-border px-4 space-y-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg border border-card-border text-muted hover:text-foreground font-semibold hover:bg-card-border/20 transition-all"
              >
                Register
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg bg-accent text-white font-semibold shadow-md hover:bg-accent-hover"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
