import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function ScanHistory({ scans, onSelectScan, onDownloadPdf, selectedScanId }) {
  // Helper to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Scan Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Start Time</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">End Time</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Download</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800/50">
          {scans.map((scan) => (
            <tr
              key={scan._id}
              onClick={() => onSelectScan(scan._id)}
              className={`cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedScanId === scan._id ? 'bg-blue-100/50 dark:bg-blue-900/20' : ''}`}
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{scan.scanType}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{formatDate(scan.startTime)}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{formatDate(scan.endTime)}</td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when clicking the button
                    onDownloadPdf(scan._id);
                  }}
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
                  aria-label="Download PDF"
                >
                  <DocumentArrowDownIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}