// components/dashboard/layout/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  isDarkMode: boolean;
}

interface MenuItem {
  name: string;
  icon: React.ReactNode; // Changed from JSX.Element to React.ReactNode
  path: string;
}

export default function Sidebar({ isDarkMode }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard'
    },
    
    {
      name: 'Add Activity',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      path: '/dashboard/activities/add'
    },
    {
      name: 'Messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      path: '/dashboard/messages'
    },
    {
      name: 'Users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      path: '/dashboard/users'
    },
    {
      name: 'Donations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/dashboard/donations'
    },
  
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full transition-all duration-300 z-30 ${
      isCollapsed ? 'w-20' : 'w-64'
    } ${isDarkMode ? 'bg-charcoal-800 border-r border-charcoal-700' : 'bg-white border-r border-gray-200'}`}>
      
      {/* Sidebar Header */}
      <div className={`h-16 flex items-center px-4 border-b ${
        isDarkMode ? 'border-charcoal-700' : 'border-gray-200'
      }`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'space-x-3'}`}>
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">M</span>
          </div>
          {!isCollapsed && (
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Mebo Foundation
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 w-6 h-6 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-charcoal-700 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          <svg className={`w-4 h-4 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
              pathname === item.path
                ? isDarkMode
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-600'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-charcoal-700 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
          >
            {item.icon}
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}