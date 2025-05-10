import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ProfileData } from '../../../services/profileService';

interface ExpertiseTagsSelectorProps {
  expertise: string[];
  onUpdate: (expertise: string[]) => Promise<void>;
}

export function ExpertiseTagsSelector({ expertise, onUpdate }: ExpertiseTagsSelectorProps) {
  const [newTag, setNewTag] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newTag.trim()) return;

    const updatedExpertise = [...expertise, newTag.trim()];
    await onUpdate(updatedExpertise);
    setNewTag('');
    setIsAdding(false);
  };

  const handleDelete = async (index: number) => {
    const updatedExpertise = expertise.filter((_, i) => i !== index);
    await onUpdate(updatedExpertise);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Areas of Expertise</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expertise
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expertise Area</label>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Web Development, Data Science"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Expertise
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {expertise.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
          >
            <span className="text-sm font-medium">{tag}</span>
            <button
              onClick={() => handleDelete(index)}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900">Tips for Adding Expertise</h3>
        <ul className="mt-2 text-sm text-gray-600 space-y-1">
          <li>• Focus on your core teaching areas</li>
          <li>• Be specific but not too narrow</li>
          <li>• Include both technical and soft skills</li>
          <li>• Consider your target audience</li>
          <li>• Keep it relevant to your courses</li>
        </ul>
      </div>
    </div>
  );
} 