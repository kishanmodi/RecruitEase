import { CANDIDATE } from '../../types/candidates';
import { Link } from 'react-router-dom';
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
        email: 'alice.johnson@example.com',
        contact: '123-456-7890',
        applicationDate: '2024-05-20',
        stage: 'Technical Test',
        color: '3'
    },
    {
        id: 3,
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
                <h2 className='text-2xl font-semibold dark:text-white '>
                    Candidates
                </h2>
            </div>

            <div className='flex flex-col'>
                <div className='grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5'>
                    <div className='p-2.5 xl:p-5'>
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
                    <div className='hidden p-2.5 text-center sm:block xl:p-5'>
                        <h5 className='text-sm font-medium uppercase xsm:text-base'>
                            Application Date
                        </h5>
                    </div>
                    <div className='hidden p-2.5 text-center sm:block xl:p-5'>
                        <h5 className='text-sm font-medium uppercase xsm:text-base'>
                            Stage
                        </h5>
                    </div>
                </div>

                {candidates.map((candidate, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${
                            key === candidates.length - 1
                                ? ''
                                : 'border-b border-stroke dark:border-strokedark'
                        }`}
                        key={key}>
                        <div className='flex items-center gap-3 p-2.5 xl:p-5'>
                            <div className='flex flex-row'>
                                <p className='hidden text-primary dark:text-white sm:block'>
                                    {candidate.role}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center justify-center p-2.5 xl:p-5'>
                            <div className='flex flex-col'>
                                <p className='hidden text-black dark:text-white sm:block'>
                                    {candidate.name}
                                </p>
                                <p className='hidden text-primary dark:text-white sm:block'>
                                    {candidate.email}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center justify-center p-2.5 xl:p-5'>
                            <p className='text-meta-3'>{candidate.contact}</p>
                        </div>

                        <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
                            <p className='text-black dark:text-white'>
                                {candidate.applicationDate}
                            </p>
                        </div>

                        <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
                            <p
                                className={`text-meta-${candidate.color} border rounded px-1 py-1.5 text-sm`}>
                                {candidate.stage}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableOne;
