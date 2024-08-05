import React,{useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom';
import {ApplicationDetails} from '../../types/applicationdetails';
import {useAuth} from '../../context/AppContext';
import Loader from '../../common/Loader';
import {FaPhone,FaCalendarAlt,FaSuitcase,FaEye } from 'react-icons/fa'
import { FaMapLocationDot } from "react-icons/fa6";
import { GrOrganization } from "react-icons/gr";


const ApplicationsList = ({loading,dashboard,setLoading}: {loading: boolean,dashboard: boolean,setLoading: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {getJobApplicationC} = useAuth();
    const [applications,setApplications] = useState<ApplicationDetails[]>([]);
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [companyFilter,setCompanyFilter] = useState<string>('');
    const [stageFilter,setStageFilter] = useState<string>('');
    const [currentPage,setCurrentPage] = useState<number>(0); // Adjusted to zero-indexed for react-paginate
    const [filteredApplications,setFilteredApplications] = useState<ApplicationDetails[]>([]);
    const perPage: number = dashboard ? 1000000 : 5; // Number of items per page

    const navigate = useNavigate();

    const getStageClasses = (stage: string) => {
        switch(stage) {
            case 'Application Submitted':
                return 'bg-teal-200 text-gray-800'; // Default gray color
            case 'Under Review':
                return 'bg-blue-200 text-blue-800'; // Lighter Blue
            case 'Interview Scheduled':
                return 'bg-teal-200 text-teal-800'; // Lighter Teal
            case 'Under Evaluation':
                return 'bg-orange-200 text-orange-800'; // Lighter Orange
            case 'Offer Sent':
                return 'bg-slate-200 text-slate-800'; // Lighter Slate Blue
            case 'Offer Accepted':
                return 'bg-green-200 text-green-800'; // Lighter Green
            case 'Offer Declined':
                return 'bg-red-200 text-red-800'; // Lighter Red
            case 'Not Selected':
                return 'bg-gray-300 text-gray-900'; // Slightly darker gray for not selected
            default:
                return 'bg-gray-200 text-gray-800'; // Default gray color
        }
    };


    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const data = await getJobApplicationC();
                if(data.success) {
                    setApplications(data.applications); // Set fetched applications data
                } else {
                    setApplications([]);
                }
                setLoading(false);
            } catch(error) {
                console.error('Error fetching applications:',error);
                setLoading(false);
            }
        };
        fetchApplications();
    },[getJobApplicationC]);

    useEffect(() => {
        // Function to filter applications based on search term, company, and stage
        const filtered = applications.length > 0 ? applications.filter(
            (application) =>
                application.job_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (companyFilter ? application.company_name === companyFilter : true) &&
                (stageFilter ? application.status === stageFilter : true)
        ): [];
        setFilteredApplications(filtered);
    },[applications,searchTerm,companyFilter,stageFilter]);

    // Pagination logic
    const offset: number = currentPage * perPage;
    const pageCount: number = Math.ceil(filteredApplications.length / perPage);

    // Handle search term change
    const handleSearchTermChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0); // Reset page to 0 when search term changes
    };

    // Handle company filter change
    const handleCompanyChangeFilter = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCompanyFilter(event.target.value);
        setCurrentPage(0); // Reset page to 0 when company filter changes
    };

    // Handle stage filter change
    const handleStageFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setStageFilter(event.target.value);
        setCurrentPage(0); // Reset page to 0 when stage filter changes
    };

    // Handle page change
    const handlePageChange = ({selected}: {selected: number}) => {
        setCurrentPage(selected);
    };

    return (
        <>
            {loading ? <Loader /> :
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
                <div className='flex flex-row mb-5 justify-between items-center'>
                    <h2 className='text-2xl font-semibold dark:text-white'>
                        Applications
                    </h2>
                </div>
                <>
                    {!dashboard && <div className='flex flex-col md:flex-row mb-5 justify-between items-center gap-6 md:gap-10'>
                        {/* Search input */}
                        <input
                            type='text'
                            placeholder='Search by role...'
                            className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />

                        {/* Company filter dropdown */}
                        <select
                            className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                            value={companyFilter}
                            onChange={handleCompanyChangeFilter}>
                            <option value=''>Filter by Company</option>
                            {/* Add options dynamically based on available companies */}
                            {Array.from(new Set(applications.map(a => a.company_name))).map((company,index) => (
                                <option key={index} value={company}>{company}</option>
                            ))}
                        </select>

                        {/* Stage filter dropdown */}
                        <select
                            className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                            value={stageFilter}
                            onChange={handleStageFilterChange}>
                            <option value=''>Filter by Stage</option>
                            {/* Add options dynamically based on available stages */}
                            {Array.from(new Set(applications.map(a => a.status))).map((stage,index) => (
                                <option key={index} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </div>}

                    <div className='overflow-x-auto hidden lg:block'>
                        <div className='min-w-[850px]'>
                            <div className='grid grid-cols-6 min-w-[850px] rounded-sm bg-gray-2 dark:bg-meta-4'>
                                <div className='p-2.5 xl:p-5 text-center'>
                                    <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                        Organization
                                    </h5>
                                </div>
                                <div className='p-2.5 text-center xl:p-5'>
                                    <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                        Applied Role
                                    </h5>
                                </div>
                                <div className='p-2.5 text-center xl:p-5'>
                                    <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                        Location
                                    </h5>
                                </div>
                                <div className=' p-2.5 text-center xl:p-5'>
                                    <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                        Date
                                    </h5>
                                </div>
                                <div className=' p-2.5 text-center xl:p-5'>
                                    <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                        Stage
                                    </h5>
                                </div>
                                <div className=' p-2.5 text-center xl:p-5'>
                                    <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                        Status
                                    </h5>
                                </div>
                            </div>

                            {filteredApplications.length > 0 ? (
                                filteredApplications
                                    .slice(offset,offset + perPage)
                                    .map((application,key) => (
                                        <div
                                            className={`grid grid-cols-6 min-w-[850px] ${key === filteredApplications.length - 1
                                                ? ''
                                                : 'border-b border-stroke dark:border-strokedark'
                                                }`}
                                            key={key}>
                                            <div className='flex items-center gap-3 p-2.5 xl:p-5'>
                                                <div className='flex flex-row text-center'>
                                                    <p className='text-primary dark:text-white text-sm'>
                                                        {application.company_name}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                                <div className='flex flex-col text-center'>
                                                    <p className='text-primary dark:text-white text-sm'>
                                                        {application.job_title}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                                <p className='text-meta-3 text-sm'>
                                                    {application.location}
                                                </p>
                                            </div>

                                            <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                                <p className='text-black dark:text-white text-sm'>
                                                    {new Date(application.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                                <button
                                                    className={`inline-flex items-center justify-center rounded-full py-1.5 px-4 text-xs font-semibold ${getStageClasses(application.status)} shadow-md hover:shadow-lg transition-shadow duration-200`}
                                                >
                                                    {application.status}
                                                </button>
                                            </div>


                                            <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                                <button
                                                    onClick={() => navigate(`/application/${application.application_id}`)}
                                                    className='py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full'>
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className='p-2.5 xl:p-5 text-center'>
                                    <p className='text-gray-500 dark:text-gray-400'>
                                        No candidates found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='lg:hidden'>
                    {filteredApplications.length === 0 ? (
                        <div className='py-5 text-center'>No data available</div>
                    ) : (
                        filteredApplications.slice(offset,offset + perPage).map((application) => (
                            <div
                                key={application.application_id}
                                className='border-b border-stroke dark:border-strokedark py-4'>
                                <div className='flex flex-col space-y-4 p-4 rounded-lg shadow-lg bg-white dark:bg-meta-4'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <FaSuitcase className='text-primary dark:text-white' />
                                            <h5 className='text-lg font-semibold text-primary dark:text-white'>
                                                {application.job_title}
                                            </h5>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <GrOrganization className='text-black dark:text-white' />
                                            <p className='text-sm text-black dark:text-white'>
                                                {application.company_name}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaMapLocationDot className='text-black dark:text-white' />
                                            <p className='text-sm text-black dark:text-white'>
                                                {application.location}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaPhone className='text-meta-3' />
                                            <p className='text-sm text-meta-3'>{application.phone}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaCalendarAlt className='text-black dark:text-white' />
                                            <p className='text-sm text-black dark:text-white'>
                                                {new Date(application.created_at).toLocaleDateString('en-GB')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div
                                            className={`inline-flex rounded-full py-1 px-3 text-xs text-center font-medium ${getStageClasses(application.status)} align-middle`}>
                                            <p className='leading-5'>{application.status}</p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/candidate/${application.application_id}`)}
                                            className='py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full flex items-center gap-1'>
                                            <FaEye />
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                    {!dashboard && filteredApplications.length > perPage && (
                        <div className='flex justify-center items-center mt-10 mb-10'>
                            <ReactPaginate
                                previousLabel='Previous'
                                nextLabel='Next'
                                breakLabel='...'
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageChange}
                                containerClassName='pagination flex flex-row gap-3 md:gap-4 lg:gap-6 items-center justify-center w-full'
                                activeClassName='bg-primary text-white rounded-md px-2 py-1.5 text-xs md:text-sm lg:text-base'
                                previousClassName='border border-stroke dark:border-strokedark rounded-md px-2 py-1.5 text-xs md:text-sm lg:text-base text-primary dark:text-white hover:bg-primary hover:text-white'
                                nextClassName='border border-stroke dark:border-strokedark rounded-md px-2 py-1.5 text-xs md:text-sm lg:text-base text-primary dark:text-white hover:bg-primary hover:text-white'
                                disabledClassName='text-gray-400 cursor-not-allowed'
                            />
                        </div>
                    )}
                </>
            </div>
        }
        </>
    );
};

export default ApplicationsList;
