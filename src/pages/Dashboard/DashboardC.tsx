import React,{useState,useEffect} from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import {Link} from 'react-router-dom';
import {BsBoxArrowUpRight} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import TableTwo from '../CApplications/ApplicationsList';
import {useAuth} from '../../context/AppContext';
import Loader from '../../common/Loader';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [jobs,setJobs] = useState<any>([]);
    const [dashboardJobs,setDashboardJobs] = useState<any>([]);
    const {getRecentJobs} = useAuth();
    const [loading,setLoading] = useState(false);

    const getJobs = async () => {
        try {
            setLoading(true);
            const response = await getRecentJobs();
            setJobs(response.jobs);
        } catch(error) {
            console.log('Error fetching jobs',error);
        }
        setLoading(false);
    }
    useEffect(() => {
        getJobs();
    },[]);

    useEffect(() => {
        if(jobs.length > 0) {
            setDashboardJobs(jobs.slice(0,10));
        }
    },[jobs]);

    const getRandomColor = () => {
        const colors = [
            '#FFB800',
            '#FF4D4F',
            '#40A9FF',
            '#36CFC9',
            '#9254DE',
            '#F759AB',
            '#FF7A45',
            '#00C1DE',
            '#4482FF',
            '#F5317F',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <DefaultLayout>
            {loading && <Loader />}
            <div className='flex flex-row mb-5 justify-between items-center px-4'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Current Openings ({dashboardJobs.length})
                </h2>
                <div className='text-primary font-bold'>
                    <Link to='/recent-jobs'>
                        <span className='cursor-pointer'>See All</span>
                    </Link>
                </div>
            </div>

            {dashboardJobs.length !== 0 ?
                <div className='overflow-x-auto'>
                    <div className='flex flex-nowrap space-x-4 md:space-x-6 xl:space-x-7.5'>
                        {dashboardJobs.map((job: {
                            applied_today: string;
                            num_applicants: number; job_title: string; city: any; location: any; deadline: string | number | Date; posting_id: string;
                        },index: React.Key | null | undefined) => (
                            <div key={index} className='min-w-[350px]'>
                                <CardDataStats
                                    jobTitle={job.job_title}
                                    location={` ${job.location}`}
                                    applicants={job.num_applicants} // Fixed value
                                    daysLeft={Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                                    appliedToday={""+job.applied_today} // Fixed value
                                >
                                    <svg
                                        width='36'
                                        height='36'
                                        viewBox='0 0 36 36'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <rect
                                            width='36'
                                            height='36'
                                            rx='8'
                                            fill={getRandomColor()}
                                        />
                                        <path
                                            d='M14.5352 23.5125V14.7433M20.9674 23.5125V14.7433M15.0299 14.2561V12.3074C15.0299 11.7692 15.473 11.333 16.0195 11.333H19.4831C20.0296 11.333 20.4727 11.7692 20.4727 12.3074V14.2561M12.0612 23.9997H23.9362C25.0293 23.9997 25.9154 23.1272 25.9154 22.051V16.2048C25.9154 15.1286 25.0293 14.2561 23.9362 14.2561H12.0612C10.9681 14.2561 10.082 15.1286 10.082 16.2048V22.051C10.082 23.1272 10.9681 23.9997 12.0612 23.9997Z'
                                            stroke='white'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                        />
                                    </svg>


                                    <div className='cursor-pointer'>
                                        {/* Apply Icon */}
                                        <Link to={`/apply/${job.posting_id}`}>
                                            <BsBoxArrowUpRight className='text-primary text-2xl' />
                                        </Link>
                                    </div>
                                </CardDataStats>
                            </div>
                        ))}
                    </div>
                </div> :
                <div className="flex flex-col items-center justify-center h-full p-4 mt-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            No Jobs Available
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            It looks like there are currently no job postings available.
                        </p>
                    </div>
                </div>}

            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <div className='col-span-12 xl:col-span-16'>
                    <TableTwo dashboard={true} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
