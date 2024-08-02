import Loader from "../../common/Loader";
import {useAuth} from "../../context/AppContext";
import DefaultLayout from "../../layout/DefaultLayout";
import PersonalInformation from "./PersonalInformation";
import {useEffect,useState} from "react";
const CandidateProfile = () => {

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [country,setCountry] = useState('');
  const [address,setAddress] = useState('');
  const [bio,setBio] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [email,setEmail] = useState('');
  const [loading,setLoading] = useState(false);

  const {getProfileData,saveProfileData} = useAuth();

  const fetchProfileData = async () => {
    const res = await getProfileData();
    if(res.success) {
      setFirstName(res.profile.first_name);
      setLastName(res.profile.last_name);
      setPhoneNumber(res.profile.phone);
      setCountry(res.profile.country);
      setAddress(res.profile.address);
      setBio(res.profile.bio);
      setCity(res.profile.city);
      setState(res.profile.province);
      setPostalCode(res.profile.postal_code);
      setEmail(res.profile.email);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchProfileData();
  },[]);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      country: country,
      address: address,
      short_bio: bio,
      city: city,
      province: state,
      postal_code: postalCode,
    }
    const res = await saveProfileData(data);
    if(res) {
      fetchProfileData();
    }
    setLoading(false);
  }

  return (
    <DefaultLayout>
      {loading && <Loader />}
      <>
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
          Profile
        </h2>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <PersonalInformation
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            country={country}
            setCountry={setCountry}
            address={address}
            setAddress={setAddress}
            bio={bio}
            setBio={setBio}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            email={email}
            setEmail={setEmail}
          />
          <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            onClick={handleSubmit}>
            Save
          </button>
        </div>
      </>
    </DefaultLayout>
  );
};

export default CandidateProfile;
