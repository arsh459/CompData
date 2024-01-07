/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Fireicon from "../../public/icons/FireIcon";
import { capitalize } from "@mui/material";

import BackIcon from "../../public/icons/BackIcon";
import VideoIcon from "../../public/icons/VideoIcon";

// import { SelectedWorkout } from "pages/workoutV2";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import { getFitPointString } from "@modules/PaymentPopover/utils";
import { useWorkoutTrackingTasks } from "@hooks/tasks/useWorkoutTrackingTasks";
import { UserInterface } from "@models/User/User";
// import { useUploadWidget } from "@hooks/cloudinary/useUploadWidget";
import IconButton from "@components/button/iconButton";
import UppyWidget from "@components/Uppy";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  onBack: () => void;
  onNextFn: () => void;
  taskId: string;
  user: UserInterface;
  onStreamIdUpdate: (newId: string) => void;
  // selectedWorkout: SelectedWorkout;
}

const MediaTask: React.FC<Props> = ({
  onStreamIdUpdate,
  onNextFn,
  onBack,
  taskId,
  user,
}) => {
  const { task } = useWorkoutTask(taskId);

  const { userStream, onUploadMedia, onDeleteMedia } = useWorkoutTrackingTasks(
    user,
    taskId
  );

  // useUploadWidget(
  //   onUploadMedia,
  //   userStream && userStream.media && userStream?.media?.length > 0
  //     ? false
  //     : true
  // );

  useEffect(() => {
    if (userStream?.id) {
      onStreamIdUpdate(userStream?.id);
    }
  }, [userStream?.id]);

  const onNext = async (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
    const id = await onUploadMedia(newFiles);
    if (id) {
      onStreamIdUpdate(id);
    }
    onNextFn();
  };

  // console.log("task", task);
  // console.log("userStream", userStream, onStreamIdUpdate);

  // const [videoRecorded, setVideoRecorded] = useState(false);

  // const webcamRef = React.useRef(null);
  // const mediaRecorderRef = React.useRef(null);
  // const [capturing, setCapturing] = React.useState(false);
  // const [recordedChunks, setRecordedChunks] = React.useState([]);
  // const [videoSrc] = React.useState();

  // const handleStartCaptureClick = React.useCallback(() => {
  // setCapturing(true);
  // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
  //   mimeType: "video/webm",
  // });
  // mediaRecorderRef.current.addEventListener(
  //   "dataavailable",
  //   handleDataAvailable
  // );
  // mediaRecorderRef.current.start();
  // }, [webcamRef, setCapturing, mediaRecorderRef]);

  // const handleDataAvailable = React.useCallback(
  //   ({ data }) => {
  //     if (data.size > 0) {
  //       setRecordedChunks((prev) => prev.concat(data));
  //     }
  //   },
  //   [setRecordedChunks]
  // );

  // const handleStopCaptureClick = React.useCallback(() => {
  // mediaRecorderRef.current.stop();
  // setCapturing(false);
  // if (recordedChunks.length) {
  //   const blob = new Blob(recordedChunks, {
  //     type: "video/webm",
  //   });
  //   const url = URL.createObjectURL(blob);
  //   const myFile = new File([blob], "demo.webm", { type: "video/webm" });

  //   setVideoSrc(myFile);
  // }
  // }, [mediaRecorderRef, webcamRef, setCapturing, recordedChunks]);

  // const handleDownload = React.useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm",
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     document.body.appendChild(a);
  //     // a.style = "display: none";
  //     a.href = url;
  //     a.download = "react-webcam-stream-capture.webm";
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     setRecordedChunks([]);
  //   }
  // }, [recordedChunks]);

  // console.log("user", userStream?.media?.length);

  return (
    <div className="">
      <div
        className="text-left p-4 flex items-center text-2xl"
        onClick={onBack}
      >
        <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
      </div>

      <div className="w-full px-4">
        {task?.avatar && (
          <MediaTile
            alt={task?.name ? task.name : "task"}
            media={task?.avatar}
            accessible={true}
            width={400}
            rPlayer={true}
            // playing={true}
            height={getHeight(task?.avatar, 400)}
          />
        )}
      </div>

      <div className="mt-2 px-4">
        <h1 className="text-3xl text-gray-700 font-semibold ">
          {capitalize(task?.name ? task?.name : "")}
        </h1>
        <p className="flex items-center pt-1 text-gray-500">
          <Fireicon style={{ height: "25", width: "25" }} /> &nbsp;
          {getFitPointString(task?.fitPoints, task?.durationMinutes)}
        </p>
      </div>

      <div className="flex flex-wrap px-4 pt-4 overflow-scroll">
        {userStream?.media &&
          userStream.media.map((item) => {
            return (
              <div key={item.id} className="absolute">
                <MediaTile
                  media={item}
                  width={200}
                  roundedString="rounded-sm shadow-md"
                  height={getHeight(item, 200)}
                  alt="med"
                />
                <div className="absolute top-1 right-1">
                  <IconButton onClick={() => onDeleteMedia(item)} />
                </div>
              </div>
            );
          })}
      </div>

      <div className="h-screen" />

      {/* <div
        className="text-center border shadow-lg bg-gray-100"
        style={{
          height: "300px",
        }}
      > */}
      {/* {(videoRecorded || recordedChunks.length > 0) && (
          <div
            className="text-left text-2xl absolute mt-6 ml-4 z-10 "
            onClick={() => {
              setVideoRecorded(false);
              setRecordedChunks([]);
            }}
          >
            <CloseIcon
              style={{
                height: "35",
                width: "35",
                fill: "black",
              }}
            />
          </div>
        )} */}

      {/* {videoRecorded ? (
          <video width="375" height="300" controls>
            <source src={videoSrc} type="video/webm" />
          </video>
        ) : (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        )} */}
      {/* </div> */}
      {/* <div className="absolute bg-gray-100 mt-5 shadow-lg border border-gray-300">
        <span>
          <SelfieIcon
            style={{
              width: "370",
              height: "300",
              fill: "gray",
            }}
          />
        </span>
      </div> */}

      {/* {recordedChunks.length > 0 && (
        <button className="border p-1 m-1" onClick={handleDownload}>
          Download
        </button>
      )} */}

      <UppyWidget
        screenName="dep"
        taskName="dep"
        uid={user.uid}
        onUpload={onNext}
      >
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
          <BottomNavComV2
            cta={`Add workout`}
            // id="photo-form-container"
            onClick={userStream?.media?.length ? () => onNextFn() : () => {}}
            icon={
              <VideoIcon style={{ height: "35", width: "35", fill: "white" }} />
            }
          />
        </div>
      </UppyWidget>
    </div>
  );
};

export default MediaTask;
