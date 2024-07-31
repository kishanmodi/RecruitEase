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
import {useParams} from "react-router-dom";
import {useAuth} from "../../context/AppContext";
import {useEffect} from "react";
import Loader from "../../common/Loader";

const JobApplication = () => {

  const pages = ['Post','Personal Information','Legal','Assessment','Documents','Review'];
  // const pages = ['Personal Information','Legal','Education','Experience','Assessment','Documents','Review'];
  const [currentPage,setCurrentPage] = useState(pages[0]);

  const {id} = useParams<{id: string}>(); // Assuming jobId is part of the URL parameters
  const {getPostData} = useAuth();

  const [job,setJob] = useState<any>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string | null>(null);


  // Personal Information States
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [country,setCountry] = useState('');
  const [address,setAddress] = useState('');
  const [bio,setBio] = useState('');

  // Legal Question States
  const [workEligibility,setWorkEligibility] = useState('');
  const [sex,setSex] = useState('');
  const [languagePreference,setLanguagePreference] = useState('');
  const [raceEthnicity,setRaceEthnicity] = useState('');
  const [graduationYear,setGraduationYear] = useState('');
  const [disabilityStatus,setDisabilityStatus] = useState('');
  const [graduationMonth,setGraduationMonth] = useState('');

  // Assessment States
  const [assessmentQuestions,setAssessmentQuestions] = useState<string[]>([]);
  const [assessmentAnswers,setassessmentAnswers] = useState<string[]>([]);

  // Documents States
  const [resume,setResume] = useState<File | null>(null);

  useEffect(() => {
    if(id) {
      getPostData(id)
        .then((data: any) => {
          if(data.success) {
            setJob(data.job);
            setAssessmentQuestions(data.job.questions);
          } else {
            setError('Failed to fetch job details');
          }
        })
        .catch(() => {
          setError('An error occurred while fetching job details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  },[id]);

  const handleNext = () => {
    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex < pages.length - 1) {
      setCurrentPage(pages[currentIndex + 1]);
    }
  };

  // const handleNext = () => {
  //   const isPersonalInfoValid = firstName && lastName && phoneNumber && country && address && bio;
  //   const isLegalInfoValid = workEligibility && sex && languagePreference && raceEthnicity && graduationYear && disabilityStatus && graduationMonth;
  //   const isAssessmentValid = assessmentAnswers.length === assessmentQuestions.length;
  //   const isDocumentsValid = resume;

  //   switch(currentPage) {
  //     case 'Post':
  //       setCurrentPage('Personal Information');
  //       break;
  //     case 'Personal Information':
  //       isPersonalInfoValid ? setCurrentPage('Legal') : toast.error('Please fill all the fields');
  //       break;
  //     case 'Legal':
  //       isLegalInfoValid ? setCurrentPage('Assessment') : toast.error('Please fill all the fields');
  //       break;
  //     case 'Assessment':
  //       isAssessmentValid ? setCurrentPage('Documents') : toast.error('Please fill all the fields');
  //       break;
  //     case 'Documents':
  //       isDocumentsValid ? setCurrentPage('Review') : toast.error('Please fill all the fields');
  //       break;
  //     default:
  //       // Handle unexpected currentPage values if needed
  //       break;
  //   }
  // };

  const handleSubmit = () => {
    // Submit the form
  }
  return (
    <DefaultLayout>
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
        Applicaiton Form
      </h2>
      {loading ? <Loader />

        : <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          {currentPage === 'Post' && <JobPost job={job} error={error} />}
          {currentPage === 'Personal Information' && <PersonalInformation
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            country={country}
            address={address}
            bio={bio}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhoneNumber={setPhoneNumber}
            setCountry={setCountry}
            setAddress={setAddress}
            setBio={setBio}
          />}

          {currentPage === 'Legal' &&
            <LegalQuestionComponent
              workEligibility={workEligibility}
              setWorkEligibility={setWorkEligibility}
              sex={sex}
              setSex={setSex}
              languagePreference={languagePreference}
              setLanguagePreference={setLanguagePreference}
              raceEthnicity={raceEthnicity}
              setRaceEthnicity={setRaceEthnicity}
              graduationYear={graduationYear}
              setGraduationYear={setGraduationYear}
              disabilityStatus={disabilityStatus}
              setDisabilityStatus={setDisabilityStatus}
              graduationMonth={graduationMonth}
              setGraduationMonth={setGraduationMonth}

            />}

          {currentPage === 'Assessment' &&
            <Assessment
              assessmentQuestions={assessmentQuestions}
              assessmentAnswers={assessmentAnswers}
              setAssessmentAnswers={setassessmentAnswers}
            />}
          {currentPage === 'Documents' &&
            <Documents
              resume={resume}
              setResume={setResume}
            />}
          {currentPage === 'Review' &&
            <Review
              firstName={firstName}
              lastName={lastName}
              phone={phoneNumber}
              country={country}
              address={address}
              bio={bio}
              eligibleToWork={workEligibility}
              sex={sex}
              languagePreference={languagePreference}
              raceEthnicity={raceEthnicity}
              graduationYear={graduationYear}
              disabilityStatus={disabilityStatus}
              graduationMonth={graduationMonth}
              assessmentQuestions={assessmentQuestions}
              assessmentAnswers={assessmentAnswers}
              resume={resume}
              email={"kishan@test.com"}
            />}

          <div className="flex justify-center gap-4">
            {currentPage !== 'Post' && <button onClick={ ()=>{
              const currentIndex = pages.indexOf(currentPage);
              if(currentIndex > 0) {
                setCurrentPage(pages[currentIndex - 1]);
              }
            }
            } className="flex justify-center rounded p-3 font-medium text-gray hover:bg-opacity-90 w-full bg-teal-600">
              Previous
            </button>}
            <button onClick={currentPage === "Review" ? handleSubmit : handleNext} className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 w-full">
              {currentPage === 'Review' ? 'Submit' : currentPage === 'Post' ? 'Apply' : 'Next'}
            </button>
          </div>

        </div>}
    </DefaultLayout>
  );
};

export default JobApplication;
