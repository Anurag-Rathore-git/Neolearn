import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface CourseSearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export function CourseSearchAndFilters({ onSearch, onFilterChange }: CourseSearchAndFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as string[],
    category: [] as string[],
    price: [0, 1000],
    rating: null as number | null
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const clearFilters = () => {
    const resetFilters = {
      status: [],
      category: [],
      price: [0, 1000],
      rating: null
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
        {(filters.status.length > 0 || filters.category.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <div className="flex gap-2">
              {['draft', 'published', 'archived'].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={(e) => {
                      const newStatus = e.target.checked
                        ? [...filters.status, status]
                        : filters.status.filter(s => s !== status);
                      handleFilterChange('status', newStatus);
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Development', 'Business', 'Design', 'Marketing'].map((category) => (
                <label key={category} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...filters.category, category]
                        : filters.category.filter(c => c !== category);
                      handleFilterChange('category', newCategories);
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.price[1]}
                onChange={(e) => handleFilterChange('price', [0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600">
                Up to ${filters.price[1]}
              </span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
            <div className="flex items-center space-x-2">
              {[4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.rating === rating
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {rating}+ ★
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}