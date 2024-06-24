import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
    const { isRecruiter, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to='/login' />;
    }
    if (!isRecruiter) {
        return <Navigate to='/candidate' />;
    }

    return <Fragment {...rest}>{children}</Fragment>;
};

export default PrivateRoute;
