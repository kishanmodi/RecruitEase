import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from './pages/Authentication/Register';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/Login';
import RegisterSwitch from './pages/Authentication/RegisterSwitch';


import PrivateRoute from './route/PrivateRoute';
import RedirectAuthRoute from './route/RedirectAuthRoute';

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
                    path='/register-type'
                    element={
                        <RedirectAuthRoute>
                            <PageTitle title='Type - RecruitEase' />
                            <RegisterSwitch />
                        </RedirectAuthRoute>
                    }
                />
            </Routes>
           
        </>
    );
}

export default App;
