import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  Users, 
  Star, 
  MoreVertical,
  Trash2,
  Edit2,
  Copy,
  Eye,
  Archive
} from 'lucide-react';
import { useCourseStore } from '../../store/useCourseStore';

export function CourseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'students'>('recent');
  const [showActions, setShowActions] = useState<string | null>(null);

  const { 
    draftCourses, 
    publishedCourses,
    deleteCourse,
    duplicateCourse,
    archiveCourse
  } = useCourseStore();

  const allCourses = [...draftCourses, ...publishedCourses];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(course.status);
    return matchesSearch && matchesStatus;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'students':
        return b.enrolledCount - a.enrolledCount;
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  const handleDelete = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await deleteCourse(courseId);
    }
  };

  const handleDuplicate = async (courseId: string) => {
    await duplicateCourse(courseId);
  };

  const handleArchive = async (courseId: string) => {
    if (window.confirm('Are you sure you want to archive this course?')) {
      await archiveCourse(courseId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
          <Link
            to="/instructor/courses/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Course
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'title' | 'students')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="recent">Recently Updated</option>
              <option value="title">Course Title</option>
              <option value="students">Number of Students</option>
            </select>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <div className="flex gap-2">
              {['draft', 'published', 'archived'].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(status)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus([...selectedStatus, status]);
                      } else {
                        setSelectedStatus(selectedStatus.filter(s => s !== status));
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Course List */}
      <div className="divide-y divide-gray-200">
        {sortedCourses.map((course) => (
          <div key={course.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex-shrink-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      course.status === 'published' ? 'bg-green-100 text-green-800' :
                      course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrolledCount} students
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating.toFixed(1)} ({course.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowActions(showActions === course.id ? null : course.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>

                {showActions === course.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <Link
                        to={`/instructor/courses/${course.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4 mr-3" />
                        View Course
                      </Link>
                      <Link
                        to={`/instructor/courses/${course.id}/edit`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit2 className="h-4 w-4 mr-3" />
                        Edit Course
                      </Link>
                      <button
                        onClick={() => handleDuplicate(course.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Copy className="h-4 w-4 mr-3" />
                        Duplicate
                      </button>
                      <button
                        onClick={() => handleArchive(course.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Archive className="h-4 w-4 mr-3" />
                        Archive
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4 mr-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {sortedCourses.length === 0 && (
          <div className="p-6 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "No courses match your search criteria"
                : "Get started by creating a new course"}
            </p>
            <div className="mt-6">
              <Link
                to="/instructor/courses/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Course
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}