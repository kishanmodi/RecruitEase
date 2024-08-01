import React from 'react';
import CandidateList from './CandidateList';
import DefaultLayout from '../../layout/DefaultLayout';

const Candidates: React.FC = () => {
    return (
        <DefaultLayout>
            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <div className='col-span-12 xl:col-span-16'>
                    <h2 className='text-2xl font-semibold dark:text-white'>
                        Candidates
                    </h2>
                </div>
                <div className='col-span-12 xl:col-span-16'>
                    <CandidateList dashboard={false} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Candidates;
