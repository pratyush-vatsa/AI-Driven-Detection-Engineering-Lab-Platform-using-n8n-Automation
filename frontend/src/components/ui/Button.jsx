import clsx from 'clsx';
import Spinner from './Spinner';

export default function Button({ 
    children, 
    className, 
    variant = 'primary',
    isLoading = false, 
    ...props 
}) {
    const baseClasses = "inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70";
    
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-900",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus-visible:ring-offset-gray-900",
    };

    return (
        <button 
            className={clsx(baseClasses, variants[variant], className)} 
            disabled={isLoading} 
            {...props}
        >
            {isLoading ? <Spinner /> : children}
        </button>
    );
}