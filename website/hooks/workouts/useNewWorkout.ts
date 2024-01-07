import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewWorkout } from "@models/Workouts/createUtils";
import { Workout } from "@models/Workouts/Workout";
import { useCallback, useEffect, useState } from "react";

export const useNewWorkout = (
  uid: string,
  editFlag?: boolean,
  editingWorkout?: Workout,
  initDay?: number
) => {
  const [newWorkout, updateNewWorkout] = useState<Workout | undefined>(() =>
    editFlag && editingWorkout ? editingWorkout : undefined
  );

  useEffect(() => {
    if (!editFlag) {
      // console.log("making new post");
      updateNewWorkout(createNewWorkout(uid, initDay));
    } else if (editFlag && editingWorkout) {
      updateNewWorkout(editingWorkout);
    }
  }, [editFlag, editingWorkout, initDay, uid]);

  const onUpdateName = (name: string) => {
    updateNewWorkout((prev) => {
      if (prev)
        return {
          ...prev,
          name: name,
          // videoKey: generateEventKey(name),
        };
    });
  };

  const onUpdateDescription = (description: string) => {
    updateNewWorkout((prev) => {
      if (prev)
        return {
          ...prev,
          description: description,
        };
    });
  };

  const onEquipmentNeeded = (equipmentNeeded: string) => {
    updateNewWorkout((prev) => {
      if (prev)
        return {
          ...prev,
          equipmentNeeded,
        };
    });
  };

  const onKeyChange = (videoKey: string) => {
    updateNewWorkout((prev) => {
      if (prev)
        return {
          ...prev,
          videoKey,
        };
    });
  };

  const isFreeUpdate = (isFree: boolean) => {
    updateNewWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          isFree,
        };
      }
    });
  };

  const onCalorieUpdate = (calories: number) => {
    updateNewWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          calories,
        };
      }
    });
  };

  const onDayUpdate = (day: number) => {
    updateNewWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          day,
        };
      }
    });
  };

  const onMediaUpload = useCallback((newFile: CloudinaryMedia | AWSMedia) => {
    updateNewWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          media: newFile,
        };
      }
    });
  }, []);

  const onMediaDelete = () => {
    updateNewWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          media: undefined,
        };
      }
    });
  };

  return {
    newWorkout,
    onMediaUpload,
    onMediaDelete,
    onUpdateName,
    onUpdateDescription,
    isFreeUpdate,
    onCalorieUpdate,
    onDayUpdate,
    onEquipmentNeeded,
    onKeyChange,
  };
};
