import { CoachRank, UserRank } from "../../../models/Activity/Activity";
import {
  getCoachForActivity,
  filterUsersForCoach,
} from "../../../models/Activity/coachCreateUtils";
import { updateCoachRankV2 } from "../../../models/Activity/coachCreateUtilsV2";
import { getAllCoachRanks } from "../../../models/Activity/getUtils";
import { createDayStringPointObject_Coach } from "../../../models/Prizes/getStreakPrize";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";

export const updateCoachRankHelper = async (
  coachUID: string,
  eventId: string,
  coachEventId: string,
  reRankedUsers: UserRank[],
  after: number,
  teamName: string,
  teamKey: string,
  sprintLength: number,
  roundLength: number,
  nbWorkoutsToCount: number,
) => {
  const coach = await getUserById(coachUID);

  if (coach) {
    const coaches = await getAllCoachRanks(eventId);

    const updatedCoachUser = getUpdatedCoach(
      coach,
      reRankedUsers,
      coaches,
      after,
      coachEventId,
      teamName,
      teamKey,
      sprintLength,
      roundLength,
      nbWorkoutsToCount,
    );

    return { updatedCoachUser, coaches };
  } else {
    return { updatedCoachUser: undefined, coaches: undefined };
  }
};

export const getUpdatedCoach = (
  coach: UserInterface,
  reRankedUsers: UserRank[],
  coaches: CoachRank[],
  after: number,
  coachEventId: string,
  teamName: string,
  teamKey: string,
  sprintLength: number,
  roundLength: number,
  nbWorkoutsToCount: number,
) => {
  const currentCoachRank = getCoachForActivity(coaches, coach.uid);

  const coachUsers = filterUsersForCoach(reRankedUsers, coach.uid);

  const {
    dayPointObj,
    weekPointObj,
    dayCalObj,
    weekCalObj,
    monthCalObj,
    monthPointObj,
    sortedCoachActivityPts,
    // taskMap,
  } = createDayStringPointObject_Coach(
    coachUsers,
    nbWorkoutsToCount,
    // after,
    // sprintLength,
    // roundLength,
  );

  return updateCoachRankV2(
    coach,
    coachEventId,
    dayPointObj,
    weekPointObj,
    dayCalObj,
    weekCalObj,
    monthCalObj,
    monthPointObj,
    teamName,
    teamKey,
    sortedCoachActivityPts,
    currentCoachRank,
  );
};
