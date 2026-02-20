'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/sidebar';
import TopBar from '../components/TOPBR';

interface WithDarkMode {
  isDarkMode?: boolean;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize directly from localStorage to avoid flash
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    if (!authStatus) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    } else {
      // Fallback - shouldn't happen if login worked properly
      setUserEmail('admin@mebofoundation.org');
    }
  }, [router]);

  // Single effect that handles BOTH the class and localStorage whenever isDarkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  if (isAuthenticated === null) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isDarkMode={isDarkMode} />
      <TopBar
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        userEmail={userEmail}  // Pass the email from localStorage
      />
      <main className="pl-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="p-8">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                isDarkMode
              } as React.Attributes & Partial<WithDarkMode>);
            }
            return child;
          })}
        </div>
      </main>
    </div>
  );
}