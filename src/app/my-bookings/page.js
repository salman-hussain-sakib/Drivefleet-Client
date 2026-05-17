'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, API_URL } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { Calendar, Users, ShieldCheck, MapPin, Sparkles, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Cancellation States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchMyBookings() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/bookings`);
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      toast.error('Failed to load your bookings.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

  const handleCancelBooking = async () => {
    if (!bookingToDelete) return;
    setIsDeleting(true);
    try {
      const res = await axios.delete(`${API_URL}/bookings/${bookingToDelete._id}`);
      if (res.data.success) {
        toast.success('Booking cancelled successfully! Car listing count updated.');
        setBookings(bookings.filter((b) => b._id !== bookingToDelete._id));
        setDeleteModalOpen(false);
        setBookingToDelete(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date utility
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            My Bookings
          </h1>
          <p className="text-sm text-muted">
            Track and manage your active vehicle rentals, dates, driver options, and confirmations.
          </p>
        </div>

        {/* Display bookings */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"></div>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="glass-panel py-20 rounded-3xl text-center border border-card-border space-y-4 max-w-lg mx-auto">
            <div className="inline-flex p-4 rounded-full bg-accent/5 text-accent">
              <Calendar size={32} />
            </div>
            <h3 className="text-lg font-bold text-foreground">No Bookings Yet</h3>
            <p className="text-muted text-xs px-8 leading-relaxed">
              You haven't rented any vehicles yet. Explore our extensive premium fleet and book your dream drive today!
            </p>
            <Link
              href="/explore"
              className="inline-flex px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent-hover shadow-md transition-all items-center space-x-2"
            >
              <span>Explore Vehicles</span>
              <PlusCircle size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col sm:flex-row bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Car Preview Image */}
                <div className="relative w-full sm:w-48 h-48 bg-card-border/10">
                  <img
                    src={booking.carImage || 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=300'}
                    alt={booking.carName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-widest bg-accent text-white shadow-sm flex items-center space-x-1">
                      <ShieldCheck size={10} />
                      <span>{booking.status}</span>
                    </span>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-foreground truncate max-w-[180px]">
                        {booking.carName}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-black text-accent">${booking.price}</span>
                        <span className="text-[10px] text-muted block">/ day</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-muted">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={13} className="text-accent shrink-0" />
                        <span className="truncate">{formatDate(booking.bookingDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Users size={13} className="text-accent shrink-0" />
                        <span>Driver: <strong className="text-foreground">{booking.driverNeeded === 'Yes' ? 'Professional Supplied' : 'Self-Drive'}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Special Note Panel if exists */}
                  {booking.specialNote && (
                    <div className="px-3 py-2 rounded-lg border border-card-border bg-card-border/5 text-[11px] text-muted leading-relaxed">
                      <span className="font-semibold text-foreground block mb-0.5">Your Note:</span>
                      "{booking.specialNote}"
                    </div>
                  )}

                  {/* Booking ID and details indicator */}
                  <div className="pt-3 border-t border-card-border flex justify-between items-center text-[10px] text-muted font-mono">
                    <span>ID: #{booking._id.substr(-8).toUpperCase()}</span>
                    <button
                      onClick={() => {
                        setBookingToDelete(booking);
                        setDeleteModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 font-bold font-sans text-xs flex items-center space-x-1 transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <Trash2 size={12} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)} />
          
          <div className="relative w-full max-w-md rounded-3xl bg-card border border-card-border p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground">Cancel Reservation?</h3>
            <p className="text-muted text-xs px-4 leading-relaxed">
              Are you sure you want to cancel your rental booking for <strong className="text-foreground">{bookingToDelete?.carName}</strong>? This action will restore availability and booking counter.
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-card-border hover:bg-card-border/20 text-xs font-bold transition-all text-foreground"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-red-500/15 active:scale-95 transition-all flex justify-center items-center cursor-pointer"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Yes, Cancel'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
