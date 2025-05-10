import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus, Video, FileText, Settings } from 'lucide-react';
import { Module } from '../../store/useCourseStore';

interface CourseModuleProps {
  module: Module;
  onDelete: () => void;
  onLessonAdd: () => void;
  onLessonDelete: (lessonId: string) => void;
}

export function CourseModule({
  module,
  onDelete,
  onLessonAdd,
  onLessonDelete
}: CourseModuleProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div {...attributes} {...listeners}>
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
            <p className="text-sm text-gray-500">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onLessonAdd}
            className="p-2 text-gray-400 hover:text-gray-500"
            title="Add Lesson"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-500"
            title="Delete Module"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {module.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {lesson.type === 'video' ? (
                <Video className="h-5 w-5 text-indigo-500" />
              ) : (
                <FileText className="h-5 w-5 text-indigo-500" />
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-900">{lesson.title}</h4>
                <p className="text-xs text-gray-500">{lesson.duration} min</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="p-1 text-gray-400 hover:text-gray-500"
                title="Lesson Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={() => onLessonDelete(lesson.id)}
                className="p-1 text-gray-400 hover:text-red-500"
                title="Delete Lesson"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {module.lessons.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            No lessons yet. Click the + button to add one.
          </div>
        )}
      </div>
    </div>
  );
}