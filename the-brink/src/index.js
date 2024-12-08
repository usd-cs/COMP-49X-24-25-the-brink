import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure App is properly exported in App.js
import './index.css'; // Optional styling

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure index.html has <div id="root">
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
