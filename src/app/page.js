'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_URL } from '@/context/AuthContext';
import { Car, Fuel, Milestone, Users, ArrowRight, ShieldCheck, HeartHandshake, Disc, Sparkles, Trophy, Star, MapPin } from 'lucide-react';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await axios.get(`${API_URL}/cars`);
        if (res.data.success) {
          // Show at least 6 cars as required
          setCars(res.data.cars.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching cars', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const whyChooseUs = [
    {
      icon: <ShieldCheck size={28} className="text-accent" />,
      title: 'Fully Insured Journeys',
      desc: 'All our listed vehicles come with comprehensive premium insurance options so you can drive with peace of mind.'
    },
    {
      icon: <HeartHandshake size={28} className="text-accent" />,
      title: 'Top-tier Trusted Hosts',
      desc: 'Hosts are fully vetted and verified. Reviews on listings ensure you rent reliable vehicles from quality people.'
    },
    {
      icon: <Sparkles size={28} className="text-accent" />,
      title: 'Immaculate Fleet Maintenance',
      desc: 'From pristine interiors to peak engine performance, our hosts maintain cars under safety-first checkups.'
    },
    {
      icon: <Trophy size={28} className="text-accent" />,
      title: 'Best Price Guarantee',
      desc: 'No hidden broker fees or surprise charges. We guarantee direct peer-to-peer rates that outperform typical agencies.'
    }
  ];

  const testimonials = [
    {
      name: 'Tamim Iqbal',
      role: 'Business Executive',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5,
      comment: 'DriveFleet changed the way I travel for business. Booking the Tesla Model S Plaid was flawless, and the local host was super polite and prompt!'
    },
    {
      name: 'Nusrat Jahan',
      role: 'Travel Vlogger',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      rating: 5,
      comment: 'I rented the Range Rover for a weekend shoot in the hills. The car was spotless, ran perfectly, and the price was incredibly affordable compared to standard rental shops!'
    },
    {
      name: 'Rahat Rahman',
      role: 'Software Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      rating: 5,
      comment: 'Super easy booking process and secure JWT protection makes me trust this site completely. Switched to dark mode instantly. Premium experience indeed!'
    }
  ];

  return (
    <div className="flex-1 flex flex-col space-y-20 pb-20">
      {/* Banner Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-gradient-to-b from-card-border/10 via-background to-background pt-16">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Banner Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-left"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs font-semibold text-accent uppercase tracking-wider">
                <Disc size={12} className="animate-spin duration-3000" />
                <span>Next-Gen Car Rentals</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
                Drive Your Dream <br />
                <span className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
                  Fleet with Ease
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-lg leading-relaxed">
                Explore an extensive collection of premium, fully-insured, and carefully maintained vehicles. Book your perfect ride in minutes.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/explore"
                  className="px-8 py-3.5 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:bg-accent-hover hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Explore Cars</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-3.5 rounded-xl border border-card-border bg-card text-sm font-semibold hover:bg-card-border/20 transition-all duration-200"
                >
                  Join DriveFleet
                </Link>
              </div>
            </motion.div>

            {/* Banner Media Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video lg:aspect-square w-full flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl transform rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop"
                alt="DriveFleet Car Hero"
                className="rounded-3xl object-cover w-full h-[350px] lg:h-[450px] shadow-2xl border border-card-border"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Cars Dynamic Section (Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Explore Available Fleet
          </h2>
          <p className="text-muted max-w-md mx-auto text-sm">
            Top-rated vehicles ready for pickup at premium locations. Fully cleaned and inspected.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"></div>
            </div>
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
                {/* Car Image Wrapper */}
                <div className="relative h-52 w-full bg-card-border/10 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Availability Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md ${
                      car.availability === 'Available'
                        ? 'bg-green-500/90 text-white'
                        : 'bg-red-500/90 text-white'
                    }`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                        car.availability === 'Available' ? 'bg-white animate-ping' : 'bg-white'
                      }`} />
                      {car.availability || 'Available'}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-card/90 dark:bg-slate-900/90 text-accent glass-panel shadow-sm">
                    {car.type}
                  </div>
                </div>

                {/* Car details info */}
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

                  {/* Specifications grid (Premium pill style) */}
                  <div className="grid grid-cols-3 gap-2.5 py-3.5 border-y border-card-border text-xs text-muted">
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-card-border/20 dark:bg-card-border/10 space-y-1">
                      <Users size={14} className="text-accent" />
                      <span className="font-bold text-foreground text-[10px]">{car.seats} Seats</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-card-border/20 dark:bg-card-border/10 space-y-1">
                      <Fuel size={14} className="text-accent" />
                      <span className="font-bold text-foreground text-[10px]">Hybrid</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-card-border/20 dark:bg-card-border/10 space-y-1">
                      <Milestone size={14} className="text-accent" />
                      <span className="font-bold text-foreground text-[10px]">Auto</span>
                    </div>
                  </div>

                  {/* Bottom Controls */}
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

        <div className="text-center pt-4">
          <Link
            href="/explore"
            className="inline-flex items-center space-x-2 text-sm font-bold text-accent hover:text-accent-hover group"
          >
            <span>See All Available Cars</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Extra Static Section 1: "Why Choose Us" (Requirement) */}
      <section className="bg-card border-y border-card-border py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Why Rental Drivers Trust DriveFleet
            </h2>
            <p className="text-muted max-w-md mx-auto text-sm">
              We leverage modern security, strict owner reviews, and verified listings for an flawless driving experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-card-border bg-background hover:border-accent/30 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Static Section 2: "Customer Testimonials" (Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted max-w-md mx-auto text-sm">
            Read authentic reviews from satisfied drivers and car owners across the region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-card-border bg-card shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-muted italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              {/* User info */}
              <div className="flex items-center space-x-3 pt-4 border-t border-card-border">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-card-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
