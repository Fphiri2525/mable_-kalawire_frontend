// mebo-foundation\app\components\recent.tsx
'use client';

import React from 'react';

interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface RecentProps {
  activities: Activity[];
  isDarkMode: boolean;
}

export default function Recent({ activities, isDarkMode }: RecentProps) {
  return (
    <div className={`rounded-xl border ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="p-6 border-b border-inherit">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Recent Activities
          </h3>
          <button className={`text-sm font-medium ${
            isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
          }`}>
            View All
          </button>
        </div>
      </div>

      <div className="divide-y divide-inherit">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-opacity-50 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {activity.title}
                </h4>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(activity.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {activity.location}
                </p>
              </div>
              <button className={`px-3 py-1 text-xs rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}