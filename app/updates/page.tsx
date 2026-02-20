'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Loader2 } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  activity_date: string;
  location: string;
  amount_used: number;
  description: string;
  media?: {
    media_id: number;
    media_url: string;
  }[];
}

export default function UpdatesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchActivities();
  }, []);

  // Auto-slide effect for each activity
  useEffect(() => {
    if (activities.length === 0) return;

    const intervals = activities.map(activity => {
      const mediaCount = activity.media?.length || 0;
      if (mediaCount <= 1) return null;

      return setInterval(() => {
        setCurrentMediaIndex(prev => ({
          ...prev,
          [activity.id]: ((prev[activity.id] || 0) + 1) % mediaCount
        }));
      }, 5000);
    });

    return () => {
      intervals.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [activities]);

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/activities');
      
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      
      const data = await response.json();
      
      setActivities(data);
      
      const initialMediaIndex: { [key: number]: number } = {};
      data.forEach((activity: Activity) => {
        initialMediaIndex[activity.id] = 0;
      });
      setCurrentMediaIndex(initialMediaIndex);
    } catch (err: any) {
      console.error('Error fetching activities:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchActivities}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">No activities found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {activities.map((activity, index) => {
        const mediaCount = activity.media?.length || 0;
        const hasMedia = mediaCount > 0;
        
        let currentImage = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
        
        if (hasMedia) {
          const mediaIndex = currentMediaIndex[activity.id] || 0;
          const mediaItem = activity.media?.[mediaIndex];
          if (mediaItem?.media_url) {
            currentImage = mediaItem.media_url;
          }
        }

        return (
          <div key={activity.id}>
            {/* Image with text overlay */}
            <div className="relative w-full h-[70vh] overflow-hidden">
              {/* Pure image */}
              <img
                src={currentImage}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              
              {/* Text overlay at the bottom - semi-transparent background for readability */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    {activity.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-2 text-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-300" />
                      <span className="text-sm md:text-base">{formatDate(activity.activity_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-300" />
                      <span className="text-sm md:text-base">{activity.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-200 max-w-2xl line-clamp-2">
                    {activity.description}
                  </p>
                  
                  {/* Simple dot indicators - no numbers */}
                  {hasMedia && mediaCount > 1 && (
                    <div className="mt-3 flex items-center gap-1.5">
                      {activity.media?.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === (currentMediaIndex[activity.id] || 0) 
                              ? 'w-6 bg-indigo-400' 
                              : 'w-1.5 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Increased white space between activities */}
            {index < activities.length - 1 && (
              <div className="h-16 bg-white dark:bg-gray-900"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}