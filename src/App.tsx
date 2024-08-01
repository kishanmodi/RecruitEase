import {useEffect,useState} from 'react';
import {Route,Routes,useLocation} from 'react-router-dom';

// Context
import {useAuth} from './context/AppContext';

// Common Components
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

// Auth Pages
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import RegisterC from './pages/Authentication/RegisterC';
import Forgot from './pages/Authentication/Forgot';
import Reset from './pages/Authentication/Reset';
import RegisterSwitch from './pages/Authentication/RegisterSwitch';

// Route Protection Components
import PrivateRoute from './route/PrivateRoute';
import RedirectAuthRoute from './route/RedirectAuthRoute';
import ApplyRoute from './route/ApplyRoute';
import RecruiterRoute from './route/RecruiterRoute';
import CandidateRoute from './route/CandidateRoutes';

// Candidate Pages
import CandidateDashboard from './pages/Dashboard/DashboardC';
import AppliedJob from './pages/CApplications/AppliedJob';
import CandidateProfile from './pages/CandidateProfile/CandidateProfile';
import Candidates from './pages/RCandidates/CandidateMainR';

// Recruiter Pages
import Dashboard from './pages/Dashboard/Dashboard';
import JobPosting from './pages/JobPosting/JobPosting';
import Jobs from './pages/Jobs/Jobs';
import Applications from './pages/CApplications/ApplicationsMainC';
import JobApplication from './pages/ApplyJob/JobApplication';
import JobStatus from './pages/RCandidates/JobStatusR';
import Profile from './pages/Profile';

function App() {
    const [loading,setLoading] = useState<boolean>(true);
    const {pathname} = useLocation();
    const {isRecruiter} = useAuth();

    useEffect(() => {
        window.scrollTo(0,0);
    },[pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false),1000);
    },[]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Routes>

                {/* Common Routes */}
                <Route
                    path='/'
                    element={
                        <PrivateRoute>
                            <PageTitle title='RecruitEase' />
                            {isRecruiter ? <Dashboard /> : <CandidateDashboard />}
                        </PrivateRoute>
                    }
                />
                {/* Auth Routes */}
                <Route
                    path='/login'
                    element={
                        <RedirectAuthRoute>
                            <PageTitle title='Login - RecruitEase' />
                            <Login />
                        </RedirectAuthRoute>
                    }
                />
                <Route
                    path='/register-type'
                    element={
                        <RedirectAuthRoute>
                            <PageTitle title='Type - RecruitEase' />
                            <RegisterSwitch />
                        </RedirectAuthRoute>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <RedirectAuthRoute>
                            <PageTitle title='Register - RecruitEase' />
                            <Register />
                        </RedirectAuthRoute>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <RedirectAuthRoute>
                            <PageTitle title='Signup - RecruitEase' />
                            <RegisterC />
                        </RedirectAuthRoute>
                    }
                />
                <Route
                    path='/forgot'
                    element={
                        <RedirectAuthRoute>
                            <PageTitle title='Forgot Password - RecruitEase' />
                            <Forgot />
                        </RedirectAuthRoute>
                    }
                />
                <Route
                    path='/reset'
                    element={
                        <RedirectAuthRoute>
                            <PageTitle title='Reset Password - RecruitEase' />
                            <Reset />
                        </RedirectAuthRoute>
                    }
                />

                {/* Recruiter Routes */}
                <Route
                    path='/profile'
                    element={
                        <PrivateRoute>
                            <RecruiterRoute>
                                <PageTitle title='Profile - RecruitEase' />
                                <Profile />
                            </RecruiterRoute>
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/job'
                    element={
                        <PrivateRoute>
                            <RecruiterRoute>
                                <PageTitle title='Create Job Posting- RecruitEase' />
                                <JobPosting edit={false} />
                            </RecruiterRoute>
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/edit-job'
                    element={
                        <PrivateRoute>
                            <RecruiterRoute>
                                <PageTitle title='Edit Job Posting- RecruitEase' />
                                <JobPosting edit={true} />
                            </RecruiterRoute>
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/candidates'
                    element={
                        <PrivateRoute>
                            <RecruiterRoute>
                                <PageTitle title='Candidates- RecruitEase' />
                                <Candidates />
                            </RecruiterRoute>
                        </PrivateRoute>
                    }
                />
                <Route path='candidate/:id'
                    element={
                        <PrivateRoute>
                            <RecruiterRoute>
                                <PageTitle title='Candidate Info - RecruitEase' />
                                <JobStatus />
                            </RecruiterRoute>
                        </PrivateRoute>

                    }
                />
                <Route
                    path='/jobs'
                    element={
                        <PrivateRoute>
                            <RecruiterRoute>
                                <PageTitle title='Job Postings - RecruitEase' />
                                <Jobs />
                            </RecruiterRoute>
                        </PrivateRoute>
                    }
                />
                <Route path='/update-status'
                    element={
                        <PrivateRoute>
                            <RecruiterRoute>
                                <PageTitle title='Update Status - RecruitEase' />
                                <JobStatus />
                            </RecruiterRoute>
                        </PrivateRoute>
                    }
                />

                {/* Candidate Routes */}
                <Route
                    path='/applications'
                    element={
                        <PrivateRoute>
                            <CandidateRoute>
                                <PageTitle title='Candidate - Applications' />
                                <Applications />
                            </CandidateRoute>
                        </PrivateRoute>
                    }
                />
                <Route path='application/:id'
                    element={
                        <PrivateRoute>
                            <CandidateRoute>
                                <PageTitle title='Application Status - RecruitEase' />
                                <AppliedJob />
                            </CandidateRoute>
                        </PrivateRoute>

                    }
                />
                <Route path='candidate-profile'
                    element={
                        <PrivateRoute>
                            <CandidateRoute>
                                <PageTitle title='Profile - RecruitEase' />
                                <CandidateProfile />
                            </CandidateRoute>
                        </PrivateRoute>

                    }
                />
                <Route
                    path="/apply/:id"
                    element={
                        <ApplyRoute>
                            <PrivateRoute>
                                <CandidateRoute>
                                    <PageTitle title="Apply - RecruitEase" />
                                    <JobApplication />
                                </CandidateRoute>
                            </PrivateRoute>
                        </ApplyRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
