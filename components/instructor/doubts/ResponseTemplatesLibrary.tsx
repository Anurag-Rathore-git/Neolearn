import React, { useState } from 'react';
import { Save, Plus, Edit2, Trash2, Search, FolderPlus } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  content: string;
  category: string;
  lastUsed: string;
}

interface ResponseTemplatesLibraryProps {
  onSelectTemplate: (template: Template) => void;
  onSaveTemplate: (template: Omit<Template, 'id' | 'lastUsed'>) => void;
}

export function ResponseTemplatesLibrary({
  onSelectTemplate,
  onSaveTemplate
}: ResponseTemplatesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data - replace with API data
  const templates: Template[] = [
    {
      id: '1',
      title: 'General Welcome',
      content: 'Thank you for your question. I\'ll be happy to help you with that.',
      category: 'General',
      lastUsed: '2025-02-01'
    },
    {
      id: '2',
      title: 'Technical Explanation',
      content: 'Let me break down this technical concept for you step by step...',
      category: 'Technical',
      lastUsed: '2025-02-02'
    }
  ];

  const categories = ['All', 'General', 'Technical', 'Follow-up', 'Clarification'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
      template.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleSaveNewTemplate = () => {
    if (!newTemplate.title || !newTemplate.content || !newTemplate.category) return;
    
    onSaveTemplate(newTemplate);
    setNewTemplate({ title: '', content: '', category: '' });
    setShowNewTemplate(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Response Templates</h2>
        <button
          onClick={() => setShowNewTemplate(!showNewTemplate)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Template
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                selectedCategory.toLowerCase() === category.toLowerCase()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* New Template Form */}
      {showNewTemplate && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Title
              </label>
              <input
                type="text"
                value={newTemplate.title}
                onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter template title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                {categories.filter(c => c !== 'All').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Content
              </label>
              <textarea
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter template content"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewTemplate(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewTemplate}
                disabled={!newTemplate.title || !newTemplate.content || !newTemplate.category}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates List */}
      <div className="space-y-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg p-4 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{template.title}</h3>
                <span className="text-sm text-gray-500">
                  {template.category} • Last used {template.lastUsed}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="p-2 text-gray-400 hover:text-indigo-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
            <button
              onClick={() => onSelectTemplate(template)}
              className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
            >
              Use Template
            </button>
          </div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FolderPlus className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No templates found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "No templates match your search criteria"
                : "Get started by creating your first template"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}