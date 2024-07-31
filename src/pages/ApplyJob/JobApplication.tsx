import DefaultLayout from "../../layout/DefaultLayout";
import Education from "./Education";
import LegalQuestionComponent from "./LegalQuestionComponent";
import PersonalInformation from "./PersonalInformation";
import {useState} from "react";
import WorkExperience from "./WorkExperience";
import Documents from "./Documents";
import Review from "./Review";
import Assessment from "./Assessment";
import JobPost from "./JobPost";
const JobApplication = () => {

  const pages = ['Post','Personal Information','Legal','Assessment','Documents','Review'];
  // const pages = ['Personal Information','Legal','Education','Experience','Assessment','Documents','Review'];
  const [currentPage,setCurrentPage] = useState(pages[0]);

  const handleNext = () => {
    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex < pages.length - 1) {
      setCurrentPage(pages[currentIndex + 1]);
    }
  };

  const handleSubmit = () => {
    // Submit the form
  }
  return (
    <DefaultLayout>
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
        Applicaiton Form
      </h2>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        {currentPage === 'Post' && <JobPost/>}
        {currentPage === 'Personal Information' && <PersonalInformation />}
        {currentPage === 'Legal' && <LegalQuestionComponent/>}
        {currentPage === 'Education' && <Education />}
        {currentPage === 'Experience' && <WorkExperience/>}
        {currentPage === 'Assessment' && <Assessment/>}
        {currentPage === 'Documents' && <Documents/>}
        {currentPage === 'Review' && <Review/>}

        <button onClick ={currentPage==="Review" ? handleSubmit : handleNext } className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          {currentPage === 'Review' ? 'Submit' : currentPage === 'Post' ? 'Apply' : 'Next'}
        </button>
      </div>
    </DefaultLayout>
  );
};

export default JobApplication;
