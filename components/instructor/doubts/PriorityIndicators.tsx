
import React from 'react';
import { AlertTriangle, Clock, Star } from 'lucide-react';

interface PriorityIndicatorsProps {
  priority: 'high' | 'medium' | 'low';
  waitTime: number; // in minutes
  studentRating?: number;
  isUrgent?: boolean;
}

export function PriorityIndicators({ 
  priority, 
  waitTime, 
  studentRating,
  isUrgent 
}: PriorityIndicatorsProps) {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getWaitTimeIndicator = () => {
    if (waitTime < 30) {
      return { color: 'text-green-600', text: 'Recent' };
    } else if (waitTime < 60) {
      return { color: 'text-yellow-600', text: 'Waiting' };
    } else {
      return { color: 'text-red-600', text: 'Overdue' };
    }
  };

  const waitTimeInfo = getWaitTimeIndicator();

  return (
    <div className="flex items-center space-x-4">
      {/* Priority Indicator */}
      <div className={`flex items-center ${getPriorityColor()}`}>
        <AlertTriangle className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium capitalize">{priority}</span>
      </div>

      {/* Wait Time */}
      <div className={`flex items-center ${waitTimeInfo.color}`}>
        <Clock className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium">
          {waitTimeInfo.text} • {Math.floor(waitTime)} min
        </span>
      </div>

      {/* Student Rating */}
      {studentRating && (
        <div className="flex items-center text-yellow-500">
          <Star className="w-5 h-5 mr-1 fill-current" />
          <span className="text-sm font-medium">{studentRating.toFixed(1)}</span>
        </div>
      )}

      {/* Urgent Indicator */}
      {isUrgent && (
        <div className="animate-pulse flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full">
          <AlertTriangle className="w-4 h-4 mr-1" />
          <span className="text-xs font-medium">Urgent</span>
        </div>
      )}
    </div>
  );
}