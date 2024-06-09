import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]); // Store selected files
  const [fileUrl, setFileUrl] = useState(mediaUrl || ''); // Store URL of selected file or provided mediaUrl

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0])); // Set URL of the first accepted file
  }, [fieldChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
    },
  });

  return (
    <div
      className="flex justify-center items-center flex-col bg-[#101012] rounded-xl cursor-pointer text-purple-300 "
      {...getRootProps()}
    >
      <input className="cursor-pointer" {...getInputProps()} />
      {fileUrl ? (
        // Display the uploaded file
        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
          <img src={fileUrl} alt="uploaded-file" className="h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top" />
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </div>
      ) : (
        // Display upload instructions
        <div className="flex justify-center items-center flex-col p-7 h-80 lg:h-[612px]">
          <img
            src="/img/file-upload.svg"
            alt="add file"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <button className="h-12 bg-[#1F1F22] px-5 text-light-1 flex gap-2  rounded-2xl items-center">
            Select from computer
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
