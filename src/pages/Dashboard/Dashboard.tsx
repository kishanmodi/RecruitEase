import React from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

interface CardDataStatsProps {
    jobTitle: string;
    location: string;
    applicants: number;
    daysLeft: number;
    appliedToday: number;
}

const cardData: CardDataStatsProps[] = [
    {
        jobTitle: 'Frontend Developer',
        location: 'New York, NY',
        applicants: 150,
        daysLeft: 5,
        appliedToday: 10
    },
    {
        jobTitle: 'Backend Developer',
        location: 'San Francisco, CA',
        applicants: 120,
        daysLeft: 10,
        appliedToday: 15
    },
    {
        jobTitle: 'Project Manager',
        location: 'Los Angeles, CA',
        applicants: 80,
        daysLeft: 3,
        appliedToday: 5
    },
    {
        jobTitle: 'Software Developer',
        location: 'Chicago, IL',
        applicants: 200,
        daysLeft: 7,
        appliedToday: 20
    }
];

const Dashboard: React.FC = () => {
    return (
        <DefaultLayout>
            <div className='flex flex-row mb-5 justify-between items-center'>
          
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
         
            </div>

            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
  
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
