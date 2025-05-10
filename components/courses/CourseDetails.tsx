import React, { useState } from 'react';
import { Star, MessageCircle, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CourseDetails({ course, addToWishlist, removeFromWishlist }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* ... other course details content ... */}
      
      {/* Support Options */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to={`/doubts?course=${course?.id}`}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <MessageCircle className="w-5 h-5 text-indigo-600" />
            <span>Ask a Question</span>
          </Link>
          <Link
            to={`/doubts?tab=ai-help&course=${course?.id}`}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Brain className="w-5 h-5" />
            <span>Get AI Help</span>
          </Link>
        </div>
      </div>
    </div>
  );
}