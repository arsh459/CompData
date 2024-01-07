import { FIT_POINT_TH } from "../../../constants/challenge";
import { UserRank } from "../../../models/Activity/Activity";
import { updateActivityInRankObjV2 } from "../../../models/Activity/createUtilsV2";
import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
import {
  RoundObject,
  sbEventInterface,
  SprintObject,
} from "../../../models/sbEvent/sbEvent";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import {
  getChallengeEndTime,
  getEndActivityRange,
  getEventJoinTeam,
} from "../../FirestoreTriggers/onActivityWrite/utils";
import * as functions from "firebase-functions";

export const reconcileUserTask = async (
  rank: UserRank | undefined,
  uid: string,
  team: sbEventInterface,
  sprints: SprintObject[],
  rounds: RoundObject[],
  after: number,
  nowTime: number,
  before: number,
  challengeLength: number,
  gameId: string,
  coach?: UserInterface,
): Promise<UserRank | undefined> => {
  const user = await getUserById(uid);

  functions.logger.warn("RECONCILING USER:", user?.name);

  if (user) {
    const eventJoinTime = getEventJoinTeam(user, team.id, after);

    const daysElapsed = getDaysElapsed(
      after,
      getChallengeEndTime(nowTime, before, challengeLength),
    );

    const newRank = await updateActivityInRankObjV2(
      user,
      after,
      daysElapsed,
      gameId,
      team.id,
      team.ownerUID,
      FIT_POINT_TH,
      team.name ? team.name : coach ? `${coach.name}'s team` : "Unnamed team",
      team.eventKey ? team.eventKey : "",
      eventJoinTime,
      getEndActivityRange(nowTime, before, challengeLength),
      sprints,
      rounds,
    );

    return newRank;
  }

  return undefined;
};
