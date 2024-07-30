import React, { useState, ChangeEvent } from 'react';

interface EducationDetail {
  degree: string;
  institution: string;
  monthYear: string;
  country: string;
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

const Education: React.FC = () => {
  const [educationDetails, setEducationDetails] = useState<EducationDetail[]>([
    { degree: '', institution: '', monthYear: '', country: '' }
  ]);

  const [currentMonthYear, setCurrentMonthYear] = useState(new Date().toISOString().substr(0, 7));

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const updatedDetails = [...educationDetails];
    updatedDetails[index] = { ...updatedDetails[index], [name]: value };
    setEducationDetails(updatedDetails);
  };

  const handleAddMore = () => {
    setEducationDetails([...educationDetails, { degree: '', institution: '', monthYear: '', country: '' }]);
  };

  const handleDelete = (index: number) => {
    if(educationDetails.length === 1) return;
    const updatedDetails = educationDetails.filter((_, i) => i !== index);
    setEducationDetails(updatedDetails);
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Education Details
          </h3>
        </div>
        <form>
          <div className="p-6.5 space-y-6">
            {educationDetails.map((detail, index) => (
              <div key={index} className="flex flex-col gap-6 bg-gray-100 p-4 rounded-lg shadow-sm dark:bg-gray-800">
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Degree
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={detail.degree}
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="Enter your degree"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Institution
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={detail.institution}
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="Enter your institution"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Month/Year
                    </label>
                    <input
                      type="month"
                      name="monthYear"
                      value={detail.monthYear || currentMonthYear}
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="Enter graduation date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Country
                    </label>
                    <select
                      name="country"
                      value={detail.country}
                      onChange={(event) => handleInputChange(index, event)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Select country</option>
                      {countries.map((country, i) => (
                        <option key={i} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
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

export default Education;
