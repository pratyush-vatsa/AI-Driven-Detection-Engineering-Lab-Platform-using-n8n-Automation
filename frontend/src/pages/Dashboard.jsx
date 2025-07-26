// frontend/src/pages/Dashboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentMagnifyingGlassIcon, SunIcon, MoonIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas'; // Keep this import

const IconButton = ({ onClick, children, ariaLabel }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
    >
        {children}
    </button>
);

export default function Dashboard() {
    const [scanResult, setScanResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formInput, setFormInput] = useState({ target: '', scanType: 'nmap' });
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInput(prev => ({ ...prev, [name]: value }));
    };

    const handleScan = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setScanResult(null);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ target: formInput.target, scanType: formInput.scanType })
            });
            if (response.ok) {
                const result = await response.json();
                setScanResult(result);
            } else {
                const errorData = await response.text();
                setError(errorData || 'Scan failed.');
                if (response.status === 401) { navigate('/login'); }
            }
        } catch (err) {
            setError('An error occurred during the scan. Is the server running?');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        setError('');
        const element = document.getElementById('report-content');
        if (!element) {
            setError('Error: Could not find report content element.');
            return;
        }

        // The critical fix: Attach the new html2canvas to the window object
        window.html2canvas = html2canvas;

        const opt = {
            margin: 0.5,
            filename: `pentest-report-${Date.now()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save().catch(err => {
            console.error('Error during PDF generation:', err);
            setError(`Failed to generate PDF. Error: ${err.message}`);
        });
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/70 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800/70">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <DocumentMagnifyingGlassIcon className="h-7 w-7 text-blue-600" />
                        <span className="text-xl font-bold tracking-tight">Pentest Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconButton onClick={toggleTheme} ariaLabel="Toggle theme">
                            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                        </IconButton>
                        <IconButton onClick={handleLogout} ariaLabel="Logout">
                            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                        </IconButton>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
                    <Card className="lg:sticky lg:top-24">
                        <h2 className="text-xl font-bold tracking-tight">New Scan</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start a new security scan.</p>
                        <form onSubmit={handleScan} className="mt-6 space-y-4">
                            <Input name="target" placeholder="Target IP / Domain" required value={formInput.target} onChange={handleInputChange} />
                            <Select name="scanType" required value={formInput.scanType} onChange={handleInputChange}>
                                <option value="nmap">Nmap Scan</option>
                                <option value="nessus_basic">Nessus Basic</option>
                                <option value="nessus_advanced">Nessus Advanced</option>
                                <option value="nessus_web">Nessus Web App</option>
                            </Select>
                            <Button type="submit" isLoading={isLoading}>{isLoading ? 'Scanning...' : 'Start Scan'}</Button>
                        </form>
                    </Card>

                    <div className="lg:col-span-2">
                        <Card>
                            <h2 className="text-xl font-bold tracking-tight">Results</h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View scan output below.</p>
                            <div id="report-content" className="mt-6 min-h-[300px] rounded-lg bg-gray-100 p-6 dark:bg-gray-900">
                                {isLoading && <div className="flex h-full items-center justify-center"><Spinner /></div>}
                                {error && !isLoading && <Alert message={error} type="error" />}
                                {scanResult && !isLoading && (
                                    <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                                        <ReactMarkdown>{scanResult.markdownReport}</ReactMarkdown>
                                    </div>
                                )}
                                {!scanResult && !isLoading && !error && (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-gray-500">Scan results will appear here.</p>
                                    </div>
                                )}
                            </div>
                            {scanResult && !isLoading && (
                                <div className="mt-4">
                                    <Button onClick={handleDownload} variant="secondary" className="w-auto">Download PDF Report</Button>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </main>
        </>
    );
}