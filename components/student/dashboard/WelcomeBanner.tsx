import React from 'react';
import { Rocket, Target, Clock, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import { useAnalyticsStore } from '../../../store/useAnalyticsStore';

export function WelcomeBanner() {
  const { user } = useUserStore();
  const { averageScore, completedCourses, totalCourses } = useAnalyticsStore();
  const currentTime = new Date();
  const hour = currentTime.getHours();

  // Determine greeting based on time of day
  const getGreeting = () => {
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      progress: 45,
      lastAccessed: '2 hours ago',
      nextLesson: 'React Components'
    },
    {
      id: 2,
      progress: 30,
      lastAccessed: '1 day ago',
      nextLesson: 'Neural Networks'
    }
  ];

  // Calculate user stats
  const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
  const averageProgress = enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0;
  const completedCoursesCount = enrolledCourses.filter(course => course.progress === 100).length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            You're making great progress in your courses!
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
            <Rocket className="w-4 h-4 mr-2" />
            Continue Learning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Average Progress */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-medium">Average Progress</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {averageProgress}%
              </h3>
            </div>
            <Target className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="mt-2">
            <div className="w-full bg-indigo-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${averageProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Enrolled Courses</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {enrolledCourses.length}
              </h3>
            </div>
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">
            Web Development & Machine Learning
          </p>
        </div>

        {/* Completed Courses */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Completed Courses</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {completedCoursesCount}
              </h3>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">
            Keep up the great work!
          </p>
        </div>

        {/* My Courses */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Next Lessons</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {enrolledCourses.length}
              </h3>
            </div>
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">
            React Components & Neural Networks
          </p>
        </div>
      </div>
    </div>
  );
}