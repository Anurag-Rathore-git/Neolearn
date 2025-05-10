import React, { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Quote, Link, Image } from 'lucide-react';

interface BiographyEditorProps {
  bio: string;
  onUpdate: (bio: string) => Promise<void>;
}

export function BiographyEditor({ bio, onUpdate }: BiographyEditorProps) {
  const [content, setContent] = useState(bio);

  const handleFormat = (format: string) => {
    const textarea = document.getElementById('bio-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = '';

    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'bullet':
        newText = `- ${selectedText}`;
        break;
      case 'ordered':
        newText = `1. ${selectedText}`;
        break;
      case 'quote':
        newText = `> ${selectedText}`;
        break;
      default:
        newText = selectedText;
    }

    const updatedContent = content.substring(0, start) + newText + content.substring(end);
    setContent(updatedContent);
  };

  const handleSave = async () => {
    await onUpdate(content);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Biography</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex space-x-2">
          <button
            onClick={() => handleFormat('bold')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFormat('italic')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFormat('bullet')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFormat('ordered')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Ordered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFormat('quote')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFormat('link')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Add Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFormat('image')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Add Image"
          >
            <Image className="w-4 h-4" />
          </button>
        </div>

        <textarea
          id="bio-editor"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 focus:outline-none resize-none"
          placeholder="Write your biography here..."
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900">Writing Tips</h3>
        <ul className="mt-2 text-sm text-gray-600 space-y-1">
          <li>• Start with a brief introduction about yourself</li>
          <li>• Highlight your teaching experience and expertise</li>
          <li>• Share your teaching philosophy and approach</li>
          <li>• Include any notable achievements or certifications</li>
          <li>• Keep it professional but engaging</li>
        </ul>
      </div>
    </div>
  );
} 