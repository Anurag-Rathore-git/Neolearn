import React, { useState } from 'react';
import { Search, Filter, Clock, BookOpen, Star, Award, ChevronRight, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courses } from '../../data/courses';

export function MyCourses() {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'progress'>('recent');

  // Mock enrolled courses data - in a real app this would come from an API
  const enrolledCourses = courses.slice(0, 3).map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100),
    lastAccessed: '2 hours ago',
    completionStatus: course.id === 2 ? 'completed' : 'in-progress' as 'completed' | 'in-progress' | 'not-started',
    certificate: course.id === 2 ? {
      id: 'CERT-2025-001',
      issueDate: '2025-01-15'
    } : undefined
  }));

  const filteredCourses = enrolledCourses
    .filter(course => {
      if (activeTab === 'in-progress') return course.completionStatus === 'in-progress';
      if (activeTab === 'completed') return course.completionStatus === 'completed';
      return true;
    })
    .filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'progress') return b.progress - a.progress;
    return 0; // 'recent' is default
  });

  const stats = {
    totalCourses: enrolledCourses.length,
    inProgress: enrolledCourses.filter(c => c.completionStatus === 'in-progress').length,
    completed: enrolledCourses.filter(c => c.completionStatus === 'completed').length,
    certificates: enrolledCourses.filter(c => c.certificate).length
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Learning Journey</h1>
            <p className="text-gray-600">Track your progress and continue learning</p>
          </div>
          <Link
            to="/courses"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Browse More Courses
            <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="text-xl font-bold text-gray-900">{stats.certificates}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'all'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'in-progress'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'completed'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Completed
              </button>
            </div>

            <div className="flex space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'name' | 'progress')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="recent">Recently Accessed</option>
                <option value="name">Course Name</option>
                <option value="progress">Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-2xl font-bold">{course.progress}%</p>
                    <p className="text-sm">Completed</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Instructor: {course.instructor.name}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Last accessed {course.lastAccessed}</span>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <Link
                    to={`/courses/${course.id}`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                  </Link>
                  {course.certificate && (
                    <button 
                      className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                      title="Download Certificate"
                    >
                      <Award className="w-4 h-4 text-indigo-600" />
                    </button>
                  )}
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    title="View Progress Details"
                  >
                    <BarChart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "We couldn't find any courses matching your search"
                : activeTab === 'completed'
                ? "You haven't completed any courses yet"
                : "You haven't enrolled in any courses yet"}
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Browse Courses
              <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}