import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Job } from '../types/job';

// Regex pattern for password validation
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const API_URL = 'http://localhost:8000';

// Auth context interface
interface AuthContextState {
    refresh_token: string | null;
    isAuthenticated: boolean;
    isRecruiter: boolean;
    jobs: Job[];
    currentJobId: string;
    user: string;
    company: string;
    applyJobId: string;
    setApplyJobId: (jobId: string) => void;
    signup: (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
        address: string
    ) => Promise<boolean>;
    signupJobSeeker: (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
    ) => Promise<boolean>;
    signin: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    createJobPosting: ({ job, refresh_token }: any) => Promise<{ posting_link: string, success: boolean }>;
    getJobs: () => void;
    getJob: (jobId: string) => Promise<{ job: Job | null, success: boolean }>;
    deleteJob: (jobId: string) => void;
    setCurrentJobId: (jobId: string) => void;
    updateJob: (job: Job) => Promise<boolean>;
    getPostData: (jobId: string) => Promise<{ job: Job | null, success: boolean }>;
}

// Create Auth context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    // Common hooks
    const navigate = useNavigate();

    // Common States for Recruiter and Job Seeker
    const [refresh_token, setRefreshToken] = useState<string | null>(sessionStorage.getItem('refresh_token'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(sessionStorage.getItem('refresh_token') !== null);
    const [user, setUser] = useState<string>(sessionStorage.getItem('user') || "");
    const [company, setCompany] = useState<string>(sessionStorage.getItem('company') || "");
    const [isRecruiter, setIsRecruiter] = useState<boolean>(sessionStorage.getItem('isRecruiter') === 'true');

    // Recruiter specific states
    const [jobs, setJobs] = useState<Job[]>([]);
    const [currentJobId, setCurrentJobId] = useState<string>("");

    // Job Seeker specific states
    const [applyJobId, setApplyJobId] = useState<string>("");

    // Effect to handle navigation based on token
    useEffect(() => {
        if (!refresh_token) {
            setIsAuthenticated(false);
        }
    }, [refresh_token]);

    // Function to handle signup for Recruiter
    const signup = async (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
        address: string
    ) => {
        // Password validation
        if (!passwordRegex.test(password)) {
            toast.error('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character!');
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
            body: JSON.stringify({ email, password, name, address })
        });

        if (response.ok) {
            toast.success('Signup successful!');
            navigate('/login');
            return true;
        } else {
            toast.error('Signup failed!');
            return false;
        }
    };

    // Function to handle signup for Job Seeker
    const signupJobSeeker = async (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
    ) => {
        // Password validation
        if (!passwordRegex.test(password)) {
            toast.error('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character!');
            return false;
        }

        // Password confirmation
        if (password !== retypePassword) {
            toast.error('Passwords do not match!');
            return false;
        }

        // Perform signup request to backend
        const response = await fetch(`${API_URL}/api/candidate/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        });

        if (response.status === 201) {
            toast.success('Signup successful!');
            navigate('/login');
            return true;
        } else {
            toast.error('Signup failed!');
            return false;
        }
    }

    // Function to handle signin for both Recruiter and Job Seeker
    const signin = async (email: string, password: string) => {
        // Perform signin request to backend
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.status === 200) {
            setRefreshToken(data.refresh_token);
            sessionStorage.setItem('refresh_token', data.refresh_token);
            setIsAuthenticated(true);
            setIsRecruiter(data.is_company);
            sessionStorage.setItem('isRecruiter', data.is_company.toString());

            if (data.is_company) {
                setCompany(data.name);
                sessionStorage.setItem('company', data.name);
            } else {
                setUser(data.name);
                sessionStorage.setItem('user', data.name);

                if (applyJobId) {
                    toast.success('Signin successful!');
                    navigate(`/apply/${applyJobId}`);
                    return true;
                }
            }

            toast.success('Signin successful!');
            return true;
        } else {
            toast.error('Signin failed!');
            return false;
        }
    };

    // Function to handle logout for both Recruiter and Job Seeker
    const logout = async () => {
        const logoutApi = isRecruiter ? '/api/logout/' : '/api/candidate/logout/';
        const response = await fetch(`${API_URL}${logoutApi}`, {
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.status !== 200) {
            toast.error('Logout failed');
        } else {
            // Clear session storage and state
            sessionStorage.removeItem('refresh_token');
            sessionStorage.removeItem('isRecruiter');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('company');
            setRefreshToken(null);
            setIsAuthenticated(false);
            setIsRecruiter(false);
            setUser("");
            setCompany("");
            toast.success('Logout successful');
            navigate('/login');
        }
    };

    // Function to create a new job posting for Recruiter
    const createJobPosting = async ({ job, refresh_token }: any) => {
        const response = await fetch(`${API_URL}/api/new_posting/`, {
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        });

        const data = await response.json();
        if (data.status === 201) {
            toast.success('Job created successfully!');
            return { posting_link: data.posting_link, success: true };
        } else {
            toast.error('Job creation failed!');
            return { posting_link: '', success: false };
        }
    };

    // Function to fetch all jobs for Recruiter
    const getJobs = async () => {
        const response = await fetch(`${API_URL}/api/postings/`, {
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.status === 200) {
            setJobs(data.data);
        } else {
            toast.error('Failed to fetch jobs!');
        }
    };

    // Function to fetch a single job by ID for Recruiter
    const getJob = async (jobId: string) => {
        const response = await fetch(`${API_URL}/api/postings/?id=${encodeURIComponent(jobId)}`, {
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.status === 200) {
            return { job: data.data, success: true };
        } else {
            toast.error('Failed to fetch job!');
            return { job: null, success: false };
        }
    };


    // Function to fetch a single job by ID for Job Seeker
    const getPostData = async (jobId: string) => {
        const response = await fetch(`${API_URL}/api/apply/${encodeURIComponent(jobId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.status === 200) {
            return { job: data.data, success: true };
        } else {
            toast.error('Failed to fetch job!');
            return { job: null, success: false };
        }
    };

    // Function to update a job for Recruiter
    const updateJob = async (job: Job) => {
        const response = await fetch(`${API_URL}/api/update_posting/`, {
            method: 'PUT',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        });

        const data = await response.json();
        if (data.status === 200) {
            toast.success('Job updated successfully!');
            return true;
        } else {
            toast.error('Job update failed!');
            return false;
        }
    };

    // Function to delete a job by ID for Recruiter
    const deleteJob = async (jobId: string) => {
        const response = await fetch(`${API_URL}/api/delete_posting/`, {
            method: 'DELETE',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: jobId })
        });

        const data = await response.json();
        if (data.status === 200) {
            toast.success('Job deleted successfully!');
            getJobs();
            navigate('/jobs');
        } else {
            toast.error('Job deletion failed!');
        }
    };

    // Provide the context to children components
    return (
        <AuthContext.Provider value={{
            refresh_token,
            isAuthenticated,
            isRecruiter,
            jobs,
            currentJobId,
            user,
            company,
            applyJobId,
            setApplyJobId,
            signup,
            signupJobSeeker,
            signin,
            logout,
            createJobPosting,
            getJobs,
            getJob,
            deleteJob,
            setCurrentJobId,
            updateJob,
            getPostData,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
