// frontend/src/components/layout/AuthLayout.jsx
import Card from '../ui/Card';

export default function AuthLayout({ title, children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Pentest Platform</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{title}</p>
                </div>
                <Card>{children}</Card>
            </div>
        </div>
    );
}