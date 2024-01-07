import {
  getUserRankObj,
  //   updateActivityInRankObjV2,
} from "../../../models/Activity/createUtils";
import { updateActivityInRankObjV2 } from "../../../models/Activity/createUtilsV2";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";
import { UserInterface } from "../../../models/User/User";
// import { reRankUsersHelper } from "./reRankUsers";

export const updateRankHelper = async (
  user: UserInterface,
  after: number,
  // before: number,
  daysElapsed: number,
  eventId: string,
  communityId: string,
  coachEventId: string,
  fitPointTh: number,
  teamName: string,
  teamKey: string,
  activityAfter: number,
  activityBefore: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
) => {
  // get all user rankings for event
  const userRanks = await getAllUserRanks(eventId);

  const userRankObj = getUserRankObj(userRanks, user.uid);
  const newUserRankObj_unranked = await updateActivityInRankObjV2(
    user,
    after,
    // before,
    daysElapsed,
    eventId,
    coachEventId,
    communityId,
    fitPointTh,
    teamName,
    teamKey,
    activityAfter,
    activityBefore,
    sprints,
    rounds,
    userRankObj,
  );

  return { newUserRankObj_unranked, userRanks };
};
