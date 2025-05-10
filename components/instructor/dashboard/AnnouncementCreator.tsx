import React, { useState } from 'react';
import { Send } from 'lucide-react';

export function AnnouncementCreator() {
  const [announcement, setAnnouncement] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Mock data - replace with real data from API
  const courses = [
    { id: '1', title: 'Advanced Web Development' },
    { id: '2', title: 'Machine Learning Fundamentals' },
    { id: '3', title: 'UI/UX Design Principles' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement announcement submission
    setAnnouncement('');
    setSelectedCourse('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Create Announcement</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Announcement
          </label>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your announcement here..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Announcement
        </button>
      </form>
    </div>
  );
}