// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
// We'll create AuthProvider and PrivateRoute soon
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Placeholder for Auth, we will build this out
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    // Removed <Router> to avoid nesting
    <ThemeProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                    <Dashboard />
                    </PrivateRoute>
                }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    </ThemeProvider>
  );
}

export default App;