import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Toast as ToastType } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
};

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

export function Toast({ toast, onClose }: ToastProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 mb-4 rounded-lg border ${styles[toast.type]}`}
      role="alert"
    >
      <div className="flex items-center">
        <div className="mr-3">{icons[toast.type]}</div>
        <div className="text-sm font-medium">{toast.message}</div>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="ml-4 inline-flex text-gray-400 hover:text-gray-900 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastType[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 w-96">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
} 