import React from 'react';

interface LegalQuestionComponentProps {
    workEligibility: string;
    setWorkEligibility: (workEligibility: string) => void;
    sex: string;
    setSex: (sex: string) => void;
    languagePreference: string;
    setLanguagePreference: (languagePreference: string) => void;
    raceEthnicity: string;
    setRaceEthnicity: (raceEthnicity: string) => void;
    graduationYear: string;
    setGraduationYear: (graduationYear: string) => void;
    disabilityStatus: string;
    setDisabilityStatus: (disabilityStatus: string) => void;
    graduationMonth: string;
    setGraduationMonth: (graduationMonth: string) => void;
}

const LegalQuestionComponent: React.FC<LegalQuestionComponentProps> = (props) => {
    const {
        workEligibility,
        setWorkEligibility,
        sex,
        setSex,
        languagePreference,
        setLanguagePreference,
        raceEthnicity,
        setRaceEthnicity,
        graduationYear,
        setGraduationYear,
        disabilityStatus,
        setDisabilityStatus,
        graduationMonth,
        setGraduationMonth
    } = props;

    return (
        <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Legal Questions
                    </h3>
                </div>
                <form action="#">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Are you legally eligible to work in the country in which this job is located?
                                </label>
                                <select
                                    value={workEligibility}
                                    onChange={(e) => setWorkEligibility(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Sex
                                </label>
                                <select
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Please indicate your language preference
                                </label>
                                <select
                                    value={languagePreference}
                                    onChange={(e) => setLanguagePreference(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Race / Ethnicity
                                </label>
                                <select
                                    value={raceEthnicity}
                                    onChange={(e) => setRaceEthnicity(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Hispanic">Hispanic</option>
                                    <option value="Asian">Asian</option>
                                    <option value="Indigenous">Indigenous</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    What is your anticipated graduation year?
                                </label>
                                <input
                                    type="number"
                                    value={graduationYear}
                                    min={new Date().getFullYear()}
                                    max={new Date().getFullYear() + 10}
                                    onChange={(e) => setGraduationYear(e.target.value)}
                                    placeholder="Enter year"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Do you consider yourself disabled under the Canadian Human Rights Act?
                                </label>
                                <select
                                    value={disabilityStatus}
                                    onChange={(e) => setDisabilityStatus(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    What is your anticipated graduation month?
                                </label>
                                <select
                                    value={graduationMonth}
                                    onChange={(e) => setGraduationMonth(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LegalQuestionComponent;
