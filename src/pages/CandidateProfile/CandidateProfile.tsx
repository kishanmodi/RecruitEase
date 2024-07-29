import DefaultLayout from "../../layout/DefaultLayout";
import PersonalInformation from "./PersonalInformation";
const CandidateProfile = () => {

  return (
    <DefaultLayout>
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
        Profile
      </h2>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <PersonalInformation />
        <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          Save
        </button>
      </div>
    </DefaultLayout>
  );
};

export default CandidateProfile;
