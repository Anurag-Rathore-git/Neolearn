import React, { useState } from 'react';
import { Award, Plus, Trash2, Edit2 } from 'lucide-react';
import { ProfileData } from '../../../services/profileService';

interface CredentialsManagerProps {
  credentials: ProfileData['credentials'];
  onUpdate: (credentials: ProfileData['credentials']) => Promise<void>;
}

export function CredentialsManager({ credentials, onUpdate }: CredentialsManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCredential, setNewCredential] = useState({
    type: 'education' as const,
    title: '',
    institution: '',
    year: '',
    description: ''
  });

  const handleAdd = async () => {
    if (!newCredential.title || !newCredential.institution || !newCredential.year) return;
    
    const updatedCredentials = [...credentials, { ...newCredential, id: Date.now().toString() }];
    await onUpdate(updatedCredentials);
    setIsAdding(false);
    setNewCredential({
      type: 'education',
      title: '',
      institution: '',
      year: '',
      description: ''
    });
  };

  const handleDelete = async (id: string) => {
    const updatedCredentials = credentials.filter(cred => cred.id !== id);
    await onUpdate(updatedCredentials);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Credentials</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Credential</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={newCredential.type}
                onChange={(e) => setNewCredential(prev => ({ ...prev, type: e.target.value as any }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="education">Education</option>
                <option value="certification">Certification</option>
                <option value="experience">Experience</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newCredential.title}
                onChange={(e) => setNewCredential(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Bachelor's Degree in Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                type="text"
                value={newCredential.institution}
                onChange={(e) => setNewCredential(prev => ({ ...prev, institution: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., University of Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="text"
                value={newCredential.year}
                onChange={(e) => setNewCredential(prev => ({ ...prev, year: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., 2020"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newCredential.description}
              onChange={(e) => setNewCredential(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Add details about your credential..."
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add Credential
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {credentials.map((credential) => (
          <div key={credential.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Award className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{credential.title}</h3>
                  <p className="text-sm text-gray-500">{credential.institution}</p>
                  <p className="text-sm text-gray-500">{credential.year}</p>
                  {credential.description && (
                    <p className="mt-2 text-sm text-gray-600">{credential.description}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(credential.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 