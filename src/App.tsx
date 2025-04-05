import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuthStore();
  
  // Apply dark mode from localStorage on initial load
  useEffect(() => {
    const isDarkMode = localStorage.getItem('nova-settings-storage')
      ? JSON.parse(localStorage.getItem('nova-settings-storage') || '{}').state?.darkMode
      : false;
      
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;