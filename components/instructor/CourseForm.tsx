import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Settings, 
  DollarSign, 
  Layout,
  Plus,
  Trash2,
  Save,
  Eye,
  Upload,
  Clock,
  Tag,
  CheckCircle,
  X,
  GripVertical,
  Edit2
} from 'lucide-react';
import { useCourseStore } from '../../store/useCourseStore';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface CourseFormProps {
  courseId?: string;
  onSuccess?: () => void;
}

export function CourseForm({ courseId, onSuccess }: CourseFormProps) {
  const navigate = useNavigate();
  const { createCourse, updateCourse, currentCourse } = useCourseStore();
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseData, setCourseData] = useState({
    title: currentCourse?.title || '',
    subtitle: currentCourse?.subtitle || '',
    description: currentCourse?.description || '',
    category: currentCourse?.category || '',
    level: currentCourse?.level || 'beginner',
    language: currentCourse?.language || 'English',
    price: currentCourse?.price || 0,
    discountedPrice: currentCourse?.discountedPrice || 0,
    thumbnail: currentCourse?.thumbnail || '',
    previewVideo: currentCourse?.previewVideo || '',
    learningObjectives: currentCourse?.learningObjectives || [''],
    prerequisites: currentCourse?.prerequisites || [''],
    tags: currentCourse?.tags || [''],
    modules: currentCourse?.modules || [],
    welcomeMessage: currentCourse?.welcomeMessage || '',
    congratulationsMessage: currentCourse?.congratulationsMessage || '',
    isPublished: false,
    isDraft: true
  });

  const [newModule, setNewModule] = useState({
    title: '',
    description: ''
  });

  const [newLesson, setNewLesson] = useState({
    moduleIndex: -1,
    title: '',
    type: 'video' as 'video' | 'text' | 'quiz',
    duration: '',
    isPreview: false,
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayItemChange = (index: number, value: string, field: 'learningObjectives' | 'prerequisites' | 'tags') => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'learningObjectives' | 'prerequisites' | 'tags') => {
    setCourseData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'learningObjectives' | 'prerequisites' | 'tags') => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAddModule = () => {
    if (!newModule.title.trim()) return;

    setCourseData(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          id: Date.now().toString(),
          title: newModule.title,
          description: newModule.description,
          lessons: [],
          order: prev.modules.length
        }
      ]
    }));

    setNewModule({ title: '', description: '' });
  };

  const handleRemoveModule = (moduleIndex: number) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.filter((_, index) => index !== moduleIndex)
    }));
  };

  const handleAddLesson = () => {
    if (newLesson.moduleIndex === -1 || !newLesson.title.trim()) return;

    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, index) =>
        index === newLesson.moduleIndex
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: Date.now().toString(),
                  title: newLesson.title,
                  type: newLesson.type,
                  duration: newLesson.duration,
                  isPreview: newLesson.isPreview,
                  content: newLesson.content
                }
              ]
            }
          : module
      )
    }));

    setNewLesson({
      moduleIndex: -1,
      title: '',
      type: 'video',
      duration: '',
      isPreview: false,
      content: ''
    });
  };

  const handleRemoveLesson = (moduleIndex: number, lessonIndex: number) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map((module, mIndex) =>
        mIndex === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.filter((_, lIndex) => lIndex !== lessonIndex)
            }
          : module
      )
    }));
  };

  const handleModuleReorder = (dragIndex: number, dropIndex: number) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      const [draggedModule] = newModules.splice(dragIndex, 1);
      newModules.splice(dropIndex, 0, draggedModule);
      return { ...prev, modules: newModules };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (courseId) {
        await updateCourse(courseId, courseData);
      } else {
        const newCourse = await createCourse(courseData);
        navigate(`/instructor/courses/${newCourse.id}`);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumbnail', file);
      
      try {
        const response = await axios.post('/api/courses/upload-thumbnail', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        setCourseData(prev => ({
          ...prev,
          thumbnail: response.data.url
        }));
      } catch (error) {
        console.error('Failed to upload thumbnail:', error);
        toast.error('Failed to upload thumbnail');
      }
    }
  };

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('previewVideo', file);
      
      try {
        const response = await axios.post('/api/courses/upload-preview', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        setCourseData(prev => ({
          ...prev,
          previewVideo: response.data.url
        }));
      } catch (error) {
        console.error('Failed to upload preview video:', error);
        toast.error('Failed to upload preview video');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {courseId ? 'Edit Course' : 'Create New Course'}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setCourseData(prev => ({ ...prev, isDraft: true }))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              {isSubmitting ? 'Saving...' : courseId ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'basic', label: 'Basic Info', icon: <FileText className="w-5 h-5" /> },
              { id: 'curriculum', label: 'Curriculum', icon: <BookOpen className="w-5 h-5" /> },
              { id: 'media', label: 'Media', icon: <Video className="w-5 h-5" /> },
              { id: 'pricing', label: 'Pricing', icon: <DollarSign className="w-5 h-5" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Advanced Web Development with React"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={courseData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Master modern web development techniques"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Provide a detailed description of your course"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="development">Development</option>
                    <option value="business">Business</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level
                  </label>
                  <select
                    name="level"
                    value={courseData.level}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learning Objectives
                </label>
                {courseData.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => handleArrayItemChange(index, e.target.value, 'learningObjectives')}
                      placeholder="What will students learn?"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'learningObjectives')}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('learningObjectives')}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Learning Objective
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prerequisites
                </label>
                {courseData.prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={prerequisite}
                      onChange={(e) => handleArrayItemChange(index, e.target.value, 'prerequisites')}
                      placeholder="What should students know beforehand?"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'prerequisites')}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('prerequisites')}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Prerequisite
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                {courseData.tags.map((tag, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayItemChange(index, e.target.value, 'tags')}
                      placeholder="Add relevant tags"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'tags')}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('tags')}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Tag
                </button>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-8">
              {/* Add New Module */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Module</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Module Title
                    </label>
                    <input
                      type="text"
                      value={newModule.title}
                      onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                      placeholder="e.g., Introduction to React Hooks"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Module Description
                    </label>
                    <textarea
                      value={newModule.description}
                      onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                      placeholder="Describe what this module covers"
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Module
                  </button>
                </div>
              </div>

              {/* Module List */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Course Modules</h3>
                {courseData.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{module.title}</h4>
                          <p className="text-sm text-gray-500">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(moduleIndex)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Lessons</h5>
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                            <div>
                              <h6 className="text-sm font-medium text-gray-900">{lesson.title}</h6>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-xs text-gray-500">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {lesson.duration}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {lesson.type === 'video' && <Video className="w-3 h-3 inline mr-1" />}
                                  {lesson.type === 'text' && <FileText className="w-3 h-3 inline mr-1" />}
                                  {lesson.type}
                                </span>
                                {lesson.isPreview && (
                                  <span className="text-xs text-indigo-600">
                                    <Eye className="w-3 h-3 inline mr-1" />
                                    Preview
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add New Lesson */}
                      {newLesson.moduleIndex === moduleIndex ? (
                        <div className="bg-white border rounded-lg p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lesson Title
                              </label>
                              <input
                                type="text"
                                value={newLesson.title}
                                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                placeholder="e.g., Introduction to React Hooks"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Lesson Type
                                </label>
                                <select
                                  value={newLesson.type}
                                  onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as 'video' | 'text' | 'quiz' })}
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                  <option value="video">Video</option>
                                  <option value="text">Text</option>
                                  <option value="quiz">Quiz</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  value={newLesson.duration}
                                  onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                                  placeholder="e.g., 10:00"
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              </div>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="isPreview"
                                checked={newLesson.isPreview}
                                onChange={(e) => setNewLesson({ ...newLesson, isPreview: e.target.checked })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label htmlFor="isPreview" className="ml-2 block text-sm text-gray-900">
                                Make this lesson free preview
                              </label>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                type="button"
                                onClick={() => setNewLesson({ moduleIndex: -1, title: '', type: 'video', duration: '', isPreview: false, content: '' })}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={handleAddLesson}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                              >
                                Add Lesson
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setNewLesson({ ...newLesson, moduleIndex })}
                          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Lesson
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Thumbnail
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="thumbnail"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="thumbnail"
                          name="thumbnail"
                          type="file"
                          className="sr-only"
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview Video
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Video className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="preview-video"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a video</span>
                        <input
                          id="preview-video"
                          name="preview-video"
                          type="file"
                          className="sr-only"
                          onChange={handleVideoUpload}
                          accept="video/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      MP4 up to 100MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regular Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  
                  <input
                    type="number"
                    name="price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discounted Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={courseData.discountedPrice}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Welcome Message
                </label>
                <textarea
                  name="welcomeMessage"
                  value={courseData.welcomeMessage}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Welcome message for enrolled students"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Congratulations Message
                </label>
                <textarea
                  name="congratulationsMessage"
                  value={courseData.congratulationsMessage}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Message for students who complete the course"
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}