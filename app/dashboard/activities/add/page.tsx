'use client';

import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  DollarSign, 
  X, 
  Plus, 
  Calendar, 
  MapPin, 
  Upload, 
  Edit2, 
  Trash2, 
  Eye, 
  Download,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Menu,
  Grid,
  List
} from 'lucide-react';

// Types
interface Activity {
  id: number;
  title: string;
  activity_date: string;
  location: string;
  amount_used: number;
  description: string;
  media?: ActivityMedia[];
}

interface ActivityMedia {
  media_id: number;
  media_url: string;
}

interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

// Toast Component for notifications
const Toast = ({ 
  message, 
  type, 
  onClose 
}: { 
  message: string; 
  type: 'success' | 'error'; 
  onClose: () => void 
}) => {
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

// Confirmation Modal Component
const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}: {
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

// Media Viewer Modal
const MediaViewer = ({
  media,
  onClose
}: {
  media: ActivityMedia;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-5xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        <div className="flex flex-col items-center">
          <img
            src={media.media_url}
            alt="Activity"
            className="max-w-full max-h-[60vh] sm:max-h-[80vh] object-contain rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800?text=Image+Not+Found';
            }}
          />
          
          <a
            href={media.media_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={14} className="sm:w-4 sm:h-4" />
            <span>Download Image</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Mobile Card Component for Activities
const ActivityCard = ({ 
  activity, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  activity: Activity; 
  onView: (activity: Activity) => void;
  onEdit: (activity: Activity) => void;
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg line-clamp-1">
          {activity.title}
        </h3>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <button
            onClick={() => onView(activity)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="View details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(activity)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Edit activity"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(activity.id)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete activity"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar size={14} className="flex-shrink-0" />
          <span className="truncate">{formatDate(activity.activity_date)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <MapPin size={14} className="flex-shrink-0" />
          <span className="truncate">{activity.location}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="flex-shrink-0 text-green-600 dark:text-green-400" />
          <span className="font-medium text-green-600 dark:text-green-400">
            {formatCurrency(activity.amount_used)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <ImageIcon size={14} className="flex-shrink-0" />
          <span>{activity.media?.length || 0} photos</span>
        </div>

        {activity.description && (
          <p className="text-gray-500 dark:text-gray-500 text-xs line-clamp-2 mt-1">
            {activity.description}
          </p>
        )}
      </div>
    </div>
  );
};

// Main Component
export default function AddActivityPage() {
  // State Management
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // View Mode State (grid/list for mobile)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Modal States
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  
  // Selected Item States
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<ActivityMedia | null>(null);
  const [activityToDelete, setActivityToDelete] = useState<number | null>(null);
  
  // Form States
  const [formData, setFormData] = useState({
    title: '',
    activity_date: '',
    location: '',
    amount_used: '',
    description: ''
  });
  
  // File States
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch activities on mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Cleanup photo previews
  useEffect(() => {
    return () => {
      photoPreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [photoPreviews]);

  // Update photo previews when photos change
  useEffect(() => {
    const newPreviews = photos.map(photo => URL.createObjectURL(photo));
    setPhotoPreviews(newPreviews);
    
    return () => {
      newPreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [photos]);

  // API Calls
  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/activities');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.status}`);
      }
      
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      showNotification('Failed to load activities. Please check your connection.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivityById = async (id: number): Promise<Activity | null> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/activities/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch activity details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching activity:', error);
      showNotification('Failed to load activity details', 'error');
      return null;
    }
  };

  const createActivity = async (formData: FormData): Promise<boolean> => {
    try {
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/activities', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create activity');
      }

      const result = await response.json();
      showNotification(result.message || 'Activity created successfully!', 'success');
      await fetchActivities();
      return true;
    } catch (error) {
      console.error('Error creating activity:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to create activity', 'error');
      return false;
    }
  };

  const updateActivity = async (id: number, formData: FormData): Promise<boolean> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/activities/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update activity');
      }

      const result = await response.json();
      showNotification(result.message || 'Activity updated successfully!', 'success');
      await fetchActivities();
      return true;
    } catch (error) {
      console.error('Error updating activity:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to update activity', 'error');
      return false;
    }
  };

  const deleteActivity = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/activities/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete activity');
      }

      const result = await response.json();
      showNotification(result.message || 'Activity deleted successfully!', 'success');
      await fetchActivities();
      return true;
    } catch (error) {
      console.error('Error deleting activity:', error);
      showNotification('Failed to delete activity', 'error');
      return false;
    }
  };

  const addMorePhotos = async (activityId: number, photos: File[]): Promise<boolean> => {
    if (photos.length === 0) return true;

    setIsUploading(true);
    const formData = new FormData();
    photos.forEach(photo => formData.append('photos', photo));

    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/activities/media/batch/${activityId}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload photos');
      }

      const result = await response.json();
      showNotification(`${result.count} photos added successfully!`, 'success');
      
      // Refresh activity if currently viewing
      if (selectedActivity?.id === activityId) {
        const updated = await fetchActivityById(activityId);
        if (updated) setSelectedActivity(updated);
      }
      
      return true;
    } catch (error) {
      console.error('Error uploading photos:', error);
      showNotification('Failed to upload photos', 'error');
      return false;
    } finally {
      setIsUploading(false);
      setPhotos([]);
    }
  };

  const deleteMedia = async (mediaId: number): Promise<boolean> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/activities/media/${mediaId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      showNotification('Photo deleted successfully!', 'success');
      
      // Update UI
      if (selectedActivity) {
        const updatedMedia = selectedActivity.media?.filter(m => m.media_id !== mediaId) || [];
        setSelectedActivity({ ...selectedActivity, media: updatedMedia });
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting photo:', error);
      showNotification('Failed to delete photo', 'error');
      return false;
    }
  };

  // Event Handlers
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (photos.length + newFiles.length > 10) {
        showNotification('You can only upload up to 10 photos at a time', 'error');
        return;
      }
      setPhotos(prev => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateClick = () => {
    setSelectedActivity(null);
    setFormData({
      title: '',
      activity_date: '',
      location: '',
      amount_used: '',
      description: ''
    });
    setPhotos([]);
    setShowForm(true);
  };

  const handleEditClick = async (activity: Activity) => {
    const freshActivity = await fetchActivityById(activity.id);
    if (freshActivity) {
      setSelectedActivity(freshActivity);
      setFormData({
        title: freshActivity.title,
        activity_date: freshActivity.activity_date.split('T')[0],
        location: freshActivity.location,
        amount_used: freshActivity.amount_used.toString(),
        description: freshActivity.description
      });
      setPhotos([]);
      setShowForm(true);
    }
  };

  const handleViewClick = async (activity: Activity) => {
    const freshActivity = await fetchActivityById(activity.id);
    if (freshActivity) {
      setSelectedActivity(freshActivity);
      setShowViewModal(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    setActivityToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (activityToDelete) {
      setShowConfirmDialog(false);
      await deleteActivity(activityToDelete);
      setActivityToDelete(null);
    }
  };

  const handleMediaClick = (media: ActivityMedia) => {
    setSelectedMedia(media);
    setShowMediaViewer(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.activity_date || !formData.location || !formData.amount_used || !formData.description) {
      showNotification('All fields are required', 'error');
      return;
    }

    setIsSubmitting(true);

    // Prepare FormData
    const submitFormData = new FormData();
    submitFormData.append('title', formData.title);
    submitFormData.append('activity_date', formData.activity_date);
    submitFormData.append('location', formData.location);
    submitFormData.append('amount_used', formData.amount_used);
    submitFormData.append('description', formData.description);
    
    photos.forEach(photo => {
      submitFormData.append('photos', photo);
    });

    let success;
    if (selectedActivity) {
      success = await updateActivity(selectedActivity.id, submitFormData);
    } else {
      success = await createActivity(submitFormData);
    }

    if (success) {
      setShowForm(false);
      setSelectedActivity(null);
      setPhotos([]);
      setFormData({
        title: '',
        activity_date: '',
        location: '',
        amount_used: '',
        description: ''
      });
    }

    setIsSubmitting(false);
  };

  const handleAddMorePhotos = async () => {
    if (!selectedActivity || photos.length === 0) return;
    
    const success = await addMorePhotos(selectedActivity.id, photos);
    if (success) {
      setPhotos([]);
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedActivity(null);
    setSelectedMedia(null);
    setPhotos([]);
  };

  // Utility Functions
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6 transition-colors duration-300">
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
        title="Delete Activity"
        message="Are you sure you want to delete this activity? This action cannot be undone and all associated photos will be permanently removed."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirmDialog(false);
          setActivityToDelete(null);
        }}
      />

      {/* Media Viewer */}
      {showMediaViewer && selectedMedia && (
        <MediaViewer
          media={selectedMedia}
          onClose={() => {
            setShowMediaViewer(false);
            setSelectedMedia(null);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header - Simplified */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Activities
            </h1>
          </div>
          
          {!showForm && !showViewModal && (
            <div className="flex items-center gap-2">
              {/* View Toggle for Mobile */}
              <div className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 sm:hidden">
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
              
              <button
                onClick={handleCreateClick}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-sm text-sm sm:text-base"
              >
                <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Add Activity</span>
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Form - Responsive */}
        {showForm && (
          <div className="mb-6 sm:mb-8 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                {selectedActivity ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedActivity(null);
                  setPhotos([]);
                }}
                disabled={isSubmitting || isUploading}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g., Beach Cleanup"
                    required
                    disabled={isSubmitting || isUploading}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                    <input
                      type="date"
                      name="activity_date"
                      value={formData.activity_date}
                      onChange={handleInputChange}
                      max={today}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      required
                      disabled={isSubmitting || isUploading}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Enter location"
                      required
                      disabled={isSubmitting || isUploading}
                    />
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                    <input
                      type="number"
                      name="amount_used"
                      value={formData.amount_used}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      disabled={isSubmitting || isUploading}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors"
                    placeholder="Describe the activity..."
                    required
                    disabled={isSubmitting || isUploading}
                  />
                </div>

                {/* Photo Upload */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    {selectedActivity ? 'Add More Photos' : 'Photos'} <span className="text-gray-400 font-normal">(Max 10)</span>
                  </label>
                  
                  <div className="space-y-3">
                    {/* Photo Previews */}
                    {photoPreviews.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {photoPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={isSubmitting || isUploading}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Button */}
                    <label className={`flex items-center justify-center w-full px-3 py-2.5 sm:py-3 border border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors border-gray-300 dark:border-gray-600 ${
                      (isSubmitting || isUploading || photos.length >= 10) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={isSubmitting || isUploading || photos.length >= 10}
                      />
                      <div className="flex items-center space-x-2">
                        <Upload size={14} className="sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {photos.length >= 10 
                            ? 'Maximum 10 photos reached' 
                            : `Choose photos (${photos.length}/10)`}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedActivity(null);
                    setPhotos([]);
                  }}
                  className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={isSubmitting || isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting || isUploading}
                >
                  {(isSubmitting || isUploading) && <Loader2 size={14} className="sm:w-4 sm:h-4 animate-spin" />}
                  {isSubmitting || isUploading 
                    ? (selectedActivity ? 'Updating...' : 'Creating...')
                    : (selectedActivity ? 'Update' : 'Create')
                  }
                </button>
              </div>
            </form>
          </div>
        )}

        {/* View Modal - Responsive */}
        {showViewModal && selectedActivity && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-2 sm:p-4">
            <div className="max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl">
              {/* Modal Header */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 flex items-center justify-between">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate pr-4">
                  {selectedActivity.title}
                </h2>
                <button
                  onClick={handleCloseViewModal}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors flex-shrink-0"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Activity Info */}
                <div className="rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider mb-1 text-gray-500 dark:text-gray-400">Date</p>
                      <p className="text-sm text-gray-900 dark:text-white">{formatDate(selectedActivity.activity_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider mb-1 text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-sm text-gray-900 dark:text-white break-words">{selectedActivity.location}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider mb-1 text-gray-500 dark:text-gray-400">Amount Used</p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">{formatCurrency(selectedActivity.amount_used)}</p>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <p className="text-xs font-medium uppercase tracking-wider mb-1 text-gray-500 dark:text-gray-400">Description</p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                      {selectedActivity.description}
                    </p>
                  </div>
                </div>

                {/* Add More Photos Section */}
                <div className="rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
                  <h4 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">
                    Add More Photos
                  </h4>
                  
                  <div className="space-y-3">
                    {photoPreviews.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {photoPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={isUploading}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <label className={`flex-1 flex items-center justify-center px-3 py-2 border border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors border-gray-300 dark:border-gray-600 ${
                        (isUploading || photos.length >= 10) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          disabled={isUploading || photos.length >= 10}
                        />
                        <div className="flex items-center gap-2">
                          <Upload size={14} className="text-gray-400 dark:text-gray-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {photos.length >= 10 ? 'Max 10 reached' : 'Choose photos'}
                          </span>
                        </div>
                      </label>
                      
                      {photos.length > 0 && (
                        <button
                          onClick={handleAddMorePhotos}
                          disabled={isUploading}
                          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isUploading && <Loader2 size={14} className="animate-spin" />}
                          {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Photo Gallery */}
                {selectedActivity.media && selectedActivity.media.length > 0 ? (
                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">
                      Photos ({selectedActivity.media.length})
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {selectedActivity.media.map((media) => (
                        <div key={media.media_id} className="relative group aspect-square">
                          <div
                            className="relative w-full h-full cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => handleMediaClick(media)}
                          >
                            <img
                              src={media.media_url}
                              alt="Activity"
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Error';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="text-white drop-shadow-lg" size={20} />
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMedia(media.media_id);
                            }}
                            className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full p-0.5 sm:p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                          >
                            <X size={10} className="sm:w-3 sm:h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Camera className="mx-auto mb-2 text-gray-400 dark:text-gray-600" size={24} />
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      No photos available
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 flex justify-end">
                <button
                  onClick={handleCloseViewModal}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activities Display */}
        {!showForm && !showViewModal && (
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-8 sm:py-12">
                <Loader2 className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-400" />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && activities.length === 0 && (
              <div className="text-center py-8 sm:py-12 px-4">
                <Camera className="mx-auto mb-3 text-gray-400 dark:text-gray-600" size={32} />
                <h3 className="text-base sm:text-lg font-medium mb-1 text-gray-900 dark:text-white">
                  No activities yet
                </h3>
                <p className="text-xs sm:text-sm mb-4 text-gray-500 dark:text-gray-400">
                  Get started by creating your first activity
                </p>
                <button
                  onClick={handleCreateClick}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={14} className="sm:w-4 sm:h-4" />
                  <span>Add Your First Activity</span>
                </button>
              </div>
            )}

            {/* Mobile View - Cards */}
            {!isLoading && activities.length > 0 && (
              <>
                {/* Mobile Cards (visible on small screens) */}
                <div className="block sm:hidden p-3">
                  <div className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 gap-3' 
                    : 'space-y-3'
                  }>
                    {activities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onView={handleViewClick}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop Table (hidden on mobile) */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Photos</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {activities.map((activity) => (
                        <tr
                          key={activity.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {activity.title}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                            {new Date(activity.activity_date).toLocaleDateString()}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                            {activity.location}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                            {formatCurrency(activity.amount_used)}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                              <ImageIcon size={14} className="text-indigo-600 dark:text-indigo-400" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {activity.media?.length || 0}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center justify-end gap-1 sm:gap-2">
                              <button
                                onClick={() => handleViewClick(activity)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                title="View details"
                              >
                                <Eye size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleEditClick(activity)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                title="Edit activity"
                              >
                                <Edit2 size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(activity.id)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                title="Delete activity"
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