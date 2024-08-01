import React from 'react';
import PdfViewer from '../../components/PDFViewer';
import DefaultLayout from '../../layout/DefaultLayout';

interface ReviewProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    bio: string;
    eligibleToWork: string;
    sex: string;
    languagePreference: string;
    raceEthnicity: string;
    graduationYear: string;
    disabilityStatus: string;
    graduationMonth: string;
    assessmentAnswers: string[];
    assessmentQuestions: string[];
    resume: string | null;
}

const ViewJobApplication: React.FC<ReviewProps> = (props) => {
    const {
        firstName,lastName,email,phone,country,address,bio,eligibleToWork,sex,
        languagePreference,raceEthnicity,graduationYear,disabilityStatus,graduationMonth,
        assessmentAnswers,assessmentQuestions,resume
    } = props;

    const [resumePreviewUrl,setResumePreviewUrl] = React.useState<string | null>(null);
    const [showResume,setShowResume] = React.useState<boolean>(false);

    React.useEffect(() => {
        if(resume) {
           // Convert base64 string to a Blob
           const byteCharacters = atob(resume);
           const byteNumbers = new Array(byteCharacters.length);
           for (let i = 0; i < byteCharacters.length; i++) {
               byteNumbers[i] = byteCharacters.charCodeAt(i);
           }
           const byteArray = new Uint8Array(byteNumbers);
           const blob = new Blob([byteArray], { type: 'application/pdf' });

           // Create an Object URL from the Blob
           const url = URL.createObjectURL(blob);
           setResumePreviewUrl(url);
        }

        return () => {
            if(resumePreviewUrl) {
                URL.revokeObjectURL(resumePreviewUrl);
            }
        };
    },[resume]);

    return (
        <DefaultLayout>
            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <div className='col-span-12 xl:col-span-16'>
                    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
                        <div className='flex flex-row mb-5 justify-between items-center'>
                            <h2 className='text-2xl font-semibold dark:text-white'>
                                Application - Software Developer - Kishan Modi
                            </h2>
                            <div className="p-6 space-y-6">
                                {/* Personal Information */}
                                <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <p><strong>First Name:</strong> {firstName}</p>
                                            </div>
                                            <div className="w-full xl:w-1/2">
                                                <p><strong>Last Name:</strong> {lastName}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <p><strong>Email:</strong> {email}</p>
                                            </div>
                                            <div className="w-full xl:w-1/2">
                                                <p><strong>Phone:</strong> {phone}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <p><strong>Country:</strong> {country}</p>
                                            </div>
                                            <div className="w-full xl:w-1/2">
                                                <p><strong>Address:</strong> {address}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4.5">
                                            <p><strong>Short Bio:</strong> {bio}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Legal Questions */}
                                <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">Legal Questions</h3>
                                    </div>
                                    <div className="p-6.5 space-y-2">
                                        <p><strong>Legally Eligible to Work:</strong> {eligibleToWork}</p>
                                        <p><strong>Sex:</strong> {sex}</p>
                                        <p><strong>Language Preference:</strong> {languagePreference}</p>
                                        <p><strong>Race/Ethnicity:</strong> {raceEthnicity}</p>
                                        <p><strong>Anticipated Graduation Year:</strong> {graduationYear}</p>
                                        <p><strong>Disabled under Canadian Human Rights Act:</strong> {disabilityStatus}</p>
                                        <p><strong>Anticipated Graduation Month:</strong> {graduationMonth}</p>
                                    </div>
                                </section>

                                {/* Assessment Questions */}
                                <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">Assessment Questions</h3>
                                    </div>
                                    <div className="p-6.5 space-y-2">
                                        {assessmentQuestions.map((question,index) => (
                                            <p key={index}><strong>{question}</strong>: {assessmentAnswers[index]}</p>
                                        ))}
                                    </div>
                                </section>

                                {/* Resume */}
                                <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white text-center">Resume</h3>
                                    </div>
                                    <div className="p-6.5 text-center">

                                        {resumePreviewUrl ?
                                            <>
                                                <button onClick={() => setShowResume(!showResume)} className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">
                                                    {showResume ? 'Hide Resume' : 'Show Resume'}
                                                </button>
                                                {showResume && (
                                                    <div className="mb-4">

                                                        <PdfViewer file={resumePreviewUrl} />
                                                    </div>
                                                )}
                                            </> : <p>No resume was uploaded</p>}


                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );

};

export default ViewJobApplication;
