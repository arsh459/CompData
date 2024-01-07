/* eslint-disable react-hooks/exhaustive-deps */
// import Image from "next/image";
import React, { useEffect } from "react";

import BackIcon from "../../public/icons/BackIcon";

// import WebCam from "./WebCam";
import { useTaskImage } from "@hooks/tasks/useTaskImage";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useWorkoutTrackingTasks } from "@hooks/tasks/useWorkoutTrackingTasks";
import { UserInterface } from "@models/User/User";

import AddMediaToActivity from "./AddMediaToActivity";
// import { notifyUser } from "@models/Activities/createUtils";

// import { SelectedWorkout } from "pages/workoutV2";

interface Props {
  onBack: () => void;
  onPostRequest: () => void;
  taskId: string;
  onStreamIdUpdate: (newId: string) => void;
  uid: string;
  user?: UserInterface;
  // selectedWorkout: SelectedWorkout;
}

const CaptureMedia: React.FC<Props> = ({
  // onNextFn,
  onBack,
  taskId,
  onPostRequest,
  // streamId,
  uid,
  user,
  onStreamIdUpdate,
  // selectedWorkout,
}) => {
  // const [photoClicked, setPhotoClicked] = useState(false);
  // // const { rank = "23", time = "01:10:05", cal = "90" } = selectedWorkout;
  // const rank = "23";
  // const time = "01:10:05";
  // const cal = "90";

  // const webcamRef = React.useRef(null);
  // const [imgSrc, setImgSrc] = React.useState(null);
  // const mediaRecorderRef = React.useRef(null);
  // const [capturing, setCapturing] = React.useState(false);
  // const [recordedChunks, setRecordedChunks] = React.useState([]);
  // const [videoSrc, setVideoSrc] = React.useState();

  const { userStream, onUploadMedia, onDeleteMedia } = useWorkoutTrackingTasks(
    user,
    taskId
  );

  useEffect(() => {
    if (userStream?.id) {
      onStreamIdUpdate(userStream?.id);
    }
  }, [userStream?.id]);

  const { selfie } = useTaskImage(taskId, userStream?.id);

  // console.log("userStream", userStream);

  const onNext = async () => {
    if (user?.terraUser && userStream?.activityId) {
      onPostRequest();
      // await notifyUser(user.uid, userStream.activityId);
    } else {
      onPostRequest();
    }
  };

  // console.log("userStream", userStream, selfie);
  // console.log("selfie ", selfie);

  return (
    <div className="px-4 py-4 pt-6">
      <div className="pb-4" onClick={onBack}>
        <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />
      </div>
      <>
        <h2 className="font-bold text-gray-700 text-3xl pb-2">
          {user?.terraUser ? "Add Workout Image" : "Proof of Workout"}
        </h2>
        <h3 className="font-bolder text-lg text-gray-600 ">
          {user?.terraUser
            ? "Add an image of your workout to let people know about your killer workout!"
            : "Submit a screenshot of your workout and a workout image. This proof is to ensure the game is held in a fair manner. GoogleFit screenshots are not allowed"}
        </h3>
      </>
      <div className="pt-8">
        <div className="pt-8">
          <AddMediaToActivity
            media={userStream?.media}
            uid={user?.uid ? user.uid : "noUser"}
            onUpload={onUploadMedia}
            cta={user?.terraUser ? "Add Workout image" : "Add Workout Proof"}
            onDelete={onDeleteMedia}
            // onRemoveById={() => {}}
          />
        </div>
        {/* <WebCam
          img={selfie}
          type="image"
          uid={uid}
          taskId={taskId}
          saveNewLocalStream={saveNewLocalStream}
          streamId={userStream?.id}
        >
          <div className="pt-8">
            <AddMediaToActivity
              media={userStream?.media}
              onUpload={onUploadMedia}
              onDelete={onDeleteMedia}
            />
          </div>
        </WebCam> */}
      </div>

      {selfie?.img || userStream?.media?.length ? (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
          <BottomNavComV2
            cta={user?.terraUser ? "Submit Workout" : "Finish Workout"}
            onClick={onNext}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CaptureMedia;
