import { useCallback, useState } from "react";

import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { WorkoutV2 } from "@models/WorkoutV2/WorkoutV2";

export const useWorkout = () => {
  const [workout, setWorkout] = useState<WorkoutV2>();

  const onMediaUpload = useCallback((newFile: CloudinaryMedia) => {
    // console.log(newFile, "hi");
    setWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          workoutImages: newFile,
        };
      }
    });
  }, []);

  const onMediaDelete = () => {
    setWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          workoutImages: undefined,
        };
      }
    });
  };

  return {
    workout,
    onMediaDelete,
    onMediaUpload,
  };
};
