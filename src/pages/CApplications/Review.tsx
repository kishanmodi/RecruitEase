import React from 'react';
import PdfViewer from '../../components/PDFViewer';
import { ApplicationDetails } from '../../types/applicationdetails';

interface ReviewProps {
    applicationDetails: ApplicationDetails;
}

const Review: React.FC<ReviewProps> = ({ applicationDetails }: ReviewProps) => {
    const {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        country,
        city,
        province,
        postal_code: postalCode,
        location,
        company_name: companyName,
        job_title: jobTitle,
        address,
        legal_questions: {
            work_eligibility: eligibleToWork,
            sex,
            language_preference: languagePreference,
            race,
            graduation_year: graduationYear,
            graduation_month: graduationMonth,
            disabled: disabilityStatus,
        },
        questions: assessmentQuestions,
        resume,
    } = applicationDetails;

    const base64ToBlob = (base64: string, mimeType: string) => {
        const base64String = base64.replace(/^data:(.*?);base64,/, '');
        const byteCharacters = atob(base64String);
        const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    const resumeBlob = resume ? base64ToBlob(resume, 'application/pdf') : null;
    const resumePreviewUrl = resumeBlob ? URL.createObjectURL(resumeBlob) : null;

    const [showResume, setShowResume] = React.useState(false);

    return (
        <div className="p-6 space-y-6 bg-gray-50">
            {/* Personal Information */}
            <section className="rounded-md border border-gray-300 bg-white shadow-md">
                <div className="border-b border-gray-200 py-4 px-6 bg-gray-100">
                    <h3 className="font-medium text-gray-900">Personal Information</h3>
                </div>
                <div className="p-6">
                    <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>First Name:</strong> {firstName}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Last Name:</strong> {lastName}</p>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>Email:</strong> {email}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Phone:</strong> {phone}</p>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>Address:</strong> {address}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>City:</strong> {city}</p>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>Province:</strong> {province}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Postal Code:</strong> {postalCode}</p>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>Country:</strong> {country}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Location:</strong> {location}</p>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>Company Name:</strong> {companyName}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Job Title:</strong> {jobTitle}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Legal Questions */}
            <section className="rounded-md border border-gray-300 bg-white shadow-md">
                <div className="border-b border-gray-200 py-4 px-6 bg-gray-100">
                    <h3 className="font-medium text-gray-900">Legal Questions</h3>
                </div>
                <div className="p-6 space-y-2">
                    <p><strong>Legally Eligible to Work:</strong> {eligibleToWork}</p>
                    <p><strong>Sex:</strong> {sex}</p>
                    <p><strong>Language Preference:</strong> {languagePreference}</p>
                    <p><strong>Race/Ethnicity:</strong> {race}</p>
                    <p><strong>Anticipated Graduation Year:</strong> {graduationYear}</p>
                    <p><strong>Disabled under Canadian Human Rights Act:</strong> {disabilityStatus}</p>
                    <p><strong>Anticipated Graduation Month:</strong> {graduationMonth}</p>
                </div>
            </section>

            {/* Assessment Questions */}
            <section className="rounded-md border border-gray-300 bg-white shadow-md">
                <div className="border-b border-gray-200 py-4 px-6 bg-gray-100">
                    <h3 className="font-medium text-gray-900">Assessment Questions</h3>
                </div>
                <div className="p-6 space-y-2">
                    {assessmentQuestions.map((questionObj, index) => (
                        <p key={index}><strong>{questionObj.question}</strong>: {questionObj.answer}</p>
                    ))}
                </div>
            </section>

            {/* Resume */}
            <section className="rounded-md border border-gray-300 bg-white shadow-md">
                <div className="border-b border-gray-200 py-4 px-6 bg-gray-100 text-center">
                    <h3 className="font-medium text-gray-900">Resume</h3>
                </div>
                <div className="p-6 flex justify-center">
                    <button
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition"
                        onClick={() => setShowResume(!showResume)}
                    >
                        {showResume ? 'Hide Resume' : 'Show Resume'}
                    </button>
                </div>
                {showResume && (
                    <div className="p-6">
                        {resumePreviewUrl ? (
                            <div className="mb-4">
                                <PdfViewer file={resumePreviewUrl} />
                            </div>
                        ) : (
                            <p>No resume was uploaded</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Review;
