import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/Login';
import ECommerce from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Register from './pages/Authentication/Register';
import Forgot from './pages/Authentication/Forgot';
import Reset from './pages/Authentication/Reset';
import JobPosting from './pages/JobPosting/JobPosting';
import Candidates from './pages/Candidate/Candidates';
import Jobs from './pages/Jobs/Jobs';
import RegisterSwitch from './pages/Authentication/RegisterSwitch';

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Routes>
                <Route
                    index
                    element={
                        <>
                            <PageTitle title='RecruitEase' />
                            <ECommerce />
                        </>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <>
                            <PageTitle title='Profile - RecruitEase' />
                            <Profile />
                        </>
                    }
                />
                <Route
                    path='/forms/form-elements'
                    element={
                        <>
                            <PageTitle title='Form Elements - RecruitEase' />
                            <FormElements />
                        </>
                    }
                />
                <Route
                    path='/forms/form-layout'
                    element={
                        <>
                            <PageTitle title='Form Layout - RecruitEase' />
                            <FormLayout />
                        </>
                    }
                />
                <Route
                    path='/tables'
                    element={
                        <>
                            <PageTitle title='Tables - RecruitEase' />
                            <Tables />
                        </>
                    }
                />
                <Route
                    path='/settings'
                    element={
                        <>
                            <PageTitle title='Settings - RecruitEase' />
                            <Settings />
                        </>
                    }
                />
                <Route
                    path='/ui/alerts'
                    element={
                        <>
                            <PageTitle title='Alerts  - RecruitEase' />
                            <Alerts />
                        </>
                    }
                />
                <Route
                    path='/ui/buttons'
                    element={
                        <>
                            <PageTitle title='Buttons - RecruitEase' />
                            <Buttons />
                        </>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <>
                            <PageTitle title='Login - RecruitEase' />
                            <Login />
                        </>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <>
                            <PageTitle title='Register - RecruitEase' />
                            <Register />
                        </>
                    }
                />
                <Route
                    path='/forgot'
                    element={
                        <>
                            <PageTitle title='Forgot Password - RecruitEase' />
                            <Forgot />
                        </>
                    }
                />
                <Route
                    path='/reset-password'
                    element={
                        <>
                            <PageTitle title='Reset Password - RecruitEase' />
                            <Reset />
                        </>
                    }
                />
                <Route
                    path='/create-job'
                    element={
                        <>
                            <PageTitle title='Create Job Posting- RecruitEase' />
                            <JobPosting />
                        </>
                    }
                />
                <Route
                    path='/candidates'
                    element={
                        <>
                            <PageTitle title='Candidates- RecruitEase' />
                            <Candidates />
                        </>
                    }
                />
                <Route
                    path='/jobs'
                    element={
                        <>
                            <PageTitle title='Job Postings- RecruitEase' />
                            <Jobs />
                        </>
                    }
                />
                <Route
                    path='/register-type'
                    element={
                        <>
                            <PageTitle title='Type - RecruitEase' />
                            <RegisterSwitch />
                        </>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
