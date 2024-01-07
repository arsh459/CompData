import { format } from "date-fns";
import { getActivitiesInRange } from "../../../../models/Activity/getUtils";

import { getRoundById } from "../../../../models/Rounds/getUserRankV2";
import { getAllChallengeUsers } from "../../../../models/User/Methods";

import { getQueryPeriod } from "../seed/createRankFromUser_withPeriod";

export const mainActivityFetch = async (roundId: string) => {
  const round = await getRoundById(roundId);

  if (!round) {
    return false;
  }

  const roundStart = round.start;

  const usersInChallenge = await getAllChallengeUsers();

  let i: number = 0;
  let j: number = 0;
  for (const user of usersInChallenge) {
    if (user.challengeJoined) {
      const { start, end } = getQueryPeriod(user.challengeJoined, roundStart);

      const acts = await getActivitiesInRange(user.uid, start, end);

      for (const act of acts) {
        const calories = act.calories ? act.calories : 0;
        const fp = Math.round(calories / 300);

        if (fp) {
          console.log(
            i,
            " | ",
            user.uid,
            " | ",
            user.name,
            " | ",
            j,
            " | ",
            act.activityName,
            " | ",
            act.createdOn
              ? `${format(new Date(act.createdOn), "dd-MM-yyyy hh:mma")}`
              : "na",
            " | ",
            fp,
            " | ",
            user.sbPlanId ? "HAD PLAN" : "NO PLAN",
          );
          j++;
        }
      }
    }

    i++;
  }

  return true;
};
