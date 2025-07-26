// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // This is the new, correct handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Send the real login request to your backend API
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData) // Send the user's email and password
            });

            if (response.ok) {
                // If the backend says credentials are valid...
                const { token } = await response.json(); // Get the real JWT
                localStorage.setItem('token', token);   // Store it
                navigate('/dashboard');                 // Go to the dashboard
            } else {
                // If the backend says credentials are bad...
                const errorData = await response.text();
                setError(errorData || 'Invalid email or password.');
            }
        } catch (err) {
            // If the fetch itself fails (e.g., server is down)
            setError('Could not connect to the server. Please try again later.');
        } finally {
            // This always runs, ensuring the spinner stops
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Log in to your account">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required onChange={handleChange} value={formData.email} />
                </div>
                <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" required onChange={handleChange} value={formData.password} />
                </div>

                <Alert message={error} type="error" />

                <Button type="submit" isLoading={isLoading}>
                    Sign In
                </Button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}