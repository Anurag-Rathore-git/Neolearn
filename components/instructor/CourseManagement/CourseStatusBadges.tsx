import React from 'react';
import { CheckCircle, Clock, Archive } from 'lucide-react';

interface CourseStatusBadgesProps {
  status: 'published' | 'draft' | 'archived';
  className?: string;
}

export function CourseStatusBadges({ status, className = '' }: CourseStatusBadgesProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'published':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Published',
          classes: 'bg-green-100 text-green-800'
        };
      case 'draft':
        return {
          icon: <Clock className="w-4 h-4" />,
          text: 'Draft',
          classes: 'bg-yellow-100 text-yellow-800'
        };
      case 'archived':
        return {
          icon: <Archive className="w-4 h-4" />,
          text: 'Archived',
          classes: 'bg-gray-100 text-gray-800'
        };
      default:
        return {
          icon: null,
          text: status,
          classes: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${config.classes} ${className}`}>
      {config.icon}
      <span className="ml-1">{config.text}</span>
    </span>
  );
}