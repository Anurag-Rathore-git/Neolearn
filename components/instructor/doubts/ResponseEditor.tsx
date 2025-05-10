import React, { useState } from 'react';
import { Send, Image, Link as LinkIcon, Paperclip, X } from 'lucide-react';

interface ResponseEditorProps {
  questionId: string;
  onSubmit: (response: string) => void;
  initialContent?: string;
}

export function ResponseEditor({ questionId, onSubmit, initialContent = '' }: ResponseEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent('');
      setAttachments([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Response</h2>

      <div className="space-y-4">
        {/* Text Editor */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your response here..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Paperclip className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{file.name}</span>
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
              <Paperclip className="w-5 h-5" />
            </label>
            <label className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*"
              />
              <Image className="w-5 h-5" />
            </label>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className={`flex items-center px-4 py-2 rounded-lg text-white ${
              isSubmitting || !content.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Response
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}