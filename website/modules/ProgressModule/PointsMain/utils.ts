import { DayStepDoc } from "@hooks/progress/useUserPreviousSteps";
import { dayRecommendation } from "@models/User/User";
import { format } from "date-fns";

export type selectedFpSectionType = "All" | "Workout" | "Diet" | "Steps";

export const getDateStr = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
export const getDataByView = (
  selectedView: selectedFpSectionType,

  dateRecs: { [date: string]: dayRecommendation },
  dayRecsNutri: { [date: string]: dayRecommendation },
  allTime: { [date: string]: dayRecommendation }
) => {
  switch (selectedView) {
    case "All":
      return allTime;
    case "Diet":
      return dayRecsNutri;
    case "Workout":
      return dateRecs;
    default:
      return {};
  }
};

export const getProgressValues = (
  workoutRecs: {
    [date: string]: dayRecommendation;
  },
  nutritionRecs: {
    [date: string]: dayRecommendation;
  },
  stepDocs: {
    [date: string]: DayStepDoc;
  },
  date: string,
  type: selectedFpSectionType,
  dayStepTarget: number
) => {
  if (type === "Workout") {
    const recomendation = workoutRecs[date];
    const stepDoc = stepDocs[date];
    return {
      workoutProgress:
        (recomendation?.doneFP || 0) / (recomendation?.taskFP || 1),
      stepProgress: (stepDoc?.steps ? stepDoc.steps : 0) / dayStepTarget,
    };
  } else if (type === "Diet") {
    const recomendation = nutritionRecs[date];
    return {
      nutritionProgress:
        (recomendation?.doneFP || 0) / (recomendation?.taskFP || 1),
    };
  } else {
    const recomendationW = workoutRecs[date];
    const recomendation = nutritionRecs[date];
    const stepDoc = stepDocs[date];
    return {
      workoutProgress:
        (recomendationW?.doneFP || 0) / (recomendationW?.taskFP || 1),
      nutritionProgress:
        (recomendation?.doneFP || 0) / (recomendation?.taskFP || 1),
      stepProgress: (stepDoc?.steps ? stepDoc.steps : 0) / dayStepTarget,
    };
  }
};

export const getColorSchemeProgress = (type: selectedFpSectionType) => {
  switch (type) {
    case "Workout":
      return {
        activeColors: ["#6D55D1"],
        inactiveColors: ["#0085D0"],
      };
    case "Diet":
      return {
        activeColors: ["#EE7200"],
        inactiveColors: ["#EF7301"],
      };
    case "All":
      return {
        activeColors: ["#6D55D1", "#EE7200"],
        inactiveColors: ["#0085D0", "#EF7301"],
      };
    default:
      return {
        activeColors: ["#6D55D1", "#EE7200"],
        inactiveColors: ["#0085D0", "#EF7301"],
      };
  }
};
