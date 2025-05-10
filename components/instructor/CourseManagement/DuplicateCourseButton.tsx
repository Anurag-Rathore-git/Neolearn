import React from 'react';
import { Copy, Loader } from 'lucide-react';

interface DuplicateCourseButtonProps {
  courseId: string;
  onDuplicate: (courseId: string) => Promise<void>;
}

export function DuplicateCourseButton({ courseId, onDuplicate }: DuplicateCourseButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDuplicate = async () => {
    setIsLoading(true);
    try {
      await onDuplicate(courseId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDuplicate}
      disabled={isLoading}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader className="h-5 w-5 mr-2 animate-spin" />
      ) : (
        <Copy className="h-5 w-5 mr-2 text-gray-500" />
      )}
      Duplicate Course
    </button>
  );
}