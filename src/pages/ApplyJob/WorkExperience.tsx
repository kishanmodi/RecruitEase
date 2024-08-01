import React, { useState, ChangeEvent } from 'react';

interface WorkExperienceDetail {
  jobTitle: string;
  company: string;
  startMonthYear: string;
  endMonthYear: string;
  description: string;
}

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  // Add more countries as needed
];

const WorkExperience: React.FC = () => {
  const [workExperienceDetails, setWorkExperienceDetails] = useState<WorkExperienceDetail[]>([
    { jobTitle: '', company: '', startMonthYear: '', endMonthYear: '', description: '' }
  ]);

  const [currentMonthYear, setCurrentMonthYear] = useState(new Date().toISOString().substr(0, 7));

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedDetails = [...workExperienceDetails];
    updatedDetails[index] = { ...updatedDetails[index], [name]: value };
    setWorkExperienceDetails(updatedDetails);
  };

  const handleAddMore = () => {
    setWorkExperienceDetails([...workExperienceDetails, { jobTitle: '', company: '', startMonthYear: '', endMonthYear: '', description: '' }]);
  };

  const handleDelete = (index: number) => {
    if (workExperienceDetails.length === 1) return;
    const updatedDetails = workExperienceDetails.filter((_, i) => i !== index);
    setWorkExperienceDetails(updatedDetails);
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Work Experience
          </h3>
        </div>
        <form>
          <div className="p-6.5 space-y-6">
            {workExperienceDetails.map((detail, index) => (
              <div key={index} className="flex flex-col gap-6 bg-gray-100 p-4 rounded-lg shadow-sm dark:bg-gray-800">
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={detail.jobTitle}
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="Enter your job title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={detail.company}
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="Enter your company name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Start Date
                    </label>
                    <input
                      type="month"
                      name="startMonthYear"
                      value={detail.startMonthYear || currentMonthYear}
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="Enter start date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      End Date
                    </label>
                    <input
                      type="month"
                      name="endMonthYear"
                      value={detail.endMonthYear || currentMonthYear}
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="Enter end date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={detail.description}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder="Describe your work experience"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddMore}
              className="w-full rounded-lg bg-primary py-3 px-5 text-white transition hover:bg-primary-dark focus:outline-none"
            >
              Add More
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkExperience;
