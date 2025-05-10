import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Star, Users } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import { courses } from '../../../data/courses';

export function CourseProgressGrid() {
  const { user } = useUserStore();
  
  // Mock enrolled courses data for demonstration
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

  // Get full course details for enrolled courses
  const enrolledCoursesWithDetails = enrolledCourses.map(enrolledCourse => {
    const courseDetails = courses.find(c => c.id === enrolledCourse.id);
    return {
      ...courseDetails,
      progress: enrolledCourse.progress,
      lastAccessed: enrolledCourse.lastAccessed,
      nextLesson: enrolledCourse.nextLesson
    };
  });

  if (enrolledCoursesWithDetails.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
          <Link 
            to="/student/courses" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrolledCoursesWithDetails.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-indigo-600">{course.category}</span>
                <span className="text-sm text-gray-500">{course.level}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({course.reviews})</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{course.enrolled} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Next: {course.nextLesson}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Last accessed {course.lastAccessed}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">${course.originalPrice}</span>
                </div>
                <Link
                  to={`/course/${course.id}/learning-interface`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}