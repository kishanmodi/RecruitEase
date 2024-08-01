import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

interface RecruiterRouteProps {
    children: React.ReactNode;
}

const RecruiterRoute: React.FC<RecruiterRouteProps> = ({ children, ...rest }) => {
    const { isRecruiter } = useAuth();
    if (!isRecruiter) {
        return <Navigate to='/' />;
    }
    return <Fragment {...rest}>{children}</Fragment>;
};

export default RecruiterRoute;
