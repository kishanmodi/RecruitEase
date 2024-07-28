import React,{useState} from 'react';
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom';

interface CANDIDATE {
    id: number;
    role: string;
    name: string;
    email: string;
    contact: string;
    applicationDate: string;
    stage: string;
    color: string;
}

const TableOne = ({}) => {
    const navigate = useNavigate();
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [roleFilter,setRoleFilter] = useState<string>('');
    const [stageFilter,setStageFilter] = useState<string>('');
    const [currentPage,setCurrentPage] = useState<number>(0);

    const perPage: number = 5;

    const candidates: CANDIDATE[] = [
        {
            id: 1,
            role: 'Software Engineer',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            contact: '123-456-7890',
            applicationDate: '2024-06-01',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 2,
            role: 'Software Developer',
            name: 'Bob Smith',
            email: 'bob.smith@example.com',
            contact: '123-456-7890',
            applicationDate: '2024-05-20',
            stage: 'Technical Test',
            color: '3'
        },
        {
            id: 3,
            role: 'Product Manager',
            name: 'Carol Lee',
            email: 'carol.lee@example.com',
            contact: '123-456-7890',
            applicationDate: '2024-06-15',
            stage: 'HR Interview',
            color: '5'
        },
        {
            id: 4,
            role: 'UX Designer',
            name: 'David Brown',
            email: 'david.brown@example.com',
            contact: '123-456-7890',
            applicationDate: '2024-06-10',
            stage: 'Portfolio Review',
            color: '7'
        },
        {
            id: 5,
            role: 'QA Engineer',
            name: 'Eve Davis',
            email: 'eve.davis@example.com',
            contact: '123-456-7890',
            applicationDate: '2024-05-25',
            stage: 'Initial Screening',
            color: '1'
        },
        {
            id: 6,
            role: 'Marketing Specialist',
            name: 'Frank Wilson',
            email: 'frank.wilson@example.com',
            contact: '123-456-7891',
            applicationDate: '2024-07-01',
            stage: 'Rejection',
            color: '1'
        },
        {
            id: 7,
            role: 'Data Analyst',
            name: 'Grace Martinez',
            email: 'grace.martinez@example.com',
            contact: '123-456-7892',
            applicationDate: '2024-07-10',
            stage: 'Offer',
            color: '1'
        },
        {
            id: 8,
            role: 'Sales Manager',
            name: 'Henry Clark',
            email: 'henry.clark@example.com',
            contact: '123-456-7893',
            applicationDate: '2024-07-15',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 9,
            role: 'Content Writer',
            name: 'Ivy Adams',
            email: 'ivy.adams@example.com',
            contact: '123-456-7894',
            applicationDate: '2024-07-20',
            stage: 'Technical Test',
            color: '1'
        },
        {
            id: 10,
            role: 'Customer Support',
            name: 'Jack Turner',
            email: 'jack.turner@example.com',
            contact: '123-456-7895',
            applicationDate: '2024-07-25',
            stage: 'HR Interview',
            color: '1'
        },
        {
            id: 11,
            role: 'DevOps Engineer',
            name: 'Kara Miller',
            email: 'kara.miller@example.com',
            contact: '123-456-7896',
            applicationDate: '2024-06-05',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 12,
            role: 'Business Analyst',
            name: 'Liam Johnson',
            email: 'liam.johnson@example.com',
            contact: '123-456-7897',
            applicationDate: '2024-06-12',
            stage: 'Technical Test',
            color: '1'
        },
        {
            id: 13,
            role: 'Network Engineer',
            name: 'Mia Williams',
            email: 'mia.williams@example.com',
            contact: '123-456-7898',
            applicationDate: '2024-06-18',
            stage: 'HR Interview',
            color: '1'
        },
        {
            id: 14,
            role: 'Systems Analyst',
            name: 'Noah Jones',
            email: 'noah.jones@example.com',
            contact: '123-456-7899',
            applicationDate: '2024-06-22',
            stage: 'Portfolio Review',
            color: '1'
        },
        {
            id: 15,
            role: 'Project Coordinator',
            name: 'Olivia Brown',
            email: 'olivia.brown@example.com',
            contact: '123-456-7800',
            applicationDate: '2024-07-01',
            stage: 'Initial Screening',
            color: '1'
        },
        {
            id: 16,
            role: 'Web Developer',
            name: 'Paul Davis',
            email: 'paul.davis@example.com',
            contact: '123-456-7801',
            applicationDate: '2024-07-03',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 17,
            role: 'Graphic Designer',
            name: 'Quinn Wilson',
            email: 'quinn.wilson@example.com',
            contact: '123-456-7802',
            applicationDate: '2024-07-07',
            stage: 'Technical Test',
            color: '1'
        },
        {
            id: 18,
            role: 'HR Manager',
            name: 'Riley Thompson',
            email: 'riley.thompson@example.com',
            contact: '123-456-7803',
            applicationDate: '2024-07-10',
            stage: 'HR Interview',
            color: '1'
        },
        {
            id: 19,
            role: 'Content Strategist',
            name: 'Samantha Martinez',
            email: 'samantha.martinez@example.com',
            contact: '123-456-7804',
            applicationDate: '2024-07-12',
            stage: 'Portfolio Review',
            color: '1'
        },
        {
            id: 20,
            role: 'SEO Specialist',
            name: 'Thomas Robinson',
            email: 'thomas.robinson@example.com',
            contact: '123-456-7805',
            applicationDate: '2024-07-15',
            stage: 'Initial Screening',
            color: '1'
        },
        {
            id: 21,
            role: 'Software Architect',
            name: 'Ursula Harris',
            email: 'ursula.harris@example.com',
            contact: '123-456-7806',
            applicationDate: '2024-07-17',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 22,
            role: 'IT Support Specialist',
            name: 'Victor Clark',
            email: 'victor.clark@example.com',
            contact: '123-456-7807',
            applicationDate: '2024-07-20',
            stage: 'Technical Test',
            color: '1'
        },
        {
            id: 23,
            role: 'Operations Manager',
            name: 'Wendy Lewis',
            email: 'wendy.lewis@example.com',
            contact: '123-456-7808',
            applicationDate: '2024-07-22',
            stage: 'HR Interview',
            color: '1'
        },
        {
            id: 24,
            role: 'Data Scientist',
            name: 'Xander Walker',
            email: 'xander.walker@example.com',
            contact: '123-456-7809',
            applicationDate: '2024-07-25',
            stage: 'Portfolio Review',
            color: '1'
        },
        {
            id: 25,
            role: 'Backend Developer',
            name: 'Yvonne Scott',
            email: 'yvonne.scott@example.com',
            contact: '123-456-7810',
            applicationDate: '2024-07-28',
            stage: 'Initial Screening',
            color: '1'
        },
        {
            id: 26,
            role: 'Frontend Developer',
            name: 'Zachary Adams',
            email: 'zachary.adams@example.com',
            contact: '123-456-7811',
            applicationDate: '2024-07-30',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 27,
            role: 'DevOps Engineer',
            name: 'Ava Carter',
            email: 'ava.carter@example.com',
            contact: '123-456-7812',
            applicationDate: '2024-08-01',
            stage: 'Technical Test',
            color: '1'
        },
        {
            id: 28,
            role: 'Systems Engineer',
            name: 'Benjamin Evans',
            email: 'benjamin.evans@example.com',
            contact: '123-456-7813',
            applicationDate: '2024-08-03',
            stage: 'HR Interview',
            color: '1'
        },
        {
            id: 29,
            role: 'Business Development Manager',
            name: 'Charlotte Green',
            email: 'charlotte.green@example.com',
            contact: '123-456-7814',
            applicationDate: '2024-08-05',
            stage: 'Portfolio Review',
            color: '1'
        },
        {
            id: 30,
            role: 'Product Designer',
            name: 'Daniel King',
            email: 'daniel.king@example.com',
            contact: '123-456-7815',
            applicationDate: '2024-08-07',
            stage: 'Initial Screening',
            color: '1'
        },
        {
            id: 31,
            role: 'Customer Success Manager',
            name: 'Emily Harris',
            email: 'emily.harris@example.com',
            contact: '123-456-7816',
            applicationDate: '2024-08-10',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 32,
            role: 'Sales Engineer',
            name: 'Frank Thompson',
            email: 'frank.thompson@example.com',
            contact: '123-456-7817',
            applicationDate: '2024-08-12',
            stage: 'Technical Test',
            color: '1'
        },
        {
            id: 33,
            role: 'UX Researcher',
            name: 'Grace Wilson',
            email: 'grace.wilson@example.com',
            contact: '123-456-7818',
            applicationDate: '2024-08-15',
            stage: 'HR Interview',
            color: '1'
        },
        {
            id: 34,
            role: 'Digital Marketer',
            name: 'Henry Martinez',
            email: 'henry.martinez@example.com',
            contact: '123-456-7819',
            applicationDate: '2024-08-18',
            stage: 'Portfolio Review',
            color: '1'
        },
        {
            id: 35,
            role: 'Content Editor',
            name: 'Iris Moore',
            email: 'iris.moore@example.com',
            contact: '123-456-7820',
            applicationDate: '2024-08-20',
            stage: 'Initial Screening',
            color: '1'
        },
        {
            id: 36,
            role: 'Cloud Engineer',
            name: 'Jack White',
            email: 'jack.white@example.com',
            contact: '123-456-7821',
            applicationDate: '2024-08-22',
            stage: 'Interview',
            color: '1'
        },
        {
            id: 37,
            role: 'Data Engineer',
            name: 'Katherine Miller',
            email: 'katherine.miller@example.com',
            contact: '123-456-7822',
            applicationDate: '2024-08-25',
            stage: 'Technical Test',
            color: '1'
        },
        {
            id: 38,
            role: 'IT Consultant',
            name: 'Liam Adams',
            email: 'liam.adams@example.com',
            contact: '123-456-7823',
            applicationDate: '2024-08-27',
            stage: 'HR Interview',
            color: '1'
        },
        {
            id: 39,
            role: 'Cybersecurity Analyst',
            name: 'Mia Robinson',
            email: 'mia.robinson@example.com',
            contact: '123-456-7824',
            applicationDate: '2024-08-30',
            stage: 'Portfolio Review',
            color: '1'
        },
        {
            id: 40,
            role: 'AI Specialist',
            name: 'Noah Scott',
            email: 'noah.scott@example.com',
            contact: '123-456-7825',
            applicationDate: '2024-09-01',
            stage: 'Initial Screening',
            color: '1'
        }
    ];


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
            case 'Initial Screening':
                return 'bg-purple-200 text-purple-800'; // Lighter Purple
            case 'Rejection':
                return 'bg-red-200 text-red-800'; // Lighter Red
            case 'Offer':
                return 'bg-green-200 text-green-800'; // Lighter Green
            default:
                return 'bg-gray-200 text-gray-800'; // Default gray color
        }
    };

    // Function to filter candidates based on search term, role, and stage
    const filteredCandidates = candidates.filter(
        (candidate) =>
            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (roleFilter ? candidate.role === roleFilter : true) &&
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
    const handlePageChange = ({selected}: {selected: number}) => {
        setCurrentPage(selected);
    };

    return (
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Candidates
                </h2>
            </div>

            <div className='flex flex-col md:flex-row mb-5 justify-between items-center gap-6 md:gap-10'>
                {/* Search input */}
                <input
                    type='text'
                    placeholder='Search by name...'
                    className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />

                {/* Role filter dropdown */}
                <select
                    className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={roleFilter}
                    onChange={handleRoleFilterChange}>
                    <option value=''>Filter by Role</option>
                    {/* Add options dynamically based on available roles */}
                    {Array.from(new Set(candidates.map(c => c.role))).map((role,index) => (
                        <option key={index} value={role}>{role}</option>
                    ))}
                </select>

                {/* Stage filter dropdown */}
                <select
                    className='w-full md:w-1/3 rounded-lg border-[1.5px] border-stroke bg-white py-3.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    value={stageFilter}
                    onChange={handleStageFilterChange}>
                    <option value=''>Filter by Stage</option>
                    {/* Add options dynamically based on available stages */}
                    {Array.from(new Set(candidates.map(c => c.stage))).map((stage,index) => (
                        <option key={index} value={stage}>{stage}</option>
                    ))}
                </select>
            </div>


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

                    {filteredCandidates.length > 0 ? (
                        filteredCandidates
                            .slice(offset,offset + perPage)
                            .map((candidate,key) => (
                                <div
                                    className={`grid grid-cols-6 min-w-[850px] ${key === filteredCandidates.length - 1
                                        ? ''
                                        : 'border-b border-stroke dark:border-strokedark'
                                        }`}
                                    key={key}>
                                    <div className='flex items-center gap-3 p-2.5 xl:p-5'>
                                        <div className='flex flex-row text-center'>
                                            <p className='text-primary dark:text-white text-sm'>
                                                {candidate.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <div className='flex flex-col text-center'>
                                            <p className='text-black dark:text-white text-sm'>
                                                {candidate.name}
                                            </p>
                                            <p className='text-primary dark:text-white text-xs'>
                                                {candidate.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <p className='text-meta-3 text-sm'>
                                            {candidate.contact}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <p className='text-black dark:text-white text-sm'>
                                            {candidate.applicationDate}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <button
                                            className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${getStageClasses(candidate.stage)}`}
                                        >
                                            {candidate.stage}
                                        </button>
                                    </div>

                                    <div className='flex items-center justify-center p-2.5 xl:p-5'>
                                        <button
                                            onClick={() => navigate(`/update-status`)}
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

export default TableOne;
