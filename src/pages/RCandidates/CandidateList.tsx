import React,{useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom';
import {ApplicationDetails} from '../../types/applicationdetails';
import {useAuth} from '../../context/AppContext';
import Loader from '../../common/Loader';

const CandidateList = ({dashboard}: {dashboard: boolean}) => {

    const {getAllCandidateApplications} = useAuth();
    const [applications,setApplications] = useState<ApplicationDetails[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [roleFilter,setRoleFilter] = useState<string>('');
    const [locationFilter,setLocationFilter] = useState<string>('');
    const [currentPage,setCurrentPage] = useState<number>(0);
    const [filteredApplications,setFilteredApplications] = useState<ApplicationDetails[]>([]);
    const perPage: number = dashboard ? 5 : 100000;

    const navigate = useNavigate();

    const getStageClasses = (stage: string) => {
        switch(stage) {
            case 'Application Submitted':
                return 'bg-teal-200 text-gray-800';
            case 'Under Review':
                return 'bg-blue-200 text-blue-800';
            case 'Interview Scheduled':
                return 'bg-teal-200 text-teal-800';
            case 'Under Evaluation':
                return 'bg-orange-200 text-orange-800';
            case 'Offer Sent':
                return 'bg-slate-200 text-slate-800';
            case 'Offer Accepted':
                return 'bg-green-200 text-green-800';
            case 'Offer Declined':
                return 'bg-red-200 text-red-800';
            case 'Not Selected':
                return 'bg-gray-300 text-gray-900';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await getAllCandidateApplications();

                if(response.success) {
                    setApplications(response.applications);
                    setError(null);
                } else {
                    setApplications([]);
                    setError('Failed to fetch applications.');
                }
                setLoading(false);
            } catch(error) {
                console.error('Error fetching applications:',error);
                setLoading(false);
                setError('An unexpected error occurred.');
            }
        };
        fetchApplications();
    },[]);

    useEffect(() => {
        if(applications.length !== 0) {
            const filtered = applications.filter(
                (application) =>
                    application.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    application.last_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    application.job_title.toLowerCase().includes(roleFilter.toLowerCase()) &&
                    application.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
            setFilteredApplications(filtered);
        }
    },[applications,searchTerm,roleFilter,locationFilter]);

    const offset: number = currentPage * perPage;
    const pageCount: number = Math.ceil(filteredApplications.length / perPage);

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0);
    };


    const handleRoleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleFilter(event.target.value);
        setCurrentPage(0);
    };

    const handleLocationChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationFilter(event.target.value);
        setCurrentPage(0);
    };

    const handlePageChange = ({selected}: {selected: number}) => {
        setCurrentPage(selected);
    };

    return (
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
            {!dashboard && <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Applications
                </h2>
            </div>}
            {loading && <Loader />}
            {error && <div className='p-2.5 xl:p-5 text-center text-red-500'>{error}</div>}
            {!loading && <>

                {!dashboard && <div className='flex flex-col md:flex-row mb-5 justify-between items-center gap-6 md:gap-10'>
                    {/* First Name filter */}
                    <input
                        type='text'
                        placeholder='Search Candidate'
                        className='w-full md:w-2/4 rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />

                    {/* Role filter */}
                    <input
                        type='text'
                        placeholder='Search Role'
                        className='w-full md:w-1/4 rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                        value={roleFilter}
                        onChange={handleRoleChangeFilter}
                    />
                    {/* Location filter */}
                    <input
                        type='text'
                        placeholder='Search Location'
                        className='w-full md:w-1/4 rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                        value={locationFilter}
                        onChange={handleLocationChangeFilter}
                    />
                </div>}


                <div className='overflow-x-auto'>
                    <div className='min-w-[850px]'>
                        <div className='grid grid-cols-6 min-w-[850px] rounded-sm bg-gray-2 dark:bg-meta-4'>
                            <div className='p-2.5 xl:p-5 text-center'>
                                <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                    Applied Role
                                </h5>
                            </div>
                            <div className='p-2.5 text-center xl:p-5'>
                                <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                    Candidate
                                </h5>
                            </div>
                            <div className='p-2.5 text-center xl:p-5'>
                                <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                    Contact
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
                        {filteredApplications.length === 0 ? (
                            <div className='py-5 text-center'>No data available</div>
                        ) : (
                            filteredApplications.slice(offset,offset + perPage).map((application) => (
                                <div
                                    key={application.application_id}
                                    className='grid grid-cols-6 min-w-[850px] border-t border-stroke dark:border-strokedark'>
                                    <div className='flex items-center gap-3 p-2.5 xl:p-5'>
                                        <div className='flex flex-row text-center'>
                                            <p className='text-primary dark:text-white text-sm'>
                                                {application.job_title}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <div className='flex flex-col text-center'>
                                            <p className='text-black dark:text-white text-sm'>
                                                {application.first_name} {application.last_name}
                                            </p>
                                            <p className='text-primary dark:text-white text-xs'>
                                                {application.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <p className='text-meta-3 text-sm'>
                                            {application.phone}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <p className='text-black dark:text-white text-sm'>
                                            {new Date(application.created_at).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                            <div
                                                className={`inline-flex rounded-full py-1 px-3 text-xs text-center font-medium ${getStageClasses(application.status)}`}
                                            >
                                                {application.status}
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                            <button
                                                onClick={() => navigate(`/candidate/${application.application_id}`)}
                                                className='py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full'>
                                                View
                                            </button>
                                        </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {!dashboard && filteredApplications.length > perPage && (
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                )}
            </>}
        </div>
    );
};

export default CandidateList;
