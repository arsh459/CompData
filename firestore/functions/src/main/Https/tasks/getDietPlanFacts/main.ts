import { TEAM_ALPHABET_GAME } from "../../../../constants/challenge";
import { Badge } from "../../../../models/Prizes/Badges";
import { getUsersAssignedDietBadge } from "../../../../models/User/Methods";
import { getBadge } from "../../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
import { getUniqueDietPlanIds } from "../reconcileDietPlans/utils/getUniqueDietPlans";

export const getDietPlanFactsMain = async () => {
  const dietPlans = await getUniqueDietPlanIds();

  let j: number = 0;
  for (const badgeId of dietPlans) {
    // get badge
    const badge = await getBadge(badgeId, TEAM_ALPHABET_GAME);

    if (badge) {
      const users = await getUsersAssignedDietBadge(badge.id);

      for (const user of users) {
        const wkLevelStr = getWKLevelString(badge);
        console.log(
          j,
          " | ",
          badgeId,
          " | ",
          `https://socialboat.live/admin/games/${TEAM_ALPHABET_GAME}/${badgeId}/schedule`,
          " | ",
          user.uid,
          " | ",
          user.name,
          " | ",
          badge?.name,
          wkLevelStr,
        );
      }
    }

    j++;
  }
};

const getWKLevelString = (badge: Badge) => {
  let wkLevelString = "";
  if (badge.workoutLevels) {
    let sum: number = 0;
    for (const wkLevel of badge.workoutLevels) {
      sum += wkLevel.nutrition?.kcal ? wkLevel.nutrition?.kcal : 0;
    }

    const avg = sum / (badge.workoutLevels ? badge.workoutLevels.length : 1);

    wkLevelString += ` | ${sum} | ${avg}`;

    for (const wkLevel of badge.workoutLevels) {
      wkLevelString += ` | ${
        wkLevel.nutrition?.kcal ? wkLevel.nutrition?.kcal : -1
      }`;
      //   wkLevelString += `${wkLevel.nutrition?.kcal}KCal ${wkLevel.nutrition?.protein}g ${wkLevel.nutrition?.carbs}g ${wkLevel.nutrition?.fats}g ${wkLevel.nutrition?.fiber}g | `;
    }
  }

  return wkLevelString;
};
