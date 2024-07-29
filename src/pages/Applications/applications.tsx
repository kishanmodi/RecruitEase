import React from 'react';
import TableTwo from '../../pages/Applications/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Applications: React.FC = () => {
    return (
        <DefaultLayout>
            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <div className='col-span-12 xl:col-span-16'>
                    <TableTwo />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Applications;
