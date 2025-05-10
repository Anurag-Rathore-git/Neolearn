import React, { useState } from 'react';
import { Plus, Trash2, Globe, Twitter, Linkedin, Github, Youtube, Instagram } from 'lucide-react';
import { ProfileData } from '../../../services/profileService';

interface SocialLinksManagerProps {
  socialLinks: ProfileData['socialLinks'];
  onUpdate: (socialLinks: ProfileData['socialLinks']) => Promise<void>;
}

export function SocialLinksManager({ socialLinks, onUpdate }: SocialLinksManagerProps) {
  const [newLink, setNewLink] = useState({ platform: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newLink.platform || !newLink.url) return;

    const updatedLinks = [...socialLinks, newLink];
    await onUpdate(updatedLinks);
    setNewLink({ platform: '', url: '' });
    setIsAdding(false);
  };

  const handleDelete = async (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    await onUpdate(updatedLinks);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'website':
        return <Globe className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Social Links</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform</label>
              <select
                value={newLink.platform}
                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Platform</option>
                <option value="Website">Website</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="GitHub">GitHub</option>
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL</label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://"
              />
            </div>
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
              Add Link
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              {getPlatformIcon(link.platform)}
              <div>
                <p className="text-sm font-medium text-gray-900">{link.platform}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {link.url}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Tips for Social Links</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <div className="h-5 w-5 text-green-500 mr-2">✓</div>
            <span>Use professional social media profiles</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 text-green-500 mr-2">✓</div>
            <span>Keep your profiles up to date</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 text-green-500 mr-2">✓</div>
            <span>Include links to your professional work</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 text-red-500 mr-2">✗</div>
            <span>Don't include personal social media accounts</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 text-red-500 mr-2">✗</div>
            <span>Avoid inactive or outdated profiles</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 