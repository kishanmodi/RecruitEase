import React,{useState,useEffect} from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import {BsBoxArrowUpRight} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {useAuth} from '../../context/AppContext';
import Loader from '../../common/Loader';

interface Job {
    id: string;
    title: string;
    department: string;
    city: string;
    country: string;
    posting_date: Date;
    deadline: Date; // Update the type to Date
    soft_skills: any[];
    technical_skills: any[];
    questions: string[];
    recruiter_name: string;
    recruiter_email: string;
    about_job: string;
    about_company: string;
    qualification: string;
    key_requirements: string;
    nice_to_have?: string;
    other_remarks?: string;
    is_active: boolean;
}

interface CardDataStatsProps {
    jobTitle: string;
    location: string;
    applicants: number;
    daysLeft: number;
    appliedToday: number;
    color?: string;
}

const ITEMS_PER_PAGE = 10;

const Jobs: React.FC = () => {
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [locationFilter,setLocationFilter] = useState<string>('');
    const [currentPage,setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();
    const {getJobs,jobs,setCurrentJobId} = useAuth();
    const [loading,setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        getJobs();
        setLoading(false);
    },[]);

    // Function to generate random color
    const getRandomColor = () => {
        const colors = [
            '#FFB800',
            '#FF4D4F',
            '#40A9FF',
            '#36CFC9',
            '#9254DE',
            '#F759AB',
            '#FF7A45',
            '#00C1DE',
            '#4482FF',
            '#F5317F',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Function to filter jobs based on search term
    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle location filter change
    const handleLocationFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setLocationFilter(event.target.value);
    };

    // Apply location filter
    const locationFilteredJobs = locationFilter
        ? filteredJobs.filter((job) => job.city === locationFilter)
        : filteredJobs;

    // Pagination logic
    const pageCount = Math.ceil(locationFilteredJobs.length / ITEMS_PER_PAGE);
    const currentJobs = locationFilteredJobs.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const handlePageChange = (selected: {selected: number}) => {
        setCurrentPage(selected.selected);
    };

    return (
        <DefaultLayout>
            {loading && <Loader />}
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Current Openings
                </h2>
            </div>
            {jobs.length !== 0 ?
                <>
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
                                <option value=''>Location
                                </option>
                                {jobs.map((job: Job,index: number) => {
                                    return (
                                        <option key={index} value={job.city}>
                                            {job.city}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
                        {currentJobs.map((data,index) => (
                            <CardDataStats
                                key={index}
                                jobTitle={data.title}
                                location={`${data.city}, ${data.country}`}
                                applicants={data.num_applications} // Fixed value
                                appliedToday={data.applied_today} // Fixed value
                            >
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
                                        fill={getRandomColor()}
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
                                        onClick={() => {
                                            setCurrentJobId(data.id);
                                            navigate('/edit-job');
                                        }}
                                    />
                                </div>
                            </CardDataStats>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {filteredJobs.length > ITEMS_PER_PAGE && filteredJobs.length > 0 && (
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
                </> :
                <div className="flex flex-col items-center justify-center h-full p-4 mt-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            No Jobs Available
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            It looks like there are currently no job postings available. Create a job posting to get started.
                        </p>
                        <button
                            className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors"
                            onClick={() => navigate('/job')}
                        >
                            Create Job
                        </button>
                    </div>
                </div>

            }

        </DefaultLayout>
    );
};

export default Jobs;
