import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CourseModule } from './CourseModule';
import { Module } from '../../store/useCourseStore';

interface CourseModuleListProps {
  modules: Module[];
  onModulesChange: (modules: Module[]) => void;
  onModuleDelete: (moduleId: string) => void;
  onLessonAdd: (moduleId: string) => void;
  onLessonDelete: (moduleId: string, lessonId: string) => void;
}

export function CourseModuleList({
  modules,
  onModulesChange,
  onModuleDelete,
  onLessonAdd,
  onLessonDelete
}: CourseModuleListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = modules.findIndex((module) => module.id === active.id);
      const newIndex = modules.findIndex((module) => module.id === over.id);
      const newModules = arrayMove(modules, oldIndex, newIndex);
      onModulesChange(newModules);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={modules.map(module => module.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {modules.map((module) => (
            <CourseModule
              key={module.id}
              module={module}
              onDelete={() => onModuleDelete(module.id)}
              onLessonAdd={() => onLessonAdd(module.id)}
              onLessonDelete={(lessonId) => onLessonDelete(module.id, lessonId)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}