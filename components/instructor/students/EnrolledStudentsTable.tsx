import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  MoreVertical, 
  UserX, 
  MessageCircle,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
  User
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  progress: number;
  lastActive: string;
  completedLessons: number;
  totalLessons: number;
  status: 'active' | 'inactive' | 'completed';
  grade?: string;
  engagementScore: number;
}

interface EnrolledStudentsTableProps {
  courseId: string;
}

export function EnrolledStudentsTable({ courseId }: EnrolledStudentsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student;
    direction: 'asc' | 'desc';
  }>({ key: 'enrollmentDate', direction: 'desc' });
  const [filters, setFilters] = useState({
    status: [] as string[],
    progress: [] as string[],
    engagement: [] as string[]
  });

  // Mock data - replace with API call
  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      enrollmentDate: '2025-02-01',
      progress: 75,
      lastActive: '2025-02-10T10:30:00Z',
      completedLessons: 15,
      totalLessons: 20,
      status: 'active',
      grade: 'A',
      engagementScore: 85
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      enrollmentDate: '2025-02-03',
      progress: 100,
      lastActive: '2025-02-09T14:20:00Z',
      completedLessons: 20,
      totalLessons: 20,
      status: 'completed',
      grade: 'A+',
      engagementScore: 95
    },
    // Add more mock students...
  ];

  const handleSort = (key: keyof Student) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStudents(e.target.checked ? students.map(s => s.id) : []);
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleExportData = () => {
    // Implement CSV export logic
    console.log('Exporting student data...');
  };

  const handleSendMessage = (studentIds: string[]) => {
    // Implement messaging logic
    console.log('Sending message to:', studentIds);
  };

  const handleUnenroll = (studentId: string) => {
    // Implement unenrollment logic
    console.log('Unenrolling student:', studentId);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filters.status.length === 0 || 
      filters.status.includes(student.status);

    const matchesProgress = filters.progress.length === 0 ||
      filters.progress.some(range => {
        const [min, max] = range.split('-').map(Number);
        return student.progress >= min && student.progress <= max;
      });

    const matchesEngagement = filters.engagement.length === 0 ||
      filters.engagement.some(range => {
        const [min, max] = range.split('-').map(Number);
        return student.engagementScore >= min && student.engagementScore <= max;
      });

    return matchesSearch && matchesStatus && matchesProgress && matchesEngagement;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Enrolled Students</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportData}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
            {selectedStudents.length > 0 && (
              <button
                onClick={() => handleSendMessage(selectedStudents)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                Message Selected
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className={`ml-2 w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="space-y-2">
                  {['active', 'completed', 'inactive'].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              status: [...prev.status, status]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              status: prev.status.filter(s => s !== status)
                            }));
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600 capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                <div className="space-y-2">
                  {['0-25', '26-50', '51-75', '76-100'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.progress.includes(range)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              progress: [...prev.progress, range]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              progress: prev.progress.filter(r => r !== range)
                            }));
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{range}%</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Engagement Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Engagement</label>
                <div className="space-y-2">
                  {['0-25', '26-50', '51-75', '76-100'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.engagement.includes(range)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              engagement: [...prev.engagement, range]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              engagement: prev.engagement.filter(r => r !== range)
                            }));
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{range}%</span>
                    </label>
                  ))}
                </div>
              </div>
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
                  checked={selectedStudents.length === students.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Student
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('enrollmentDate')}
              >
                Enrollment Date
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('progress')}
              >
                Progress
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastActive')}
              >
                Last Active
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{student.progress}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {student.completedLessons} of {student.totalLessons} lessons
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(student.lastActive).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(student.status)}`}>
                    {getStatusIcon(student.status)}
                    <span className="ml-1">{student.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleSendMessage([student.id])}
                      className="text-gray-400 hover:text-indigo-600"
                      title="Send Message"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleUnenroll(student.id)}
                      className="text-gray-400 hover:text-red-600"
                      title="Unenroll Student"
                    >
                      <UserX className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sortedStudents.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? "No students match your search criteria"
              : "No students are enrolled in this course yet"}
          </p>
        </div>
      )}
    </div>
  );
}