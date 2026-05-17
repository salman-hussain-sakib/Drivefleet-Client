'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft, Users, Fuel, Milestone, MapPin, ShieldAlert, Sparkles, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CarDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    driverNeeded: 'No',
    specialNote: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const res = await axios.get(`${API_URL}/cars/${id}`);
        if (res.data.success) {
          setCar(res.data.car);
        }
      } catch (err) {
        toast.error('Failed to load car details.');
        router.push('/explore');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchCarDetails();
  }, [id, router]);

  const handleBookClick = () => {
    if (!user) {
      toast.error('Please log in to book a vehicle.');
      router.push('/login');
      return;
    }
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/bookings`, {
        carId: id,
        driverNeeded: bookingData.driverNeeded,
        specialNote: bookingData.specialNote,
      });

      if (res.data.success) {
        toast.success('Car booked successfully! Enjoy your trip.');
        setModalOpen(false);
        router.push('/my-bookings');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center py-40">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!car) return null;

  const isUnavailable = car.availability === 'Unavailable';

  return (
    <ProtectedRoute>
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
        {/* Back button */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center space-x-2 text-sm font-bold text-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Explore Fleet</span>
          </Link>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Car Image Preview */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-card-border bg-card-border/10 aspect-video lg:aspect-auto lg:h-[450px]">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md ${
                isUnavailable ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {car.availability}
              </span>
            </div>
          </div>

          {/* Car Details Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-accent/10 text-accent uppercase tracking-wider">
                  {car.type}
                </span>
                <span className="text-xs text-muted flex items-center">
                  <MapPin size={12} className="mr-1 text-accent" /> {car.location}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {car.name}
              </h1>
              <p className="text-xs text-muted font-semibold tracking-wide">
                Listed by: <span className="text-foreground">{car.owner}</span>
              </p>
            </div>

            {/* Daily Rent Box */}
            <div className="p-5 rounded-2xl border border-card-border bg-card-border/10 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-muted tracking-wider uppercase">Daily Rent Rate</span>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-black text-accent">${car.price}</span>
                  <span className="text-sm text-muted">/ day</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-muted block uppercase tracking-wider">Total Bookings</span>
                <span className="text-lg font-extrabold text-foreground">{car.booking_count || 0} times</span>
              </div>
            </div>

            {/* Spec details grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl border border-card-border bg-card space-y-1">
                <Users size={20} className="mx-auto text-accent" />
                <span className="text-xs text-muted block">Seats</span>
                <span className="text-sm font-bold text-foreground">{car.seats} Capacity</span>
              </div>
              <div className="p-4 rounded-xl border border-card-border bg-card space-y-1">
                <Fuel size={20} className="mx-auto text-accent" />
                <span className="text-xs text-muted block">Engine</span>
                <span className="text-sm font-bold text-foreground">Hybrid/Electric</span>
              </div>
              <div className="p-4 rounded-xl border border-card-border bg-card space-y-1">
                <Milestone size={20} className="mx-auto text-accent" />
                <span className="text-xs text-muted block">Transmission</span>
                <span className="text-sm font-bold text-foreground">Automatic</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">Vehicle Overview</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Action Trigger Button */}
            <div className="pt-4">
              {isUnavailable ? (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 flex items-start space-x-3">
                  <ShieldAlert className="shrink-0 mt-0.5" size={20} />
                  <div className="text-xs leading-relaxed">
                    <p className="font-bold uppercase tracking-wider">Currently Unavailable</p>
                    <p className="mt-0.5 text-muted">This vehicle is already rented out or in maintenance. Please browse our explore page for other available models.</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleBookClick}
                  className="w-full sm:w-auto px-10 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl shadow-lg shadow-accent/25 active:scale-95 transition-all duration-200 cursor-pointer flex justify-center items-center space-x-2"
                >
                  <Sparkles size={18} />
                  <span>Book This Vehicle Now</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form Dialog Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setModalOpen(false)}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-lg rounded-3xl bg-card border border-card-border p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-lg border border-card-border hover:bg-card-border/20 text-muted hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
                  <CheckCircle2 className="text-accent mr-2" size={24} /> Confirm Your Rental
                </h2>
                <p className="text-xs text-muted">
                  Fill in the booking preferences for <span className="text-foreground font-semibold">{car.name}</span>.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* Driver Needed Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Professional Driver Needed? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="driverNeeded"
                    value={bookingData.driverNeeded}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                  >
                    <option value="No">No, I will drive myself (Self-Drive)</option>
                    <option value="Yes">Yes, supply a professional driver (+$20/day)</option>
                  </select>
                </div>

                {/* Special Note Textarea */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Special Note / Instructions
                  </label>
                  <textarea
                    name="specialNote"
                    rows={3}
                    placeholder="E.g., early pickup requested, child seat preference, flight number details..."
                    value={bookingData.specialNote}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground resize-none"
                  />
                </div>

                {/* Summary rental rate info */}
                <div className="p-4 rounded-xl border border-card-border bg-card-border/5 space-y-1">
                  <div className="flex justify-between text-xs text-muted">
                    <span>Base Daily Rent</span>
                    <span className="font-semibold text-foreground">${car.price}</span>
                  </div>
                  {bookingData.driverNeeded === 'Yes' && (
                    <div className="flex justify-between text-xs text-muted">
                      <span>Driver Premium</span>
                      <span className="font-semibold text-foreground">+$20</span>
                    </div>
                  )}
                  <div className="border-t border-card-border mt-2 pt-2 flex justify-between text-sm font-bold text-foreground">
                    <span>Estimated Total</span>
                    <span className="text-accent text-base font-black">
                      ${car.price + (bookingData.driverNeeded === 'Yes' ? 20 : 0)} / day
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-card-border hover:bg-card-border/20 text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-xl shadow-md shadow-accent/20 active:scale-95 transition-all flex justify-center items-center cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Confirm Rental'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
