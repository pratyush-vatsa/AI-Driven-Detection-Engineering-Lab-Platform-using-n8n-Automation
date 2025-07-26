// frontend/src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Signup() {
    // 1. Add state to hold the form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // This function updates the state as the user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. This is the complete, working handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setIsLoading(true);   // Show a spinner on the button
        setError('');       // Clear any previous errors

        // Basic validation: check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false); // Stop loading
            return; // End the function here
        }

        try {
            // Send the data to the backend API
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: formData.name, 
                    email: formData.email, 
                    password: formData.password 
                })
            });

            if (response.ok) {
                // If signup was successful...
                const { token } = await response.json();
                localStorage.setItem('token', token); // Save the token
                navigate('/dashboard'); // Redirect to the dashboard
            } else {
                // If the server responded with an error...
                const errorData = await response.text();
                setError(errorData || 'Signup failed. Please try again.');
            }
        } catch (err) {
            // If there's a network error (e.g., backend is down)
            setError('Could not connect to the server. Please check your connection.');
        } finally {
            // This runs whether the request succeeded or failed
            setIsLoading(false); // Hide the spinner
        }
    };

    return (
        <AuthLayout title="Create a new account">
            {/* 3. Link the onSubmit and add onChange to the inputs */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <Alert message={error} type="error" />
                <div className="space-y-4">
                    <Input name="name" placeholder="Full Name" required onChange={handleChange} />
                    <Input name="email" type="email" placeholder="Email address" required onChange={handleChange} />
                    <Input name="password" type="password" placeholder="Password" required onChange={handleChange} />
                    <Input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} />
                </div>
                <Button type="submit" isLoading={isLoading}>
                    Create Account
                </Button>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                        Log in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}