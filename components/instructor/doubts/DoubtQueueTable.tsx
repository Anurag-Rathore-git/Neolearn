
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter,
  ChevronDown,
  MoreVertical,
  Star,
  Brain
} from 'lucide-react';

interface Doubt {
  id: string;
  studentName: string;
  studentAvatar: string;
  courseName: string;
  question: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  lastUpdated: string;
  responseCount: number;
  aiSuggested: boolean;
}

export function DoubtQueueTable() {
  const [selectedDoubts, setSelectedDoubts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');

  // Mock data - replace with API call
  const doubts: Doubt[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      courseName: 'Advanced React Development',
      question: 'How do I implement authentication with JWT in React?',
      priority: 'high',
      status: 'pending',
      createdAt: '2025-02-10T10:00:00Z',
      lastUpdated: '2025-02-10T10:00:00Z',
      responseCount: 0,
      aiSuggested: true
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      courseName: 'Machine Learning Fundamentals',
      question: 'Can you explain how neural networks work in simple terms?',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2025-02-09T15:30:00Z',
      lastUpdated: '2025-02-10T09:15:00Z',
      responseCount: 2,
      aiSuggested: false
    }
  ];

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = 
      doubt.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doubt.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doubt.courseName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(doubt.status);
    const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(doubt.priority);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedDoubts = [...filteredDoubts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'status') {
      const statusOrder = { pending: 3, 'in-progress': 2, resolved: 1 };
      return statusOrder[b.status] - statusOrder[a.status];
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Student Doubts</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {/* Implement bulk response */}}
              disabled={selectedDoubts.length === 0}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                selectedDoubts.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Respond to Selected
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search doubts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`ml-2 w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'status')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date">Most Recent</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                <div className="space-y-2">
                  {['pending', 'in-progress', 'resolved'].map((status) => (
                    <label key={status} className="flex items-center">
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
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Priority</h3>
                <div className="space-y-2">
                  {['high', 'medium', 'low'].map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={priorityFilter.includes(priority)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPriorityFilter([...priorityFilter, priority]);
                          } else {
                            setPriorityFilter(priorityFilter.filter(p => p !== priority));
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600 capitalize">{priority}</span>
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
                  checked={selectedDoubts.length === sortedDoubts.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDoubts(sortedDoubts.map(d => d.id));
                    } else {
                      setSelectedDoubts([]);
                    }
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDoubts.map((doubt) => (
              <tr key={doubt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedDoubts.includes(doubt.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDoubts([...selectedDoubts, doubt.id]);
                      } else {
                        setSelectedDoubts(selectedDoubts.filter(id => id !== doubt.id));
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={doubt.studentAvatar}
                      alt={doubt.studentName}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {doubt.studentName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {doubt.courseName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{doubt.question}</div>
                  <div className="flex items-center mt-1">
                    {doubt.aiSuggested && (
                      <div className="flex items-center text-xs text-indigo-600">
                        <Brain className="w-4 h-4 mr-1" />
                        AI suggestion available
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityBadgeClass(doubt.priority)}`}>
                    {doubt.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(doubt.status)}`}>
                    {getStatusIcon(doubt.status)}
                    <span className="ml-1">{doubt.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(doubt.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedDoubts.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No doubts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "No doubts match your search criteria"
                : "There are no pending doubts to resolve"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
