import { RouteKeys } from "@routes/MainStack";
import { create } from "zustand";

type formState = "DIET_ONLY" | "DOC_ONLY" | "DIET_DOC" | "NONE";

interface zNavStore {
  formStatus: formState;
  updateFormStatus: (newState: formState) => void;

  workoutFinishNav: RouteKeys;
  setWorkoutFinishNav: (newKey: RouteKeys) => void;
}

export const useNavStore = create<zNavStore>((set, get) => ({
  formStatus: "NONE",
  updateFormStatus: (newformState: formState) => {
    set((prev) => {
      return {
        ...prev,
        formStatus: newformState,
      };
    });
  },
  workoutFinishNav: "WorkoutDoneScreen",
  setWorkoutFinishNav: (newKey: RouteKeys) =>
    set((state) => ({ ...state, workoutFinishNav: newKey })),
}));

// if dietForm && docForm not filled && canFillDoc -> Send to Diet_doc
// if dietForm not filled -> Send to diet only
// if dietForm filled && docForm filled
