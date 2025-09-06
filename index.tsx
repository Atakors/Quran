import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'; // Initialize i18next
import LoadingSpinner from './components/LoadingSpinner';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner size="lg" text="Loading..." /></div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);