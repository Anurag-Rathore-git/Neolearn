import React, { useState, useRef } from 'react';
import { Image, Upload, X, RotateCcw } from 'lucide-react';

interface ProfilePhotoUploaderProps {
  avatar: string;
  onUpload: (file: File) => Promise<void>;
}

export function ProfilePhotoUploader({ avatar, onUpload }: ProfilePhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUpload(new File([], ''));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Profile Photo</h2>
        {avatar && (
          <button
            onClick={handleRemove}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            <span>Remove Photo</span>
          </button>
        )}
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {avatar ? (
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
              >
                <Upload className="w-6 h-6 text-white" />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Click the image to change your photo
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <Image className="w-12 h-12 text-gray-400" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Drag and drop your photo here, or
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-indigo-600 hover:text-indigo-700"
              >
                click to browse
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900">Photo Guidelines</h3>
        <ul className="mt-2 text-sm text-gray-600 space-y-1">
          <li>• Use a high-quality, professional headshot</li>
          <li>• Ensure good lighting and a neutral background</li>
          <li>• File size should be less than 5MB</li>
          <li>• Supported formats: JPG, PNG</li>
        </ul>
      </div>
    </div>
  );
} 