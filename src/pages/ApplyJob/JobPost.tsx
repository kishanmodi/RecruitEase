import React from 'react';

interface JobPostProps {
  job: {
    title: string;
    department: string;
    city: string;
    country: string;
    posting_date: string;
    deadline: string;
    about_company: string;
    about_job: string;
    qualification: string;
    key_requirements: string;
    nice_to_have: string;
    other_remarks: string;
    recruiter_name: string;
    recruiter_email: string;
  } | null;
  error: string | null;
}
const JobPost: React.FC<JobPostProps> = ({job, error}) => {

  if (error) return <p>{error}</p>;
  if (!job) return <p>No job details available</p>;

  return (
    <div className='p-6 bg-white dark:bg-boxdark'>
      <h2 className='text-2xl font-semibold text-black dark:text-white mb-3'>
        Job Posting Information
      </h2>

      {/* Job Information */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Job Information</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>Job Title:</strong> {job.title}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Job Department:</strong> {job.department}</p>
        </div>
      </div>

      {/* Job Location Information */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Job Location Information</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>City:</strong> {job.city}</p>
          <p className='text-black dark:text-white'><strong>Country:</strong> {job.country}</p>
        </div>
      </div>

      {/* Posting Date & Deadline */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Posting Date & Deadline Time</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>Posting Date:</strong> {new Date(job.posting_date).toLocaleDateString()}</p>
          <p className='text-black dark:text-white'><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Job Description</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>About the Company:</strong> {job.about_company}</p>
          <p className='mb-4 text-black dark:text-white'><strong>About the Job:</strong> {job.about_job}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Qualifications:</strong> {job.qualification}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Key Requirements:</strong> {job.key_requirements}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Nice to Have:</strong> {job.nice_to_have}</p>
          <p className='text-black dark:text-white'><strong>Other Remarks:</strong> {job.other_remarks}</p>
        </div>
      </div>

      {/* Recruiter Contact Information */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Recruiter Contact Information</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>Recruiter Name:</strong> {job.recruiter_name}</p>
          <p className='text-black dark:text-white'><strong>Recruiter Email:</strong> {job.recruiter_email}</p>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
