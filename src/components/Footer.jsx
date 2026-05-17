import React from 'react';
import Link from 'next/link';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-md shadow-accent/20">
                <Car size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
                DriveFleet
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              DriveFleet provides premium, affordable, and flexible car rental services tailored to your needs. Rent your dream vehicle today.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-accent transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-muted hover:text-accent transition-colors">
                  Explore Vehicles
                </Link>
              </li>
              <li>
                <Link href="/add-car" className="text-sm text-muted hover:text-accent transition-colors">
                  Add Your Car
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="text-sm text-muted hover:text-accent transition-colors">
                  Manage Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-muted">
                <MapPin size={16} className="mr-2 text-accent shrink-0 mt-0.5" />
                <span>123 Elite Boulevard, Suite 500, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center text-sm text-muted">
                <Phone size={16} className="mr-2 text-accent shrink-0" />
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-center text-sm text-muted">
                <Mail size={16} className="mr-2 text-accent shrink-0" />
                <span>support@drivefleet.com</span>
              </li>
            </ul>
          </div>

          {/* Social Icons with Rebranded X logo */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Follow Us
            </h3>
            <p className="text-sm text-muted">Join our global community on social media.</p>
            <div className="flex space-x-4">
              {/* Facebook Inline SVG */}
              <a
                href="#"
                className="p-2 rounded-lg bg-card-border/20 hover:bg-accent/10 hover:text-accent transition-colors text-muted"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Instagram Inline SVG */}
              <a
                href="#"
                className="p-2 rounded-lg bg-card-border/20 hover:bg-accent/10 hover:text-accent transition-colors text-muted"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn Inline SVG */}
              <a
                href="#"
                className="p-2 rounded-lg bg-card-border/20 hover:bg-accent/10 hover:text-accent transition-colors text-muted"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Custom rebranding X logo */}
              <a
                href="#"
                className="p-2 rounded-lg bg-card-border/20 hover:bg-accent/10 hover:text-accent transition-colors text-muted"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} DriveFleet Car Rental. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
