import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AppContext';
import './css/style.css';
import { Toaster } from 'react-hot-toast';

import 'flatpickr/dist/flatpickr.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <Toaster />
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
