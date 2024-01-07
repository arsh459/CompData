import { FIT_POINT_TH } from "../../../constants/challenge";
// import { saveRankedUsers } from "../../../models/Activity/createUtils";
import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { UserInterface } from "../../../models/User/User";
// import { reRankUsersHelper } from "./reRankUsers";
import { updateRankHelper } from "./updateRank";

export const handleUserEventHelper = async (
  user: UserInterface,
  remoteEvent: sbEventInterface,
  parentId: string,
  after: number,
  before: number,
  coachName: string,
  activityAfter: number,
  activityBefore: number,
  sprintLength: number,
  roundLength: number,
) => {
  const daysElapsed = getDaysElapsed(after, before);
  // console.log("days", daysElapsed);

  const { userRanks, newUserRankObj_unranked } = await updateRankHelper(
    user,
    after,
    // before,
    daysElapsed,
    parentId,
    remoteEvent.ownerUID,
    remoteEvent.id,
    FIT_POINT_TH,
    remoteEvent.name
      ? remoteEvent.name
      : coachName
      ? `${coachName}'s team`
      : "Unnamed team",
    remoteEvent.eventKey ? remoteEvent.eventKey : "",
    activityAfter,
    activityBefore,
    [],
    [],
  );

  console.log(
    "userRanks, newUserRankObj_unranked",
    userRanks,
    newUserRankObj_unranked,
  );

  // const rankedFinalUsers = reRankUsersHelper(
  //   userRanks,
  //   after,
  //   sprintLength,
  //   roundLength,
  //   newUserRankObj_unranked,
  // );

  // save remote users
  // await saveRankedUsers(rankedFinalUsers, parentId);

  return [];
};
