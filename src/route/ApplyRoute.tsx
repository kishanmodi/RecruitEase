import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

interface ApplyRouteProps {
    children: React.ReactNode;
}

const ApplyRoute: React.FC<ApplyRouteProps> = ({ children }) => {
    const { id } = useParams<{ id: string }>(); // Ensure id is correctly typed
    const { setApplyJobId } = useAuth();

    useEffect(() => {
        if (id) {
            console.log(`Setting Apply Job ID: ${id}`); // Debugging line
            setApplyJobId(id);
        } else {
            console.log('No ID found in the URL'); // Debugging line
        }
    }, [id, setApplyJobId]);

    return <>{children}</>;
};

export default ApplyRoute;
