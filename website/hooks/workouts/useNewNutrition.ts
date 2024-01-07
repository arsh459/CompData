import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewNutrition } from "@models/Workouts/createUtils";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
// import { Workout } from "@models/Workouts/Workout";
import { useCallback, useEffect, useState } from "react";

export const useNewNutrition = (
  uid: string,
  editFlag?: boolean,
  editingPlan?: NutritionPlan,
  initDay?: number
) => {
  const [newNutrition, updateNewNutrition] = useState<
    NutritionPlan | undefined
  >(() => (editFlag && editingPlan ? editingPlan : undefined));

  useEffect(() => {
    if (!editFlag) {
      // console.log("making new post");
      updateNewNutrition(createNewNutrition(uid, initDay));
    } else if (editFlag && editingPlan) {
      updateNewNutrition(editingPlan);
    }
  }, [editFlag, editingPlan, initDay, uid]);

  const onUpdateName = (name: string) => {
    updateNewNutrition((prev) => {
      if (prev)
        return {
          ...prev,
          name: name,
          // videoKey: generateEventKey(name),
        };
    });
  };

  const onUpdateDescription = (description: string) => {
    updateNewNutrition((prev) => {
      if (prev)
        return {
          ...prev,
          description: description,
        };
    });
  };

  const onIngredientsNeeded = (ingredients: string) => {
    updateNewNutrition((prev) => {
      if (prev)
        return {
          ...prev,
          ingredients,
        };
    });
  };

  const onKeyChange = (planKey: string) => {
    updateNewNutrition((prev) => {
      if (prev)
        return {
          ...prev,
          planKey,
        };
    });
  };

  const isFreeUpdate = (isFree: boolean) => {
    updateNewNutrition((prev) => {
      if (prev) {
        return {
          ...prev,
          isFree,
        };
      }
    });
  };

  const onCalorieUpdate = (calories: number) => {
    updateNewNutrition((prev) => {
      if (prev) {
        return {
          ...prev,
          calories,
        };
      }
    });
  };

  const onDayUpdate = (day: number) => {
    updateNewNutrition((prev) => {
      if (prev) {
        return {
          ...prev,
          day,
        };
      }
    });
  };

  const onMediaUpload = useCallback((newFile: CloudinaryMedia) => {
    updateNewNutrition((prev) => {
      if (prev) {
        return {
          ...prev,
          media: newFile,
        };
      }
    });
  }, []);

  const onMediaDelete = () => {
    updateNewNutrition((prev) => {
      if (prev) {
        return {
          ...prev,
          media: undefined,
        };
      }
    });
  };

  return {
    newNutrition,
    onMediaUpload,
    onMediaDelete,
    onUpdateName,
    onUpdateDescription,
    isFreeUpdate,
    onCalorieUpdate,
    onDayUpdate,
    onIngredientsNeeded,
    onKeyChange,
  };
};
