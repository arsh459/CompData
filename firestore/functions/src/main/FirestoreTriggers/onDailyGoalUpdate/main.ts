import { getUserStreak } from "../../../models/Streak/getUserStreak";
import { streakLabel } from "../../../models/Streak/streakInterface";
// import { getUserById } from "../../../models/User/Methods";
import { goalObj } from "../../../models/User/User";
import * as admin from "firebase-admin";
import { getTodayDate } from "../onActivityUpdateV2/dateBucket";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";
import {
  getStreakDayCount,
  getUpdatedStreakLabel,
} from "./utils/getStreakDays";

export const onDailyGoalUpdateMain = async (
  uid: string,
  now: goalObj,
  pre?: goalObj,
) => {
  console.log("running for", uid);
  const nowTarget = now.targetFP;
  const nowFP = now.achievedFP;
  const prevFP = pre?.achievedFP ? pre.achievedFP : 0;

  console.log("nowFP", nowFP);
  console.log("prevFP", prevFP);
  console.log("nowTarget", nowTarget);

  if (nowFP >= nowTarget && prevFP >= nowTarget) {
    console.log("BOTH ABOVE", nowFP, prevFP, nowTarget);
    return;
  }

  if (nowFP < nowTarget && prevFP < nowTarget) {
    console.log("BOTH BELOW", nowFP, prevFP, nowTarget);
    return;
  }

  const userStreak = await getUserStreak(uid);

  console.log("userStreak", userStreak?.id);

  if (userStreak) {
    //
    const tz = userStreak.userTimeZone
      ? userStreak.userTimeZone
      : "Asia/Kolkata";
    const nowTime = Date.now();

    const nowDate = getFormattedDateForUnixWithTZ(nowTime, tz);

    if (nowDate !== now.date) {
      console.log("goalObj in past", now.date, nowDate);
      return;
    }

    if (tz) {
      const today = getTodayDate(tz);
      const streakRef = admin
        .firestore()
        .doc(`users/${uid}/streaks/${userStreak?.id}`);

      if (userStreak?.targetFp) {
        const currentStreakStatus: streakLabel = getUpdatedStreakLabel(
          now.achievedFP,
          userStreak.targetFp,
        );

        // if new status changed
        if (userStreak.streakMap[today.todayDate] !== currentStreakStatus) {
          console.log(
            "status update",
            currentStreakStatus,
            "old",
            userStreak.streakMap[today.todayDate],
          );

          const updatedStreakMap = {
            ...userStreak.streakMap,
            [today.todayDate]: currentStreakStatus,
          };

          const updatedDays = getStreakDayCount(updatedStreakMap);

          console.log("updatedDays", updatedDays);

          await streakRef.update({
            streakMap: updatedStreakMap,
            days: updatedDays,
            updatedOn: today.todayUnix,
            pendingActiveHitView:
              currentStreakStatus === "activeHit" ? true : false,
          });
        } else {
          console.log("no status update", currentStreakStatus);
        }
      }
    }
  }
};
