import React, { ReactNode } from 'react';

interface CardDataStatsProps {
    jobTitle: string;
    location: string;
    applicants: number;
    company_name?: string;
    appliedToday: string;
    children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
    jobTitle,
    location,
    applicants,
    company_name,
    appliedToday,
    children
}) => {
    return (
        <div className='rounded-xl border border-gray-200 bg-white py-6 px-8 shadow-lg dark:border-gray-700 dark:bg-gray-800 transition duration-300'>
            <div className='flex items-center justify-between w-full mb-6'>
                {children}
            </div>

            <div className='flex flex-col'>
                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>
                    {jobTitle}
                </h3>
               {company_name && <p className='text-md text-teal-600 dark:text-teal-400 mb-4'>
                    {company_name}
                </p>}
                <div className='flex items-center mb-6'>
                <svg
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            version='1.1'
                            width='12'
                            height='12'
                            viewBox='0 0 256 256'
                            xmlSpace='preserve'>
                            <defs></defs>
                            <g
                                style={{
                                    stroke: 'none',
                                    strokeWidth: 0,
                                    strokeDasharray: 'none',
                                    strokeLinecap: 'butt',
                                    strokeLinejoin: 'miter',
                                    strokeMiterlimit: 10,
                                    fill: 'none',
                                    fillRule: 'nonzero',
                                    opacity: 1
                                }}
                                transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
                                <path
                                    d='M 45 0 C 25.463 0 9.625 15.838 9.625 35.375 c 0 8.722 3.171 16.693 8.404 22.861 L 45 90 l 26.97 -31.765 c 5.233 -6.167 8.404 -14.139 8.404 -22.861 C 80.375 15.838 64.537 0 45 0 z M 45 48.705 c -8.035 0 -14.548 -6.513 -14.548 -14.548 c 0 -8.035 6.513 -14.548 14.548 -14.548 s 14.548 6.513 14.548 14.548 C 59.548 42.192 53.035 48.705 45 48.705 z'
                                    style={{
                                        stroke: 'none',
                                        strokeWidth: 1,
                                        strokeDasharray: 'none',
                                        strokeLinecap: 'butt',
                                        strokeLinejoin: 'miter',
                                        strokeMiterlimit: 10,
                                        fill: '#000000',
                                        fillRule: 'nonzero',
                                        opacity: 1
                                    }}
                                    transform='matrix(1 0 0 1 0 0)'
                                    strokeLinecap='round'
                                />
                            </g>
                        </svg>
                    <p className='text-sm text-gray-600 dark:text-gray-300 ml-2'>
                        {location}
                    </p>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <span className='text-3xl font-bold text-gray-800 dark:text-white mr-2'>
                            {applicants}
                        </span>
                        <span className='text-lg text-gray-600 dark:text-gray-300'>
                            Applicants
                        </span>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-sm text-white bg-teal-500 rounded-full px-3 py-1'>
                            + {appliedToday} Today
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDataStats;
