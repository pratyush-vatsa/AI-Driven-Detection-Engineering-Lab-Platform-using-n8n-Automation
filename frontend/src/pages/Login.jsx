// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import our new layout and existing UI components
import AuthFormLayout from '../components/layout/AuthFormLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Login({ onSwitchToSignup, onClose }) {
  // --- All existing state and logic remains untouched ---
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        const errorData = await response.text();
        setError(errorData || 'Invalid email or password.');
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
      title="Welcome Back"
      subtitle="Log in to continue to the platform."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input id="email" name="email" type="email" placeholder="you@example.com" required onChange={handleChange} value={formData.email} />
          <Input id="password" name="password" type="password" placeholder="••••••••" required onChange={handleChange} value={formData.password} />
        </div>

        {error && <Alert message={error} type="error" />}

        <Button type="submit" isLoading={isLoading} className="w-full bg-sky-600 hover:bg-sky-500">
          Sign In
        </Button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignup} className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
            Sign up
          </button>
        </p>
      </form>
    </AuthFormLayout>
  );
}