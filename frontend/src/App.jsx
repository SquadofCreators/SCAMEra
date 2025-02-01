import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Analytics from './pages/Analytics';
import Trends from './pages/Trends';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function ProtectedRoute({ element, ...rest }) {
  const { isLoggedIn } = useAuth();
  // If not logged in, redirect to login page
  return isLoggedIn ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <div className="bg-gray-900 text-white">
        <Router>
          <Routes>
            {/* MainLayout Route */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<ProtectedRoute element={<Home />} />} />
              <Route path="analyze" element={<ProtectedRoute element={<Analyze />} />} />
              <Route path="analytics" element={<ProtectedRoute element={<Analytics />} />} />
              <Route path="trends" element={<ProtectedRoute element={<Trends />} />} />
              <Route path="settings" element={<ProtectedRoute element={<Settings />} />} />
              <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
            </Route>

            {/* Login Route */}
            <Route path="login" element={<Login />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
