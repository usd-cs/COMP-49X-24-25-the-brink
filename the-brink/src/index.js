import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './AuthContext';    // ← import this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>                           {/* ← wrap your whole App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

