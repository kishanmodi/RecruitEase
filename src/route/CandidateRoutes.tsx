import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

interface CandidateRouteProps {
    children: React.ReactNode;
}

const CandidateRoute: React.FC<CandidateRouteProps> = ({ children, ...rest }) => {
    const { isRecruiter } = useAuth();
    if (isRecruiter) {
        return <Navigate to='/' />;
    }
    return <Fragment {...rest}>{children}</Fragment>;
};

export default CandidateRoute;
