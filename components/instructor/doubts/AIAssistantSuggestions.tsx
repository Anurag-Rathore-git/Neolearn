
import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, ThumbsUp, ThumbsDown, RefreshCw, CheckCircle } from 'lucide-react';

interface AIAssistantSuggestionsProps {
  questionId: string;
  questionText: string;
  onUseSuggestion: (suggestion: string) => void;
}

export function AIAssistantSuggestions({
  questionId,
  questionText,
  onUseSuggestion
}: AIAssistantSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, 'positive' | 'negative'>>({});

  useEffect(() => {
    generateSuggestions();
  }, [questionId]);

  const generateSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuggestions([
        "Based on the concepts covered in the course, here's a detailed explanation...",
        "Let me break this down into simpler steps that will help you understand...",
        "Here's a practical example that illustrates the concept you're asking about..."
      ]);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (index: number, type: 'positive' | 'negative') => {
    setFeedback(prev => ({
      ...prev,
      [index]: type
    }));
    // In a real app, send feedback to API to improve AI
  };

  const handleUseSuggestion = (suggestion: string, index: number) => {
    setSelectedSuggestion(index);
    onUseSuggestion(suggestion);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center space-x-2 text-indigo-600">
          <Brain className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">Generating suggestions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={generateSuggestions}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">AI Suggestions</h2>
        </div>
        <button
          onClick={generateSuggestions}
          className="flex items-center px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Regenerate
        </button>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              selectedSuggestion === index
                ? 'border-indigo-200 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">
                  Suggestion {index + 1}
                </span>
              </div>
              {selectedSuggestion === index && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Used</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">{suggestion}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleFeedback(index, 'positive')}
                  className={`flex items-center text-sm ${
                    feedback[index] === 'positive'
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-green-600'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful
                </button>
                <button
                  onClick={() => handleFeedback(index, 'negative')}
                  className={`flex items-center text-sm ${
                    feedback[index] === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  Not Helpful
                </button>
              </div>

              <button
                onClick={() => handleUseSuggestion(suggestion, index)}
                disabled={selectedSuggestion === index}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  selectedSuggestion === index
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Use This Response
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
