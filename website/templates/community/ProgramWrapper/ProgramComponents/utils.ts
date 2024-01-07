import { Activity } from "@models/Activities/Activity";

export const isIButtonVisible = (activity?: Activity) => {
  // console.log("ac", activity?.activityName);
  if (
    !activity ||
    activity.source === "terra" ||
    activity.activityName === "Post" ||
    // activity.activityName === "Terra" ||
    activity.reviewStatus === "PENDING" ||
    activity.reviewStatus === "DISCARDED" ||
    activity.reviewStatus === "TRY_AGAIN" ||
    activity.reviewStatus === "DISCARDED_SAVED"
  ) {
    return false;
  }

  return true;
};
