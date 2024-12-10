import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter(
  { children: <App /> },
  { future: { v7_startTransition: true, v7_relativeSplatPath: true } } // Enable future flags
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter router={router}>
    <App />
  </BrowserRouter>
);
