import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function MarkdownViewer({ markdownContent, onClear, onDownloadPdf }) {
  if (!markdownContent) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 className="text-lg font-bold tracking-tight">Scan Report Details</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={onDownloadPdf}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              Download PDF
            </button>
            <button onClick={onClear} className="text-sm font-semibold text-blue-600 hover:underline">
                Close Viewer
            </button>
          </div>
      </div>
      <div className="prose prose-sm max-w-none mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50 dark:prose-invert">
        {/* The 'prose' classes come from the @tailwindcss/typography plugin */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}