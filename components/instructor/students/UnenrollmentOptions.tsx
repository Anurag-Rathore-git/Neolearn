import React, { useState } from 'react';
import { UserX, AlertTriangle, X } from 'lucide-react';

interface UnenrollmentOptionsProps {
  courseId: string;
  studentId: string;
  studentName: string;
  onUnenroll: () => void;
}

export function UnenrollmentOptions({ courseId, studentId, studentName, onUnenroll }: UnenrollmentOptionsProps) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [isUnenrolling, setIsUnenrolling] = useState(false);
  const [notifyStudent, setNotifyStudent] = useState(true);

  const handleUnenroll = async () => {
    setIsUnenrolling(true);
    try {
      // Implement unenrollment logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onUnenroll();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to unenroll student:', error);
    } finally {
      setIsUnenrolling(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        <UserX className="w-5 h-5 mr-2" />
        Unenroll
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Unenroll Student</h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Are you sure you want to unenroll <span className="font-medium">{studentName}</span> from this course?
                  This action cannot be undone.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Unenrollment
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="inactive">Student Inactive</option>
                    <option value="request">Student Request</option>
                    <option value="violation">Policy Violation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {reason === 'other' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specify Reason
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter the reason for unenrollment"
                    />
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notify-student"
                    checked={notifyStudent}
                    onChange={(e) => setNotifyStudent(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notify-student" className="ml-2 block text-sm text-gray-700">
                    Notify student about unenrollment
                  </label>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Important Note
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Student will lose access to all course materials</li>
                          <li>Progress and completion data will be preserved</li>
                          <li>No refund will be processed automatically</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUnenroll}
                    disabled={isUnenrolling || !reason}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white ${
                      isUnenrolling || !reason
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {isUnenrolling ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Unenrolling...
                      </>
                    ) : (
                      'Confirm Unenrollment'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}