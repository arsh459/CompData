import { UserRank } from "../../../models/Activity/Activity";
import {
  checkCoachTransformations,
  filterUsersForCoach,
  // checkTransformation,
  getCoachForActivity,
  saveRankedCoaches,
  updateActivityInRankObj_ActivityUpdate,
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

export const handleCoachRankingUpdate = async (
  eventId: string,
  prevRank: UserRank,
  nowRank: UserRank,
  coach: UserInterface,
  calCriterion: number,
  judgeCrit: judgeCriterion,
  after: number,
  reRankedUsers: UserRank[],
) => {
  const coaches = await getAllCoachRanks(eventId);

  const currentCoachRank = getCoachForActivity(coaches, coach.uid);

  // console.log("old coach calories", currentCoachRank?.totalCalories);
  console.log("nowRank cals", nowRank?.totalCalories);
  console.log("prevRank cals", prevRank?.totalCalories);

  const coachUsers = filterUsersForCoach(reRankedUsers, currentCoachRank?.uid);

  const { dayCalObj, weekCalMin, weekCalObj } =
    createDayStringCalorieObject_Coach(coachUsers, after);

  // console.log(
  //   "checkCoachTransformations",
  //   checkCoachTransformations(
  //     judgeCrit,
  //     calCriterion,
  //     nowRank.totalCalories,
  //     prevRank.totalCalories,
  //     nowRank.numStreaks,
  //     prevRank.numStreaks,
  //   ),
  // );

  const newCoachObj_unranked = await updateActivityInRankObj_ActivityUpdate(
    eventId,
    prevRank,
    nowRank,
    coach,
    checkCoachTransformations(
      judgeCrit,
      calCriterion,
      nowRank.totalCalories,
      prevRank.totalCalories,
      nowRank.scoreMinCal,
      prevRank.scoreMinCal,
    ),
    calCriterion,
    judgeCrit,
    after,
    dayCalObj,
    weekCalMin,
    weekCalObj,
    currentCoachRank,
  );

  console.log("new totalCalories", newCoachObj_unranked?.totalCalories);
  console.log("new totalCalories", newCoachObj_unranked?.numTransformations);

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

  return;
};
