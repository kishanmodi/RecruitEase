import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface CardDataStatsProps {
    jobTitle: string;
    location: string;
    applicants: number;
    daysLeft: number;
    appliedToday: number;
    color: string;
}

const cardData: CardDataStatsProps[] = [
    {
        jobTitle: 'Frontend Developer',
        location: 'New York, NY',
        applicants: 150,
        daysLeft: 5,
        appliedToday: 10,
        color: '#FAC684'
    },
    {
        jobTitle: 'Backend Developer',
        location: 'San Francisco, CA',
        applicants: 120,
        daysLeft: 10,
        appliedToday: 15,
        color: '#FFC400'
    },
    {
        jobTitle: 'Project Manager',
        location: 'Los Angeles, CA',
        applicants: 80,
        daysLeft: 3,
        appliedToday: 5,
        color: '#FF6E40'
    },
    {
        jobTitle: 'Software Developer',
        location: 'Chicago, IL',
        applicants: 200,
        daysLeft: 7,
        appliedToday: 20,
        color: '#FF3D00'
    },
    {
        jobTitle: 'Software Architect',
        location: 'Boston, MA',
        applicants: 90,
        daysLeft: 4,
        appliedToday: 12,
        color: '#FFFE40'
    },
    {
        jobTitle: 'UX Designer',
        location: 'Austin, TX',
        applicants: 110,
        daysLeft: 6,
        appliedToday: 8,
        color: '#CF6E40'
    },
    {
        jobTitle: 'DevOps Engineer',
        location: 'Seattle, WA',
        applicants: 75,
        daysLeft: 8,
        appliedToday: 7,
        color: '#FF6E40'
    },
    {
        jobTitle: 'Marketing Specialist',
        location: 'Miami, FL',
        applicants: 60,
        daysLeft: 2,
        appliedToday: 3,
        color: '#FAC684'
    },
    {
        jobTitle: 'Business Analyst',
        location: 'Denver, CO',
        applicants: 130,
        daysLeft: 9,
        appliedToday: 14,
        color: '#FF6E40'
    },
    {
        jobTitle: 'Software Architect',
        location: 'Boston, MA',
        applicants: 90,
        daysLeft: 4,
        appliedToday: 12,
        color: '#FFFE40'
    },
    {
        jobTitle: 'Product Owner',
        location: 'Dallas, TX',
        applicants: 85,
        daysLeft: 1,
        appliedToday: 2,
        color: '#FF3D00'
    },
    {
        jobTitle: 'UX Designer',
        location: 'Austin, TX',
        applicants: 110,
        daysLeft: 6,
        appliedToday: 8,
        color: '#CF6E40'
    }
];

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    return (
        <DefaultLayout>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white '>
                    Current Openings (15)
                </h2>
                <div className='text-primary font-bold'>
                    <Link to='/jobs'>
                        <a className=''>See All</a>
                    </Link>
                </div>
            </div>

            <div className='overflow-x-auto'>
                <div className='flex flex-nowrap space-x-4 md:space-x-6 xl:space-x-7.5'>
                    {cardData.map((data, index) => (
                        <div
                            key={index}
                            className='min-w-[350px]'>
                            {/* Adjust the width classes (w-80, md:w-96, xl:w-96) based on your desired card width */}
                            <CardDataStats
                                jobTitle={data.jobTitle}
                                location={data.location}
                                applicants={data.applicants}
                                daysLeft={data.daysLeft}
                                appliedToday={data.appliedToday}>
                                <svg
                                    width='36'
                                    height='36'
                                    viewBox='0 0 36 36'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <rect
                                        width='36'
                                        height='36'
                                        rx='8'
                                        fill={data.color}
                                    />
                                    <path
                                        d='M14.5352 23.5125V14.7433M20.9674 23.5125V14.7433M15.0299 14.2561V12.3074C15.0299 11.7692 15.473 11.333 16.0195 11.333H19.4831C20.0296 11.333 20.4727 11.7692 20.4727 12.3074V14.2561M12.0612 23.9997H23.9362C25.0293 23.9997 25.9154 23.1272 25.9154 22.051V16.2048C25.9154 15.1286 25.0293 14.2561 23.9362 14.2561H12.0612C10.9681 14.2561 10.082 15.1286 10.082 16.2048V22.051C10.082 23.1272 10.9681 23.9997 12.0612 23.9997Z'
                                        stroke='white'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                    />
                                </svg>
                                <div className='cursor-pointer'>
                                    <BsBoxArrowUpRight
                                        onClick={() => navigate('/job')}
                                    />
                                </div>
                            </CardDataStats>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <div className='col-span-12 xl:col-span-16'>
                    <TableOne />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
