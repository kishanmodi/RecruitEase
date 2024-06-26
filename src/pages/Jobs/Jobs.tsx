import React, { useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';

interface CardDataStatsProps {
    jobTitle: string;
    location: string;
    applicants: number;
    daysLeft: number;
    appliedToday: number;
    color?: string;
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
        jobTitle: 'Product Owner',
        location: 'Dallas, TX',
        applicants: 85,
        daysLeft: 1,
        appliedToday: 2,
        color: '#FF3D00'
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
    }
];

const Jobs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [locationFilter, setLocationFilter] = useState<string>('');

    // Function to filter jobs based on search term
    const filteredJobs = cardData.filter(
        (job) =>
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle location filter change
    const handleLocationFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setLocationFilter(event.target.value);
    };

    // Apply location filter
    const locationFilteredJobs = locationFilter
        ? filteredJobs.filter((job) => job.location === locationFilter)
        : filteredJobs;

    return (
        <DefaultLayout>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Current Openings
                </h2>
            </div>

            <div className='mb-5 flex flex-row gap-10 items-center justify-between max-xsm:flex-col max-xms:gap-0'>
                <div className='flex-grow'>
                    <input
                        type='text'
                        placeholder='Search jobs...'
                        className='w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className=''>
                    <select
                        id='locationFilter'
                        className='w-full rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                        value={locationFilter}
                        onChange={handleLocationFilterChange}>
                        <option value=''>All Locations</option>
                        <option value='New York, NY'>New York, NY</option>
                        <option value='San Francisco, CA'>
                            San Francisco, CA
                        </option>
                        <option value='Los Angeles, CA'>Los Angeles, CA</option>
                        <option value='Chicago, IL'>Chicago, IL</option>
                        <option value='Boston, MA'>Boston, MA</option>
                        <option value='Austin, TX'>Austin, TX</option>
                        <option value='Seattle, WA'>Seattle, WA</option>
                        <option value='Miami, FL'>Miami, FL</option>
                        <option value='Denver, CO'>Denver, CO</option>
                        <option value='Dallas, TX'>Dallas, TX</option>
                    </select>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
                {locationFilteredJobs.map((data, index) => (
                    <CardDataStats
                        key={index}
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
                    </CardDataStats>
                ))}
            </div>
        </DefaultLayout>
    );
};

export default Jobs;
