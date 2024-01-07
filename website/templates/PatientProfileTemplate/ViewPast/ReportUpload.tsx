import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import { uploadReport } from "@models/User/User";
const storage = getStorage();
interface Props {
  onUpload: (newFileInfo: uploadReport) => void;
}
const ReportUpload: React.FC<Props> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const filename = file.name;
      const storageRef = ref(storage, `pdfs/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          // File successfully uploaded
          getDownloadURL(storageRef).then((downloadURL) => {
            const fileInfo = {
              filename: file.name,
              id: uuidv4(),
              progress: 100,
              size: file.size,
              url: downloadURL,
            };
            onUpload(fileInfo);
          });
        }
      );
    }
  };

  return (
    <div className="pb-6">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {file && (
        <div>
          <p>File selected: {file.name}</p>
          <p
            className="border-2 px-4 py-2 bg-pink-500 text-white w-fit rounded-3xl cursor-pointer"
            onClick={handleUpload}
          >
            Upload
          </p>
          {uploadProgress !== null && (
            <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportUpload;
