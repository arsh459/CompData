// import { COACH_WEEKLY_PRIZES } from "../../../constants/challenge";
import { CoachRank } from "../../../models/Activity/Activity";
import { flipRankObj } from "../../../models/Activity/createUtils";
import {
  reRankCoaches_month_FitPointsV2,
  reRankCoaches_week_FitPointsV2,
} from "../../../models/Activity/handleCoachRankingV2";
import {
  rankCoachesPoints,
  // reRankCoachesPoints_week,
} from "../../../models/Activity/handleRanking";
import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";

export const reRankCoachesHelper = (
  coaches: CoachRank[],
  after: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
  unrankedCoach?: CoachRank,
) => {
  if (!unrankedCoach) {
    return coaches;
  }

  const newRankedCoaches = flipRankObj(coaches, unrankedCoach);

  const rankedCoachesPoints = rankCoachesPoints(newRankedCoaches);
  const reRanked = reRankCoaches_week_FitPointsV2(
    rankedCoachesPoints,

    rounds,
  );

  const reRankedFinal = reRankCoaches_month_FitPointsV2(reRanked, sprints);

  return reRankedFinal;
};
