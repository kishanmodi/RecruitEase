import DefaultLayout from '../../layout/DefaultLayout';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {BsCopy,BsFillTrashFill} from 'react-icons/bs';
import SingleOption from '../../components/Forms/SelectGroup/SingleOption';
import MultiSelectJobPosting from '../../components/Forms/MultiSelectJobPosting';
import SoftSkillOptions from './SoftSkillsOptions.json';
import TechSkillOptions from './TechSkillsOptions.json';
import {Job} from '../../types/job';
import {useAuth} from '../../context/AppContext';
import {Option} from '../../types/option';
import Swtich from '../../components/Switchers/Switch';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

interface JobPostingProps {
    edit: boolean;
}
const JobPosting = (props: JobPostingProps) => {
    const navigate = useNavigate();
    const {edit} = props;
    const {createJobPosting,refresh_token,getJob,currentJobId: jobId,currentJobId,deleteJob,updateJob,setCurrentJobId} = useAuth();

    const [jobTitle,setJobTitle] = useState('');
    const [jobDepartment,setJobDepartment] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');
    const [postingDate,setPostingDate] = useState(new Date().toLocaleDateString('en-US'));
    const [deadline,setDeadline] = useState(addDaysToDate(30));
    const [softSkills,setSoftSkills] = useState<Option[]>(SoftSkillOptions);
    const [technicalSkills,setTechnicalSkills] =
        useState<Option[]>(TechSkillOptions);

    const [questions,setQuestions] = useState([
        {question: 'Tell me about yourself?'}
    ]);
    const [recruiterName,setRecruiterName] = useState('');
    const [recruiterEmail,setRecruiterEmail] = useState('');
    const [companyDescription,setCompanyDescription] = useState('');
    const [jobDescription,setJobDescription] = useState('');
    const [qualifications,setQualifications] = useState('');
    const [keyRequirements,setKeyRequirements] = useState('');
    const [niceToHave,setNiceToHave] = useState('');
    const [otherRemarks,setOtherRemarks] = useState('');
    const [isActive,setIsActive] = useState(true);
    const [jobPostingLink,setJobPostingLink] = useState('');

    const [isEditOrNew,setIsEditOrNew] = useState(edit);

    const [job,setJob] = useState<Job>({} as Job);

    const [showDeleteModal,setShowDeleteModal] = useState(false);

    useEffect(() => {
        if(!edit) {
            emptyAllFields();
            setCurrentJobId('');
            setIsEditOrNew(false);
        }

        if(edit && !jobId) {
            navigate('/job');
        }
        return () => {
            emptyAllFields();
            setIsEditOrNew(false);
            if(window.location.pathname !== '/edit-job') {
                setCurrentJobId('');
            }
        }


    },[edit]);


    // Get Job details if we are editing an existing job
    useEffect(() => {
        if(jobId) {
            getJob(jobId)
                .then((data) => {
                    if(data.success) {
                        setJob(data.job || ({} as Job));
                    } else {
                        console.error('Failed to get job details');
                    }
                })
                .catch((error) => {
                    console.error('Failed to get job details:',error);
                });
        }
    },[jobId]);

    const emptyAllFields = () => {
        setJobTitle('');
        setJobDepartment('');
        setCity('');
        setCountry('');
        setPostingDate(new Date().toISOString());
        setDeadline(addDaysToDate(30));
        setSoftSkills(SoftSkillOptions);
        setTechnicalSkills(TechSkillOptions);
        setQuestions([{question: 'Tell me about yourself?'}]);
        setRecruiterName('');
        setRecruiterEmail('');
        setCompanyDescription('');
        setJobDescription('');
        setQualifications('');
        setKeyRequirements('');
        setNiceToHave('');
        setOtherRemarks('');
        setIsActive(true);
        setJobPostingLink('');
        setJob({} as Job);
    }


    useEffect(() => {
        // If job is not empty, set the values
        if(Object.keys(job).length !== 0) {
            setJobTitle(job.title);
            setJobDepartment(job.department);
            setCity(job.city);
            setCountry(job.country);
            setPostingDate(new Date(job.posting_date).toLocaleDateString());
            setDeadline(new Date(job.deadline).toLocaleDateString() || addDaysToDate(30));
            setSoftSkills(job.soft_skills);
            setTechnicalSkills(job.technical_skills);
            setQuestions(
                job.questions.map((question) => ({question: question}))
            );
            setRecruiterName(job.recruiter_name);
            setRecruiterEmail(job.recruiter_email);
            setCompanyDescription(job.about_company);
            setJobDescription(job.about_job);
            setQualifications(job.qualification);
            setKeyRequirements(job.key_requirements);
            setNiceToHave(job.nice_to_have || '');
            setOtherRemarks(job.other_remarks || '');
            setIsActive(job.is_active);
            const jobPostingLink = job.posting_link ? `${window.location.origin}/${job.posting_link}` : '';
            setJobPostingLink(jobPostingLink);

            setIsEditOrNew(true);
        }
    },[job]);

    const deleteQuestion = (index: number) => {
        if(questions.length === 1) {
            toast.error('At least one question is required.');
            return;
        }
        const newQuestions = questions.filter((_,i) => i !== index);
        setQuestions([...newQuestions]);
    };

    function addDaysToDate(days: number) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);
        return currentDate.toISOString();
    }

    const updateQuestion = (index: number,value: string) => {
        const newQuestions = questions.map((question,i) => {
            if(i === index) {
                return {question: value};
            }
            return question;
        });
        setQuestions([...newQuestions]);
    };



    const handleSubmit = async () => {
        const job: Job = {
            id: jobId || '',
            title: jobTitle,
            department: jobDepartment,
            city,
            country,
            posting_date: new Date(postingDate),// Convert ISO string to Date
            deadline: new Date(deadline), // Convert ISO string to Date
            soft_skills: softSkills.map((skill) => ({
                value: skill.value,
                selected: skill.selected,
                text: skill.text
            })),
            technical_skills: technicalSkills.map((skill) => ({
                value: skill.value,
                selected: skill.selected,
                text: skill.text
            })),
            questions: questions.map((q) => q.question),
            recruiter_name: recruiterName,
            recruiter_email: recruiterEmail,
            about_company: companyDescription,
            about_job: jobDescription,
            qualification: qualifications,
            key_requirements: keyRequirements,
            nice_to_have: niceToHave,
            other_remarks: otherRemarks,
            is_active: isActive,
        };

        // Verify if all required fields are filled

        if(
            !jobTitle ||
            !jobDepartment ||
            !city ||
            !country ||
            !postingDate ||
            !deadline ||
            !softSkills ||
            !technicalSkills ||
            !questions ||
            !recruiterName ||
            !recruiterEmail ||
            !companyDescription ||
            !jobDescription ||
            !qualifications ||
            !keyRequirements
        ) {
            toast.error('Please fill all required fields.');
            return;
        }


        if(!edit && !jobId) {
            const data = await createJobPosting({job: job,refresh_token});

            if(data.success) {
                setIsEditOrNew(true);
                const jobPostingLink = `${window.location.origin}/${data.posting_link}`;

                setJobPostingLink(jobPostingLink);
            } else {
                console.error('Failed to post job.');
            }
        } else if(jobId) {
            const success = await updateJob(job);
            if(success) {
                setIsEditOrNew(true);
            } else {
                console.error('Failed to update job.');
            }
        } else {
            toast.error('Job ID is missing.');
        }


    };

    // Delete Job Posting
    const handleDeletePosting = () => {
        deleteJob(jobId)
    }
    const handleDeletePostingModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    return (
        <DefaultLayout>
            <h2 className='text-2xl font-semibold text-black dark:text-white mb-3'>
                Job Posting
            </h2>
            <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    {/* <!-- Input Fields --> */}
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Job Information
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Job Title
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter Job Title'
                                    value={jobTitle}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setJobTitle(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Job Department
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter Department'
                                    disabled={isEditOrNew}
                                    value={jobDepartment}
                                    onChange={(e) =>
                                        setJobDepartment(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Job Location Information
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    City
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter City'
                                    value={city}
                                    disabled={isEditOrNew}
                                    onChange={(e) => setCity(e.target.value)}
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                            <SingleOption
                                label={'Country'}
                                options={['USA','UK','Canada']}
                                selectedOption={country}
                                disabled={isEditOrNew}
                                setSelectedOption={(value) =>
                                    country == 'Select Country'
                                        ? setCountry('')
                                        : setCountry(value)
                                }
                                icon={
                                    <svg
                                        width='20'
                                        height='20'
                                        viewBox='0 0 20 20'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z'
                                                fill='#637381'></path>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z'
                                                fill='#637381'></path>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z'
                                                fill='#637381'></path>
                                        </g>
                                    </svg>
                                }
                            />
                        </div>
                    </div>

                    {/* <!-- Time and date --> */}
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Posting Date & Deadline Time
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <DatePickerOne
                                label={'Posting Date'}
                                disabled={isEditOrNew}
                                selectedDate={postingDate}
                                setSelectedDate={setPostingDate}
                            />
                            <DatePickerOne
                                label={'Deadline'}
                                selectedDate={deadline}
                                disabled={isEditOrNew}
                                setSelectedDate={setDeadline}
                            />
                        </div>
                    </div>

                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Soft Skills
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <MultiSelectJobPosting
                                id='multiSelectSoft'
                                label={'Soft Skills'}
                                options={softSkills}
                                disabled={isEditOrNew}
                                setOptions={setSoftSkills}
                            />
                        </div>
                    </div>

                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Technical Skills
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <MultiSelectJobPosting
                                id='multiSelectTech'
                                label={'Technical Skills'}
                                options={technicalSkills}
                                disabled={isEditOrNew}
                                setOptions={setTechnicalSkills}
                            />
                        </div>
                    </div>

                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Soft Skill Assessment Questions
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            {questions.map((question,index) => {
                                return (
                                    <div key={index}>
                                        <label className='mb-3 block text-black dark:text-white'>
                                            Question-{index + 1}
                                        </label>
                                        <div className='flex gap-2'>
                                            <input
                                                type='text'
                                                placeholder='Enter Question'
                                                disabled={isEditOrNew}
                                                value={question.question}
                                                onChange={(e) => {
                                                    updateQuestion(
                                                        index,
                                                        e.target.value
                                                    );
                                                }}
                                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                            />
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    !isEditOrNew &&
                                                    deleteQuestion(index)
                                                }
                                                className={`inline-flex items-center justify-center rounded-md border py-4 px-10 text-center font-medium transition  ${isEditOrNew
                                                    ? 'cursor-default text-gray-500 bg-whiter dark:bg-black border-stroke dark:border-form-strokedark'
                                                    : 'border-black text-black hover:bg-opacity-90 focus:border-primary active:border-primary dark:bg-form-input dark:focus:border-primary dark:text-white'
                                                    } lg:px-4 xl:px-4`}>
                                                <BsFillTrashFill
                                                    className='delete-btn cursor-pointer'
                                                    onClick={() =>
                                                        !isEditOrNew &&
                                                        deleteQuestion(index)
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            <button
                                type='button'
                                className={`mb-2 flex items-center justify-center rounded border py-4 px-10 text-center font-medium transition ${isEditOrNew
                                    ? 'cursor-default text-gray-500 bg-whiter dark:bg-black border-stroke dark:border-form-strokedark'
                                    : 'border-black text-black hover:bg-opacity-90 focus:border-primary active:border-primary dark:bg-form-input dark:focus:border-primary dark:text-white'
                                    } lg:px-8 xl:px-10`}
                                onClick={() => {
                                    if(isEditOrNew) return;
                                    const newQuestions = [
                                        ...questions,
                                        {question: ''}
                                    ];
                                    setQuestions(newQuestions);
                                }}>
                                Add New Question
                            </button>
                        </div>
                    </div>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Recruiter Contact Information
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Recruiter Name
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter Recruiter Name'
                                    value={recruiterName}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setRecruiterName(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Recruiter Email
                                </label>
                                <input
                                    type='email'
                                    placeholder='Enter Recruiter Email'
                                    value={recruiterEmail}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setRecruiterEmail(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-9'>
                    {/* <!-- Textarea Fields --> */}
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Job Description
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    About the Company
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Company Description'
                                    value={companyDescription}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setCompanyDescription(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    About the Job
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Job Description here...'
                                    value={jobDescription}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setJobDescription(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Qaulifications
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Qualifications here...'
                                    value={qualifications}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setQualifications(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Key Requirements
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Key Requirements'
                                    value={keyRequirements}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setKeyRequirements(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Nice to have
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Nice to have information here...'
                                    value={niceToHave}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setNiceToHave(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Other Remarks
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Remarks'
                                    value={otherRemarks}
                                    disabled={isEditOrNew}
                                    onChange={(e) =>
                                        setOtherRemarks(e.target.value)
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-row justify-center gap-5 items-center'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Job Posting Status
                            </h3>
                            <Swtich
                                isActive={isActive}
                                setIsActive={setIsActive}
                                disabled={isEditOrNew}
                            />
                        </div>
                    </div>

                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Job Posting Link
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='flex gap-2'>
                                <button
                                    type='button'
                                    onClick={() => {
                                        if(!jobPostingLink) return;
                                        navigator.clipboard.writeText(
                                            jobPostingLink
                                        );
                                        toast.success('Link copied to clipboard');
                                    }}
                                    className={
                                        'rounded-lg border-[1.5px] border-stroke bg-transparent py-4 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                    }>
                                    <BsCopy className='delete-btn cursor-pointer ' />
                                </button>
                                <input
                                    type='text'
                                    placeholder='https://www.recruitease.com/apply/M28-123455-2345624354VGHJB-BHJJH'
                                    value={jobPostingLink}
                                    disabled={true}
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-transparent dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 mx-5'>
                        {/* Delete */}
                        {currentJobId && <button className='inline-flex items-center justify-center rounded-md bg-red-600 py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4' onClick={() => handleDeletePostingModal()}>
                            Delete
                        </button>}
                        {currentJobId && <button className='inline-flex items-center justify-center rounded-md bg-teal-600	 py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4' onClick={() => setIsEditOrNew(!isEditOrNew)}>
                            {isEditOrNew ? 'Edit' : 'Cancel'}
                        </button>}
                        {!isEditOrNew && <button
                            disabled={isEditOrNew}
                            className='inline-flex items-center justify-center rounded-md bg-primary py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5'
                            onClick={handleSubmit}>
                            Submit
                        </button>}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div x-show="modalOpen" x-transition="" className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
                    <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15">
                        <span className="mx-auto inline-block">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.1" width="60" height="60" rx="30" fill="#DC2626"></rect>
                                <path d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                            Delete Job Posting
                        </h3>
                        <p className="mb-10 font-medium">
                            Are you sure you want to delete this job posting?
                            This action cannot be undone. Please confirm your decision.
                        </p>
                        <div className="-mx-3 flex flex-wrap gap-y-4">
                            <div className="w-full px-3 2xsm:w-1/2">
                                <button className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                                    onClick={() => setShowDeleteModal(false)}>
                                    Cancel

                                </button>
                            </div>
                            <div className="w-full px-3 2xsm:w-1/2">
                                <button className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                                    onClick={() => {
                                        // Handle delete action
                                        handleDeletePosting();
                                        setShowDeleteModal(false);
                                    }}
                                >
                                    Delete

                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            )}

        </DefaultLayout >
    );
};

export default JobPosting;
