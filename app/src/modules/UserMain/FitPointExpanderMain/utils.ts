import {
  mealIconFrame20,
  paceIconFrame20,
  stepIconFrame20,
} from "@constants/imageKitURL";
import { TaskTypes } from "@models/Tasks/Task";

export const returnTaskIcon = (taskType?: TaskTypes) => {
  switch (taskType) {
    case "workout":
      return { icon: paceIconFrame20, colors: ["#00D1FF", "#2094FF"] };
    case "nutrition" || "reels":
      return { icon: mealIconFrame20, colors: ["#FFD500", "#FF7A00"] };
    case "steps":
      return { icon: stepIconFrame20, colors: ["#AEFF04", "#7DBC00"] };
    default:
      return { icon: paceIconFrame20, colors: ["#00D1FF", "#2094FF"] };
  }
};
