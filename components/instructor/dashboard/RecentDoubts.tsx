import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RecentDoubts() {
  // Mock data - replace with real data from API
  const doubts = [
    {
      id: 1,
      student: 'Alex Johnson',
      course: 'Advanced Web Development',
      question: 'How do I implement authentication in React?',
      time: '5 minutes ago'
    },
    {
      id: 2,
      student: 'Sarah Smith',
      course: 'Machine Learning Fundamentals',
      question: 'Can you explain how neural networks work?',
      time: '1 hour ago'
    },
    {
      id: 3,
      student: 'Mike Brown',
      course: 'UI/UX Design Principles',
      question: 'What are the best practices for responsive design?',
      time: '2 hours ago'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
        <Link
          to="/instructor/doubts"
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {doubts.map((doubt) => (
          <div key={doubt.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{doubt.question}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  by {doubt.student} in {doubt.course}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {doubt.time}
                </div>
              </div>
              <Link
                to={`/instructor/doubts/${doubt.id}`}
                className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Reply
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}