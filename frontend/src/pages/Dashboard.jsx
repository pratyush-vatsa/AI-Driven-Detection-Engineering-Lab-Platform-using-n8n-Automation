import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentMagnifyingGlassIcon, SunIcon, MoonIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import ScanHistory from '../components/ScanHistory';
import MarkdownViewer from '../components/MarkdownViewer';

const IconButton = ({ onClick, children, ariaLabel }) => (
    <button onClick={onClick} aria-label={ariaLabel} className="rounded-full p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200">
        {children}
    </button>
);

export default function Dashboard() {
    // --- State Management ---
    const [scans, setScans] = useState([]);
    const [selectedScanId, setSelectedScanId] = useState(null);
    const [markdownContent, setMarkdownContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const token = localStorage.getItem('token');
    const reportRef = useRef();

    // --- API Fetching ---
    const fetchScans = async () => {
        setIsLoadingList(true);
        setError('');
        try {
            const response = await fetch('/api/scans', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch scans.');
            const data = await response.json();
            setScans(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoadingList(false);
        }
    };

    const fetchScanContent = async (scanId) => {
        setIsLoadingContent(true);
        setMarkdownContent('');
        setError('');
        try {
            const response = await fetch(`/api/scans/${scanId}/report`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to load scan report.');
            const data = await response.json();
            setMarkdownContent(data.markdownReport);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoadingContent(false);
        }
    };

    // --- Effects ---
    useEffect(() => {
        fetchScans();
    }, []);

    useEffect(() => {
        if (selectedScanId) {
            fetchScanContent(selectedScanId);
        } else {
            setMarkdownContent('');
        }
    }, [selectedScanId]);

    // --- Handlers ---

    // ** THIS IS THE CORRECTED FUNCTION **
    const handleNewScan = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const target = e.target.target.value;
        const scanType = e.target.scanType.value;

        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ target, scanType })
            });

            if (!response.ok) {
                // If the server responds with an error, show it
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to start scan.');
            }
            
            // If successful, show a success message and refresh the history
            alert('Scan started successfully! The history will refresh shortly.');
            await fetchScans();

        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
// in Dashboard.js
const handleDownloadPdf = async (scanId) => {
  try {
    const res = await fetch(`/api/scans/${scanId}/report-pdf`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to download PDF");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${scanId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert(err.message);
  }
};


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            {/* Header remains the same */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/70 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800/70">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                     <div className="flex items-center gap-3">
                        <DocumentMagnifyingGlassIcon className="h-7 w-7 text-blue-600" />
                        <span className="text-xl font-bold tracking-tight">Pentest Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconButton onClick={toggleTheme} ariaLabel="Toggle theme">{theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}</IconButton>
                        <IconButton onClick={handleLogout} ariaLabel="Logout"><ArrowLeftOnRectangleIcon className="h-6 w-6" /></IconButton>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6">
                 {/* This Alert will now show any errors from the scan submission */}
                 {error && <Alert message={error} />}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start mt-4">
                    <Card className="lg:sticky lg:top-24">
                        <h2 className="text-xl font-bold tracking-tight">New Scan</h2>
                        <form onSubmit={handleNewScan} className="mt-6 space-y-4">
                            <Input name="target" placeholder="Target IP / Domain" required />
                            <Select name="scanType" required>
                                <option value="nmap">Nmap Scan</option>
                                <option value="nessus_basic">Nessus Basic</option>
                            </Select>
                            <Button type="submit" isLoading={isSubmitting}>
                                {isSubmitting ? 'Scanning...' : 'Start Scan'}
                            </Button>
                        </form>
                    </Card>
                    <div className="lg:col-span-2">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">Scan History</h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select a scan to view its report.</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                {isLoadingList ? (
                                    <div className="flex justify-center py-8"><Spinner /></div>
                                ) : (
                                    <ScanHistory
                                        scans={scans}
                                        selectedScanId={selectedScanId}
                                        onSelectScan={setSelectedScanId}
                                        onDownloadPdf={handleDownloadPdf} 
                                    />
                                )}
                            </div>
                            <div ref={reportRef}>
                                {isLoadingContent ? (
                                    <div className="flex justify-center py-8 mt-6 border-t dark:border-gray-700"><Spinner /></div>
                                ) : (
                                    <MarkdownViewer 
                                        markdownContent={markdownContent} 
                                        onClear={() => setSelectedScanId(null)}
                                        onDownloadPdf={() => selectedScanId && handleDownloadPdf(selectedScanId)}
                                    />
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    );
}