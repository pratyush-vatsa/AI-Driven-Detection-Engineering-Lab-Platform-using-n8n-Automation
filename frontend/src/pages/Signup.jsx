// frontend/src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import our new layout and existing UI components
import AuthFormLayout from '../components/layout/AuthFormLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Signup({ onSwitchToLogin, onClose }) {
  // --- All existing state and logic remains untouched ---
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        const errorData = await response.text();
        setError(errorData || 'Signup failed.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- The JSX is updated to use the new layout and styling ---
  return (
    <AuthFormLayout
      title="Create an Account"
      subtitle="Start your automated testing journey in minutes."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input name="name" placeholder="Full Name" required onChange={handleChange} />
          <Input name="email" type="email" placeholder="Email address" required onChange={handleChange} />
          <Input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} />
        </div>

        {error && <Alert message={error} type="error" />}

        <Button type="submit" isLoading={isLoading} className="w-full bg-sky-600 hover:bg-sky-500">
          Create Account
        </Button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
            Log in
          </button>
        </p>
      </form>
    </AuthFormLayout>
  );
}