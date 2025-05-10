
import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Star, TrendingUp, Users } from 'lucide-react';

interface SatisfactionMetrics {
  helpfulCount: number;
  totalResponses: number;
  averageRating: number;
  responseTime: number;
  studentsFeedback: {
    positive: number;
    negative: number;
  };
  trends: {
    date: string;
    satisfaction: number;
  }[];
}

interface StudentSatisfactionTrackingProps {
  metrics: SatisfactionMetrics;
}

export function StudentSatisfactionTracking({ metrics }: StudentSatisfactionTrackingProps) {
  const satisfactionPercentage = (metrics.helpfulCount / metrics.totalResponses) * 100;
  const averageResponseTimeMinutes = Math.round(metrics.responseTime / 60);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Response Satisfaction</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Helpful Responses</p>
              <p className="text-2xl font-bold text-gray-900">{satisfactionPercentage.toFixed(1)}%</p>
            </div>
            <ThumbsUp className={`w-8 h-8 ${
              satisfactionPercentage >= 80 ? 'text-green-500' : 'text-yellow-500'
            }`} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {metrics.helpfulCount} out of {metrics.totalResponses} responses marked helpful
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.averageRating.toFixed(1)}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= metrics.averageRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{averageResponseTimeMinutes}m</p>
            </div>
            <MessageCircle className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Average response time
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Student Feedback</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics.studentsFeedback.positive + metrics.studentsFeedback.negative}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center text-xs text-green-600">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {metrics.studentsFeedback.positive}
            </div>
            <div className="flex items-center text-xs text-red-600">
              <ThumbsDown className="w-4 h-4 mr-1" />
              {metrics.studentsFeedback.negative}
            </div>
          </div>
        </div>
      </div>

      {/* Satisfaction Trend */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">Satisfaction Trend</h3>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5.2% from last month</span>
          </div>
        </div>
        <div className="h-48">
          {/* Implement trend chart here */}
          <div className="flex items-center justify-center h-full text-gray-500">
            Trend visualization will be displayed here
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
            <ThumbsUp className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-green-800">
                "Very helpful explanation, cleared my doubts completely!"
              </p>
              <p className="text-xs text-green-600 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
            <ThumbsDown className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-red-800">
                "Could be more detailed with examples"
              </p>
              <p className="text-xs text-red-600 mt-1">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}