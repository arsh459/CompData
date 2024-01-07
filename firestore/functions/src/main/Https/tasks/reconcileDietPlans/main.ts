import { TEAM_ALPHABET_GAME } from "../../../../constants/challenge";

import { getBadge } from "../../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
import { badgeProgressReconcile } from "../../../FirestoreTriggers/onBaseTaskWrite/badgeUpdater";
import { getUniqueDietPlanIds } from "./utils/getUniqueDietPlans";

export const reconcileDietPlanMain = async (start: number, end: number) => {
  const dietPlans = await getUniqueDietPlanIds();
  console.log("dietPlans", dietPlans.length);

  console.log();
  console.log();

  let j: number = 0;
  for (const badgeId of dietPlans) {
    if (j >= start && j < end) {
      // get badge
      const badge = await getBadge(badgeId, TEAM_ALPHABET_GAME);

      if (badge) {
        await badgeProgressReconcile(badge, false);
      }

      j++;
    } else {
      console.log("skipping", j, badgeId);
      j++;
    }
  }
};
