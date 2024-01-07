// import {
// createNewSelfie,
// saveNewSelfie,
// updateNewSelfie,
// } from "@models/Workouts/createUtils";
import { WorkoutActivitySelfie } from "@models/Workouts/WorkoutActivity";
// import { useCallback, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import ImageButtonRound from "./ImageButtonRound";
// import Image from "next/image";
// import CloseIcon from "public/icons/CloseIcon";

interface Props {
  type: "image" | "video";
  uid: string;
  taskId: string;
  streamId?: string;
  img?: WorkoutActivitySelfie;
  saveNewLocalStream: () => Promise<string | undefined>;
}

const WebCam: React.FC<Props> = ({}) => {
  return <div></div>;
};

//   saveNewLocalStream,
//   type,
//   uid,
//   taskId,
//   streamId,
//   img,
//   children,
// }) => {
//   // const webcamRef = useRef<Webcam>(null);
//   const [permissionError, setPermissionError] = useState<boolean>(false);

//   console.log("img", img);

//   const capture = useCallback(async () => {
//     try {
//       const shot = webcamRef.current?.getScreenshot();
//       // console.log("heere", shot);
//       if (shot && !img?.id) {
//         const newSelfie = createNewSelfie(uid, shot);
//         console.log("new", newSelfie, streamId);

//         if (!streamId) {
//           const newId = await saveNewLocalStream();
//           if (newId) {
//             await saveNewSelfie(newSelfie, taskId, newId);
//           }
//         } else {
//           await saveNewSelfie(newSelfie, taskId, streamId);
//         }
//       } else if (shot && img?.id && streamId) {
//         await updateNewSelfie(shot, img.id, taskId, streamId);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   }, [webcamRef, uid, taskId, streamId, img?.id, saveNewLocalStream]);

//   const deleteImg = async () => {
//     if (img?.id && streamId) {
//       await updateNewSelfie("", img.id, taskId, streamId);
//     }
//   };

//   return (
//     <div className="w-full">
//       {
//         img && img.img ? (
//           <div className="relative border-4 flex justify-center items-center border-green-500">
//             <div className="absolute top-2 left-2 z-10" onClick={deleteImg}>
//               <CloseIcon
//                 style={{
//                   height: "35",
//                   width: "35",
//                   fill: "black",
//                 }}
//               />
//             </div>

//             <Image alt="selfie" src={img.img} width="375" height="300" />
//           </div>
//         ) : type === "image" && permissionError ? (
//           <>
//             <div className="p-4 bg-gray-100 shadow-sm rounded-sm flex flex-col justify-center items-center">
//               <p className="text-gray-700 font-semibold text-xl text-center">
//                 Webcam permissions denied
//               </p>
//               <p className="text-center text-gray-500">
//                 Give access or upload from gallery
//               </p>
//             </div>
//             <div>{children}</div>
//           </>
//         ) : type === "image" ? (
//           <Webcam
//             // onUserMedia={() => console.log("user media")}
//             onUserMediaError={() => setPermissionError(true)}
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//           />
//         ) : null
//         //  (
//         //   <Webcam audio={false} ref={webcamRef} />
//         // )
//       }
//       {permissionError ? null : (
//         <div className="flex justify-center pt-4">
//           {img && img.img ? (
//             <ImageButtonRound
//               icon="delete"
//               onClick={deleteImg}
//               text="Delete Image"
//             />
//           ) : type === "image" ? (
//             <ImageButtonRound
//               icon="camera"
//               onClick={capture}
//               text="Click your Selfie"
//             />
//           ) : (
//             <ImageButtonRound
//               icon="record"
//               onClick={capture}
//               text="Start recording"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

export default WebCam;
