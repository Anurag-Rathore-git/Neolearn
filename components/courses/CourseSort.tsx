import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function CourseSort() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Most Popular');

  const options = [
    'Most Popular',
    'Highest Rated',
    'Newest',
    'Price: Low to High',
    'Price: High to Low',
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
      >
        <span className="text-sm text-gray-700">Sort by: {selected}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm ${
                selected === option
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}