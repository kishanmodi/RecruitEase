import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';

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
    },
    {
        jobTitle: 'Software Architect',
        location: 'Boston, MA',
        applicants: 90,
        daysLeft: 4,
        appliedToday: 12
    },
    {
        jobTitle: 'UX Designer',
        location: 'Austin, TX',
        applicants: 110,
        daysLeft: 6,
        appliedToday: 8
    },
    {
        jobTitle: 'DevOps Engineer',
        location: 'Seattle, WA',
        applicants: 75,
        daysLeft: 8,
        appliedToday: 7
    },
    {
        jobTitle: 'Marketing Specialist',
        location: 'Miami, FL',
        applicants: 60,
        daysLeft: 2,
        appliedToday: 3
    },
    {
        jobTitle: 'Business Analyst',
        location: 'Denver, CO',
        applicants: 130,
        daysLeft: 9,
        appliedToday: 14
    },
    {
        jobTitle: 'Product Owner',
        location: 'Dallas, TX',
        applicants: 85,
        daysLeft: 1,
        appliedToday: 2
    }
];

const Jobs: React.FC = () => {
    return (
        <DefaultLayout>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white '>
                    Current Openings
                </h2>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                {cardData.map((data, index) => (
                    <CardDataStats
                        key={index}
                        jobTitle={data.jobTitle}
                        location={data.location}
                        applicants={data.applicants}
                        daysLeft={data.daysLeft}
                        appliedToday={data.appliedToday}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            x='0px'
                            y='0px'
                            width='24'
                            height='24'
                            viewBox='0 0 48 48'>
                            <path
                                fill='#424242'
                                d='M27,7h-6c-1.7,0-3,1.3-3,3v3h2v-3c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v3h2v-3C30,8.3,28.7,7,27,7z'></path>
                            <path
                                fill='#E65100'
                                d='M40,43H8c-2.2,0-4-1.8-4-4V15c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,41.2,42.2,43,40,43z'></path>
                            <path
                                fill='#FF6E40'
                                d='M40,28H8c-2.2,0-4-1.8-4-4v-9c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v9C44,26.2,42.2,28,40,28z'></path>
                            <path
                                fill='#FFF3E0'
                                d='M26,26h-4c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v2C27,25.6,26.6,26,26,26z'></path>
                        </svg>
                    </CardDataStats>
                ))}
            </div>
        </DefaultLayout>
    );
};

export default Jobs;
