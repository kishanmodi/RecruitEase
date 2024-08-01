import React from 'react';
import PdfViewer from '../../components/PDFViewer';

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
    resume: File | null;
}

const Review: React.FC<ReviewProps> = (props) => {
    const {
        firstName,lastName,email,phone,country,address,bio,eligibleToWork,sex,
        languagePreference,raceEthnicity,graduationYear,disabilityStatus,graduationMonth,
        assessmentAnswers,assessmentQuestions,resume
    } = props;

    const [resumePreviewUrl,setResumePreviewUrl] = React.useState<string | null>(null);
    const [showResume,setShowResume] = React.useState<boolean>(false);
    React.useEffect(() => {
        if(resume) {
            const url = URL.createObjectURL(resume);
            setResumePreviewUrl(url);

            // Cleanup the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    },[resume]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <header className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review Your Information</h2>
            </header>

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
    );
};

export default Review;
