
import React, { useState } from 'react';
import { MessageCircle, CheckCircle, X, AlertTriangle } from 'lucide-react';

interface BulkResponseToolsProps {
  selectedQuestions: string[];
  onBulkRespond: (response: string, questionIds: string[]) => void;
  onCancel: () => void;
}

export function BulkResponseTools({
  selectedQuestions,
  onBulkRespond,
  onCancel
}: BulkResponseToolsProps) {
  const [response, setResponse] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!response.trim()) return;

    setIsProcessing(true);
    try {
      await onBulkRespond(response, selectedQuestions);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        onCancel();
      }, 2000);
    } catch (error) {
      console.error('Failed to send bulk response:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="bg-green-50 rounded-lg p-4 flex items-center">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <span className="text-green-700">Responses sent successfully!</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Bulk Response ({selectedQuestions.length} questions)
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Important Note
            </h3>
            <p className="mt-1 text-sm text-yellow-700">
              This response will be sent to all selected questions. Make sure the response
              is general enough to address all selected questions appropriately.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your response here..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isProcessing || !response.trim()}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white ${
              isProcessing || !response.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              'Send to All Selected'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
