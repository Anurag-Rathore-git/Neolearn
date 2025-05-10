import React from 'react';
import { Archive, AlertCircle } from 'lucide-react';

interface CourseArchiveOptionProps {
  courseId: string;
  onArchive: (courseId: string) => void;
}

export function CourseArchiveOption({ courseId, onArchive }: CourseArchiveOptionProps) {
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleArchive = () => {
    setShowConfirmation(true);
  };

  const confirmArchive = () => {
    onArchive(courseId);
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        onClick={handleArchive}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Archive className="h-5 w-5 mr-2 text-gray-500" />
        Archive Course
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Archive Course?</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Archiving this course will hide it from the course catalog. Students who are already enrolled will still have access. You can unarchive the course at any time.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmArchive}
                className="px-4 py-2 bg-yellow-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-yellow-700"
              >
                Archive Course
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}