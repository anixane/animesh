import React from 'react';
import { AchievementCardProps } from '../types';

export function AchievementCard({ icon, title, year }: AchievementCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden h-full">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="text-blue-600 bg-blue-50 p-2 rounded-md">{icon}</div>
          <div className="ml-3">
            <h3 className="text-base font-semibold line-clamp-2">{title}</h3>
            <p className="text-gray-500 text-xs">{year}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 