import DefaultLayout from "../../layout/DefaultLayout";
import Review from "./Review";
import { ApplicationDetails } from "../../types/applicationdetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import Loader from "../../common/Loader";

const AppliedJob = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const { getJobApplicationC } = useAuth();
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getJobApplicationC(id);
        if (data.success) {
          setApplicationDetails(data.applications);
        } else {
          setApplicationDetails(null);
        }
      } catch (error) {
        console.error('Error fetching application details:', error);
        setApplicationDetails(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplications();
    }
  }, [id, getJobApplicationC]);

  const getStageClasses = (stage: string) => {
    switch (stage) {
      case 'Application Submitted':
        return 'bg-teal-200 text-gray-800';
      case 'Under Review':
        return 'bg-blue-200 text-blue-800';
      case 'Interview Scheduled':
        return 'bg-teal-200 text-teal-800';
      case 'Under Evaluation':
        return 'bg-orange-200 text-orange-800';
      case 'Offer Sent':
        return 'bg-slate-200 text-slate-800';
      case 'Offer Accepted':
        return 'bg-green-200 text-green-800';
      case 'Offer Declined':
        return 'bg-red-200 text-red-800';
      case 'Not Selected':
        return 'bg-gray-300 text-gray-900';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!applicationDetails) {
    return <p>No application found</p>;
  }

  return (
    <DefaultLayout>
      <div className="flex justify-between px-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
          Application - {applicationDetails.job_title}
        </h2>

        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStageClasses(applicationDetails.status || "")}`}
        >
          <p><strong>Status:</strong> {applicationDetails.status || "Unknown"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <Review applicationDetails={applicationDetails} />
      </div>
    </DefaultLayout>
  );
};

export default AppliedJob;
