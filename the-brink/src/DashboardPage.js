import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-page" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome, {user.firstName} ({user.role})</h1>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => navigate('/profile')} style={{ marginRight: '1rem' }}>
          Profile
        </button>
        {user.role === 'admin' && (
          <>
            <button onClick={() => navigate('/admin-view')} style={{ marginRight: '1rem' }}>
              Admin Panel
            </button>
            <button onClick={() => navigate('/admin-announcements')} style={{ marginRight: '1rem' }}>
              Admin Announcements
            </button>
          </>
        )}
        <button onClick={() => { logout(); navigate('/login'); }}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

