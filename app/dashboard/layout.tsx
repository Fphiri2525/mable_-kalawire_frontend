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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const sidebarWidth = sidebarCollapsed ? 'md:pl-20' : 'md:pl-64';
  const topbarMargin = sidebarCollapsed ? 'md:left-20' : 'md:left-64';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar 
        isDarkMode={isDarkMode} 
        isCollapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        isOpen={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      <TopBar
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        userEmail={userEmail}
        sidebarCollapsed={sidebarCollapsed}
        onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className={`pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${sidebarWidth} pl-0`}>
        <div className="p-4 md:p-8">
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