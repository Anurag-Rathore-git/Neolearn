import React from 'react';
import { Link } from 'react-router-dom';
import { CourseList } from '../CourseList';

export function CourseManagement() {
  return (
    <div className="space-y-6">
      <CourseList />
    </div>
  );
}