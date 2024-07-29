import DefaultLayout from "../../layout/DefaultLayout";
import Review from "../ApplyJob/Review";
const AppliedJob = () => {

  return (
    <DefaultLayout>
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
        Application - Software Developer
      </h2>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <Review />
      </div>
    </DefaultLayout>
  );
};

export default AppliedJob;
