import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/Logo-3.png';
import Logo from '../../images/logo/Logo-2.png';
import BrandLogo from '../../images/brand/job.jpg';
const RegisterSwitch: React.FC = () => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full h-full'>
                <div className='flex flex-wrap items-center h-full'>
                    <div className='hidden w-full xl:block xl:w-1/2 h-full'>
                        <div className='py-17.5 px-26 text-center h-full flex flex-col justify-center align-middle, items-center'>
                            <Link
                                className='mb-5.5 inline-block'
                                to='/'>
                                <img
                                    className='hidden dark:block'
                                    src={Logo}
                                    alt='Logo'
                                    style={{ width: '309px', height: '73px' }}
                                />
                                <img
                                    className='dark:hidden'
                                    src={LogoDark}
                                    alt='Logo'
                                    style={{ width: '309px', height: '73px' }}
                                />
                            </Link>

                            <p className='2xl:px-20'>
                                Innovative Hiring Solution for Small Enterprises
                            </p>

                            <span className='mt-15 inline-block'>
                                <img
                                    src={BrandLogo}
                                    alt='Brand Logo'
                                    style={{ scale: '1.2' }}
                                />
                            </span>
                        </div>
                    </div>

                    <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 h-full'>
                        <div className='w-full p-4 sm:p-12.5 xl:p-17.5 h-full flex flex-col justify-center relative'>
                            <Link
                                className='lg:hidden flex justify-center absolute top-10 left-0 w-full'
                                to='/'>
                                <img
                                    className='hidden dark:block'
                                    src={Logo}
                                    alt='Logo'
                                    style={{ width: '206px', height: '48px' }}
                                />
                                <img
                                    className='dark:hidden'
                                    src={LogoDark}
                                    alt='Logo'
                                    style={{ width: '206px', height: '48px' }}
                                />
                            </Link>
                            <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 max-sm:text-center'>
                                Are you a Candidate or an Employer?
                            </h2>

                            <div>
                                <div className='mb-4'>
                                    <Link
                                        to='/signup'
                                        className='flex items-center justify-center rounded-md bg-primary p-4  text-center font-medium text-white hover:bg-opacity-90'>
                                        Candidate Registration
                                    </Link>
                                </div>
                                <p className='mb-4 text-center'>or</p>
                                <div className='mb-5'>
                                    <Link
                                        to='/register'
                                        className='flex items-center justify-center rounded-md bg-primary p-4  text-center font-medium text-white hover:bg-opacity-90'>
                                        Recruiter Registration
                                    </Link>
                                </div>

                                <div className='mt-6 text-center'>
                                    <p>
                                        Already have an account?{' '}
                                        <Link
                                            to='/login'
                                            className='text-primary'>
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterSwitch;
