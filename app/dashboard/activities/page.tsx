'use client';

import React from 'react';

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Activities</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add New Activity
        </button>
      </div>
      
      <div className="bg-white dark:bg-charcoal-800 rounded-2xl shadow-sm border border-gray-200 dark:border-charcoal-700 p-6">
        <p className="text-gray-600 dark:text-gray-400">List of all activities will appear here.</p>
      </div>
    </div>
  );
}
