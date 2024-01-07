import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { useEffect } from "react";
import useCustomRecipe from "@providers/customRecipe/useCustomRecipe";
import { shallow } from "zustand/shallow";

export const useCustomRecipeInitialization = (taskId: string | undefined) => {
  const { task } = useWorkoutTask(taskId);

  const { onInit } = useCustomRecipe(
    (state) => ({
      onInit: state.onInit,
    }),
    shallow
  );

  useEffect(() => {
    onInit(task);
  }, [task]);
};
