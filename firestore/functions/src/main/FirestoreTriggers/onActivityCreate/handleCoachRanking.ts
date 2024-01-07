import {
  Activity,
  // engineChoice,
  UserRank,
} from "../../../models/Activity/Activity";
import {
  checkCoachTransformations,
  filterUsersForCoach,
  // checkTransformation,
  getCoachForActivity,
  saveRankedCoaches,
  updateCoachRankObj,
} from "../../../models/Activity/coachCreateUtils";
import { flipRankObj } from "../../../models/Activity/createUtils";
import { getAllCoachRanks } from "../../../models/Activity/getUtils";
import {
  rankCoaches,
  rankCoaches_streak,
  reRankCoaches_week,
} from "../../../models/Activity/handleRanking";
import { createDayStringCalorieObject_Coach } from "../../../models/Prizes/getStreakPrize";
import { judgeCriterion } from "../../../models/sbEvent/sbEvent";
import { UserInterface } from "../../../models/User/User";

export const handleCoachRanking = async (
  eventId: string,
  newActivity: Activity,
  userRank: UserRank,
  coach: UserInterface,
  calCriterion: number,
  judgeCrit: judgeCriterion,
  after: number,
  reRankedUsers: UserRank[],
  prevRank?: UserRank,
) => {
  const coaches = await getAllCoachRanks(eventId);

  const currentCoachRank = getCoachForActivity(coaches, coach.uid);

  const coachUsers = filterUsersForCoach(reRankedUsers, currentCoachRank?.uid);

  const { dayCalObj, weekCalMin, weekCalObj } =
    createDayStringCalorieObject_Coach(coachUsers, after);

  const newCoachObj_unranked = await updateCoachRankObj(
    newActivity,
    userRank,
    coach,
    checkCoachTransformations(
      judgeCrit,
      calCriterion,
      userRank.totalCalories,
      prevRank?.totalCalories,
      userRank.scoreMinCal,
      prevRank?.scoreMinCal,
    ),
    eventId,
    calCriterion,
    judgeCrit,
    after,
    dayCalObj,
    weekCalMin,
    weekCalObj,
    currentCoachRank,
  );

  if (newCoachObj_unranked) {
    const newRankObjs = flipRankObj(coaches, newCoachObj_unranked);

    const reRankedCoaches_interim = rankCoaches(newRankObjs);
    const reRankedCoaches_current = reRankCoaches_week(
      reRankedCoaches_interim,
      after,
      7,
    );
    const reRankedCoaches = rankCoaches_streak(reRankedCoaches_current);

    await saveRankedCoaches(reRankedCoaches, eventId);

    return reRankedCoaches;
  }

  return [];
};
