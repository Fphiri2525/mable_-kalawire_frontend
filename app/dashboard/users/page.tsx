'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Mail, 
  User, 
  MapPin, 
  Lock,
  Edit2,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Users,
  RefreshCw,
  Calendar,
  Grid,
  List
} from 'lucide-react';

// Types
interface User {
  id: number;
  username: string;
  email: string;
  location: string;
  created_at?: string;
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
      <span className="text-sm font-medium break-words flex-1">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 flex-shrink-0">
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
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mx-4">
        <div className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs sm:text-sm mb-6 text-gray-600 dark:text-gray-400">{message}</p>
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors order-1 sm:order-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// View User Modal (for viewing only)
const ViewUserModal = ({ user, onClose }: { user: User | null; onClose: () => void }) => {
  if (!user) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mx-4">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">User Details</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium">User ID</span>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">#{user.id}</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-indigo-600 dark:text-indigo-400 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate">{user.username}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Location</p>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-900 dark:text-white break-words">{user.location}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-900 dark:text-white break-words">{formatDate(user.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Mobile User Card Component
const MobileUserCard = ({ user, onView, onEdit, onDelete }: { 
  user: User; 
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center min-w-0 flex-1">
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <User size={14} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">
          #{user.id}
        </span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 min-w-0 flex-1">
          <MapPin size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate">{user.location}</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">
          {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => onView(user)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          title="View details"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => onEdit(user)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          title="Edit user"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          title="Delete user"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    location: ''
  });

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // API Calls
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      console.log('📍 Fetching users...');
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      console.log('✅ Users received:', data);
      setUsers(data);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      showNotification('Failed to load users', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserById = async (id: number): Promise<User | null> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/users/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching user:', error);
      showNotification('Failed to load user details', 'error');
      return null;
    }
  };

  const createUser = async (data: any): Promise<boolean> => {
    try {
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to create user');
      }

      showNotification('User created successfully!', 'success');
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('❌ Error creating user:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to create user', 'error');
      return false;
    }
  };

  const updateUser = async (id: number, data: any): Promise<boolean> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to update user');
      }

      showNotification('User updated successfully!', 'success');
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('❌ Error updating user:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to update user', 'error');
      return false;
    }
  };

  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/users/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      showNotification('User deleted successfully!', 'success');
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('❌ Error deleting user:', error);
      showNotification('Failed to delete user', 'error');
      return false;
    }
  };

  // Event Handlers
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForms = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      location: ''
    });
  };

  const handleAddClick = () => {
    // Close any open forms/modals first
    setShowEditForm(false);
    setShowViewModal(false);
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      location: ''
    });
    setShowAddForm(true);
  };

  const handleEditClick = (user: User) => {
    // Close any open forms/modals first
    setShowAddForm(false);
    setShowViewModal(false);
    
    // Set selected user and populate form for editing
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Don't populate password for security
      location: user.location
    });
    setShowEditForm(true);
  };

  const handleViewClick = (user: User) => {
    // Close any open forms
    setShowAddForm(false);
    setShowEditForm(false);
    
    // Set selected user and show view modal
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      setShowConfirmDialog(false);
      await deleteUser(userToDelete);
      setUserToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.username || !formData.email || !formData.location) {
      showNotification('Username, email and location are required', 'error');
      return;
    }

    // For new users, password is required
    if (!selectedUser && !formData.password) {
      showNotification('Password is required for new users', 'error');
      return;
    }

    setIsSubmitting(true);

    // Prepare user data for API
    const userData: any = {
      username: formData.username,
      email: formData.email,
      location: formData.location
    };

    // Only include password if it's provided (for updates) or for new users
    if (formData.password && formData.password.trim() !== '') {
      userData.password = formData.password;
    }

    let success;
    if (selectedUser) {
      console.log('Updating user ID:', selectedUser.id, 'with data:', userData);
      success = await updateUser(selectedUser.id, userData);
    } else {
      console.log('Creating new user with data:', userData);
      success = await createUser(userData);
    }

    if (success) {
      resetForms();
    }

    setIsSubmitting(false);
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedUser(null);
  };

  const handleCancelForm = () => {
    resetForms();
  };

  return (
    <div className="min-h-screen bg-transparent p-3 sm:p-4 md:p-6 transition-colors duration-300">
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirmDialog(false);
          setUserToDelete(null);
        }}
      />

      {/* View Modal - Only shown for viewing */}
      <ViewUserModal
        user={selectedUser}
        onClose={handleCloseViewModal}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Users
            </h1>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              </button>
              
              {/* Add User button always visible when not adding/editing */}
              {!showAddForm && !showEditForm && (
                <button
                  onClick={handleAddClick}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-sm text-sm sm:text-base"
                >
                  <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Add User</span>
                </button>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs sm:text-sm font-medium mb-1">Total Users</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{users.length}</p>
                <p className="text-indigo-100 text-xs sm:text-sm mt-1 sm:mt-2">Registered users in system</p>
              </div>
              <div className="bg-white/20 p-3 sm:p-4 rounded-full">
                <Users size={20} className="sm:w-8 sm:h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Add User Form - Appears above the table */}
        {showAddForm && (
          <div className="mb-4 sm:mb-6 md:mb-8 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Add New User</h2>
              <button
                onClick={handleCancelForm}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px] text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Username */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="johndoe"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="••••••••"
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
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="New York, USA"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={handleCancelForm}
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
                  {isSubmitting ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit User Form - Appears above the table */}
        {showEditForm && selectedUser && (
          <div className="mb-4 sm:mb-6 md:mb-8 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white truncate pr-4">Edit: {selectedUser.username}</h2>
              <button
                onClick={handleCancelForm}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                disabled={isSubmitting}
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px] text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Username */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="johndoe"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Password <span className="text-gray-400 text-xs ml-1">(Leave blank to keep current)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="•••••••• (optional)"
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
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors"
                    placeholder="New York, USA"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={handleCancelForm}
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
                  {isSubmitting ? 'Updating...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users List - Always visible */}
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          {/* Mobile View Toggle */}
          {!isLoading && users.length > 0 && (
            <div className="flex items-center justify-between p-3 sm:hidden border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {users.length} users
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
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <Loader2 className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-400" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && users.length === 0 && (
            <div className="text-center py-8 sm:py-12 px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-400 dark:text-gray-500 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No users yet</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">Get started by adding your first user</p>
              <button
                onClick={handleAddClick}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <Plus size={14} className="mr-2 sm:w-4 sm:h-4" />
                Add Your First User
              </button>
            </div>
          )}

          {/* Users Display */}
          {!isLoading && users.length > 0 && (
            <>
              {/* Mobile View - Cards */}
              <div className="block sm:hidden p-4">
                {viewMode === 'grid' ? (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <MobileUserCard
                        key={user.id}
                        user={user}
                        onView={handleViewClick}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <MobileUserCard
                        key={user.id}
                        user={user}
                        onView={handleViewClick}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                              <User size={12} className="text-indigo-600 dark:text-indigo-400 sm:w-3.5 sm:h-3.5" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate max-w-[100px] sm:max-w-none">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate max-w-[120px] sm:max-w-none">{user.email}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate max-w-[100px] sm:max-w-none">{user.location}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center justify-end gap-1 sm:gap-2">
                            <button
                              onClick={() => handleViewClick(user)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                              title="View details"
                            >
                              <Eye size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleEditClick(user)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                              title="Edit user"
                            >
                              <Edit2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(user.id)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                              title="Delete user"
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
      </div>
    </div>
  );
}