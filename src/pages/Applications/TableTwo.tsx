import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom';

interface APPLICATION {
    id: number;
    company: string;
    applied_role: string;
    location: string;
    applied_date: string;
    stage: "Interview" | "Technical Test" | "HR Interview" | "Portfolio Review" | "Screening" | "Rejection" | "Offer" | "Hired";
    color: string;
}

const TableTwo = ({}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [companyFilter, setCompanyFilter] = useState<string>('');
    const [stageFilter, setStageFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0); // Adjusted to zero-indexed for react-paginate
    const perPage: number = 5; // Number of items per page

    const navigate = useNavigate();

    const getStageClasses = (stage: any) => {
        switch(stage) {
            case 'Interview':
                return 'bg-blue-200 text-blue-800'; // Lighter Blue
            case 'Technical Test':
                return 'bg-teal-200 text-teal-800'; // Lighter Teal
            case 'HR Interview':
                return 'bg-orange-200 text-orange-800'; // Lighter Orange
            case 'Portfolio Review':
                return 'bg-slate-200 text-slate-800'; // Lighter Slate Blue
            case 'Screening':
                return 'bg-purple-200 text-purple-800'; // Lighter Purple
            case 'Rejection':
                return 'bg-red-200 text-red-800'; // Lighter Red
            case 'Offer':
                return 'bg-green-200 text-green-800'; // Lighter Green
            case 'Hired':
                    return 'bg-green-200 text-green-800'; // Lighter Green
            default:
                return 'bg-gray-200 text-gray-800'; // Default gray color
        }
    };

    const applications: APPLICATION[] = [
            {
                "id": 1,
                "company": "Ericsson",
                "applied_role": "Software Developer",
                "location": "Toronto",
                "applied_date": "Sept 04, 2023",
                "stage": "Hired",
                "color": "1"
            },
            {
                "id": 2,
                "company": "Google",
                "applied_role": "Data Scientist",
                "location": "San Francisco",
                "applied_date": "Aug 20, 2023",
                "stage": "Interview",
                "color": "5"
            },
            {
                "id": 3,
                "company": "Microsoft",
                "applied_role": "System Engineer",
                "location": "Seattle",
                "applied_date": "Jul 15, 2023",
                "stage": "Screening",
                "color": "7"
            },
            {
                "id": 4,
                "company": "Amazon",
                "applied_role": "Backend Developer",
                "location": "New York",
                "applied_date": "Jun 30, 2023",
                "stage": "Offer",
                "color": "1"
            },
            {
                "id": 5,
                "company": "Facebook",
                "applied_role": "Front-end Developer",
                "location": "Austin",
                "applied_date": "Jul 05, 2023",
                "stage": "Interview",
                "color": "5"
            }               
    ];

    // Function to filter applications based on search term, role, and stage
    const filteredApplications = applications.filter(
        (application) =>
            application.applied_role.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (companyFilter ? application.company === companyFilter : true) &&
            (stageFilter ? application.stage === stageFilter : true)
    );

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

    // Handle role filter change
    const handleCompanyChangeFilter = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCompanyFilter(event.target.value);
        setCurrentPage(0); // Reset page to 0 when role filter changes
    };

    // Handle stage filter change
    const handleStageFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setStageFilter(event.target.value);
        setCurrentPage(0); // Reset page to 0 when stage filter changes
    };

    // Handle page change
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Applications
                </h2>
            </div>

            <div className='flex flex-col md:flex-row mb-5 justify-between items-center gap-6 md:gap-10'>
                {/* Search input */}
                <input
                    type='text'
                    placeholder='Search by role...'
                    className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />

                {/* Role filter dropdown */}
                <select
                    className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={companyFilter}
                    onChange={handleCompanyChangeFilter}>
                    <option value=''>Filter by Company</option>
                    {/* Add options dynamically based on available roles */}
                    {Array.from(new Set(applications.map(a => a.company))).map((company,index) => (
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
                    {Array.from(new Set(applications.map(a => a.stage))).map((stage,index) => (
                        <option key={index} value={stage}>{stage}</option>
                    ))}
                </select>
            </div>


            <div className='overflow-x-auto'>
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
                                                {application.company}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <div className='flex flex-col text-center'>
                                        <p className='text-primary dark:text-white text-sm'>
                                                {application.applied_role}
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
                                            {application.applied_date}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <button
                                            className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${getStageClasses(application.stage)}`}
                                        >
                                            {application.stage}
                                        </button>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <button
                                            onClick={() => navigate(`/application-status`)}
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

            {filteredApplications.length > 0 && (
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

        </div>
    );
};

export default TableTwo;