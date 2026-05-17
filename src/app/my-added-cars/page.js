'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, API_URL } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { Edit, Trash2, ShieldAlert, X, PlusCircle, Car, ArrowRight, Save, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MyAddedCars() {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for Edit Modal
  const [editCar, setEditCar] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
    type: 'SUV',
    image: '',
    seats: '5',
    location: '',
    description: '',
    availability: 'Available',
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // States for Delete Modal
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function fetchMyCars() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/cars/my-cars`);
      if (res.data.success) {
        setCars(res.data.cars);
      }
    } catch (err) {
      toast.error('Failed to load your listed cars.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyCars();
    }
  }, [user]);

  // Open Edit Modal
  const handleEditClick = (car) => {
    setEditCar(car);
    setEditFormData({
      name: car.name,
      price: car.price.toString(),
      type: car.type,
      image: car.image,
      seats: car.seats.toString(),
      location: car.location,
      description: car.description,
      availability: car.availability,
    });
    setEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put(`${API_URL}/cars/${editCar._id}`, {
        ...editFormData,
        price: Number(editFormData.price),
        seats: Number(editFormData.seats),
      });

      if (res.data.success) {
        toast.success('Car listing updated successfully!');
        setEditModalOpen(false);
        fetchMyCars();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update listing.');
    } finally {
      setUpdating(false);
    }
  };

  // Open Delete Confirmation
  const handleDeleteClick = (id) => {
    setDeleteCarId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const res = await axios.delete(`${API_URL}/cars/${deleteCarId}`);
      if (res.data.success) {
        toast.success('Car listing deleted successfully!');
        setDeleteModalOpen(false);
        fetchMyCars();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete listing.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        {/* Header with Listing count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              My Added Cars
            </h1>
            <p className="text-sm text-muted">
              Manage, edit, update and delete the vehicles you have listed on DriveFleet.
            </p>
          </div>
          <Link
            href="/add-car"
            className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-md shadow-accent/25 transition-all duration-200 active:scale-95 flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <PlusCircle size={18} />
            <span>List a New Car</span>
          </Link>
        </div>

        {/* Listings Display */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"></div>
            </div>
          </div>
        ) : cars.length === 0 ? (
          <div className="glass-panel py-20 rounded-3xl text-center border border-card-border space-y-4 max-w-lg mx-auto">
            <div className="inline-flex p-4 rounded-full bg-accent/5 text-accent">
              <Car size={32} />
            </div>
            <h3 className="text-lg font-bold text-foreground">No Cars Listed Yet</h3>
            <p className="text-muted text-xs px-8 leading-relaxed">
              You haven't listed any vehicles for rent yet. Publish a car listing now and start generating daily hosting revenue!
            </p>
            <Link
              href="/add-car"
              className="inline-flex px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent-hover shadow-md transition-all items-center space-x-2"
            >
              <span>List Your First Car</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <motion.div
                key={car._id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-card-border/10">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      car.availability === 'Available'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {car.availability}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-card/85 text-accent glass-panel">
                    {car.type}
                  </div>
                </div>

                {/* Info and action panel */}
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
                    <span className="text-xs text-muted flex items-center">
                      <MapPin size={12} className="mr-1 text-accent" /> {car.location}
                    </span>
                  </div>

                  {/* Summary data */}
                  <div className="py-2 border-t border-card-border flex justify-between items-center text-xs text-muted">
                    <span>Seats: <strong className="text-foreground">{car.seats} Capacity</strong></span>
                    <span>Booked: <strong className="text-foreground">{car.booking_count || 0} times</strong></span>
                  </div>

                  {/* Dashboard Buttons */}
                  <div className="flex space-x-2 pt-2 border-t border-card-border">
                    <button
                      onClick={() => handleEditClick(car)}
                      className="flex-1 py-2 px-3 border border-card-border hover:bg-card-border/20 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer text-foreground"
                    >
                      <Edit size={14} className="text-accent" />
                      <span>Update</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(car._id)}
                      className="flex-1 py-2 px-3 border border-red-500/20 hover:bg-red-500/10 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5 text-red-500 cursor-pointer"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Update Car Form Overlay Modal */}
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditModalOpen(false)} />
            <div className="relative w-full max-w-2xl rounded-3xl bg-card border border-card-border p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-lg border border-card-border hover:bg-card-border/20 text-muted hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              <div className="space-y-1 mb-6">
                <h2 className="text-2xl font-bold text-foreground">Update Vehicle Listing</h2>
                <p className="text-xs text-muted">Update listing pricing, availability, and description details.</p>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Car Name / Model</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={editFormData.name}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Daily Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="1"
                      value={editFormData.price}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Type</label>
                    <select
                      name="type"
                      value={editFormData.type}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                    >
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>

                  {/* Seats */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Seats</label>
                    <select
                      name="seats"
                      value={editFormData.seats}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                    >
                      <option value="2">2 Seats</option>
                      <option value="4">4 Seats</option>
                      <option value="5">5 Seats</option>
                      <option value="7">7 Seats</option>
                      <option value="8">8 Seats</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={editFormData.location}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                    />
                  </div>

                  {/* Image */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      required
                      value={editFormData.image}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Description</label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      value={editFormData.description}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground resize-none"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Availability Status</label>
                    <select
                      name="availability"
                      value={editFormData.availability}
                      onChange={handleEditInputChange}
                      className="block w-full px-4 py-3 rounded-xl border border-card-border bg-card text-sm focus:border-accent outline-none text-foreground"
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-card-border">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-card-border hover:bg-card-border/20 text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 py-3 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-xl shadow-md flex justify-center items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>{updating ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Alert Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)} />
            <div className="relative w-full max-w-md rounded-3xl bg-card border border-card-border p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-center space-y-4">
              <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500">
                <ShieldAlert size={28} />
              </div>
              <h2 className="text-xl font-bold text-foreground">Confirm Deletion</h2>
              <p className="text-xs text-muted leading-relaxed px-4">
                Are you absolutely sure you want to delete this car listing? This action is permanent and cannot be undone. All active rentals associated with it might be affected.
              </p>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-card-border hover:bg-card-border/20 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-md flex justify-center items-center"
                >
                  {deleting ? 'Deleting...' : 'Delete Listing'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
