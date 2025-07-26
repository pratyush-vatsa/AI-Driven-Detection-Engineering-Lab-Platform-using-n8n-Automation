export default function Card({ children, className = '' }) {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 ${className}`}>
            {children}
        </div>
    );
}