import React, { useState } from 'react';
import { 
  Send, 
  Users, 
  Search, 
  ChevronDown, 
  Paperclip,
  Image,
  Link,
  X,
  CheckCircle
} from 'lucide-react';

interface MessagingInterfaceProps {
  courseId: string;
  selectedStudents?: string[];
}

export function MessagingInterface({ courseId, selectedStudents = [] }: MessagingInterfaceProps) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Mock data - replace with API calls
  const templates = [
    { id: '1', name: 'Welcome Message', content: 'Welcome to the course! We\'re excited to have you...' },
    { id: '2', name: 'Assignment Reminder', content: 'This is a reminder about the upcoming assignment...' },
    { id: '3', name: 'Course Update', content: 'We\'ve added new content to the course...' },
  ];

  const handleSend = async () => {
    setSending(true);
    try {
      // Implement message sending logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setMessage('');
      setSubject('');
      setAttachments([]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
  setAttachments(prev => [...prev, ...files]);

  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setShowTemplates(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Send Message</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Templates
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {showTemplates && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Message Templates</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => loadTemplate(template.id)}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <p className="text-sm font-medium text-gray-900">{template.name}</p>
                  <p className="text-sm text-gray-500 truncate">{template.content}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recipients */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="h-5 w-5" />
          <span>
            {selectedStudents.length > 0
              ? `${selectedStudents.length} students selected`
              : 'All enrolled students'}
          </span>
        </div>
      </div>

      {/* Message Form */}
      <div className="p-6 space-y-4">
        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter message subject"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message here..."
          />
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
              <Paperclip className="h-5 w-5" />
            </label>
            <label className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*"
              />
              <Image className="h-5 w-5" />
            </label>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Link className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {sent && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Message sent!</span>
              </div>
            )}
            <button
              onClick={handleSend}
              disabled={sending || !message.trim()}
              className={`flex items-center px-4 py-2 rounded-lg text-white ${
                sending || !message.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {sending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}