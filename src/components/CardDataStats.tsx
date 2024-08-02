import React, { ReactNode } from 'react';

interface CardDataStatsProps {
    jobTitle: string;
    location: string;
    applicants: number;
    daysLeft: number;
    appliedToday: string;
    company_name: string;
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
        <div className='rounded-sm border border-stroke bg-white py-4 px-6 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex h-11.5 items-center rounded-full justify-between w-full'>
                {children}
            </div>

            <div className='mt-4 flex flex-col items-start justify-between'>
                <div className='flex flex-col'>
                    <h3 className='text-lg font-semibold dark:text-white mb-1'>
                        {jobTitle} 
                    </h3>
                    <p className='text-sm text-teal-500  mb-4'>
                        {company_name}
                    </p>
                    <div className='flex flex-row w-full items-center'>
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
                        <p className='text-xs dark:text-white ml-1'>
                            {location}
                        </p>
                    </div>
                </div>
                <div className='flex flex-row justify-between items-evenly w-full'>
                    <h2 className='flex flex-row items-center'>
                        <span className='text-xl font-semibold dark:text-white mr-2'>
                            {applicants}
                        </span>
                        <span className='text-sm  dark:text-white'>
                            Applicants
                        </span>
                    </h2>
                    <div className='flex flex-row items-center'>
                        <h3 className='text-xs  dark:text-white border rounded px-2 py-1.5 text-meta-3'>
                            + {appliedToday} Today
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDataStats;
