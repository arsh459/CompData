// import React, { useState, ChangeEvent } from "react";
import { db } from "@config/firebase";
import { uploadReport } from "@models/User/User";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import React, { useState } from "react";
import ReportUpload from "./ReportUpload";
interface Props {
  uid: string;
}
const UploadReports: React.FC<Props> = ({ uid }) => {
  const [fileInfo, setFileInfo] = useState<uploadReport | null>(null);

  const handleFileInfoUpdate = (newFileInfo: uploadReport) => {
    setFileInfo(newFileInfo);
  };

  const onSuccessUpload = async (uid: string, file: uploadReport) => {
    if (file.url && uid) {
      const updatedFile = {
        ...file,
        progress: 1,
      };

      const userDocRef = doc(db, "users", uid);

      try {
        await updateDoc(userDocRef, {
          ["dietForm.uploadedReports"]: arrayUnion(updatedFile),
        });
        setFileInfo(null);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };

  return (
    <div>
      {fileInfo ? (
        <div>
          <p>File Info:</p>
          <p>Filename: {fileInfo.filename}</p>
          <p>ID: {fileInfo.id}</p>
          <p>Progress: {fileInfo.progress}%</p>
          <p>Size: {fileInfo.size} bytes</p>
          <p>URL: {fileInfo.url}</p>
          <p
            className="border-2 px-4 py-2 bg-pink-500 text-white w-fit rounded-3xl cursor-pointer"
            onClick={() => onSuccessUpload(uid, fileInfo)}
          >
            Save To Reports
          </p>
        </div>
      ) : (
        <ReportUpload onUpload={handleFileInfoUpdate} />
      )}
    </div>
  );
};

export default UploadReports;
