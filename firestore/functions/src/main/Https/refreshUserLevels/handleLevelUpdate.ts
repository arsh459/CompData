import { getAllSocialboatUsers } from "../../../models/User/Methods";
import {
  // updateUserLevel,
  updateUserLevelV2,
} from "../../../models/User/updateUserLevel";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
import { handleLevelChange } from "./handleLevelChange";
// import { handleUserReconcile } from "./handleUserLevelReconcile";
import { handleUserReconcileV2 } from "./handleUserLevelReconcileV2";
// import { handleUserWins } from "./handleUserWins";

export interface LevelSummary {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  totalFPoints?: number;
  activeFitPoints?: number;
  level: number;
  fetchedOnDate: string;
  fetchedOnTime: string;
}

export const handleLevelUpdate = async (sendMessageLater: boolean) => {
  const sbUsers = await getAllSocialboatUsers();
  // console.log("sb", sbUsers.length);

  const now = new Date().getTime();
  const now_30 = now - 30 * 24 * 60 * 60 * 1000;

  let i: number = 0;
  const returnSummary: LevelSummary[] = [];
  for (const sbUser of sbUsers) {
    const {
      totalFPoints,
      userLevel,
      activePoints,
      progressV2,
      dayCals,
      dayFitPoints,
    } = await handleUserReconcileV2(sbUser.uid, 300, now_30, now);

    if (
      typeof userLevel === "number" &&
      typeof sbUser.userLevelV2 === "number"
    ) {
      await handleLevelChange(
        sbUser.uid,
        sbUser.userLevelV2,
        userLevel,
        sendMessageLater,
      );
    }

    console.log(
      i,
      sbUser.phone,
      sbUser.name,
      sbUser.email,
      sbUser.uid,
      totalFPoints,
      // dayCals,
      // dayFitPoints,
      `${activePoints}`,
      `level-${userLevel}`,
    );

    // throw new Error("HI");

    // const { teamWins, individualWins } = await handleUserWins(sbUser.uid);

    await updateUserLevelV2(
      sbUser.uid,
      dayFitPoints,
      dayCals,
      userLevel,
      activePoints,
      progressV2,
    );

    returnSummary.push({
      uid: sbUser.uid,
      phone: sbUser.phone,
      name: sbUser.name,
      email: sbUser.email,
      totalFPoints: totalFPoints,
      activeFitPoints: activePoints,
      level: userLevel,

      fetchedOnDate: getFormattedDateForUnix(now),
      fetchedOnTime: getFormattedDateForUnix(now, "hh:mma YYYY-MM-DD"),
    });

    i++;
  }

  return returnSummary;
};
