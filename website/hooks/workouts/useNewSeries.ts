// import { sessionTypes } from "@models/Event/Event";
// import { generateEventKey } from "@models/Event/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { createNewPost } from "@models/Posts/createUtils";
// import { Post } from "@models/Posts/Post";
import { createNewSeries } from "@models/Workouts/createUtils";
import { WorkoutSeries } from "@models/Workouts/Series";
import { useCallback, useEffect, useState } from "react";

export const useNewSeries = (
  uid?: string,
  editFlag?: boolean,
  editingSeries?: WorkoutSeries
) => {
  const [newSeries, updateNewSeries] = useState<WorkoutSeries | undefined>(() =>
    editFlag && editingSeries ? editingSeries : undefined
  );

  // console.log("newSeries", newSeries?.seriesKey);

  useEffect(() => {
    if (uid && !editFlag) {
      // console.log("making new post");
      updateNewSeries(createNewSeries(uid));
    } else if (uid && editFlag && editingSeries) {
      updateNewSeries(editingSeries);
    }
  }, [editFlag, uid, editingSeries]);

  const onUpdateName = (name: string) => {
    updateNewSeries((prev) => {
      if (prev)
        return {
          ...prev,
          name: name,
          // ...(!prev.seriesKey ? { seriesKey: generateEventKey(name) } : {}),
        };
    });
  };

  const onUpdateDescription = (description: string) => {
    updateNewSeries((prev) => {
      if (prev)
        return {
          ...prev,
          description: description,
        };
    });
  };

  const onCostUpdate = (cost: number) => {
    updateNewSeries((prev) => {
      if (prev) {
        return {
          ...prev,
          cost: cost,
        };
      }
    });
  };

  const onGoalUpdate = (workoutGoal: string) => {
    updateNewSeries((prev) => {
      if (prev) {
        return {
          ...prev,
          workoutGoal,
        };
      }
    });
  };

  const onKeyChange = (seriesKey: string) => {
    updateNewSeries((prev) => {
      if (prev) {
        return {
          ...prev,
          seriesKey,
        };
      }
    });
  };

  const onEquipmentNeeded = (equipmentNeeded: string) => {
    updateNewSeries((prev) => {
      if (prev) {
        return {
          ...prev,
          equipmentNeeded,
        };
      }
    });
  };

  const onGoodFor = (goodFor: string) => {
    updateNewSeries((prev) => {
      if (prev) {
        return {
          ...prev,
          goodFor,
        };
      }
    });
  };

  const onMediaUpload = useCallback((newFile: CloudinaryMedia) => {
    updateNewSeries((prev) => {
      if (prev) {
        return {
          ...prev,
          thumbnail: newFile,
        };
      }
    });
  }, []);

  const onMediaDelete = () => {
    updateNewSeries((prev) => {
      if (prev) {
        return {
          ...prev,
          media: undefined,
        };
      }
    });
  };

  return {
    newSeries,
    onMediaUpload,
    onMediaDelete,
    onUpdateName,
    onUpdateDescription,
    onCostUpdate,
    onGoalUpdate,
    onEquipmentNeeded,
    onGoodFor,
    onKeyChange,
  };
};
