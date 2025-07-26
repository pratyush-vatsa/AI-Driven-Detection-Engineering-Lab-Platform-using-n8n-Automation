import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default function Alert({ message, type = 'error' }) {
    if (!message) return null;

    const styles = {
        error: {
            container: 'bg-red-50 dark:bg-red-900/20',
            icon: 'text-red-500',
            message: 'text-red-800 dark:text-red-200',
        },
        success: {
            container: 'bg-green-50 dark:bg-green-900/20',
            icon: 'text-green-500',
            message: 'text-green-800 dark:text-green-200',
        },
    };

    const config = styles[type];
    const Icon = type === 'error' ? ExclamationTriangleIcon : InformationCircleIcon;

    return (
        <div className={clsx('flex items-start rounded-lg p-4', config.container)}>
            <Icon className={clsx('h-5 w-5 flex-shrink-0', config.icon)} aria-hidden="true" />
            <div className="ml-3">
                <p className={clsx('text-sm font-medium', config.message)}>
                    {message}
                </p>
            </div>
        </div>
    );
}