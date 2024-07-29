import React,{useState,ChangeEvent} from 'react';

const Documents: React.FC = () => {
    const [file,setFile] = useState<File | null>(null);
    const [preview,setPreview] = useState<string | ArrayBuffer | null>(null);
    const [uploadStatus,setUploadStatus] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if(selectedFile) {
            setFile(selectedFile);

            // Create a preview of the file
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = () => {
        if(!file) {
            setUploadStatus('No file selected.');
            return;
        }

        // Simulate file upload
        setUploadStatus('Uploading...');

        // Simulate an API call
        setTimeout(() => {
            setUploadStatus('Upload successful!');
            // You can also add logic here to actually upload the file to your server
        },2000);
    };

    return (
        <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Resume Upload
                    </h3>
                </div>
                <div className="p-6.5 space-y-6">
                    <div className="flex flex-col gap-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Upload Resume
                        </label>


                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" className="hidden" type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange} />
                            </label>
                        </div>

                    </div>

                    {preview && (
                        <div className="mt-4 flex flex-col gap-4">
                            <div className="text-black dark:text-white">
                                <h4 className="font-medium">Preview:</h4>
                                <iframe
                                    src={preview as string}
                                    title="Resume Preview"
                                    className="w-full h-64 border border-stroke rounded"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {uploadStatus && (
                        <div className={`mt-4 text-sm font-medium ${uploadStatus.includes('successful') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            {uploadStatus}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleUpload}
                        className="w-full rounded-lg bg-primary py-3 px-5 text-white transition hover:bg-primary-dark focus:outline-none"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Documents;
