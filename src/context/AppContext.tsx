import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Job } from '../types/job';
// Regex pattern for password validation (example)
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const API_URL = 'http://localhost:8000';

interface AuthContextState {
    refresh_token: string | null;
    isAuthenticated: boolean;
    isRecruiter: boolean;
    jobs: Job[];
    currentJobId: string;
    signup: (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
        address: string
    ) => Promise<boolean>;
    signin: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    createJobPosting: ({ job, refresh_token }: any) => Promise<{posting_link: string, success: boolean}>;
    getJobs: () => void;
    getJob: (jobId: string) => Promise<{job: Job | null, success: boolean}>;
    deleteJob: (jobId: string) => void;
    setCurrentJobId: (jobId: string) => void;
    updateJob: (job: Job) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const navigate = useNavigate();

    // Common States for Recruiter and Job Seeker
    const [refresh_token, setRefreshToken] = useState<string | null>(
        sessionStorage.getItem('refresh_token')
    );
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        sessionStorage.getItem('refresh_token') !== null
    );


    // Recruiter States
    const [isRecruiter, setIsRecruiter] = useState<boolean>(true);
    const [jobs, setJobs] = useState<Job[]>([]);

    const[currentJobId, setCurrentJobId] = useState<string>("");

    useEffect(() => {
        if (!refresh_token) {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [refresh_token]);


    // Auth functions
    // Signup function - Recruiter
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

    // Signup function - Job Seeker
    const signupJobSeeker = async (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
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
    }

    // Signin function - Both
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
        if (data['status'] == 200) {
            setRefreshToken(data['refresh_token']);
            sessionStorage.setItem('refresh_token', data['refresh_token']);
            setIsAuthenticated(true);
            toast.success('Signin successful!');
        } else {
            toast.error('Signin failed!');
            return false;
        }
        return true;
    };

    // Logout function - Both
    const logout = async () => {
        // Perform logout actions (e.g., invalidate session on backend)
        const response = await fetch(`${API_URL}/api/logout/`, {
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data['status'] != 200) {
            toast.error('Logout failed');
            console.error('Logout failed');
        } else {
            setRefreshToken(null);
            sessionStorage.removeItem('refresh_token');
            toast.success('Logout successful');
            navigate('/login');
            setIsAuthenticated(false);
        }
    };

    // ! Recruiter specific functions
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
            return {posting_link: data.posting_link, success: true};
        } else {
            toast.error('Job creation failed!');
            return {posting_link: '', success: false};
        }
    };

    // Return List of Jobs for Recruiter
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
// Return individual job for Recruiter
const getJob = async (jobId: string) => {
    const response = await fetch(`${API_URL}/api/postings/?id=${encodeURIComponent(jobId)}`, {
        method: 'GET',
        headers: {
            Authorization: `${refresh_token || ''}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.status === 200) {
        return { job: data.data[0], success: true };
    } else {
        toast.error('Failed to fetch job!');
        return { job: null, success: false };
    }
};


    // Update job for Recruiter
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
            toast.error('Failed to update job!');
            return false;

        }
    };

    // Delete job for Recruiter
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
            navigate('/jobs');
        } else {
            toast.error('Failed to delete job!');
        }
    }

    // Update Status of Job Application and send email to Job Seeker
    const updateJobApplication = async (jobId: number, applicationId: number, status: string) => {
        const response = await fetch(`${API_URL}/api/jobs/${jobId}/applications/${applicationId}/`, {
            method: 'PUT',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, email: ''})
        });

        const data = await response.json();
        if (data.status === 200) {
            toast.success('Job application updated successfully!');
        } else {
            toast.error('Failed to update job application!');
        }
    };

    // Update recruiter profile
    const updateRecruiterProfile = async (profile: any) => {
        const response = await fetch(`${API_URL}/api/recruiter/`, {
            method: 'PUT',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });

        const data = await response.json();
        if (data.status === 200) {
            toast.success('Profile updated successfully!');
        } else {
            toast.error('Failed to update profile!');
        }
    };


    // ! Candidate specific functions

    // Apply for a job on link
    // link would start with apply/ and then job id
    const applyForJob = async (jobId: number) => {
        const response = await fetch(`${API_URL}/api/apply/${jobId}/`, {
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.status === 200) {
            toast.success('Job application submitted successfully!');
        } else {
            toast.error('Failed to submit job application!');
        }
    };

    // Return List of Jobs for Candidate
    const getAppliedJobs = async () => {
        const response = await fetch(`${API_URL}/api/applied_jobs/`, {
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.status === 200) {
            setJobs(data.jobs);
        } else {
            toast.error('Failed to fetch jobs!');
        }
    };

    // Return individual job for Candidate
    const getAppliedJob = async (jobId: number) => {
        const response = await fetch(`${API_URL}/api/applied_jobs/${jobId}/`, {
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.status === 200) {
            return data.job;
        } else {
            toast.error('Failed to fetch job!');
        }
    };

    // Update candidate profile
    const updateCandidateProfile = async (profile: any) => {
        const response = await fetch(`${API_URL}/api/candidate/`, {
            method: 'PUT',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });

        const data = await response.json();
        if (data.status === 200) {
            toast.success('Profile updated successfully!');
        } else {
            toast.error('Failed to update profile!');
        }
    };

    // Accept or Reject Job Offer for Candidate
    const updateJobOffer = async (jobId: number, status: string) => {
        const response = await fetch(`${API_URL}/api/applied_jobs/${jobId}/`, {
            method: 'PUT',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        const data = await response.json();
        if (data.status === 200) {
            toast.success('Job offer updated successfully!');
        } else {
            toast.error('Failed to update job offer!');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                refresh_token,
                isAuthenticated,
                isRecruiter,
                jobs,
                currentJobId,
                setCurrentJobId,
                signup,
                signin,
                logout,
                createJobPosting,
                getJobs,
                getJob,
                deleteJob,
                updateJob,
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
