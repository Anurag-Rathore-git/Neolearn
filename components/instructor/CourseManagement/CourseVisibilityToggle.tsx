import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface CourseVisibilityToggleProps {
  courseId: string;
  isVisible: boolean;
  onToggle: (courseId: string, isVisible: boolean) => void;
}

export function CourseVisibilityToggle({ courseId, isVisible, onToggle }: CourseVisibilityToggleProps) {
  const handleToggle = () => {
    onToggle(courseId, !isVisible);
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
        isVisible
          ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
          : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
      }`}
    >
      {isVisible ? (
        <>
          <Eye className="h-5 w-5 mr-2" />
          Visible
        </>
      ) : (
        <>
          <EyeOff className="h-5 w-5 mr-2" />
          Hidden
        </>
      )}
    </button>
  );
}