
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

interface FilterConfig {
  courses: string[];
  status: string[];
  priority: string[];
  dateRange: string;
  studentRating: number | null;
}

interface QuestionFiltersProps {
  onFilterChange: (filters: FilterConfig) => void;
  onSearch: (query: string) => void;
}

export function QuestionFilters({ onFilterChange, onSearch }: QuestionFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterConfig>({
    courses: [],
    status: [],
    priority: [],
    dateRange: 'all',
    studentRating: null
  });

  // Mock data - replace with API data
  const courses = [
    'Web Development Bootcamp',
    'Machine Learning Fundamentals',
    'Digital Marketing Mastery'
  ];

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
      courses: [],
      status: [],
      priority: [],
      dateRange: 'all',
      studentRating: null
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
          placeholder="Search questions by keyword, student name, or course..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
          <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        {(filters.courses.length > 0 || filters.status.length > 0 || filters.priority.length > 0) && (
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
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Course Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Course</h3>
              <div className="space-y-2">
                {courses.map((course) => (
                  <label key={course} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.courses.includes(course)}
                      onChange={(e) => {
                        const newCourses = e.target.checked
                          ? [...filters.courses, course]
                          : filters.courses.filter(c => c !== course);
                        handleFilterChange('courses', newCourses);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{course}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
              <div className="space-y-2">
                {['pending', 'in-progress', 'resolved'].map((status) => (
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

            {/* Priority Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Priority</h3>
              <div className="space-y-2">
                {['high', 'medium', 'low'].map((priority) => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.priority.includes(priority)}
                      onChange={(e) => {
                        const newPriority = e.target.checked
                          ? [...filters.priority, priority]
                          : filters.priority.filter(p => p !== priority);
                        handleFilterChange('priority', newPriority);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600 capitalize">{priority}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Date Range</h3>
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
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
