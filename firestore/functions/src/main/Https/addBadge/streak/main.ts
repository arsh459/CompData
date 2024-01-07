import { getStreakAchiever } from "../../../../models/awards/getUtils";
import { acceptRequest, cancelRequest } from "./error/handleAPICallState";
import {
  getAwardId,
  removeDuplicateAchievers,
  splitActiveInactiveAchievers,
} from "./get/getAwardId";

export const handleStreakMain = async (
  uid: string,
  type: "workoutStreak" | "nutritionStreak",
): Promise<{ status: boolean; reason?: string }> => {
  // get requisite awardId from streakType
  const awardId = await getAwardId(type);
  if (!awardId) {
    return cancelRequest("AwardId for type not present");
  }
  // get active streak
  const achievers = await getStreakAchiever(uid, awardId);
  // filter out achievers whose endTime is gone.
  const { validAchievers, toDevalidate } =
    splitActiveInactiveAchievers(achievers);
  // Mark these completed or expired basis progress
  console.log("TO DO: DEVALIDATE", toDevalidate.length);
  const {
    duplicateAchievers,
    // mainAchiever
  } = removeDuplicateAchievers(validAchievers);
  console.log("TO DO: Remove duplicates", duplicateAchievers.length);

  //// if achiever is present
  ////// check if miss or still active
  //
  //// if achiever is absent or EXPIRED
  //// createNew && mark last as EXPIRED
  //
  // achiever is present & TARGET
  // update achiever status

  return acceptRequest();
};
