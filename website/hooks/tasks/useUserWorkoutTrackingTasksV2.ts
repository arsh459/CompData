import { useCallback } from "react";
import {
  addMediaToStream,
  createNewStream,
  removeMediaFromStream,
  saveTaskStream,
} from "@models/Workouts/createStream";
import { UserInterface } from "@models/User/User";
import { useWorkoutTaskStream } from "./useWorkoutTaskStream";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

// const inactivePeriod = 90 * 60 * 60 * 1000;
// const stopActivityPeriod = 10 * 60 * 60 * 1000;

export const useWorkoutTrackingTasksV2 = (
  goToComponent?: () => void,
  user?: UserInterface,
  taskId?: string
) => {
  const { userStream } = useWorkoutTaskStream(taskId, user?.uid);

  const onUploadMedia = useCallback(
    async (newFile: (CloudinaryMedia | AWSMedia)[]) => {
      if (!userStream?.id && user?.uid && taskId) {
        const now = new Date();
        const newStream = createNewStream(
          user.uid,
          `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
          "task",
          now.getTime(),
          user.name,
          user.profileImage,
          "active",
          newFile
        );

        await saveTaskStream(newStream, taskId);
        goToComponent ? goToComponent() : null;
        return newStream.id;
      } else if (userStream?.id && taskId) {
        for (const file of newFile) {
          await addMediaToStream(taskId, userStream.id, file);
        }

        goToComponent ? goToComponent() : null;
        return userStream.id;
      }
    },
    [
      userStream?.id,
      taskId,
      user?.uid,
      user?.name,
      user?.profileImage,
      //   goToComponent,
    ]
  );

  const onDeleteMedia = useCallback(
    async (newFile: CloudinaryMedia | AWSMedia) => {
      console.log("here", userStream?.id, taskId);
      if (userStream?.id && taskId) {
        await removeMediaFromStream(taskId, userStream.id, newFile);
      }
    },
    [userStream?.id, taskId]
  );

  return {
    onUploadMedia,
    onDeleteMedia,
    userStream,
  };
};
