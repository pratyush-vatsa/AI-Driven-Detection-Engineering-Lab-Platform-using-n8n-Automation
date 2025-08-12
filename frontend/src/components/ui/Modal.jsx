import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  // Return null if the modal is not open
  if (!isOpen) return null;

  // Effect to handle the 'Escape' key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    // Cleanup the event listener on component unmount
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    // Backdrop with fade-in animation
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity duration-300 animate-in fade-in"
      aria-modal="true"
      role="dialog"
    >
      {/* Modal content container with slide-in animation */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        className="relative w-full max-w-md rounded-xl bg-white shadow-xl animate-in fade-in-90 slide-in-from-bottom-10 dark:bg-slate-900"
      >
        {children}
      </div>
    </div>
  );
}