import React,{createContext,useState,useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {Job} from '../types/job';
import {Application} from '../types/application';

// Regex pattern for password validation
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const API_URL = 'http://localhost:8000';

// Auth context interface
interface AuthContextState {
    refresh_token: string | null;
    isAuthenticated: boolean;
    isRecruiter: boolean;
    email: string;
    jobs: Job[];
    currentJobId: string;
    user: string;
    company: string;
    applyJobId: string;
    didEmailSend: boolean;
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
    signin: (email: string,password: string) => Promise<boolean>;
    logout: () => void;
    createJobPosting: ({job,refresh_token}: any) => Promise<{posting_link: string,success: boolean}>;
    getJobs: () => void;
    getJob: (jobId: string) => Promise<{job: Job | null,success: boolean}>;
    deleteJob: (jobId: string) => void;
    setCurrentJobId: (jobId: string) => void;
    updateJob: (job: Job) => Promise<boolean>;
    getPostData: (jobId: string) => Promise<{job: Job | null,success: boolean}>;
    forgotPassword: (email: string) => Promise<boolean>;
    resetPassword: (email: string,otp: number,password: string,retypePassword: string) => Promise<boolean>;
    applyJob: (filledDetails: Application) => Promise<boolean>;
    getJobApplicationC: (id?: string) => Promise<{applications: any,success: boolean}>;
    getAllCandidateApplications: (id?: string) => Promise<{applications: any,success: boolean}>;
    updateApplicationStatus: (applicationId: string,status: string,offer: any) => Promise<boolean>;
    sendEmailToCandidate: (id: string,subject: string,message: string) => Promise<boolean>;
    getProfileData: () => Promise<{profile: any,success: boolean}>;
    saveProfileData: (profile: any) => Promise<boolean>;
    getProfileDataRecruiter: () => Promise<{profile: any,success: boolean}>;
    saveProfileDataRecruiter: (profile: any) => Promise<boolean>;
    getRecentJobs: () => Promise<{jobs: Job[],success: boolean}>;
}

// Create Auth context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {

    // Common hooks
    const navigate = useNavigate();

    // Common States for Recruiter and Job Seeker
    const [refresh_token,setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));
    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(localStorage.getItem('refresh_token') !== null);
    const [user,setUser] = useState<string>(localStorage.getItem('user') || "");
    const [company,setCompany] = useState<string>(localStorage.getItem('company') || "");
    const [email,setEmail] = useState<string>(localStorage.getItem('email') || "");
    const [didEmailSend,setDidEmailSend] = useState<boolean>(localStorage.getItem('didEmailSend') !== null);
    const [isRecruiter,setIsRecruiter] = useState<boolean>(localStorage.getItem('isRecruiter') === 'true');

    // Recruiter specific states
    const [jobs,setJobs] = useState<Job[]>([]);
    const [currentJobId,setCurrentJobId] = useState<string>("");

    // Job Seeker specific states
    const [applyJobId,setApplyJobId] = useState<string>("");

    // Effect to handle navigation based on token
    useEffect(() => {
        console.log(refresh_token);
        if(!refresh_token) {
            setIsAuthenticated(false);
        }
    },[refresh_token]);

    // Function to handle signup for Recruiter
    const signup = async (
        email: string,
        password: string,
        retypePassword: string,
        name: string,
        address: string
    ) => {
        // Password validation
        if(!passwordRegex.test(password)) {
            toast.error('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character!');
            return false;
        }

        // Password confirmation
        if(password !== retypePassword) {
            toast.error('Passwords do not match!');
            return false;
        }

        // Perform signup request to backend
        const response = await fetch(`${API_URL}/api/register/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password,name,address})
        });

        if(response.ok) {
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
        if(!passwordRegex.test(password)) {
            toast.error('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character!');
            return false;
        }

        // Password confirmation
        if(password !== retypePassword) {
            toast.error('Passwords do not match!');
            return false;
        }

        // Perform signup request to backend
        const response = await fetch(`${API_URL}/api/candidate/register/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password,name})
        });

        if(response.status === 201) {
            toast.success('Signup successful!');
            navigate('/login');
            return true;
        } else {
            toast.error('Signup failed!');
            return false;
        }
    }

    // Function to handle signin for both Recruiter and Job Seeker
    const signin = async (email: string,password: string) => {
        // Perform signin request to backend
        const response = await fetch(`${API_URL}/login/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });

        const data = await response.json();
        if(data.status === 200) {
            setRefreshToken(data.refresh_token);
            localStorage.setItem('refresh_token',data.refresh_token);
            setIsAuthenticated(true);
            setIsRecruiter(data.is_company);
            localStorage.setItem('isRecruiter',data.is_company.toString());

            if(data.is_company) {
                setCompany(data.name);
                localStorage.setItem('company',data.name);
            } else {
                setUser(data.name);
                localStorage.setItem('user',data.name);

                if(applyJobId) {
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
        const response = await fetch(`${API_URL}${logoutApi}`,{
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status !== 200) {
            toast.error('Logout failed');
        } else {
            // Clear session storage and state
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('isRecruiter');
            localStorage.removeItem('user');
            localStorage.removeItem('company');
            setRefreshToken(null);
            setIsAuthenticated(false);
            setIsRecruiter(false);
            setUser("");
            setCompany("");
            toast.success('Logout successful');
            navigate('/login');
        }
    };

    // Function to Forgot Password for both Recruiter and Job Seeker
    const forgotPassword = async (email: string) => {
        // Perform forgot password request to backend
        const response = await fetch(`${API_URL}/forgot_password/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });

        const data = await response.json();
        if(data.status === 200) {
            toast.success('OTP has been sent to your email!');
            setEmail(email);
            setDidEmailSend(true);
            localStorage.setItem('didEmailSend','true');
            localStorage.setItem('email',email);
            // Expire Session after 5 minutes
            setTimeout(() => {
                if(localStorage.getItem('didEmailSend') && localStorage.getItem('email')) {
                    localStorage.removeItem('email');
                    localStorage.removeItem('didEmailSend');
                }
            },300000);
            return true;
        } else {
            setEmail('');
            setDidEmailSend(false);
            localStorage.removeItem('didEmailSend');
            localStorage.removeItem('email');
            toast.error('Failed to send password reset link!');
            return false;
        }
    }

    const resetPassword = async (email: string,otp: number,password: string,retypePassword: string) => {
        // Password validation
        if(!passwordRegex.test(password)) {
            toast.error('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character!');
            return false;
        }

        // Password confirmation
        if(password !== retypePassword) {
            toast.error('Passwords do not match!');
            return false;
        }

        // Perform reset password request to backend
        const response = await fetch(`${API_URL}/reset_password/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,otp,password})
        });

        const data = await response.json();
        if(data.success) {
            toast.success('Password reset successful!');
            setEmail('');
            setDidEmailSend(false);
            localStorage.removeItem('didEmailSend');
            localStorage.removeItem('email');
            navigate('/login');
            return true;
        } else {
            toast.error('Password reset failed!');
            setEmail('');
            setDidEmailSend(false);
            localStorage.removeItem('didEmailSend');
            localStorage.removeItem('email');
            return false;
        }
    }

    // Function to create a new job posting for Recruiter
    const createJobPosting = async ({job,refresh_token}: any) => {
        const response = await fetch(`${API_URL}/api/new_posting/`,{
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        });

        const data = await response.json();
        if(data.status === 201) {
            toast.success('Job created successfully!');
            return {posting_link: data.posting_link,success: true};
        } else {
            toast.error('Job creation failed!');
            return {posting_link: '',success: false};
        }
    };

    // Function to fetch all jobs for Recruiter
    const getJobs = async () => {
        const response = await fetch(`${API_URL}/api/postings/`,{
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            setJobs(data.data);
        } else {
            toast.error('Failed to fetch jobs!');
        }
    };

    // Function to fetch a single job by ID for Recruiter
    const getJob = async (jobId: string) => {
        const response = await fetch(`${API_URL}/api/postings/?id=${encodeURIComponent(jobId)}`,{
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            return {job: data.data,success: true};
        } else {
            toast.error('Failed to fetch job!');
            return {job: null,success: false};
        }
    };


    // Function to fetch a single job by ID for Job Seeker
    const getPostData = async (jobId: string) => {
        const response = await fetch(`${API_URL}/api/apply/${encodeURIComponent(jobId)}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            return {job: data.data,success: true};
        } else {
            toast.error('Failed to fetch job!');
            return {job: null,success: false};
        }
    };

    // Function to delete a job by ID for Recruiter
    const deleteJob = async (jobId: string) => {
        const response = await fetch(`${API_URL}/api/delete_posting/`,{
            method: 'DELETE',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: jobId})
        });

        const data = await response.json();
        if(data.status === 200) {
            toast.success('Job deleted successfully!');
            getJobs();
            navigate('/jobs');
        } else {
            toast.error('Job deletion failed!');
        }
    };

    // Function to update a job for Recruiter
    const updateJob = async (job: Job) => {
        const response = await fetch(`${API_URL}/api/update_posting/`,{
            method: 'PUT',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        });

        const data = await response.json();
        if(data.status === 200) {
            toast.success('Job updated successfully!');
            return true;
        } else {
            toast.error('Job update failed!');
            return false;
        }
    };
    // Function to apply for a job by ID for Job Seeker
    const applyJob = async (filledDetails: Application): Promise<boolean> => {
        try {
            // Convert resume to Base64 string
            const convertFileToBase64 = (file: File): Promise<string> => {
                return new Promise((resolve,reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        if(reader.result) {
                            resolve(reader.result.toString());
                        } else {
                            reject('Error reading file');
                        }
                    };
                    reader.onerror = () => {
                        reject('Error reading file');
                    };
                });
            };

            // Convert the resume and update filledDetails
            if(filledDetails.resume) {
                filledDetails.resume = await convertFileToBase64(filledDetails.resume);
            }

            // Send the application details to the server
            const response = await fetch(`${API_URL}/api/candidate/new_application/`,{
                method: 'POST',
                headers: {
                    'Authorization': refresh_token || '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filledDetails)
            });

            const data = await response.json();

            if(data.status === 201) {
                toast.success('Thank you for applying to this job!');
                navigate('/');
                return true;
            } else {
                toast.error(data.error || 'Failed to apply to this job!');
                return false;
            }
        } catch(error) {
            console.error('Error applying to job:',error);
            toast.error('There was an error applying to this job!');
            return false;
        }
    };



    // Function to get all applied job applications for candidate // ! Candidate
    const getJobApplicationC = async (id?: string) => {
        let query = '';
        if(id) {
            query = `?application_id=${id}`;
        }
        const response = await fetch(`${API_URL}/api/candidate/applications${query}`,{
            method: 'GET',
            headers: {
                'Authorization': refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            if(id) {
                return {applications: data.data[0],success: true};
            } else {
                return {applications: data.data,success: true};
            }
        } else {
            toast.error('Failed to fetch job applications!');
            return {applications: [],success: false};
        }
    }


    // Function to get all job applications for candidate // ! Recruiter
    const getAllCandidateApplications = async (id?: string) => {
        let query = ``;
        if(id) {
            query = `?application_id=${id}`;
        }

        const response = await fetch(`${API_URL}/api/applications/${query}`,{
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            return {applications: data.data,success: true};
        } else {
            toast.error('Failed to fetch applications!');
            return {applications: [],success: false};
        }
    }

    // Function to Update Status of a job application by ID for recruiter // ! Recruiter
    const updateApplicationStatus = async (applicationId: string,status: string,offer: File) => {

        // Convert resume to Base64 string
        const convertFileToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    if(reader.result) {
                        // Extract base64 part from data URL
                        const dataUrl = reader.result.toString();
                        const base64 = dataUrl.split(',')[1];
                        resolve(base64);
                    } else {
                        reject('Error reading file');
                    }
                };
                reader.onerror = () => {
                    reject('Error reading file');
                };
            });
        };

        // Usage example
        let offerLetter = "";
        if(offer) {
            offerLetter = await convertFileToBase64(offer);
        }

        const response = await fetch(`${API_URL}/api/change_status/`,{
            method: 'PUT',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: applicationId,status,offer: offerLetter})
        });

        const data = await response.json();
        if(data.status === 200) {
            toast.success('Application status updated successfully!');
            return true;
        } else {
            toast.error('Failed to update application status!');
            return false;
        }
    }

    // Function to send email to candidate for recruiter // ! Recruiter
    const sendEmailToCandidate = async (id: string,subject: string,message: string) => {
        const response = await fetch(`${API_URL}/api/send_email/`,{
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,subject,message})
        });

        const data = await response.json();
        if(data.status === 200) {
            toast.success('Email sent successfully!');
            return true;
        } else {
            toast.error('Failed to send email!');
            return false;
        }
    }

    // Function to get profile data for candidate // ! Candidate
    const getProfileData = async () => {
        const response = await fetch(`${API_URL}/api/candidate/get_profile/`,{
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            return {profile: data.data,success: true};
        } else {
            toast.error('Failed to fetch profile data!');
            return {profile: null,success: false};
        }
    }

    // Function to Save profile data for candidate // ! Candidate
    const saveProfileData = async (profile: any) => {
        const response = await fetch(`${API_URL}/api/candidate/save_profile/`,{
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });

        const data = await response.json();
        if(data.status === 200) {
            toast.success('Profile data saved successfully!');
            return true;
        } else {
            toast.error('Failed to save profile data!');
            return false;
        }
    }

    // Function to get Profile data for recruiter // ! Recruiter
    const getProfileDataRecruiter = async () => {
        const response = await fetch(`${API_URL}/api/get_profile/`,{
            method: 'GET',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            return {profile: data.data,success: true};
        } else {
            toast.error('Failed to fetch profile data!');
            return {profile: null,success: false};
        }
    }

    // Function to Save profile data for recruiter // ! Recruiter
    const saveProfileDataRecruiter = async (profile: any) => {
        const response = await fetch(`${API_URL}/api/save_profile/`,{
            method: 'POST',
            headers: {
                Authorization: refresh_token || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });

        const data = await response.json();
        if(data.status === 200) {
            toast.success('Profile data saved successfully!');
            return true;
        } else {
            toast.error('Failed to save profile data!');
            return false;
        }
    }

    // Function to get recent jobs for Job Seeker
    const getRecentJobs = async () => {
        const response = await fetch(`${API_URL}/api/candidate/recent_postings/`,{
            method: 'GET',
            headers: {
                'Authorization': refresh_token || '',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.status === 200) {
            return {jobs: data.data,success: true};
        } else {
            toast.error('Failed to fetch recent jobs!');
            return {jobs: [],success: false};
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
            email,
            company,
            applyJobId,
            didEmailSend,
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
            forgotPassword,
            resetPassword,
            applyJob,
            getJobApplicationC,
            getAllCandidateApplications,
            updateApplicationStatus,
            sendEmailToCandidate,
            getProfileData,
            saveProfileData,
            getProfileDataRecruiter,
            saveProfileDataRecruiter,
            getRecentJobs,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
