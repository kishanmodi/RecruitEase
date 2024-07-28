import DefaultLayout from '../../layout/DefaultLayout';
import {useState} from 'react';
import SingleOption from '../../components/Forms/SelectGroup/SingleOption';
import {Editor} from '@tinymce/tinymce-react';
import Swtich from '../../components/Switchers/Switch';
import PdfViewer from '../../components/PDFViewer';

const SendEmail = () => {
    const [status,setStatus] = useState('new application');
    const [sendEmail,setSendEmail] = useState(false);
    const [showResume,setShowResume] = useState(false);
    const [emailContent,setEmailContent] = useState('');

    return (
        <DefaultLayout>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Update Status
                </h2>
            </div>

            <div className='grid grid-cols-1 gap-9 sm:grid-cols-2 mt-10'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Candidate Information
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Candidate Name
                                </label>
                                <input
                                    type='text'
                                    value='Micheal Smith'
                                    disabled
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Candidate Email
                                </label>
                                <input
                                    type='email'
                                    value='micheal@gmail.com'
                                    disabled
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Job Information
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Role
                                </label>
                                <input
                                    type='text'
                                    value='Software Engineer'
                                    disabled
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Location
                                </label>
                                <input
                                    type='text'
                                    value='Toronto, Canada'
                                    disabled
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-9 mt-10'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Application Status
                        </h3>
                    </div>
                    <div className='flex flex-col gap-5.5 p-6.5'>
                        <SingleOption
                            label=''
                            options={['New Application','In Progress','Offered','Rejected']}
                            selectedOption={status}
                            setSelectedOption={setStatus}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" /> </svg>}
                        />
                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-row justify-center gap-5 items-center'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Send Email Notification
                        </h3>
                        <Swtich
                            isActive={sendEmail}
                            setIsActive={setSendEmail}
                            disabled={false}
                        />
                    </div>
                </div>
            </div>

            {sendEmail && (
                <div className='flex flex-col gap-9 mt-10'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Email Content
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
                            <div className="border rounded-md overflow-hidden">
                                <Editor
                                    value={emailContent}
                                    // apiKey=''
                                    onEditorChange={(content) => setEmailContent(content)}
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            'autolink lists link image charmap print ',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code wordcount'
                                        ],
                                        statusbar: false,
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px }'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className='flex flex-col gap-9 mt-10'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Offer Letter
                        </h3>
                    </div>
                    <div className='flex flex-col gap-5.5 p-6.5'>

                        <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>

                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-row justify-center gap-5 items-center'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Send Email Notification
                        </h3>
                        <Swtich
                            isActive={sendEmail}
                            setIsActive={setSendEmail}
                            disabled={false}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-9 mt-10'>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-row justify-center gap-5 items-center'>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div className='flex flex-row justify-center items-center gap-3'>
                                <button
                                    type='button'
                                    className='bg-blue-500 text-white py-2 px-4 rounded'
                                    onClick={() => setShowResume(!showResume)}
                                >
                                    {showResume ? 'Hide Resume' : 'Show Resume'}
                                </button>
                            </div>
                            {showResume && (
                                <div className='p-5'>
                                    <PdfViewer
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </DefaultLayout>
    );
};

export default SendEmail;
