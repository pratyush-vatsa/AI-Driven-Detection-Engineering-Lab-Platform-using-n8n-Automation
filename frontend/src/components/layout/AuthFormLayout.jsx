// frontend/src/components/layout/AuthFormLayout.jsx
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function AuthFormLayout({ title, subtitle, onClose, children }) {
  return (
    <div className="p-8 pt-6">
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="rounded-full p-1 text-slate-500 transition hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      </div>

      {/* Form Content */}
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}