import React, { useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

interface CardDataStatsProps {
    jobTitle: string;
    location: string;
    applicants: number;
    daysLeft: number;
    appliedToday: number;
    color?: string;
}

const cardData: CardDataStatsProps[] = [
    // Existing data
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
    // Additional data
    {
        jobTitle: 'Data Scientist',
        location: 'San Francisco, CA',
        applicants: 95,
        daysLeft: 12,
        appliedToday: 6,
        color: '#CF6E40'
    },
    {
        jobTitle: 'Cloud Engineer',
        location: 'Austin, TX',
        applicants: 85,
        daysLeft: 14,
        appliedToday: 9,
        color: '#FFFE40'
    },
    {
        jobTitle: 'Full Stack Developer',
        location: 'New York, NY',
        applicants: 175,
        daysLeft: 8,
        appliedToday: 13,
        color: '#FF3D00'
    },
    {
        jobTitle: 'System Administrator',
        location: 'Chicago, IL',
        applicants: 60,
        daysLeft: 11,
        appliedToday: 4,
        color: '#FF6E40'
    },
    {
        jobTitle: 'Network Engineer',
        location: 'Los Angeles, CA',
        applicants: 70,
        daysLeft: 6,
        appliedToday: 7,
        color: '#FFC400'
    },
    {
        jobTitle: 'Database Administrator',
        location: 'Boston, MA',
        applicants: 55,
        daysLeft: 9,
        appliedToday: 5,
        color: '#FFFE40'
    },
    {
        jobTitle: 'AI Engineer',
        location: 'Seattle, WA',
        applicants: 90,
        daysLeft: 13,
        appliedToday: 10,
        color: '#FAC684'
    },
    {
        jobTitle: 'Cybersecurity Specialist',
        location: 'Miami, FL',
        applicants: 65,
        daysLeft: 7,
        appliedToday: 8,
        color: '#CF6E40'
    },
    {
        jobTitle: 'Product Manager',
        location: 'Denver, CO',
        applicants: 110,
        daysLeft: 4,
        appliedToday: 11,
        color: '#FF3D00'
    },
    {
        jobTitle: 'Technical Writer',
        location: 'Dallas, TX',
        applicants: 45,
        daysLeft: 15,
        appliedToday: 3,
        color: '#FF6E40'
    },
    {
        jobTitle: 'Data Analyst',
        location: 'San Francisco, CA',
        applicants: 125,
        daysLeft: 10,
        appliedToday: 12,
        color: '#FFFE40'
    },
    {
        jobTitle: 'Software Engineer',
        location: 'New York, NY',
        applicants: 180,
        daysLeft: 6,
        appliedToday: 16,
        color: '#FF3D00'
    }
];

const ITEMS_PER_PAGE = 20;

const Jobs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();

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

    // Pagination logic
    const pageCount = Math.ceil(locationFilteredJobs.length / ITEMS_PER_PAGE);
    const currentJobs = locationFilteredJobs.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const handlePageChange = (selected: { selected: number }) => {
        setCurrentPage(selected.selected);
    };

    return (
        <DefaultLayout>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Current Openings
                </h2>
            </div>

            <div className='mb-5 flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-between'>
                <div className='flex-grow md:flex-grow-0 max-md:w-full w-3/4'>
                    <input
                        type='text'
                        placeholder='Search jobs...'
                        className='w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='max-md:w-full w-1/4'>
                    <select
                        id='locationFilter'
                        className='w-full rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                        value={locationFilter}
                        onChange={handleLocationFilterChange}>
                        <option value=''>All Locations</option>
                        <option value='New York, NY'>New York, NY</option>
                        <option value='San Francisco, CA'>San Francisco, CA</option>
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
                {currentJobs.map((data, index) => (
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
                        <div className='cursor-pointer'>
                            <BsBoxArrowUpRight
                                onClick={() => navigate('/create-job')}
                            />
                        </div>
                    </CardDataStats>
                ))}
            </div>

            {/* Pagination Controls */}
            {filteredJobs.length > 0 && (
                <div className='flex justify-center items-center mt-10 mb-10'>
                    <ReactPaginate
                        previousLabel='Previous'
                        nextLabel='Next'
                        breakLabel='...'
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageChange}
                        containerClassName='pagination flex flex-row gap-10 items-center justify-center w-full'
                        activeClassName='bg-primary text-white rounded-md px-3 py-1.5 text-sm'
                        previousClassName='border border-stroke dark:border-strokedark rounded-md px-3 py-1.5 text-sm text-primary dark:text-white hover:bg-primary hover:text-white'
                        nextClassName='border border-stroke dark:border-strokedark rounded-md px-3 py-1.5 text-sm text-primary dark:text-white hover:bg-primary hover:text-white'
                        disabledClassName='text-gray-400 cursor-not-allowed'
                    />
                </div>
            )}
        </DefaultLayout>
    );
};

export default Jobs;