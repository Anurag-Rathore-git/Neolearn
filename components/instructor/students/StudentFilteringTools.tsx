import React, { useState } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

interface FilterConfig {
  status: string[];
  progress: string[];
  engagement: string[];
  dateRange: string;
  sortBy: string;
}

interface StudentFilteringToolsProps {
  onFilterChange: (filters: FilterConfig) => void;
  onSearch: (query: string) => void;
}

export function StudentFilteringTools({ onFilterChange, onSearch }: StudentFilteringToolsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterConfig>({
    status: [],
    progress: [],
    engagement: [],
    dateRange: 'all',
    sortBy: 'recent'
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof FilterConfig, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      status: [],
      progress: [],
      engagement: [],
      dateRange: 'all',
      sortBy: 'recent'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                onSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="recent">Recently Enrolled</option>
            <option value="name">Name</option>
            <option value="progress">Progress</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Status Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Status</h3>
              <div className="space-y-2">
                {['active', 'inactive', 'completed'].map((status) => (
                  <label key={status} className="flex items-center">
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

            {/* Progress Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Progress</h3>
              <div className="space-y-2">
                {[
                  { label: '0-25%', value: '0-25' },
                  { label: '26-50%', value: '26-50' },
                  { label: '51-75%', value: '51-75' },
                  { label: '76-100%', value: '76-100' }
                ].map((range) => (
                  <label key={range.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.progress.includes(range.value)}
                      onChange={(e) => {
                        const newProgress = e.target.checked
                          ? [...filters.progress, range.value]
                          : filters.progress.filter(p => p !== range.value);
                        handleFilterChange('progress', newProgress);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Engagement Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Engagement</h3>
              <div className="space-y-2">
                {[
                  { label: 'High', value: 'high' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Low', value: 'low' }
                ].map((level) => (
                  <label key={level.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.engagement.includes(level.value)}
                      onChange={(e) => {
                        const newEngagement = e.target.checked
                          ? [...filters.engagement, level.value]
                          : filters.engagement.filter(e => e !== level.value);
                        handleFilterChange('engagement', newEngagement);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Enrollment Date</h3>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.status.length > 0 || filters.progress.length > 0 || filters.engagement.length > 0) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Active Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Clear all filters
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.status.map((status) => (
                  <span
                    key={status}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {status}
                    <button
                      onClick={() => {
                        const newStatus = filters.status.filter(s => s !== status);
                        handleFilterChange('status', newStatus);
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
                {filters.progress.map((progress) => (
                  <span
                    key={progress}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {progress}% Progress
                    <button
                      onClick={() => {
                        const newProgress = filters.progress.filter(p => p !== progress);
                        handleFilterChange('progress', newProgress);
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
                {filters.engagement.map((engagement) => (
                  <span
                    key={engagement}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {engagement} Engagement
                    <button
                      onClick={() => {
                        const newEngagement = filters.engagement.filter(e => e !== engagement);
                        handleFilterChange('engagement', newEngagement);
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}