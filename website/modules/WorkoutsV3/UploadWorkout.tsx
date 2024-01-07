// import Header from "";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import UppyWidget from "@components/Uppy";
import { baseImageKit, imageIcon } from "@constants/icons/iconURLs";
// import { useWorkoutTrackingTasksV2 } from "@hooks/tasks/useUserWorkoutTrackingTasksV2";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

// import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { UserInterface } from "@models/User/User";
import Header from "@modules/WorkoutsV3/Header";
// import { useEffect } from "react";
import clsx from "clsx";

interface Props {
  // goToComponent: () => void;
  // taskId: string;
  user: UserInterface;
  onUploadMedia: (newMedia: (CloudinaryMedia | AWSMedia)[]) => void;
  onBack: () => void;
  taskName?: string;
}

const UploadWorkout: React.FC<Props> = ({
  user,
  onUploadMedia,
  // goToComponent,
  // taskId,
  onBack,
  taskName,
}) => {
  //   const { task } = useWorkoutTask(taskId);
  // const { onUploadMedia } = useWorkoutTrackingTasksV2(
  //   goToComponent,
  //   user,
  //   taskId
  // );

  //   console.log("task", task);

  return (
    <div className="w-full h-full flex flex-col">
      <Header
        onBack={onBack}
        title="Post Workout"
        headingCenter={true}
        color="#335E7D"
        classStr="p-4"
      />
      <div
        className={clsx(
          "flex-1 flex flex-col justify-center items-center cursor-pointer bg-cover",
          `bg-[url("https://ik.imagekit.io/socialboat/Frame_5_eG25C5z-K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651404991887")]`
        )}
      >
        <UppyWidget
          uid={user.uid}
          screenName="dep"
          taskName="dep"
          onUpload={onUploadMedia}
        >
          <div
            className="flex flex-col items-center"
            onClick={() => {
              weEventTrack("startWorkout_taskPreviewUploadTask", {
                taskName: taskName ? taskName : "no_taskName",
              });
            }}
          >
            <img
              src={`${baseImageKit}/tr:w-120,c-maintain_ratio/${imageIcon}`}
            />
            <p className="text-white text-lg pt-8">
              Upload your task video/img
            </p>
          </div>
        </UppyWidget>
      </div>
    </div>
  );
};

export default UploadWorkout;
