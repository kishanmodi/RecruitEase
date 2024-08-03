import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import {AuthProvider} from './context/AppContext';
import './css/style.css';
import {Toaster} from 'react-hot-toast';

import 'flatpickr/dist/flatpickr.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <Toaster
                    toastOptions={{
                        style: {
                            background: '#ffffff',  // Pure white background
                            color: '#333333',      // Dark gray text for a softer contrast
                            width: '100%',
                            maxWidth: '350px',     // Narrower maxWidth for a sleeker look
                            padding: '10px 15px', // Reduced padding with horizontal padding for balance
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  // Equal shadow values
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        },
                    }}
                />


                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
