import React from 'react';
import PdfViewer from '../../components/PDFViewer';

const personalInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-234-567-890',
    country: 'United States',
    address: '1234 North Avenue, New York, NY',
    bio: 'I am a software engineer with 5 years of experience in web development.'
};

const educationDetails = [
    {institution: 'Harvard University',degree: 'BSc Computer Science',startYear: '2015',endYear: '2019'},
    {institution: 'MIT',degree: 'MSc Artificial Intelligence',startYear: '2019',endYear: '2021'}
];

const legalQuestions = {
    eligibleToWork: 'Yes',
    sex: 'Male',
    languagePreference: 'English',
    raceEthnicity: 'Caucasian',
    graduationYear: '2021',
    disabledUnderAct: 'No',
    graduationMonth: 'June'
};

const workExperienceDetails = [
    {
        jobTitle: 'Software Engineer',
        company: 'Tech Corp',
        startMonthYear: '2021-06',
        endMonthYear: '2023-01',
        description: 'Developed and maintained web applications using React and Node.js.'
    },
    {
        jobTitle: 'Senior Software Developer',
        company: 'Innovate Solutions',
        startMonthYear: '2023-02',
        endMonthYear: 'Present',
        description: 'Leading a team of developers and working on large-scale projects.'
    }
];

const filePreview = 'https://www.unf.edu/careerservices/CCEC/files/certified.rf.sample_resumes.pdf'; // Example URL for preview
const uploadStatus = 'Upload successful!';

const Review: React.FC = () => {
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
                            <p><strong>First Name:</strong> {personalInfo.firstName}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Last Name:</strong> {personalInfo.lastName}</p>
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>Email:</strong> {personalInfo.email}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Phone:</strong> {personalInfo.phone}</p>
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <p><strong>Country:</strong> {personalInfo.country}</p>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p><strong>Address:</strong> {personalInfo.address}</p>
                        </div>
                    </div>

                    <div className="mb-4.5">
                        <p><strong>Short Bio:</strong> {personalInfo.bio}</p>
                    </div>
                </div>
            </section>


            {/* Education */}
            {/* <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Education</h3>
                </div>
                <div className="p-6.5">
                    {educationDetails.map((edu,index) => (
                        <div key={index} className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{edu.institution}</h4>
                            <p><strong>Degree:</strong> {edu.degree}</p>
                            <p><strong>Start Year:</strong> {edu.startYear}</p>
                            <p><strong>End Year:</strong> {edu.endYear}</p>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Legal Questions */}
            <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Legal Questions</h3>
                </div>
                <div className="p-6.5 space-y-2">
                    <p><strong>Legally Eligible to Work:</strong> {legalQuestions.eligibleToWork}</p>
                    <p><strong>Sex:</strong> {legalQuestions.sex}</p>
                    <p><strong>Language Preference:</strong> {legalQuestions.languagePreference}</p>
                    <p><strong>Race/Ethnicity:</strong> {legalQuestions.raceEthnicity}</p>
                    <p><strong>Anticipated Graduation Year:</strong> {legalQuestions.graduationYear}</p>
                    <p><strong>Disabled under Canadian Human Rights Act:</strong> {legalQuestions.disabledUnderAct}</p>
                    <p><strong>Anticipated Graduation Month:</strong> {legalQuestions.graduationMonth}</p>
                </div>
            </section>

            {/* Work Experience */}
            {/* <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Work Experience</h3>
                </div>
                <div className="p-6.5">
                    {workExperienceDetails.map((work,index) => (
                        <div key={index} className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{work.jobTitle} at {work.company}</h4>
                            <p><strong>Start Date:</strong> {work.startMonthYear}</p>
                            <p><strong>End Date:</strong> {work.endMonthYear}</p>
                            <p><strong>Description:</strong> {work.description}</p>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Resume */}
            <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Resume</h3>
                </div>
                <div className="p-6.5">
                    {filePreview && (
                        <div className="mb-4">
                            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</h4>
                            <PdfViewer />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Review;
