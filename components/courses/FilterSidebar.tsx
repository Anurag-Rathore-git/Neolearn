import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  show: boolean;
  onClose: () => void;
  filters: any;
  onChange: (filters: any) => void;
}

export function FilterSidebar({ show, onClose, filters, onChange }: FilterSidebarProps) {
  const categories = [
    'Development',
    'Business',
    'Design',
    'Marketing',
    'IT & Software',
    'Personal Development',
    'Photography',
    'Music',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['0-2 hours', '2-5 hours', '5-10 hours', '10+ hours'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        show ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:inset-y-auto lg:left-auto lg:transform-none transition duration-200 ease-in-out z-30 w-80 bg-white lg:block ${
        show ? '' : 'hidden'
      }`}
    >
      <div className="h-full overflow-y-auto lg:h-auto border-r lg:border-r-0 lg:border lg:rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category]
                      : filters.categories.filter((c) => c !== category);
                    onChange({ ...filters, categories: newCategories });
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Level</h3>
          <div className="space-y-2">
            {levels.map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={filters.levels.includes(level)}
                  onChange={(e) => {
                    const newLevels = e.target.checked
                      ? [...filters.levels, level]
                      : filters.levels.filter((l) => l !== level);
                    onChange({ ...filters, levels: newLevels });
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Duration</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={filters.duration.includes(duration)}
                  onChange={(e) => {
                    const newDurations = e.target.checked
                      ? [...filters.duration, duration]
                      : filters.duration.filter((d) => d !== duration);
                    onChange({ ...filters, duration: newDurations });
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">{duration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.price[1]}
              onChange={(e) => {
                onChange({
                  ...filters,
                  price: [filters.price[0], parseInt(e.target.value)],
                });
              }}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rs.{filters.price[0]}</span>
              <span className="text-sm text-gray-600">Rs.{filters.price[1]}</span>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Language</h3>
          <div className="space-y-2">
            {languages.map((language) => (
              <label key={language} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={filters.language.includes(language)}
                  onChange={(e) => {
                    const newLanguages = e.target.checked
                      ? [...filters.language, language]
                      : filters.language.filter((l) => l !== language);
                    onChange({ ...filters, language: newLanguages });
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">{language}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => onChange({
            categories: [],
            levels: [],
            duration: [],
            price: [0, 1000],
            rating: null,
            language: [],
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}