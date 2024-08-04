import React from 'react';
import ApplicationsList from './ApplicationsList';
import DefaultLayout from '../../layout/DefaultLayout';
import { ApplicationDetails } from "../../types/applicationdetails";
import { useState } from "react";

const Applications: React.FC = () => {

    const [loading,setLoading] = useState<boolean>(true);

    return (
        <DefaultLayout>
            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <div className='col-span-12 xl:col-span-16'>
                    <ApplicationsList dashboard={false}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Applications;
