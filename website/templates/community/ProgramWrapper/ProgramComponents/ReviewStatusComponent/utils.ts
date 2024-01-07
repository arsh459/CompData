import { reviewStatus } from "@models/Activities/Activity";

export const fetchTask = (
  pointsSeen?: boolean,
  totalFitPoints?: number,
  reviewStatus?: reviewStatus
) => {
  if (
    !totalFitPoints &&
    typeof pointsSeen === "boolean" &&
    !pointsSeen &&
    (reviewStatus === "REVIEWED" ||
      // reviewStatus === "TICKET_REVIEWED" ||
      reviewStatus === "SAVED")
  ) {
    return false;
  }

  if (!totalFitPoints) {
    return false;
  }

  return true;
};
