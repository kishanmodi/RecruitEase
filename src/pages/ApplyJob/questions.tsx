import DefaultLayout from "../../layout/DefaultLayout";
import DatePickerOne from "../../components/Forms/DatePicker/DatePickerOne";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import MultiSelect from "../../components/Forms/MultiSelect";
import { useNavigate } from "react-router-dom";

const Questions = () => {
    const [questions, setQuestions] = useState([{ question: "Test1" }]);
    const navigate = useNavigate();
    const deleteQuestion = (index: number) => {
        console.log("Deleting index:", index);
        const newQuestions = questions.filter((_, i) => i !== index);
        console.log("New questions:", newQuestions);
        setQuestions([...newQuestions]);
    };

    const updateQuestion = (index: number, value: string) => {
        const newQuestions = questions.map((question, i) => {
            if (i === index) {
                return { question: value };
            }
            return question;
        });
        setQuestions([...newQuestions]);
    };

    const nextPage = () => {
        navigate('/candidate-applications'); // Replace '/target-route' with your desired path
      };

    return (
        <DefaultLayout>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
                Applicaiton Form
            </h2>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
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
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Are you legally eligible to work in the country in which this job is located?
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Yes / No"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Sex
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Sex"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Please indicate your language preference
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Language Preference"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Race / Ethinicity
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Race / Ethinicity"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            What is your anticipated graduation year ?
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter year"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Do you consider yourself disabled under the Equality Act 2010?
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Yes / No"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            What is your anticipated graduation month ?
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Entee month"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <button onClick={nextPage}  className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div className="flex flex-col gap-9"> */}
                    {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Recruiter Contact Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    My Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Recruiter Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Recruiter Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Recruiter Email"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div> */}
                    {/* <!-- Textarea Fields --> */}
                    {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Job Description
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Short Bio
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Enter Company Description"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mx-5">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5"
                        >
                            Submit
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-md bg-teal-600	 py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
                        >
                            Reset
                        </Link>
                    </div> */}
                {/* </div> */}
            </div>
        </DefaultLayout>
    );
};

export default Questions;
