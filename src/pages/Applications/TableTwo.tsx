import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface APPLICATION {
    id: number;
    company: string;
    applied_role: string;
    location: string;
    applied_date: string;
    stage: "Hired" | "Screening" | "Interview" | "Offer";
    color: string;
}

const TableTwo = ({}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [companyFilter, setRoleFilter] = useState<string>('');
    const [stageFilter, setStageFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0); // Adjusted to zero-indexed for react-paginate
    const perPage: number = 5; // Number of items per page

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
    const filteredCandidates = applications.filter(
        (candidate) =>
            candidate.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (companyFilter ? candidate.company === companyFilter : true) &&
            (stageFilter ? candidate.stage === stageFilter : true)
    );

    // Pagination logic
    const offset: number = currentPage * perPage;
    const pageCount: number = Math.ceil(filteredCandidates.length / perPage);

    // Handle search term change
    const handleSearchTermChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0); // Reset page to 0 when search term changes
    };

    // Handle role filter change
    const handleRoleFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRoleFilter(event.target.value);
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
                    Jobs Applied
                </h2>
            </div>

            <div className='flex flex-row mb-5 justify-between items-center gap-10'>
                {/* Search input */}
                <input
                    type='text'
                    placeholder='Search by role...'
                    className='w-full  rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />

                {/* Role filter dropdown */}
                <select
                    className='min-w-20vw rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={companyFilter}
                    onChange={handleRoleFilterChange}>
                    <option value=''>Filter by Company</option>
                    {/* Replace with options based on your data */}
                </select>

                {/* Stage filter dropdown */}
                <select
                    className='min-w-20vw rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={stageFilter}
                    onChange={handleStageFilterChange}>
                    <option value=''>Filter by Stage</option>
                    {/* Replace with options based on your data */}
                </select>
            </div>

            <div className='overflow-x-auto'>
                <div className='min-w-[850px]'>
                    <div className='grid grid-cols-5 min-w-max rounded-sm bg-gray-2 dark:bg-meta-4'>
                        <div className='p-2.5 xl:p-5'>
                            <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                Company
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
                                Application Date
                            </h5>
                        </div>
                        <div className=' p-2.5 text-center xl:p-5'>
                            <h5 className='text-sm font-medium uppercase xsm:text-base'>
                                Stage
                            </h5>
                        </div>
                    </div>

                    {filteredCandidates.length > 0 ? (
                        filteredCandidates
                            .slice(offset, offset + perPage)
                            .map((candidate, key) => (
                                <div
                                    className={`grid grid-cols-5 min-w-[850px] ${
                                        key === filteredCandidates.length - 1
                                            ? ''
                                            : 'border-b border-stroke dark:border-strokedark'
                                    }`}
                                    key={key}>
                                    <div className='flex items-center gap-3 p-2.5 xl:p-5'>
                                        <div className='flex flex-row'>
                                            <p className='text-primary dark:text-white'>
                                                {candidate.company}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <div className='flex flex-col'>
                                            <p className='text-black dark:text-white'>
                                                {candidate.applied_role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <p className='text-meta-3'>
                                            {candidate.location}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <p className='text-black dark:text-white'>
                                            {candidate.applied_date}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <p
                                            className={`text-meta-${candidate.color} border rounded px-1 py-1.5 text-sm`}>
                                            {candidate.stage}
                                        </p>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className='flex justify-center items-center p-5 m-[150px]'>
                            <p className='text-black dark:text-white'>
                                No Candidates Found
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}

            {filteredCandidates.length > 0 && (
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
        </div>
    );
};

export default TableTwo;