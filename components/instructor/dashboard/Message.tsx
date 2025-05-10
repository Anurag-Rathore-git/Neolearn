import React, { useState } from 'react';
import { Send, X, Users, Search } from 'lucide-react';

interface MessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Message({ isOpen, onClose }: MessageProps) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  // Mock student data - in a real app, this would come from an API
  const students = [
    { id: '1', name: 'John Doe', email: 'john@example.com', course: 'Web Development' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', course: 'Machine Learning' },
    { id: '3', name: 'Mike Brown', email: 'mike@example.com', course: 'Digital Marketing' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement message sending logic
    console.log('Sending message to:', selectedStudents);
    console.log('Message:', message);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Send Message</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Recipients
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Student List */}
            <div className="border rounded-lg max-h-48 overflow-y-auto">
              {filteredStudents.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents([...selectedStudents, student.id]);
                      } else {
                        setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.course}</p>
                  </div>
                </label>
              ))}

              {filteredStudents.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No students found
                </div>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type your message here..."
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={selectedStudents.length === 0 || !message.trim()}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}