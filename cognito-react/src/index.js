import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AnnouncementProvider } from './context/AnnouncementContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnnouncementProvider>
      <App />
    </AnnouncementProvider>
  </React.StrictMode>
);

reportWebVitals();
