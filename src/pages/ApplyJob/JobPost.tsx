import React from 'react';

interface JobPostingProps {
}
//Static Data

const jobTitle = 'Software Engineer';
const jobDepartment = 'Engineering';
const city = 'San Francisco';
const country = 'United States';
const postingDate = '2022-01-01';
const deadline = '2022-02-01';
const companyDescription = 'We are a leading software development company that specializes in providing innovative solutions to a diverse range of industries. Our mission is to deliver high-quality, reliable software products that meet the unique needs of our clients. With a team of experienced professionals, we are committed to driving technological advancement and fostering a culture of continuous improvement.';
const jobDescription = `We are looking for a highly skilled and motivated Software Engineer to join our dynamic engineering team. The successful candidate will be responsible for designing, developing, and maintaining software applications that are integral to our business operations. You will work closely with other engineers, product managers, and stakeholders to ensure that our software products meet the highest standards of quality and performance.

Key Responsibilities:
- Design and develop high-quality software solutions that meet business requirements
- Collaborate with cross-functional teams to define, design, and ship new features
- Write clean, maintainable, and efficient code
- Perform code reviews and provide constructive feedback to peers
- Troubleshoot and resolve software defects and issues
- Participate in the full software development lifecycle, including planning, development, testing, and deployment
- Stay up-to-date with the latest industry trends and technologies to ensure our products remain competitive
`;
const qualifications = `The ideal candidate will have the following qualifications:
- Bachelor's degree in Computer Science, Software Engineering, or a related field
- Proven experience in software development, with a strong focus on web technologies
- Proficiency in JavaScript, HTML, and CSS
- Solid understanding of software development principles, design patterns, and best practices
- Strong problem-solving skills and attention to detail
- Excellent communication and teamwork abilities
- Ability to work independently and manage multiple tasks simultaneously
`;
const keyRequirements = `In addition to the qualifications, the following key requirements are essential for this role:
- Experience with modern front-end frameworks and libraries, such as React, Angular, or Vue.js
- Familiarity with back-end technologies and frameworks, such as Node.js, Express, or Django
- Experience with version control systems, such as Git
- Knowledge of database systems, both relational (e.g., MySQL, PostgreSQL) and non-relational (e.g., MongoDB, Redis)
- Understanding of DevOps practices, including CI/CD pipelines, containerization, and cloud platforms (e.g., AWS, Azure, Google Cloud)
`;
const niceToHave = `The following skills and experiences are nice to have:
- Experience with React and Redux
- Familiarity with TypeScript and modern JavaScript (ES6+)
- Knowledge of testing frameworks and tools, such as Jest, Mocha, or Cypress
- Experience with agile development methodologies, such as Scrum or Kanban
- Previous experience in a fast-paced, startup environment
`;
const otherRemarks = `This is a full-time position offering competitive compensation and benefits. Our company provides a collaborative work environment, opportunities for professional growth, and a culture that values diversity and inclusion. We are committed to creating a workplace where all employees can thrive and contribute to our success.

Benefits:
- Competitive salary and performance-based bonuses
- Health, dental, and vision insurance
- 401(k) plan with company match
- Paid time off and holidays
- Professional development opportunities
- Flexible work schedule and remote work options
`;
const recruiterName = 'John Doe';
const recruiterEmail = 'Hello@hello.com';

const JobPost: React.FC<JobPostingProps> = ({
}) => {
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
          <p className='mb-4 text-black dark:text-white'><strong>Job Title:</strong> {jobTitle}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Job Department:</strong> {jobDepartment}</p>
        </div>
      </div>

      {/* Job Location Information */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Job Location Information</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>City:</strong> {city}</p>
          <p className='text-black dark:text-white'><strong>Country:</strong> {country}</p>
        </div>
      </div>

      {/* Posting Date & Deadline */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Posting Date & Deadline Time</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>Posting Date:</strong> {postingDate}</p>
          <p className='text-black dark:text-white'><strong>Deadline:</strong> {deadline}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Job Description</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>About the Company:</strong> {companyDescription}</p>
          <p className='mb-4 text-black dark:text-white'><strong>About the Job:</strong> {jobDescription}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Qualifications:</strong> {qualifications}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Key Requirements:</strong> {keyRequirements}</p>
          <p className='mb-4 text-black dark:text-white'><strong>Nice to Have:</strong> {niceToHave}</p>
          <p className='text-black dark:text-white'><strong>Other Remarks:</strong> {otherRemarks}</p>
        </div>
      </div>

      {/* Recruiter Contact Information */}
      <div className='mb-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Recruiter Contact Information</h3>
        </div>
        <div className='p-6.5'>
          <p className='mb-4 text-black dark:text-white'><strong>Recruiter Name:</strong> {recruiterName}</p>
          <p className='text-black dark:text-white'><strong>Recruiter Email:</strong> {recruiterEmail}</p>
        </div>
      </div>


    </div>
  );
};

export default JobPost;
