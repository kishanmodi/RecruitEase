interface LegalQuestionComponentProps {
    workEligibility: string;
    setWorkEligibility: (workEligibility: string) => void;
    sex: string;
    setSex: (workEligibility: string) => void;
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

const LegalQuestionComponent = (props: LegalQuestionComponentProps) => {
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
            {/* <!-- Input Fields --> */}
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
                                <input
                                    type="text"
                                    placeholder="Yes / No"
                                    value={workEligibility}
                                    onChange={(e) => setWorkEligibility(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Sex
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Sex"
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Please indicate your language preference
                                </label>
                                <input
                                    type="text"
                                    value={languagePreference}
                                    onChange={(e) => setLanguagePreference(e.target.value)}
                                    placeholder="Language Preference"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Race / Ethinicity
                                </label>
                                <input
                                    type="text"
                                    value={raceEthnicity}
                                    onChange={(e) => setRaceEthnicity(e.target.value)}
                                    placeholder="Enter Race / Ethinicity"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    What is your anticipated graduation year ?
                                </label>
                                <input
                                    type="text"
                                    value={graduationYear}
                                    onChange={(e) => setGraduationYear(e.target.value)}
                                    placeholder="Enter year"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    Do you consider yourself disabled under the Canadian Human Rights Act?
                                </label>
                                <input
                                    type="text"
                                    value={disabilityStatus}
                                    onChange={(e) => setDisabilityStatus(e.target.value)}
                                    placeholder="Yes / No"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white text-sm">
                                    What is your anticipated graduation month ?
                                </label>
                                <input
                                    type="text"
                                    value={graduationMonth}
                                    onChange={(e) => setGraduationMonth(e.target.value)}
                                    placeholder="Enter month"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LegalQuestionComponent;
