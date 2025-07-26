export default function Select({ name, children, ...props }) {
    return (
        <select
            name={name}
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 transition duration-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-800"
            {...props}
        >
            {children}
        </select>
    );
}