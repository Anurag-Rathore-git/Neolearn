import React from 'react';
import { TrendingUp as Trending, Search, Clock } from 'lucide-react';

interface SearchSuggestionsProps {
  onClose: () => void;
}

export function SearchSuggestions({ onClose }: SearchSuggestionsProps) {
  const trending = [
    'React Development',
    'Machine Learning',
    'Digital Marketing',
    'UI/UX Design',
  ];

  const recent = [
    'JavaScript Basics',
    'Python for Beginners',
    'Data Science',
  ];

  return (
    <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      {/* Trending Searches */}
      <div className="mb-6">
        <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
          <Trending className="w-4 h-4 mr-2" />
          Trending
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {trending.map((term) => (
            <button
              key={term}
              className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Search className="w-4 h-4 inline mr-2 text-gray-400" />
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div>
        <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
          <Clock className="w-4 h-4 mr-2" />
          Recent Searches
        </h3>
        <div className="space-y-2">
          {recent.map((term) => (
            <button
              key={term}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <span>
                <Clock className="w-4 h-4 inline mr-2 text-gray-400" />
                {term}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Remove from recent searches
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}