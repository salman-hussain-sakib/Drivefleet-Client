'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth, API_URL } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { PlusCircle, Info, Image, MapPin, DollarSign, Settings, Layers, AlignLeft } from 'lucide-react';

export default function AddCar() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: 'SUV',
    image: '',
    seats: '5',
    location: '',
    description: '',
    availability: 'Available',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.type ||
      !formData.image ||
      !formData.seats ||
      !formData.location ||
      !formData.description
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/cars`, formData);
      if (res.data.success) {
        toast.success('Your car listing has been created!');
        router.push('/my-added-cars');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to list car.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center">
            <PlusCircle className="text-accent mr-3" size={32} /> List Your Vehicle
          </h1>
          <p className="text-sm text-muted">
            Share your vehicle details to start hosting rentals and earning daily income on DriveFleet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Form Column */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-card-border shadow-md space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Car Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Car Name / Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Tesla Model S Plaid"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                  />
                </div>

                {/* Daily Rent */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Daily Rent Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted">
                      <DollarSign size={16} />
                    </span>
                    <input
                      type="number"
                      name="price"
                      required
                      min="1"
                      placeholder="120"
                      value={formData.price}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                    />
                  </div>
                </div>

                {/* Car Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Car Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                {/* Seat Capacity */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Seat Capacity <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                  >
                    <option value="2">2 Seats</option>
                    <option value="4">4 Seats</option>
                    <option value="5">5 Seats</option>
                    <option value="7">7 Seats</option>
                    <option value="8">8 Seats</option>
                  </select>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted">
                      <MapPin size={16} />
                    </span>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. Dhaka, Bangladesh"
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Car Image URL <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted">
                      <Image size={16} />
                    </span>
                    <input
                      type="url"
                      name="image"
                      required
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      value={formData.image}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Car Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Provide a comprehensive summary of your car. Mention highlights like Autopilot, leather seating, panoramic roof, fuel efficiency, or battery range."
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground resize-none"
                  />
                </div>

                {/* Availability Status */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Initial Availability Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground"
                  >
                    <option value="Available">Available for Rent</option>
                    <option value="Unavailable">Temporarily Unavailable</option>
                  </select>
                </div>
              </div>

              {/* Submit Trigger */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-xl shadow-md shadow-accent/20 active:scale-95 transition-all flex justify-center items-center cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Publish Listing'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Hosting Guidelines Box */}
            <div className="p-6 rounded-3xl border border-card-border bg-card-border/10 space-y-4">
              <div className="flex items-center space-x-2 text-accent">
                <Info size={20} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Hosting Tips</h3>
              </div>
              <ul className="text-xs text-muted space-y-3 list-disc pl-4 leading-relaxed">
                <li>
                  <strong>High Quality Images:</strong> Upload clean, well-lit exterior and interior photos (use hosts like Unsplash or ImgBB).
                </li>
                <li>
                  <strong>Fair Rent Rates:</strong> Compare similar models. Hatchbacks range $50-$90, SUVs $110-$180, and Luxury cars command $200+.
                </li>
                <li>
                  <strong>Pickup Instructions:</strong> Be precise in your location field. It helps drivers plan key travel paths.
                </li>
                <li>
                  <strong>Maintain Availability:</strong> Keep availability active to receive bookings immediately on publication.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
