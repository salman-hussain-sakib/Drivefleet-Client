'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { API_URL } from '@/context/AuthContext';
import { Search, Filter, Users, Fuel, Milestone, ArrowRight, Eye, RefreshCw, MapPin } from 'lucide-react';

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
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group flex flex-col bg-card/65 dark:bg-card/45 backdrop-blur-md border border-card-border rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:border-accent/40 transition-all duration-300 neon-border-hover"
            >
              {/* Image & Availability Badges */}
              <div className="relative h-52 w-full bg-card-border/10 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md ${
                    car.availability === 'Available'
                      ? 'bg-green-500/90 text-white'
                      : 'bg-red-500/90 text-white'
                  }`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                      car.availability === 'Available' ? 'bg-white animate-ping' : 'bg-white'
                    }`} />
                    {car.availability}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-card/90 dark:bg-slate-900/90 text-accent glass-panel shadow-sm">
                  {car.type}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors truncate max-w-[200px]" title={car.name}>
                      {car.name}
                    </h3>
                    <div className="text-right">
                      <span className="text-2xl font-black bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">${car.price}</span>
                      <span className="text-xs text-muted block font-semibold">/ day</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-muted">
                    <MapPin size={13} className="text-accent" />
                    <span className="truncate">{car.location}</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2.5 py-3.5 border-y border-card-border text-xs text-muted">
                  <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-card-border/20 dark:bg-card-border/10 space-y-1">
                    <Users size={14} className="text-accent" />
                    <span className="font-bold text-foreground text-[10px]">{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-card-border/20 dark:bg-card-border/10 space-y-1">
                    <Fuel size={14} className="text-accent" />
                    <span className="font-bold text-foreground text-[10px]">Electric</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-card-border/20 dark:bg-card-border/10 space-y-1">
                    <Milestone size={14} className="text-accent" />
                    <span className="font-bold text-foreground text-[10px]">Auto</span>
                  </div>
                </div>

                {/* Info & Details Button */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-semibold text-muted bg-card-border/30 dark:bg-card-border/20 px-2.5 py-1.5 rounded-lg">
                    🔥 {car.booking_count || 0} Bookings
                  </span>
                  <Link
                    href={`/cars/${car._id}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-blue-500 hover:from-accent-hover hover:to-blue-600 text-white text-xs font-extrabold shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center space-x-1.5"
                  >
                    <span>Details</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
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
