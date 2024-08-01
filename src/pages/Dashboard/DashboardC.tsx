import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import {Link} from 'react-router-dom';
import {BsBoxArrowUpRight} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import TableTwo from '../CApplications/ApplicationsList';

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
                    Dashboard
                </h2>
            </div>

            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <div className='col-span-12 xl:col-span-16'>
                    <TableTwo dashboard={true} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
