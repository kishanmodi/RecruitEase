import DefaultLayout from '../../layout/DefaultLayout';
import {useState} from 'react';
import SingleOption from '../../components/Forms/SelectGroup/SingleOption';
import {Editor} from '@tinymce/tinymce-react';
import Swtich from '../../components/Switchers/Switch';
import PdfViewer from '../../components/PDFViewer';
import Review from '../ApplyJob/Review';
import {BsEnvelope} from 'react-icons/bs';

const JobStatus = () => {
    const [status,setStatus] = useState('new application');
    const [sendEmail,setSendEmail] = useState(false);
    const [emailContent,setEmailContent] = useState('');

    const [viewStatus,setViewStatus] = useState(false);

    return (
        <DefaultLayout>
            <div className='flex flex-row mb-5 justify-between items-center'>
                <h2 className='text-2xl font-semibold dark:text-white'>
                    Candidate Information / Status Update
                </h2>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => setSendEmail(!sendEmail)}
                        style={{backgroundColor: '#48BB78',color: 'white',padding: '0.5rem 1rem',borderRadius: '0.25rem',border: 'none',cursor: 'pointer'}}
                    >
                        <BsEnvelope />
                    </button>
                    <button
                        type="button"
                        style={{backgroundColor: '#3B82F6',color: 'white',padding: '0.5rem 1rem',borderRadius: '0.25rem',border: 'none',cursor: 'pointer'}}
                        onClick={() => setViewStatus(!viewStatus)}
                    >
                        {viewStatus ? 'Profile' : 'Status'}
                    </button>
                </div>

            </div>
            {!viewStatus && !sendEmail && <Review />}
            {viewStatus && !sendEmail &&
                <>
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
                    </div>
                    <div className='flex flex-col gap-9 mt-10'>
                        {status === 'Offered' &&
                            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                                <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                                    <h3 className='font-medium text-black dark:text-white'>
                                        Offer Letter
                                    </h3>
                                </div>
                                <div className='flex flex-col gap-5.5 p-6.5'>

                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                            </div>}
                    </div>

                    {/* Submit */}
                    <div className='flex justify-center mt-10'>
                        <button
                            type='button'
                            className='bg-blue-500 text-white py-2 px-4 rounded mb-20'
                        >
                            Update Status
                        </button>
                    </div>
                </>
            }
            {sendEmail && (
                <div className='flex flex-col gap-9'>
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
                                    apiKey='vnqpntfiwpv5rbvardvia6bdy5l9aoxjwq51of571oj6ed2s'
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
                            <button
                                type='button'
                                className='bg-blue-500 text-white py-2 px-4 rounded w-30 self-center'
                            >
                                Send Email
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DefaultLayout>
    );
};

export default JobStatus;
