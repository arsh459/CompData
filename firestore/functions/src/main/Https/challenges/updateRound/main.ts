import { TEAM_ALPHABET_GAME } from "../../../../constants/challenge";
import { getRoundById } from "../../../../models/Rounds/getUserRankV2";
import { fpObjInterface } from "../../../../models/Rounds/interface";
import { getBadge } from "../../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
import { getFormattedDateForUnixWithTZ } from "../../../PubSub/activityTracker/utils";
import { ONE_DAY_MS } from "../../period/getPeriodArray";
import * as admin from "firebase-admin";

export const updateRoundMain = async (roundId: string) => {
  const round = await getRoundById(roundId);
  const roundStart = round?.start;

  const roundQuota: fpObjInterface = {};

  const badgeIdsToUse = round?.additionalBadgeIds;
  if (badgeIdsToUse && roundStart) {
    for (const badgeId of badgeIdsToUse) {
      const badge = await getBadge(badgeId, TEAM_ALPHABET_GAME);

      if (badge?.workoutLevels) {
        let i: number = 0;
        const dt = roundStart;
        for (const wkLevel of badge?.workoutLevels) {
          const dayStart = dt + ONE_DAY_MS * i;

          const formatted = getFormattedDateForUnixWithTZ(
            dayStart,
            "Asia/Kolkata",
          );

          const val = wkLevel.nbFitpoints;

          if (roundQuota[formatted]) {
            roundQuota[formatted] += val;
          } else {
            roundQuota[formatted] = val;
          }

          console.log("badge", i, formatted, wkLevel);

          i++;
        }
      }
    }
  }

  await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("rounds")
    .doc(roundId)
    .update({
      dailyFPQuota: roundQuota,
    });
  console.log("roundQuota", roundQuota);
};
