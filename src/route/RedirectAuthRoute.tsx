import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

interface RedirectAuthRouteProps {
    children: React.ReactNode;
}

const RedirectAuthRoute: React.FC<RedirectAuthRouteProps> = ({
    children,
    ...rest
}) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to='/' />;
    } else {
        return <Fragment {...rest}>{children}</Fragment>;
    }
};

export default RedirectAuthRoute;
