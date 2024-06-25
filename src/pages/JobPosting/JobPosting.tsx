import DefaultLayout from '../../layout/DefaultLayout';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import MultiSelect from '../../components/Forms/MultiSelect';
const JobPosting = () => {
    const [questions, setQuestions] = useState([{ question: 'Test1' }]);

    const deleteQuestion = (index: number) => {
        console.log('Deleting index:', index);
        const newQuestions = questions.filter((_, i) => i !== index);
        console.log('New questions:', newQuestions);
        setQuestions([...newQuestions]);
    };

    const updateQuestion = (index: number, value: string) => {
        const newQuestions = questions.map((question, i) => {
            if (i === index) {
                return { question: value };
            }
            return question;
        });
        setQuestions([...newQuestions]);
    };

    return (
        <DefaultLayout>
            <h2 className='text-2xl font-semibold text-black dark:text-white mb-3'>
                Create Job Posting
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
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                            <SelectGroupTwo />
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
                            <DatePickerOne label={'Posting Date'} />
                            <DatePickerOne label={'Deadline'} />
                        </div>
                    </div>

                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Soft Skills
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <MultiSelect
                                id='multiSelect'
                                label={''}
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
                            <MultiSelect
                                id='multiSelect'
                                label={''}
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
                            {questions.map((question, index) => {
                                return (
                                    <div key={index}>
                                        <label className='mb-3 block text-black dark:text-white'>
                                            Question-{index + 1}
                                        </label>
                                        <div className='flex gap-2'>
                                            <input
                                                type='text'
                                                placeholder='Enter Question'
                                                value={question.question}
                                                onChange={e => {
                                                    updateQuestion(
                                                        index,
                                                        e.target.value
                                                    );
                                                }}
                                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                            />
                                            <Link
                                                to='#'
                                                className='inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-4 xl:px-4'>
                                                <BsFillTrashFill
                                                    className='delete-btn cursor-pointer'
                                                    onClick={() =>
                                                        deleteQuestion(index)
                                                    }
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}

                            <Link
                                to='#'
                                className='inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10'
                                onClick={() => {
                                    const newQuestions = [
                                        ...questions,
                                        { question: '' }
                                    ];
                                    setQuestions([...newQuestions]);
                                }}>
                                Add New Question
                            </Link>
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
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    About the Job
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Job Description here...'
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Qaulifications
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Qualifications here...'
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Key Requirements
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Key Requirements'
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Nice to have
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Nice to have information here...'
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Other Remarks
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder='Enter Remarks'
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'></textarea>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 mx-5'>
                        <Link
                            to='/'
                            className='inline-flex items-center justify-center rounded-md bg-primary py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5'>
                            Submit
                        </Link>
                        <Link
                            to='/'
                            className='inline-flex items-center justify-center rounded-md bg-teal-600	 py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4'>
                            Reset
                        </Link>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default JobPosting;
