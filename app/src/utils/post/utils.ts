import { Activity, SubTaskScore } from "@models/Activity/Activity";
import { NutritionFacts } from "@models/Tasks/Task";
import { SubTaskState } from "@modules/MealMain/store/useMealStore";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type viewLevelsTypes = "session" | "post" | "postReply";

export const createNewPostRef = (
  parentRef: FirebaseFirestoreTypes.DocumentReference,
  postId: string
) => {
  return parentRef.collection("posts").doc(postId);
};

export const getPaddingLeftForPost = (
  pin?: boolean,
  viewLevel?: viewLevelsTypes
) => {
  return pin
    ? ""
    : viewLevel === "session"
    ? "pl-4"
    : viewLevel === "post"
    ? "pl-4"
    : viewLevel === "postReply"
    ? "pl-4"
    : "";
};

export const getPaddingForPost = (
  viewLevel?: "session" | "post" | "postReply"
) => {
  return viewLevel === "session"
    ? "p-4 pb-0"
    : viewLevel === "post"
    ? "p-4 pl-6 pb-0"
    : "p-4 pl-4 ml-10 pb-0";
};

export const getBgForPost = (viewLevel?: "session" | "post" | "postReply") => {
  return viewLevel === "session"
    ? "bg-white shadow-lg"
    : viewLevel === "post"
    ? "bg-gray-50"
    : "bg-gray-50";
};

export const isIButtonVisible = (activity?: Activity) => {
  if (
    !activity ||
    activity.source === "terra" ||
    activity.activityName === "Post" ||
    // activity.activityName === "Terra" ||
    activity.reviewStatus === "PENDING" ||
    activity.reviewStatus === "IN_REVIEW" ||
    activity.reviewStatus === "DISCARDED" ||
    // activity.reviewStatus === "TRY_AGAIN" ||
    activity.reviewStatus === "DISCARDED_SAVED"
  ) {
    return false;
  }

  return true;
};

export const getStbTaskStateSeprated = (sutTaskState: {
  [id: string]: SubTaskState;
}) => {
  const subTaskScore: SubTaskScore = {};
  const subTaskQty: SubTaskScore = {};
  const macros: NutritionFacts = {};
  let totalKcalConsumed: number = 0;
  let fps: number = 0;

  Object.keys(sutTaskState).map((suTaskId) => {
    const score = sutTaskState[suTaskId].subTaskScore;
    subTaskScore[suTaskId] = score;

    const qty = sutTaskState[suTaskId].subTaskQty;
    subTaskQty[suTaskId] = qty;

    macros.fats =
      (macros.fats || 0) + (sutTaskState[suTaskId].macros?.fats || 0) * qty;
    macros.carbs =
      (macros.carbs || 0) + (sutTaskState[suTaskId].macros?.carbs || 0) * qty;
    macros.fibre =
      (macros.fibre || 0) + (sutTaskState[suTaskId].macros?.fibre || 0) * qty;
    macros.protein =
      (macros.protein || 0) +
      (sutTaskState[suTaskId].macros?.protein || 0) * qty;

    totalKcalConsumed += (sutTaskState[suTaskId].totalKcalConsumed || 0) * qty;

    fps += score;
  });

  return { subTaskScore, subTaskQty, macros, totalKcalConsumed, fps };
};
