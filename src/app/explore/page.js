'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { API_URL } from '@/context/AuthContext';
import { Search, Filter, Users, Fuel, Milestone, ArrowRight, Eye, RefreshCw } from 'lucide-react';

export default function ExploreCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  const carTypes = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury'];

  async function fetchCars() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/cars`, {
        params: {
          search,
          type: type === 'All' ? undefined : type
        }
      });
      if (res.data.success) {
        setCars(res.data.cars);
      }
    } catch (err) {
      console.error('Error fetching cars', err);
    } finally {
      setLoading(false);
    }
  }

  // Refetch cars when search or type filter changes
  useEffect(() => {
    // Adding debounce or direct search on state change
    const delayDebounce = setTimeout(() => {
      fetchCars();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, type]);

  const handleReset = () => {
    setSearch('');
    setType('All');
  };

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Explore Our Vehicles
        </h1>
        <p className="text-muted text-sm max-w-lg">
          Browse through our extensive fleet of cars. Find the perfect fit for your next business trip or family adventure.
        </p>
      </div>

      {/* Search and Filters Controls */}
      <div className="glass-panel p-6 rounded-2xl border border-card-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by car name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 text-foreground"
          />
        </div>

        {/* Filters Select */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center space-x-2 text-sm text-muted">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter By Type:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {carTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                  type === t
                    ? 'bg-accent text-white shadow-md shadow-accent/20'
                    : 'bg-card border border-card-border text-muted hover:text-foreground hover:bg-card-border/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {(search || type !== 'All') && (
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-card-border bg-card hover:bg-card-border/20 text-muted hover:text-foreground transition-colors text-xs font-bold flex items-center space-x-1.5 ml-0 sm:ml-2"
              title="Reset Search and Filters"
            >
              <RefreshCw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Fleet Count Status */}
      {!loading && (
        <p className="text-xs sm:text-sm font-semibold text-muted">
          Showing <span className="text-foreground">{cars.length}</span> vehicle{cars.length !== 1 ? 's' : ''} available
        </p>
      )}

      {/* Grid Layout of Fleet */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent border-r-accent animate-spin"></div>
          </div>
        </div>
      ) : cars.length === 0 ? (
        <div className="glass-panel py-20 rounded-3xl text-center border border-card-border space-y-4 max-w-lg mx-auto">
          <div className="inline-flex p-4 rounded-full bg-accent/5 text-accent">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-bold text-foreground">No Cars Match Your Search</h3>
          <p className="text-muted text-xs px-8">
            We couldn't find any vehicles named "{search}" {type !== 'All' ? `under ${type}` : ''}. Try broadening your search terms or resetting filters!
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent-hover shadow-md transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col bg-card border border-card-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-accent/40"
            >
              {/* Image & Availability Badges */}
              <div className="relative h-48 w-full bg-card-border/10 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                    car.availability === 'Available'
                      ? 'bg-green-500/90 text-white'
                      : 'bg-red-500/90 text-white'
                  }`}>
                    {car.availability}
                  </span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-card/85 text-accent glass-panel">
                  {car.type}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-foreground truncate max-w-[200px]" title={car.name}>
                      {car.name}
                    </h3>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-accent">${car.price}</span>
                      <span className="text-xs text-muted block">/ day</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted truncate">{car.location}</p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-card-border text-xs text-muted">
                  <div className="flex items-center space-x-1.5 justify-center">
                    <Users size={14} className="text-accent" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-1.5 justify-center border-x border-card-border">
                    <Fuel size={14} className="text-accent" />
                    <span>Electric</span>
                  </div>
                  <div className="flex items-center space-x-1.5 justify-center">
                    <Milestone size={14} className="text-accent" />
                    <span>Auto</span>
                  </div>
                </div>

                {/* Info & Details Button */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-semibold text-muted">
                    {car.booking_count || 0} Bookings
                  </span>
                  <Link
                    href={`/cars/${car._id}`}
                    className="px-4 py-2 rounded-xl bg-accent text-white hover:bg-accent-hover text-xs font-bold transition-all duration-200 flex items-center space-x-1"
                  >
                    <span>Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
