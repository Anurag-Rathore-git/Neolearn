import React, { useState } from 'react';
import { Download, FileText, X } from 'lucide-react';

interface ExportStudentDataButtonProps {
  courseId: string;
  selectedStudents?: string[];
}

export function ExportStudentDataButton({ courseId, selectedStudents }: ExportStudentDataButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFields, setExportFields] = useState<string[]>([
    'name',
    'email',
    'progress',
    'enrollmentDate'
  ]);
  const [isExporting, setIsExporting] = useState(false);

  const availableFields = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'progress', label: 'Progress' },
    { id: 'enrollmentDate', label: 'Enrollment Date' },
    { id: 'lastActive', label: 'Last Active' },
    { id: 'completedLessons', label: 'Completed Lessons' },
    { id: 'grade', label: 'Grade' },
    { id: 'engagementScore', label: 'Engagement Score' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Implement export logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Create and download file
      const data = 'Mock CSV Data'; // Replace with actual data
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `student-data-${new Date().toISOString()}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setShowModal(false);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleField = (fieldId: string) => {
    setExportFields(prev =>
      prev.includes(fieldId)
        ? prev.filter(f => f !== fieldId)
        : [...prev, fieldId]
    );
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Export Student Data</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Export Format */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">CSV</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="excel"
                      checked={exportFormat === 'excel'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Excel</span>
                  </label>
                </div>
              </div>

              {/* Field Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Fields to Export
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFields.map((field) => (
                    <label key={field.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportFields.includes(field.id)}
                        onChange={() => toggleField(field.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{field.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Export Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>
                    {selectedStudents?.length
                      ? `Exporting data for ${selectedStudents.length} selected students`
                      : 'Exporting data for all enrolled students'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting || exportFields.length === 0}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white ${
                    isExporting || exportFields.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}