import {useEffect,useState} from 'react';
import {Route,Routes,useLocation} from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/Login';
import ECommerce from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile';

import Register from './pages/Authentication/Register';
import RegisterC from './pages/Authentication/RegisterC';
import Forgot from './pages/Authentication/Forgot';
import Reset from './pages/Authentication/Reset';
import JobPosting from './pages/JobPosting/JobPosting';
import Candidates from './pages/Candidate/Candidates';
import Jobs from './pages/Jobs/Jobs';
import RegisterSwitch from './pages/Authentication/RegisterSwitch';

import PrivateRoute from './route/PrivateRoute';
import RedirectAuthRoute from './route/RedirectAuthRoute';
import Applications from './pages/Applications/applications';
// import SendEmail from './pages/JobPosting/SendEmail';
import JobApplication from './pages/ApplyJob/JobApplication';
import AppliedJob from './pages/Applications/AppliedJob';
import CandidateProfile from './pages/CandidateProfile/CandidateProfile';

function App() {
    const [loading,setLoading] = useState<boolean>(true);
    const {pathname} = useLocation();

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
                <Route
                    path='/'
                    element={
                        <PrivateRoute>
                            <PageTitle title='RecruitEase' />
                            <ECommerce />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Profile - RecruitEase' />
                            <Profile />
                        </PrivateRoute>
                    }
                />
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
                <Route
                    path='/job'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Create Job Posting- RecruitEase' />
                            <JobPosting edit={false}/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/edit-job'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Edit Job Posting- RecruitEase' />
                            <JobPosting edit={true} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/candidates'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Candidates- RecruitEase' />
                            <Candidates />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/jobs'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Job Postings- RecruitEase' />
                            <Jobs />
                        </PrivateRoute>
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
                    path='/candidate-applications'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Candidate - Applications' />
                            <Applications />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/apply'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Candidate - Apply' />
                            <JobApplication />
                        </PrivateRoute>
                    }
                />

                <Route path='/update-status'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Update Status - RecruitEase' />
                            <AppliedJob />
                        </PrivateRoute>
                    }
                />
                <Route path='application-status'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Application Status - RecruitEase' />
                            <AppliedJob />
                        </PrivateRoute>

                    }
                />

                <Route path='candidate-profile'
                    element={
                        <PrivateRoute>
                            <PageTitle title='Profile - RecruitEase' />
                          <CandidateProfile/>
                        </PrivateRoute>

                    }
                />
            </Routes>
        </>
    );
}

export default App;
