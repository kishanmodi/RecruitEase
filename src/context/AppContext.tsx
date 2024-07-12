import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Job } from '../types/job';
// Regex pattern for password validation (example)
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const API_URL = 'http://localhost:8000';

// Define the shape of the context state and actions
interface AuthContextState {
    csrf_token: string | null;
    isAuthenticated: boolean;
    isRecruiter: boolean;
    signup: (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
        address: string
    ) => Promise<boolean>;
    signin: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    createJobPosting: (job: Job) => Promise<boolean>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [csrf_token, setcsrf_token] = useState<string | null>(
        sessionStorage.getItem('csrf_token')
    );
    const navigate = useNavigate();
    const [isRecruiter, setIsRecruiter] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        sessionStorage.getItem('csrf_token') !== null
    );
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        if (!csrf_token) {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [csrf_token]);

    const signup = async (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
        address: string
    ) => {
        // Password validation
        if (!passwordRegex.test(password)) {
            toast.error(
                'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character!'
            );
            return false;
        }

        // Password confirmation
        if (password !== retypePassword) {
            toast.error('Passwords do not match!');
            return false;
        }

        // Perform signup request to backend
        const response = await fetch(`${API_URL}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password: password,
                name,
                address
            })
        });

        if (response.ok) {
            toast.success('Signup successful!');
            navigate('/login');
        } else {
            // Handle errors
            toast.error('Signup failed!');
            return false;
        }
        return true;
    };

    const signin = async (email: string, password: string) => {
        // Perform signin request to backend
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();

            setcsrf_token(data.csrf_token);
            sessionStorage.setItem('csrf_token', data.csrf_token);
            setIsAuthenticated(true);
            toast.success('Signin successful!');
        } else {
            toast.error('Signin failed!');
            return false;
        }
        return true;
    };

    const logout = async () => {
        // Perform logout actions (e.g., invalidate session on backend)
        console.log(csrf_token);
        const response = await fetch(`${API_URL}/api/logout/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token || '',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            toast.error('Logout failed');
            console.error('Logout failed');
        } else {
            setcsrf_token(null);
            sessionStorage.removeItem('csrf_token');
            toast.success('Logout successful');
            navigate('/login');
            setIsAuthenticated(false);
        }
    };

    const createJobPosting = async (job: Job) => {
        const response = await fetch(`${API_URL}/api/new_posting/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        });

        if (response.status === 201) {
            toast.success('Job created successfully!');
            return true;
        } else {
            toast.error('Job creation failed!');
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                csrf_token,
                isAuthenticated,
                isRecruiter,
                signup,
                signin,
                logout,
                createJobPosting
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
