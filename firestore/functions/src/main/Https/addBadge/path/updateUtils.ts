import {
  AchievementPathDataItemStatusType,
  AchievementPathDataItemTypes,
} from "../../../../models/User/User";
import { getAwardByType } from "../../../../models/awards/getUtils";
import { awardStatus } from "../../../../models/awards/interface";
import { getAchieverTargetMonth } from "./utils";
import * as admin from "firebase-admin";

export const getAchieverAwardStatusFromAchivementPathItemStatus = (
  status: AchievementPathDataItemStatusType,
  endTime?: number,
): awardStatus | undefined => {
  switch (status) {
    case "PENDING":
      return endTime && endTime < Date.now() ? "EXPIRED" : "TARGET";
    case "DONE":
      return "WON";
    default:
      return undefined;
  }
};

export const updateAchieverStatus = async (
  userId: string,
  status?: awardStatus,
  type?: AchievementPathDataItemTypes,
  startTime?: number,
  endTime?: number,
) => {
  if (type && status) {
    const award = await getAwardByType(type);

    if (award && startTime && endTime) {
      const achiever = await getAchieverTargetMonth(
        userId,
        startTime,
        endTime,
        award.id,
      );

      if (achiever) {
        await admin
          .firestore()
          .collection("achievers")
          .doc(achiever.id)
          .update({ status });
      }
    }
  }
};
