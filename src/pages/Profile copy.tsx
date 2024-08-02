import {useState} from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/logo/cover.gif';
import userSix from '../images/logo/meta.png';

const editIconSvg = (
    <svg
        className='fill-current'
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z'
            fill='white'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z'
            fill='white'
        />
    </svg>
);

const Profile = () => {
    const [isEditing,setIsEditing] = useState(false);

    const [name,setName] = useState('Meta Inc.');
    const [tagline,setTagline] = useState('"Move Fast and Break Things"');
    const [about,setAbout] = useState('Meta Inc. is a social media company that specializes in connecting people all over the world. We believe in the power of community and strive to create a platform that is safe and inclusive for all.');

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };


    const fileToBlob = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
                resolve(blob);
            };

            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };

            reader.readAsArrayBuffer(file);
        });
    };

    const [profileImage,setProfileImage] = useState(fileToBlob(userSix));

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if(file) {
            try {
                // Convert file to blob
                const blob = fileToBlob(file);
                setProfileImage(blob);

                // Optional: Log file type for verification
                console.log('File type:',file.type);

            } catch(error) {
                console.error('Error converting file to blob',error);
            }
        }
    };

    return (
        <DefaultLayout>
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
                        <div className='relative drop-shadow-2'>
                            <div className='border rounded-full'>
                                <img
                                    src={URL.createObjectURL(profileImage)}
                                    alt='profile'
                                />
                            </div>

                            {isEditing && (
                                <label
                                    htmlFor='profile'
                                    className='absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2'>
                                    {editIconSvg}
                                    <input
                                        type='file'
                                        name='profileImage'
                                        id='profile'
                                        className='sr-only'
                                        onChange={(e) => {
                                            if(e.target.files && e.target.files[0]) {
                                                handleFileChange(e);
                                            }
                                        }}
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
                                    className='mb-1.5 text-2xl font-semibold text-black dark:text-white text-center'
                                />
                                <input
                                    type='text'
                                    name='tagline'
                                    value={tagline}
                                    onChange={e => setTagline(e.target.value)}
                                    className='text-center mb-3 w-75 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                />

                                <h4 className='font-semibold text-black dark:text-white mb-1'>
                                    About us
                                </h4>
                                <textarea
                                    name='about'
                                    value={about}
                                    onChange={e => setAbout(e.target.value)}
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
                            onClick={handleEditToggle}
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
function fileToBlob(file: any) {
    throw new Error('Function not implemented.');
}

