import React, { useState } from 'react';
import { 
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Copy,
  Archive,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourseStore } from '../../../store/useCourseStore';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function CoursesDataTable() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'lastUpdated', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
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
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(course.status);
    return matchesSearch && matchesStatus;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortConfig.key === 'title') {
      return sortConfig.direction === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortConfig.key === 'students') {
      return sortConfig.direction === 'asc'
        ? a.enrolledCount - b.enrolledCount
        : b.enrolledCount - a.enrolledCount;
    }
    if (sortConfig.key === 'lastUpdated') {
      return sortConfig.direction === 'asc'
        ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCourses(e.target.checked ? sortedCourses.map(course => course.id) : []);
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleBatchDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCourses.length} courses?`)) {
      for (const courseId of selectedCourses) {
        await deleteCourse(courseId);
      }
      setSelectedCourses([]);
    }
  };

  const handleBatchArchive = async () => {
    if (window.confirm(`Are you sure you want to archive ${selectedCourses.length} courses?`)) {
      for (const courseId of selectedCourses) {
        await archiveCourse(courseId);
      }
      setSelectedCourses([]);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
        return <Clock className="w-4 h-4" />;
      case 'archived':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            {selectedCourses.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBatchDelete}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  Delete Selected
                </button>
                <button
                  onClick={handleBatchArchive}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  Archive Selected
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <div className="flex gap-2">
              {['draft', 'published', 'archived'].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes(status)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStatusFilter([...statusFilter, status]);
                      } else {
                        setStatusFilter(statusFilter.filter(s => s !== status));
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedCourses.length === sortedCourses.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center">
                  Title
                  {sortConfig.key === 'title' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('students')}
              >
                <div className="flex items-center">
                  Students
                  {sortConfig.key === 'students' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastUpdated')}
              >
                <div className="flex items-center">
                  Last Updated
                  {sortConfig.key === 'lastUpdated' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleSelectCourse(course.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded object-cover" 
                        src={course.thumbnail} 
                        alt={course.title} 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.instructor.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(course.status)}`}>
                    {getStatusIcon(course.status)}
                    <span className="ml-1">{course.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.enrolledCount} students
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(course.lastUpdated).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(showActions === course.id ? null : course.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreVertical className="h-5 w-5" />
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
                            onClick={() => duplicateCourse(course.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Copy className="h-4 w-4 mr-3" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => archiveCourse(course.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Archive className="h-4 w-4 mr-3" />
                            Archive
                          </button>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Trash2 className="h-4 w-4 mr-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}