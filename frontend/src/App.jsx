// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
// We'll create AuthProvider and PrivateRoute soon
// import Signup from './pages/Signup';
// import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

// Placeholder for Auth, we will build this out
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Navigate to="/" />} /> {/* Redirect old login route */}
                <Route path="/signup" element={<Navigate to="/" />} /> {/* Redirect old signup route */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
    </ThemeProvider>
  );
}

export default App;