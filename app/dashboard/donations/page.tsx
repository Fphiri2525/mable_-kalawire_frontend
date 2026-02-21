'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  User, 
  MapPin, 
  Heart, 
  Calendar, 
  DollarSign, 
  FileText,
  Edit2,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Grid,
  List
} from 'lucide-react';

// Add the props interface
interface DonationsPageProps {
  isDarkMode?: boolean;
}

// Types
interface Donation {
  id: number;
  donor_name: string;
  location: string;
  purpose: string;
  donation_date: string;
  amount: number;
}

// Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 max-w-[90vw] sm:max-w-md ${
      type === 'success' 
        ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' 
        : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
    }`}>
      {type === 'success' ? <CheckCircle2 size={20} className="flex-shrink-0" /> : <AlertCircle size={20} className="flex-shrink-0" />}
      <span className="text-sm font-medium break-words">{message}</span>
      <button onClick={onClose} className="ml-auto hover:opacity-70 flex-shrink-0">
        <X size={16} />
      </button>
    </div>
  );
};

// Confirmation Modal
const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs sm:text-sm mb-6 text-gray-600 dark:text-gray-400">{message}</p>
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// View Donation Modal
const ViewDonationModal = ({ donation, onClose }: { donation: Donation | null; onClose: () => void }) => {
  if (!donation) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPurposeLabel = (purpose: string) => {
    const purposes: Record<string, string> = {
      'general': 'General Donation',
      'education': 'Education Fund',
      'healthcare': 'Healthcare',
      'emergency': 'Emergency Relief',
      'infrastructure': 'Infrastructure',
      'other': 'Other'
    };
    return purposes[purpose] || purpose;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Donation Details</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium">Donation ID</span>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">#{donation.id}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-300 mt-2">{formatCurrency(donation.amount)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Donor Name</p>
              <p className="text-sm text-gray-900 dark:text-white font-medium break-words">{donation.donor_name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Location</p>
              <p className="text-sm text-gray-900 dark:text-white break-words">{donation.location}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Date</p>
              <p className="text-sm text-gray-900 dark:text-white">{formatDate(donation.donation_date)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Purpose</p>
              <p className="text-sm text-gray-900 dark:text-white">{getPurposeLabel(donation.purpose)}</p>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Mobile Card Component for Donations
const DonationCard = ({ 
  donation, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  donation: Donation; 
  onView: (donation: Donation) => void;
  onEdit: (donation: Donation) => void;
  onDelete: (id: number) => void;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPurposeBadgeColor = (purpose: string) => {
    const colors: Record<string, string> = {
      'general': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      'education': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      'healthcare': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
      'emergency': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
      'infrastructure': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      'other': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'
    };
    return colors[purpose] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
            <User size={14} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-1">
              {donation.donor_name}
            </h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getPurposeBadgeColor(donation.purpose)}`}>
              {donation.purpose}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <button
            onClick={() => onView(donation)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="View details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(donation)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Edit donation"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(donation.id)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete donation"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm mt-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <MapPin size={14} className="flex-shrink-0" />
          <span className="truncate">{donation.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar size={14} className="flex-shrink-0" />
          <span>{formatDate(donation.donation_date)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="flex-shrink-0 text-green-600 dark:text-green-400" />
          <span className="font-medium text-green-600 dark:text-green-400">
            {formatCurrency(donation.amount)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Update the component to accept props
export default function DonationsPage({ isDarkMode }: DonationsPageProps) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalDonated, setTotalDonated] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTotal, setIsLoadingTotal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [donationToDelete, setDonationToDelete] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Form state
  const [formData, setFormData] = useState({
    donor_name: '',
    location: '',
    purpose: '',
    donation_date: '',
    amount: ''
  });

  // Fetch donations on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchDonations(),
      fetchTotalDonated()
    ]);
  };

  // API Calls
  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching donations...');
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/donations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      
      const data = await response.json();
      console.log('Donations received:', data);
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
      showNotification('Failed to load donations', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotalDonated = async () => {
    setIsLoadingTotal(true);
    try {
      console.log('Fetching total donations...');
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/donations/total');
      
      console.log('Total response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch total: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Total data received:', data);
      
      setTotalDonated(data.total_donated || 0);
    } catch (error) {
      console.error('Error fetching total:', error);
      setTotalDonated(0);
    } finally {
      setIsLoadingTotal(false);
    }
  };

  const fetchDonationById = async (id: number): Promise<Donation | null> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/donations/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch donation details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching donation:', error);
      showNotification('Failed to load donation details', 'error');
      return null;
    }
  };

  const createDonation = async (data: any): Promise<boolean> => {
    try {
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to create donation');
      }

      showNotification('Donation added successfully!', 'success');
      await fetchAllData(); // Refresh both donations and total
      return true;
    } catch (error) {
      console.error('Error creating donation:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to create donation', 'error');
      return false;
    }
  };

  const updateDonation = async (id: number, data: any): Promise<boolean> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/donations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to update donation');
      }

      showNotification('Donation updated successfully!', 'success');
      await fetchAllData(); // Refresh both donations and total
      return true;
    } catch (error) {
      console.error('Error updating donation:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to update donation', 'error');
      return false;
    }
  };

  const deleteDonation = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/donations/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete donation');
      }

      showNotification('Donation deleted successfully!', 'success');
      await fetchAllData(); // Refresh both donations and total
      return true;
    } catch (error) {
      console.error('Error deleting donation:', error);
      showNotification('Failed to delete donation', 'error');
      return false;
    }
  };

  // Event Handlers
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setShowForm(false);
    setSelectedDonation(null);
    setFormData({
      donor_name: '',
      location: '',
      purpose: '',
      donation_date: '',
      amount: ''
    });
  };

  const handleAddClick = () => {
    setSelectedDonation(null);
    setFormData({
      donor_name: '',
      location: '',
      purpose: '',
      donation_date: '',
      amount: ''
    });
    setShowForm(true);
  };

  const handleEditClick = (donation: Donation) => {
    setSelectedDonation(donation);
    setFormData({
      donor_name: donation.donor_name,
      location: donation.location,
      purpose: donation.purpose,
      donation_date: donation.donation_date.split('T')[0],
      amount: donation.amount.toString()
    });
    setShowForm(true);
  };

  const handleViewClick = (donation: Donation) => {
    setSelectedDonation(donation);
    setShowViewModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setDonationToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (donationToDelete) {
      setShowConfirmDialog(false);
      await deleteDonation(donationToDelete);
      setDonationToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.donor_name || !formData.location || !formData.purpose || !formData.donation_date || !formData.amount) {
      showNotification('All fields are required', 'error');
      return;
    }

    setIsSubmitting(true);

    const donationData = {
      donor_name: formData.donor_name,
      location: formData.location,
      purpose: formData.purpose,
      donation_date: formData.donation_date,
      amount: parseFloat(formData.amount)
    };

    let success;
    if (selectedDonation) {
      success = await updateDonation(selectedDonation.id, donationData);
    } else {
      success = await createDonation(donationData);
    }

    if (success) {
      resetForm();
    }

    setIsSubmitting(false);
  };

  const handleRefresh = () => {
    fetchAllData();
  };

  // Utility Functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPurposeBadgeColor = (purpose: string) => {
    const colors: Record<string, string> = {
      'general': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      'education': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      'healthcare': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
      'emergency': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
      'infrastructure': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      'other': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'
    };
    return colors[purpose] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-transparent p-3 sm:p-4 md:p-6">
      {/* Notifications */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Delete Donation"
        message="Are you sure you want to delete this donation? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirmDialog(false);
          setDonationToDelete(null);
        }}
      />

      {/* View Modal */}
      <ViewDonationModal
        donation={selectedDonation}
        onClose={() => {
          setShowViewModal(false);
          setSelectedDonation(null);
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Donations
            </h1>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw size={16} className={isLoading || isLoadingTotal ? 'animate-spin' : ''} />
              </button>
              
              {!showForm && (
                <button
                  onClick={handleAddClick}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-sm text-sm sm:text-base"
                >
                  <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Add Donation</span>
                </button>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs sm:text-sm font-medium mb-1">Total Donations</p>
                {isLoadingTotal ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span className="text-base sm:text-lg">Loading...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{formatCurrency(totalDonated)}</p>
                    <p className="text-indigo-100 text-xs sm:text-sm mt-1 sm:mt-2">{donations.length} donations recorded</p>
                  </>
                )}
              </div>
              <div className="bg-white/20 p-3 sm:p-4 rounded-full">
                <TrendingUp size={20} className="sm:w-8 sm:h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-6 sm:mb-8 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                {selectedDonation ? 'Edit Donation' : 'Add New Donation'}
              </h2>
              <button
                onClick={resetForm}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px] text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Donor Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Donor Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text" 
                      name="donor_name"
                      value={formData.donor_name}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                      placeholder="John Smith"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                      placeholder="New York, USA"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="date" 
                      name="donation_date"
                      value={formData.donation_date}
                      onChange={handleInputChange}
                      max={today}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Purpose <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <select 
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select purpose</option>
                      <option value="general">General Donation</option>
                      <option value="education">Education Fund</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="emergency">Emergency Relief</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="number" 
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  {isSubmitting 
                    ? (selectedDonation ? 'Updating...' : 'Adding...')
                    : (selectedDonation ? 'Update' : 'Add Donation')
                  }
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Donations List */}
        {!showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Mobile View Toggle */}
            <div className="flex items-center justify-between p-3 sm:hidden border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {donations.length} donations
              </span>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-8 sm:py-12">
                <Loader2 className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-400" />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && donations.length === 0 && (
              <div className="text-center py-8 sm:py-12 px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Heart className="text-gray-400 dark:text-gray-500 sm:w-6 sm:h-6" size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No donations yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-6">Start tracking your first donation</p>
                <button
                  onClick={handleAddClick}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Add Your First Donation
                </button>
              </div>
            )}

            {/* Mobile Cards View */}
            {!isLoading && donations.length > 0 && (
              <>
                <div className="block sm:hidden p-3">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 gap-3">
                      {donations.map((donation) => (
                        <DonationCard
                          key={donation.id}
                          donation={donation}
                          onView={handleViewClick}
                          onEdit={handleEditClick}
                          onDelete={handleDeleteClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {donations.map((donation) => (
                        <DonationCard
                          key={donation.id}
                          donation={donation}
                          onView={handleViewClick}
                          onEdit={handleEditClick}
                          onDelete={handleDeleteClick}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Donor</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Purpose</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {donations.map((donation) => (
                        <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                <User size={12} className="sm:w-3.5 sm:h-3.5 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{donation.donor_name}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{donation.location}</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getPurposeBadgeColor(donation.purpose)}`}>
                              {donation.purpose}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{formatDate(donation.donation_date)}</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">{formatCurrency(donation.amount)}</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center justify-end gap-1 sm:gap-2">
                              <button
                                onClick={() => handleViewClick(donation)}
                                className="p-1 sm:p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                title="View details"
                              >
                                <Eye size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleEditClick(donation)}
                                className="p-1 sm:p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                title="Edit donation"
                              >
                                <Edit2 size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(donation.id)}
                                className="p-1 sm:p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                title="Delete donation"
                              >
                                <Trash2 size={14} className="sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}