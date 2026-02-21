'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Mail, Loader2 } from 'lucide-react';

interface TopBarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  userEmail: string;
  sidebarCollapsed?: boolean;
  onMobileMenuToggle?: () => void;
}

interface UserDetails {
  id: number;
  username: string;
  email: string;
  location: string;
  created_at: string;
}

export default function TopBar({ isDarkMode, onToggleTheme, userEmail, sidebarCollapsed = false, onMobileMenuToggle }: TopBarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch user details when component mounts or email changes
  useEffect(() => {
    if (userEmail && userEmail !== 'admin@mebofoundation.org') {
      fetchUserDetails();
    } else {
      // Try to get from localStorage as fallback
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          setUserDetails(JSON.parse(storedUserData));
        } catch (e) {
          console.error('Error parsing stored user data:', e);
        }
      }
    }
  }, [userEmail]);

  const fetchUserDetails = async () => {
    setIsLoadingUser(true);
    try {
      // Use the email prop to fetch details
      const response = await fetch(`https://mablefoundationbackend-production.up.railway.app/api/users/email/${encodeURIComponent(userEmail)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      const data = await response.json();
      setUserDetails(data);
      
      // Update localStorage with fresh data
      localStorage.setItem('userName', data.username);
      localStorage.setItem('userLocation', data.location || '');
      localStorage.setItem('userData', JSON.stringify(data));
      
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Fallback to localStorage data
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          setUserDetails(JSON.parse(storedUserData));
        } catch (e) {
          console.error('Error parsing stored user data:', e);
        }
      }
    } finally {
      setIsLoadingUser(false);
    }
  };

  const handleLogout = () => {
    setShowNotification(true);
    
    setTimeout(() => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userLocation');
      localStorage.removeItem('userData');
      router.push('/login');
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitial = () => {
    if (userDetails?.username) {
      return userDetails.username.charAt(0).toUpperCase();
    }
    return userEmail.charAt(0).toUpperCase();
  };

  const getDisplayName = () => {
    if (userDetails?.username) {
      return userDetails.username;
    }
    return userEmail.split('@')[0];
  };

  const topbarMarginLeft = sidebarCollapsed ? 'md:left-20' : 'md:left-64';

  return (
    <header className={`fixed top-0 right-0 left-0 ${topbarMarginLeft} h-16 z-20 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/90 backdrop-blur-md border-b border-gray-700' 
        : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
    }`}>
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page Title */}
        <h2 className={`text-lg font-semibold hidden md:block ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Welcome back, {getDisplayName()}
        </h2>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`relative inline-flex items-center h-8 rounded-full w-14 transition-colors duration-300 ${
              isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <span className="sr-only">Toggle theme</span>
            <span
              className={`inline-block w-6 h-6 transform transition-transform duration-300 bg-white rounded-full shadow-lg flex items-center justify-center ${
                isDarkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center px-2 md:px-3 py-2 rounded-xl transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-medium text-sm">
                  {getInitial()}
                </span>
              </div>
              <span className={`text-sm font-medium hidden lg:block max-w-[150px] truncate mx-2 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>
                {getDisplayName()}
              </span>
              {isLoadingUser ? (
                <Loader2 size={14} className="animate-spin text-gray-400 hidden md:block" />
              ) : (
                <svg className={`w-4 h-4 transition-transform duration-200 hidden md:block ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg py-2 z-50 ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}>
                {/* User Profile Header */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-base">
                        {getInitial()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {userDetails?.username || 'User'}
                      </p>
                      <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                {userDetails && (
                  <div className="px-4 py-2 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin size={14} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {userDetails.location || 'Location not set'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar size={14} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Joined {formatDate(userDetails.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Mail size={14} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {userDetails.email}
                      </span>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {isLoadingUser && !userDetails && (
                  <div className="px-4 py-3 text-center">
                    <Loader2 size={16} className="animate-spin mx-auto text-gray-400" />
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Loading profile...
                    </p>
                  </div>
                )}

                {/* Logout Button */}
                <div className={`border-t mt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center space-x-2 transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-red-400 hover:bg-gray-700' 
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className={`rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 ${
            isDarkMode 
              ? 'bg-green-600 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">You have logged out successfully</span>
          </div>
        </div>
      )}
    </header>
  );
}