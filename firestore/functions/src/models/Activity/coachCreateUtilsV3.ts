// import { COACH_WEEKLY_PRIZES } from "../../constants/challenge";
import { createDayStringPointObject_Coach } from "../Prizes/getStreakPrize";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
// import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
import { CoachRank, UserRank } from "./Activity";
import { updateCoachRankV3 } from "./coachCreateUtilsV2";
import { getCoachRank } from "./getUtils";
import {
  reRankCoaches_month_FitPointsV2,
  reRankCoaches_week_FitPointsV2,
} from "./handleCoachRankingV2";
import { rankCoachesPoints } from "./handleRanking";

export const refreshCoachHandlerV3 = async (
  gameId: string,
  coachUsers: UserRank[],
  coachTeamRanks: { [uid: string]: UserRank[] },
  numActivitiesToCount: number,
  // after: number,
  // sprints: SprintObject[],
  // rounds: RoundObject[],
) => {
  let reads: number = 0;
  const updatedCoaches: CoachRank[] = [];
  for (const coachUser of coachUsers) {
    const {
      dayPointObj,
      weekPointObj,
      dayCalObj,
      weekCalObj,
      monthCalObj,
      monthPointObj,
    } = createDayStringPointObject_Coach(
      coachTeamRanks[coachUser.uid],
      numActivitiesToCount,
      // after,
      // sprintLength,
      // roundLength,
    );

    const coach = await getCoachRank(gameId, coachUser.uid);

    if (coach) {
      reads += 1;
      updatedCoaches.push(
        updateCoachRankV3(
          dayPointObj,
          weekPointObj,
          dayCalObj,
          weekCalObj,
          monthCalObj,
          monthPointObj,
          coach,
        ),
      );
    }
  }

  console.log("COACH READS", reads);

  return updatedCoaches;
};

export const rankCoachesWrapper = (
  coachRanks: CoachRank[],
  // after: number,
  rounds: RoundObject[],
  sprints: SprintObject[],
) => {
  const reRankedCoaches_interim = rankCoachesPoints(coachRanks);

  const reRankedCoaches_current = reRankCoaches_week_FitPointsV2(
    reRankedCoaches_interim,
    rounds,
  );

  const rerankedFinal = reRankCoaches_month_FitPointsV2(
    reRankedCoaches_current,
    sprints,
  );

  return rerankedFinal;
};
