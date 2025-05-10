import React from 'react';
import { Archive, Trash2, Eye, Edit2 } from 'lucide-react';

interface BatchEditingToolsProps {
  selectedCourses: string[];
  onArchive: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
}

export function BatchEditingTools({
  selectedCourses,
  onArchive,
  onDelete,
  onPublish,
  onUnpublish
}: BatchEditingToolsProps) {
  if (selectedCourses.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">
            {selectedCourses.length} courses selected
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onPublish}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Publish
          </button>
          <button
            onClick={onUnpublish}
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Unpublish
          </button>
          <button
            onClick={onArchive}
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}