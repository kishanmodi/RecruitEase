import { CANDIDATE } from '../../types/candidates';
import { Link } from 'react-router-dom';
const candidates: CANDIDATE[] = [
    {
        id: 1,
        reqID: 'R-123456',
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
        reqID: 'R-123457',
        role: 'Software Developer',
        name: 'Bob Smith',
        email: 'alice.johnson@example.com',
        contact: '123-456-7890',
        applicationDate: '2024-05-20',
        stage: 'Technical Test',
        color: '3'
    },
    {
        id: 3,
        reqID: 'R-123458',
        role: 'Product Manager',
        name: 'Carol Lee',
        email: 'alice.johnson@example.com',
        contact: '123-456-7890',
        applicationDate: '2024-06-15',
        stage: 'HR Interview',
        color: '5'
    },
    {
        id: 4,
        reqID: 'R-123459',
        role: 'UX Designer',
        name: 'David Brown',
        email: 'alice.johnson@example.com',
        contact: '123-456-7890',
        applicationDate: '2024-06-10',
        stage: 'Portfolio Review',
        color: '7'
    },
    {
        id: 5,
        reqID: 'R-123460',
        role: 'QA Engineer',
        name: 'Eve Davis',
        email: 'alice.johnson@example.com',
        contact: '123-456-7890',
        applicationDate: '2024-05-25',
        stage: 'Initial Screening',
        color: '1'
    }
];

const TableOne = () => {
    return (
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Candidates
                </h2>
                <div className='text-primary font-bold'>
                    <Link to='/candidates'>
                        <a className=''>See All</a>
                    </Link>
                </div>
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

                    {candidates.length > 0 ? candidates.map((candidate,key) => (
                                <div
                                    className={`grid grid-cols-6 min-w-[850px] ${key === candidates.length - 1
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
                                            className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${candidate.color === '1'
                                                    ? 'bg-green-100 text-green-800'
                                                    : candidate.color === '3'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : candidate.color === '5'
                                                            ? 'bg-orange-100 text-orange-800'
                                                            : 'bg-red-100 text-red-800'
                                                }`}>
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
                            )
                    ) : (
                        <div className='p-2.5 xl:p-5 text-center'>
                            <p className='text-gray-500 dark:text-gray-400'>
                                No candidates found.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableOne;
