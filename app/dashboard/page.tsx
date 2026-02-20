'use client';

import React, { useState, useEffect } from 'react';
import SummaryCard from '../components/summarycard';
import { 
  Loader2,
  Mail,
  User,
  Clock
} from 'lucide-react';

interface DashboardPageProps {
  isDarkMode: boolean;
}

interface DashboardData {
  totalActivities: number;
  totalMessages: number;
  totalDonations: number;
  totalSpent: number;
  balance: number;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function DashboardPage({ isDarkMode }: DashboardPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<DashboardData>({
    totalActivities: 0,
    totalMessages: 0,
    totalDonations: 0,
    totalSpent: 0,
    balance: 0
  });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  // Add effect to log when isDarkMode changes
  useEffect(() => {
    console.log('DashboardPage isDarkMode changed:', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError('');

    try {
      const [
        activitiesRes,
        messagesRes,
        donationsTotalRes,
        activitiesTotalRes
      ] = await Promise.allSettled([
        fetch('https://mablefoundationbackend-production.up.railway.app/api/activities'),
        fetch('https://mablefoundationbackend-production.up.railway.app/api/messages'),
        fetch('https://mablefoundationbackend-production.up.railway.app/api/donations/total'),
        fetch('https://mablefoundationbackend-production.up.railway.app/api/activities/total/spent')
      ]);

      let activities = [];
      if (activitiesRes.status === 'fulfilled' && activitiesRes.value.ok) {
        activities = await activitiesRes.value.json();
      }

      let messages = [];
      if (messagesRes.status === 'fulfilled' && messagesRes.value.ok) {
        messages = await messagesRes.value.json();
        setRecentMessages(messages.slice(0, 10));
      }

      let totalDonations = 0;
      if (donationsTotalRes.status === 'fulfilled' && donationsTotalRes.value.ok) {
        const donationData = await donationsTotalRes.value.json();
        totalDonations = donationData.total_donated || 0;
      }

      let totalSpent = 0;
      if (activitiesTotalRes.status === 'fulfilled' && activitiesTotalRes.value.ok) {
        const spentData = await activitiesTotalRes.value.json();
        totalSpent = spentData.total_spent || 0;
      }

      const balance = totalDonations - totalSpent;

      setData({
        totalActivities: activities.length,
        totalMessages: messages.length,
        totalDonations,
        totalSpent,
        balance: balance > 0 ? balance : 0
      });

    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
        <div className="border rounded-lg p-6 text-center bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 transition-colors duration-300">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <SummaryCard
          title="Total Activities"
          value={data.totalActivities}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          color="indigo"
        />
        
        <SummaryCard
          title="Total Donations"
          value={data.totalDonations}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="blue"
          isCurrency={true}
        />
        
        <SummaryCard
          title="Total Spent"
          value={data.totalSpent}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
          color="orange"
          isCurrency={true}
        />
        
        <SummaryCard
          title="Balance"
          value={data.balance}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="purple"
          isCurrency={true}
        />

        <SummaryCard
          title="Messages"
          value={data.totalMessages}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          }
          color="pink"
        />
      </div>

      {/* Recent Messages Section - Using Tailwind dark: classes instead of isDarkMode prop */}
      <div className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors duration-300">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white transition-colors duration-300">
            <Mail className="text-pink-500" size={20} />
            Recent Messages
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
            Showing {recentMessages.length} of {data.totalMessages} total messages
          </span>
        </div>
        
        {/* Message List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-300">
          {recentMessages.length > 0 ? (
            recentMessages.map((message) => (
              <div 
                key={message.id} 
                className="px-6 py-4 transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-pink-100 dark:bg-pink-900/30">
                    <User size={14} className="text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                          {message.name}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">•</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                          {message.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        <Clock size={12} />
                        <span>{formatDate(message.created_at)}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      {truncateMessage(message.message)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
              No messages yet
            </div>
          )}
        </div>

        {/* Footer */}
        {data.totalMessages > 10 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 transition-colors duration-300">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Showing the 10 most recent messages. {data.totalMessages - 10} older messages are hidden.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}