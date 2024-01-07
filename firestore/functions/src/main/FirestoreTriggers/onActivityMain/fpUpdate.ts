import { Activity } from "../../../models/Activity/Activity";
import { getActiveRound } from "../../../models/Rounds/getUserRankV2";
import { getUserById } from "../../../models/User/Methods";

import { getDateBucket, getTimezone } from "../onActivityUpdateV2/dateBucket";
import { updateActivityCredit } from "../onActivityUpdateV2/updateCredit";
import { updateGoalObj } from "../onActivityUpdateV2/updateKPIs";
import { handleUserRecommendationProgress } from "../onBadgeProgressUpdate/userRecProgressV2";
import { addLederboardTaskFunc } from "./addLeaderboardTask";
// import { handleStreakUpdate } from "./streakUpdate";

export const handleFPUpdateActivity = async (
  uid: string,
  now: Activity,
  pre?: Activity,
) => {
  // update credits
  const prevFP = Math.round((pre?.calories ? pre.calories : 0) / 300);
  const nowFP = Math.round((now?.calories ? now.calories : 0) / 300);

  const preTotalKcalConsumed = Math.round(
    (pre?.totalKcalConsumed ? pre.totalKcalConsumed : 0) / 300,
  );
  const nowTotalKcalConsumed = Math.round(
    (now?.totalKcalConsumed ? now.totalKcalConsumed : 0) / 300,
  );

  console.log("fp change", uid, nowFP, prevFP);
  console.log("KCal Change change", nowTotalKcalConsumed, preTotalKcalConsumed);

  // only if FP have changed
  if (nowFP !== prevFP || preTotalKcalConsumed !== nowTotalKcalConsumed) {
    // 1 READ
    const user = await getUserById(uid);
    if (user && now.createdOn) {
      const tzStr = getTimezone(user);

      console.log("timezone", user.uid, tzStr);
      const dateBucket = getDateBucket(tzStr, now.createdOn);

      console.log("date", user.uid, dateBucket);

      if (nowFP !== prevFP) {
        console.log("fp change here", user.uid, nowFP - prevFP);
        await updateActivityCredit(user.uid, prevFP, nowFP);

        console.log("credit updated", user.uid, nowFP - prevFP);

        // goal obj update
        await updateGoalObj(
          user,
          nowFP,
          prevFP,
          !pre ? true : false,
          dateBucket,
          now.createdOn,
        );

        console.log("goalUpdated", user.uid, dateBucket, nowFP, prevFP);

        ////////////////////////////////////// CHECK FOR ROUND
        if (typeof user.challengeJoined === "number") {
          // check if activity above active round
          const upcomingRound = await getActiveRound();
          const timeActivity = now.createdOn;

          if (
            upcomingRound?.start &&
            upcomingRound.end &&
            timeActivity >= upcomingRound?.start &&
            timeActivity <= upcomingRound.end
          ) {
            await addLederboardTaskFunc(
              user.uid,
              nowFP - prevFP,
              user.userLevelV2 ? user.userLevelV2 : 1,
              timeActivity,
            );
          }
        }
        ////////////////////////////////////// CHECK FOR ROUND
      }

      // recommendation update either ways
      await handleUserRecommendationProgress(
        user,
        nowFP,
        prevFP,
        now,
        dateBucket,
      );

      // @KRISHIANU
      // now.source !== 'nutrition'
      // is above nowFP total user points

      // if (now.source !== "nutrition") {
      // await handleStreakUpdate(user);
      // }
    }
  }
};
