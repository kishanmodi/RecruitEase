import DefaultLayout from "../../layout/DefaultLayout";
import LegalQuestionComponent from "./LegalQuestionComponent";
import PersonalInformation from "./PersonalInformation";
import {useState} from "react";
import Documents from "./Documents";
import Review from "./Review";
import Assessment from "./Assessment";
import JobPost from "./JobPost";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AppContext";
import {useEffect} from "react";
import Loader from "../../common/Loader";
import {toast} from "react-hot-toast";

const JobApplication = () => {

  const pages = ['Post','Personal Information','Legal','Assessment','Documents','Review','Success'];
  // const pages = ['Personal Information','Legal','Education','Experience','Assessment','Documents','Review'];
  const [currentPage,setCurrentPage] = useState(pages[0]);

  const {id} = useParams<{id: string | undefined}>(); // Assuming jobId is part of the URL parameters
  const jobId = id || ''; // Set a default value for id if it is undefined
  const {getPostData,applyJob, getProfileData} = useAuth();

  const [job,setJob] = useState<any>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string | null>(null);


  // Personal Information States
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [country,setCountry] = useState('');
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
  const [resume,setResume] = useState<File | null >(null);

  const navigate = useNavigate();
  useEffect(() => {
    if(id) {
      setLoading(true);
      getPostData(id)
        .then((data: any) => {
          if(data.success) {
            setJob(data.job);
            setAssessmentQuestions(data.job.questions);
          } else {
            navigate('/'); // Redirect to home page if job details are not found
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

  useEffect(() => {
    setLoading(true);
    getProfileData()
      .then((data: any) => {
        if(data.success) {
          setFirstName(data.profile.first_name);
          setLastName(data.profile.last_name);
          setPhoneNumber(data.profile.phone);
          setCountry(data.profile.country);
          setAddress(data.profile.address);
          setBio(data.profile.short_bio);
          setCity(data.profile.city);
          setState(data.profile.province);
          setPostalCode(data.profile.postal_code);
          setEmail(data.profile.email);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  },[]);

  // const handleNext = () => {
  //   const currentIndex = pages.indexOf(currentPage);
  //   if(currentIndex < pages.length - 1) {
  //     setCurrentPage(pages[currentIndex + 1]);
  //   }
  // };

  const handleNext = () => {
    const isPersonalInfoValid = firstName && lastName && phoneNumber && country && address && bio && city && state && postalCode && email;
    const isLegalInfoValid = workEligibility && sex && languagePreference && raceEthnicity && graduationYear && disabilityStatus && graduationMonth;
    const isAssessmentValid = assessmentAnswers.length === assessmentQuestions.length;
    const isDocumentsValid = resume;

    switch(currentPage) {
      case 'Post':
        setCurrentPage('Personal Information');
        break;
      case 'Personal Information':
        isPersonalInfoValid ? setCurrentPage('Legal') : toast.error('Please fill all the fields');
        break;
      case 'Legal':
        isLegalInfoValid ? setCurrentPage('Assessment') : toast.error('Please fill all the fields');
        break;
      case 'Assessment':
        isAssessmentValid ? setCurrentPage('Documents') : toast.error('Please fill all the fields');
        break;
      case 'Documents':
        isDocumentsValid ? setCurrentPage('Review') : toast.error('Please fill all the fields');
        break;
      default:
        toast.error('Invalid page');
        break;
    }
  };

  const handleSubmit = async () => {
    // Submit the form
    // Object to be sent to the server
    setLoading(true);
    const filledDetails = {
      posting_id: jobId,
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      country: country,
      address: address,
      // bio: bio,
      email: `email`,
      city: city,
      province: state,
      postal_code: postalCode,
      resume: resume,
      questions: assessmentQuestions.map((question,index) => ({question,answer: assessmentAnswers[index]})),
      legal_questions: {
        work_eligibility: workEligibility,
        sex,
        language_preference: languagePreference,
        race: raceEthnicity,
        graduation_year: graduationYear,
        graduation_month: graduationMonth,
        disabled: disabilityStatus,
      }
    };
    const success = await applyJob(filledDetails);
    if(success) {
      setCurrentPage('Success');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  return (
    <DefaultLayout>
      {loading ? <Loader /> :
        <>
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
            Applicaiton Form
          </h2>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
            {currentPage === 'Post' && <JobPost job={job} error={error} />}
            {currentPage === 'Personal Information' &&
              <PersonalInformation
                firstName={firstName}
                lastName={lastName}
                phoneNumber={phoneNumber}
                country={country}
                address={address}
                bio={bio}
                city={city}
                state={state}
                postalCode={postalCode}
                email={email}
                setEmail={setEmail}
                setCity={setCity}
                setState={setState}
                setPostalCode={setPostalCode}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPhoneNumber={setPhoneNumber}
                setCountry={setCountry}
                setAddress={setAddress}
                setBio={setBio}
              />
            }

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
              {currentPage !== 'Post' && currentPage !== 'Success' && <button onClick={() => {
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

          </div>
        </>}
    </DefaultLayout>
  );
};

export default JobApplication;
