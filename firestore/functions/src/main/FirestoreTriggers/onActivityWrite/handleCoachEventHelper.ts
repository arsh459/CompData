import { UserRank } from "../../../models/Activity/Activity";
// import { saveRankedCoaches } from "../../../models/Activity/coachCreateUtils";
import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";
// import { reRankCoachesHelper } from "./reRankCoaches";
// import { updateCoachRankHelper } from "./updateCoachRank";

export const handleCoachEventHelper = async (
  coachUID: string,
  eventId: string,
  coachEventId: string,
  reRankedUsers: UserRank[],
  after: number,
  teamName: string,
  teamKey: string,
  sprints: SprintObject[],
  rounds: RoundObject[],
) => {
  // const { updatedCoachUser, coaches } = await updateCoachRankHelper(
  //   coachUID,
  //   eventId,
  //   coachEventId,
  //   reRankedUsers,
  //   after,
  //   teamName,
  //   teamKey,
  //   sprintLength,
  //   roundLength,
  // );

  // if (updatedCoachUser && coaches) {
  //   const reRanked = reRankCoachesHelper(
  //     coaches,
  //     after,
  //     sprints,
  //     rounds,
  //     updatedCoachUser,
  //   );

  //   await saveRankedCoaches(reRanked, eventId);

  //   return reRanked;
  // }

  return undefined;
};
