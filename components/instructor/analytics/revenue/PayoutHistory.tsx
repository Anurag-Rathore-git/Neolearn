import React, { useState } from 'react';
import { Download, ChevronDown, Search, Filter, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Payout {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
  reference: string;
}

export function PayoutHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock data - replace with API data
  const payouts: Payout[] = [
    {
      id: '1',
      amount: 2500,
      status: 'completed',
      date: '2025-02-01',
      method: 'Bank Transfer',
      reference: 'PAY-2025-001'
    },
    {
      id: '2',
      amount: 1800,
      status: 'pending',
      date: '2025-02-05',
      method: 'PayPal',
      reference: 'PAY-2025-002'
    },
    {
      id: '3',
      amount: 3200,
      status: 'completed',
      date: '2025-02-10',
      method: 'Bank Transfer',
      reference: 'PAY-2025-003'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = 
      payout.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.method.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(payout.status);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Payout History</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as 'week' | 'month' | 'year')}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            <button
              onClick={() => {/* Implement export logic */}}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search payouts..."
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
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <div className="flex flex-wrap gap-2">
              {['completed', 'pending', 'failed'].map((status) => (
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

      {/* Payout Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayouts.map((payout) => (
              <tr key={payout.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payout.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                    {payout.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(payout.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(payout.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payout.method}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPayouts.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payouts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "No payouts match your search criteria"
                : "You haven't received any payouts yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}