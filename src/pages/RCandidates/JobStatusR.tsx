import DefaultLayout from '../../layout/DefaultLayout';
import {ChangeEvent,useState} from 'react';
import SingleOption from '../../components/Forms/SelectGroup/SingleOption';
import {Editor} from '@tinymce/tinymce-react';
import {BsEnvelope} from 'react-icons/bs';
import Logo from '../../images/logo/Logo-3.png'
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAuth} from '../../context/AppContext';
import {ApplicationDetails} from '../../types/applicationdetails';
import Loader from '../../common/Loader';
import JobApplication from './JobApplicationDetailsR';
import toast from 'react-hot-toast';
const EDITOR_API_KEY = (import.meta as any).env.VITE_EDITOR_API_KEY;

const JobStatus = () => {

    const [sendEmail,setSendEmail] = useState(false);

    const {id} = useParams();
    const [loading,setLoading] = useState(true);
    const {getAllCandidateApplications,updateApplicationStatus,sendEmailToCandidate} = useAuth();
    const [applicationDetails,setApplicationDetails] = useState<ApplicationDetails | null>(null);
    const [status,setStatus] = useState(applicationDetails?.status || 'New Application');
    const [emailContent,setEmailContent] = useState(``);
    const [offerLetter,setOfferLetter] = useState<File | null>(null);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const data = await getAllCandidateApplications(id);
            if(data.success) {
                setApplicationDetails(data.applications);
                setStatus(data.applications.status);
                setEmailContent(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Application Status Update</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
                        <div style=" margin: 10px auto; background: #ffffff; padding: 20px; border-radius: 8px;">
                            <h1 style="text-align: center; color: #2C3E50;">${data?.applications?.company_name}</h1>
                            <h2 style="text-align: center; color: #2980B9;">Application Status Update</h2>
                            
                            <h3 style="color: #333;">Hi ${data.applications.first_name},</h3>
                            <p>Thank you for your application for the position of <strong>${data.applications.job_title}</strong> at <strong>${data.applications.company_name}</strong>.</p>
                            
                            <ul style="list-style-type: disc; margin-left: 20px; padding-left: 20px;">
                                <li>If shortlisted for an interview, we will provide details of the interview process and scheduling information.</li>
                                <li>If the application is still under review, you can expect to hear back within the estimated timeline provided.</li>
                            </ul>
                            
                            <p>For any questions, feel free to reach out to us at <a href="mailto:careers@recruitease.com" style="color: #2980B9; text-decoration: none;">careers@recruitease.com</a>.</p>
                            <p>Visit our <a href="https://recruitease.com" style="color: #2980B9; text-decoration: none;">website</a> for more information about our company and job opportunities.</p>
                            
                            <p>Thank you once again for your interest in <strong>${data.applications.company_name}</strong>.</p>
                            <p>Best regards,<br>
                            [Your Name]<br>
                            Talent Acquisition Manager<br>
                            ${data.applications.company_name}<br>
                            <a href="mailto:HR@recruitease.com" style="color: #2980B9; text-decoration: none;">HR@recruitease.com</a></p>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                setApplicationDetails(null);
            }
        } catch(error) {
            console.error('Error fetching application details:',error);
            setApplicationDetails(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(id) {
            fetchApplications();
        }
    },[]);

    const [viewStatus,setViewStatus] = useState(false);


    const getStageClasses = (stage: string) => {
        switch(stage) {
            case 'Application Submitted':
                return 'bg-teal-300 text-black';
            case 'Under Review':
                return 'bg-blue-200 text-blue-800';
            case 'Interview Scheduled':
                return 'bg-teal-200 text-teal-800';
            case 'Under Evaluation':
                return 'bg-orange-200 text-orange-800';
            case 'Offer Sent':
                return 'bg-slate-200 text-slate-800';
            case 'Offer Accepted':
                return 'bg-green-200 text-green-800';
            case 'Offer Declined':
                return 'bg-red-200 text-red-800';
            case 'Not Selected':
                return 'bg-gray-300 text-gray-900';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    const handleUpdateStatus = async () => {
        try {
            if(status === applicationDetails?.status) {
                toast.error('Please select a different status to update');
                return;
            }
            setLoading(true);
            const success = await updateApplicationStatus(id || "",status,offerLetter);
            if(success) {
                fetchApplications();
                setOfferLetter(null);
                setViewStatus(false);
            }
        } catch(error) {
            console.error('Error updating application status:',error);
        } finally {
            setLoading(false);
        }
    }



    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0) {
            setOfferLetter(files[0]);
        }
    }

    const handleRemoveFile = () => {
        setOfferLetter(null);
    }

    return (
        <DefaultLayout>
            {loading && <Loader />}
            {!loading ?
                <>
                    <div className='flex flex-col sm:flex-row mb-5 justify-between items-start sm:items-center'>
                        <h2 className='text-2xl font-semibold dark:text-white mb-2 sm:mb-0 max-md:text-lg max-sm:text-center px-4'>
                            Candidate Information / Status Update
                        </h2>
                        <div className="flex space-x-2 px-4 py-2 max-sm:flex-col max-sm:gap-4 max-sm:w-full ">
                            <div
                                className={`inline-flex items-center px-4 py-2 text-center rounded max-sm:text-md font-semibold justify-center ${getStageClasses(applicationDetails?.status || "")}`}
                            >
                                <p><strong>Status:</strong> {applicationDetails?.status || "Unknown"}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {setSendEmail(!sendEmail)}}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 flex flex-row items-center gap-2 justify-center"
                            >
                                <BsEnvelope />
                                <p>Email</p>
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                onClick={() => {
                                    setViewStatus(!viewStatus)
                                    setSendEmail(false)
                                }}
                            >
                                {viewStatus ? 'Profile' : 'Status'}
                            </button>
                        </div>
                    </div>

                    {!viewStatus && !sendEmail && applicationDetails && <JobApplication applicationDetails={applicationDetails} />}
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
                                            options={['Application Submitted','Under Review','Interview Scheduled','Under Evaluation','Offer Sent','Not Selected']}
                                            selectedOption={status}
                                            setSelectedOption={setStatus}
                                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" /> </svg>}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-9 mt-10'>
                                {status === 'Offer Sent' &&
                                    <div className="p-6.5 space-y-6">
                                        <div className="flex flex-col gap-6">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {offerLetter ? "Uploaded Resume" : "Upload Resume"}
                                            </label>

                                            {offerLetter ? (
                                                <div className="flex flex-col items-center justify-center w-full">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">File Name:</span> {offerLetter.name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Size: {(offerLetter.size / 1024).toFixed(2)} KB</p>
                                                        <button
                                                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                                            onClick={handleRemoveFile}
                                                        >
                                                            Remove File
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-full">
                                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX</p>
                                                        </div>
                                                        <input id="dropzone-file" className="hidden" type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={handleFileChange} />
                                                    </label>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                }
                            </div>

                            {/* Submit */}
                            <div className='flex justify-center mt-10'>
                                <button
                                    type='button'
                                    className='bg-blue-500 text-white py-2 px-4 rounded mb-20'
                                    onClick={handleUpdateStatus}
                                >
                                    Update Status
                                </button>
                            </div>
                        </>
                    }
                    {sendEmail && (
                        <div className='flex flex-col gap-4 p-4 md:p-6'>
                            <div className='rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                                <div className='border-b border-stroke py-3 px-4 md:py-4 md:px-6 dark:border-strokedark'>
                                    <h3 className='text-lg font-medium text-black dark:text-white'>
                                        Email Content
                                    </h3>
                                </div>
                                <div className='flex flex-col gap-4 p-4 md:p-6'>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
                                    <div className="border rounded-md overflow-hidden">
                                        <Editor
                                            value={emailContent}
                                            apiKey={EDITOR_API_KEY}
                                            onEditorChange={(content) => setEmailContent(content)}
                                            init={{
                                                // Should fit perfect a4 size for both mobile and desktop
                                                width: '100%',
                                                height: "50vh",
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
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' // Adjust font size for readability
                                            }}
                                        />
                                    </div>
                                    <button
                                        type='button'
                                        className='bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto self-center'
                                        onClick={async () => {
                                            try {
                                                setLoading(true);
                                                const success = await sendEmailToCandidate(applicationDetails?.application_id || "",applicationDetails?.email || "",emailContent);
                                                if(success) {
                                                    setSendEmail(false);
                                                }
                                            } catch(error) {
                                                console.error('Error sending email:',error);
                                            } finally {
                                                setLoading(false);
                                            }
                                        }}
                                    >
                                        Send Email
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </> : <></>
            }

        </DefaultLayout>
    );
};

export default JobStatus;
