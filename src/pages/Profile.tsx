import { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/logo/cover.gif';
import userSix from '../images/logo/meta.png';
import {useAuth} from '../context/AppContext';
import Loader from '../common/Loader';

const Profile = () => {
    const { getProfileDataRecruiter, saveProfileDataRecruiter } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Meta Inc.');
    const [tagline, setTagline] = useState('"Move Fast and Break Things"');
    const [about, setAbout] = useState('Meta Inc. is a social media company that specializes in connecting people all over the world. We believe in the power of community and strive to create a platform that is safe and inclusive for all.');
    const [profileImage, setProfileImage] = useState<string>(''); // Initialize with empty string
    const [defaultProfileImageBlob, setDefaultProfileImageBlob] = useState<Blob | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const loadProfileData = async () => {
            const { profile } = await getProfileDataRecruiter();
            if (profile) {
                setProfileImage(profile.profile_pic || '');
                setName(profile.name || '');
                setTagline(profile.tagline || '');
                setAbout(profile.about_us || '');
            }
        };

        const convertDefaultImageToBlob = async () => {
            try {
                const response = await fetch(userSix);
                const blob = await response.blob();
                setDefaultProfileImageBlob(blob);
            } catch (error) {
                console.error('Error converting default image to Blob', error);
            }
        };

        loadProfileData();
        convertDefaultImageToBlob();
        setLoading(false);
    }, [getProfileDataRecruiter]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                setProfileImage(base64);
            } catch (error) {
                console.error('Error converting file to base64', error);
            }
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result as string);
                } else {
                    reject(new Error('Failed to read file'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSave = async () => {
        setLoading(true);
        const updatedProfile = {
            profile_pic: profileImage || (defaultProfileImageBlob ? URL.createObjectURL(defaultProfileImageBlob) : ''),
            tagline: tagline,
            about_us: about,
        };
        setLoading(true);
        const res = await saveProfileDataRecruiter(updatedProfile);

        if(res) {
            setIsEditing(false);
        }
        setLoading(false);
    };

    return (
        <DefaultLayout>
            {loading && <Loader />}
            <div className='overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative'>
                <div className='relative z-20 h-35 md:h-65'>
                    <img
                        src={CoverOne}
                        alt='profile cover'
                        className='h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center max-xsm:object-bottom max-xsm:backdrop-blur'
                    />
                </div>
                <div className='px-4 pb-6 text-center lg:pb-8 xl:pb-11.5'>
<div className='relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3'>
    <div className='relative drop-shadow-2 h-full w-full'>
        <div className='border rounded-full w-full h-full overflow-hidden'>
            <img
                src={profileImage || (defaultProfileImageBlob ? URL.createObjectURL(defaultProfileImageBlob) : '')}
                alt='profile'
                className='object-cover w-full h-full'
            />
        </div>

        {isEditing && (
            <label
                htmlFor='profile'
                className='absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2'>
                {/* Replace with your edit icon */}
                <span>Edit</span>
                <input
                    type='file'
                    name='profileImage'
                    id='profile'
                    className='sr-only'
                    onChange={handleFileChange}
                />
            </label>
        )}
    </div>
</div>

                    <div className='mt-4'>
                        {isEditing ? (
                            <div className='flex flex-col justify-center items-center'>
                                <input
                                    type='text'
                                    name='name'
                                    value={name}
                                    disabled
                                    className='mb-1.5 text-2xl font-semibold text-black dark:text-white text-center'
                                />
                                <input
                                    type='text'
                                    name='tagline'
                                    value={tagline}
                                    onChange={(e) => setTagline(e.target.value)}
                                    className='text-center mb-3 w-75 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />

                                <h4 className='font-semibold text-black dark:text-white mb-1'>
                                    About us
                                </h4>
                                <textarea
                                    name='about'
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className='mb-3 w-3/4 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />
                            </div>
                        ) : (
                            <div>
                                <h3 className='text-2xl font-semibold text-black dark:text-white mb-1.5'>
                                    {name}
                                </h3>
                                <p className='font-medium mb-4'>
                                    {tagline}
                                </p>
                                <div className='mx-auto max-w-180'>
                                    <h4 className='font-semibold text-black dark:text-white'>
                                        About us
                                    </h4>
                                    <p className='leading-relaxed'>
                                        {about}
                                    </p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={isEditing ? handleSave : handleEditToggle}
                            className='mt-4 rounded bg-primary py-2 px-4 text-white absolute right-4 top-1 z-30'>
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;
