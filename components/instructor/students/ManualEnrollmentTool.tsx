import React, { useState } from 'react';
import { UserPlus, Search, Upload, X, AlertCircle, CheckCircle } from 'lucide-react';

interface ManualEnrollmentToolProps {
  courseId: string;
  onEnrollmentComplete: () => void;
}

export function ManualEnrollmentTool({ courseId, onEnrollmentComplete }: ManualEnrollmentToolProps) {
  const [showModal, setShowModal] = useState(false);
  const [enrollmentMethod, setEnrollmentMethod] = useState<'manual' | 'bulk'>('manual');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSingleEnrollment = async () => {
    setIsEnrolling(true);
    setError('');
    setSuccess('');

    try {
      // Implement enrollment logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSuccess('Student enrolled successfully!');
      setEmail('');
      setName('');
      setTimeout(() => {
        setShowModal(false);
        onEnrollmentComplete();
      }, 2000);
    } catch (err) {
      setError('Failed to enroll student. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleBulkEnrollment = async () => {
    setIsEnrolling(true);
    setError('');
    setSuccess('');

    try {
      // Implement bulk enrollment logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setSuccess('Students enrolled successfully!');
      setBulkEmails('');
      setFile(null);
      setTimeout(() => {
        setShowModal(false);
        onEnrollmentComplete();
      }, 2000);
    } catch (err) {
      setError('Failed to enroll students. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
        setFile(file);
        setError('');
      } else {
        setError('Please upload a CSV file');
        setFile(null);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Enroll Students
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Enroll Students</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Enrollment Method Tabs */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setEnrollmentMethod('manual')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                    enrollmentMethod === 'manual'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setEnrollmentMethod('bulk')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                    enrollmentMethod === 'bulk'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bulk Upload
                </button>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 flex items-center p-4 bg-red-50 rounded-lg text-red-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 flex items-center p-4 bg-green-50 rounded-lg text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {success}
                </div>
              )}

              {enrollmentMethod === 'manual' ? (
                /* Manual Entry Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter student name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter email address"
                    />
                  </div>

                  <button
                    onClick={handleSingleEnrollment}
                    disabled={isEnrolling || !email.trim() || !name.trim()}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-white ${
                      isEnrolling || !email.trim() || !name.trim()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {isEnrolling ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Enroll Student
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Bulk Upload Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload CSV File
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept=".csv"
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          CSV file with columns: name, email
                        </p>
                      </div>
                    </div>
                    {file && (
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {file.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Or Enter Email Addresses
                    </label>
                    <textarea
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter email addresses (one per line)"
                    />
                  </div>

                  <button
                    onClick={handleBulkEnrollment}
                    disabled={isEnrolling || (!file && !bulkEmails.trim())}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-white ${
                      isEnrolling || (!file && !bulkEmails.trim())
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {isEnrolling ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Enrolling Students...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Enroll Students
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Download Template */}
              {enrollmentMethod === 'bulk' && (
                <div className="mt-4 text-center">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    Download CSV Template
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}