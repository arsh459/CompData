import { getAllEarningByUserId, getEarningSum } from "../../Earning/Methods";
import * as admin from "firebase-admin";
// import * as functions from "firebase-functions";

export const reconcileEarningForUser = async (uid: string) => {
  const earnings = await getAllEarningByUserId(uid);
  const currDate = new Date().getTime();

  // functions.logger.log("all earnings", earnings);
  // functions.logger.log("currDate", currDate);
  // const earn2 = earnings.filter(
  // (item) => item.createdOn > currDate - 24 * 60 * 60 * 14 * 1000
  // );
  // functions.logger.log("earn2", earn2);
  // const earn2_ = earnings.reduce(
  // (acc, item) => acc + (item.action === "CREDIT" ? item.value : -item.value),
  // 0
  // );
  // functions.logger.log("earn2_", earn2_);

  await admin
    .firestore()
    .collection("leaderBoard")
    .doc(`leader-${uid}`)
    .update({
      // earning reconcile
      earnings2Weeks: getEarningSum(
        earnings.filter(
          (item) => item.createdOn > currDate - 24 * 60 * 60 * 14 * 1000
        )
      ),
      earnings1Month: getEarningSum(
        earnings.filter(
          (item) => item.createdOn > currDate - 24 * 60 * 60 * 30 * 1000
        )
      ),
      allEarnings: getEarningSum(earnings),
    });
};
