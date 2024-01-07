import { FIT_POINT_TH } from "../../../constants/challenge";
import { UserRank } from "../../../models/Activity/Activity";
// import { updateActivityInRankObjV2 } from "../../../models/Activity/createUtilsV2";
import { updateActivityInRankObjV3 } from "../../../models/Activity/createUtilsV3";
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
  getCurrentRoundTime,
  getCurrentSprint,
  getCurrentSprintFilter,
  getEndActivityRange,
  // getEventJoinTeam,
  getSprintIdForRoundId,
} from "../../FirestoreTriggers/onActivityWrite/utils";
import { genderFilter } from "./utils";

export const updateUserTask = async (
  rank: UserRank,
  team: sbEventInterface,
  sprints: SprintObject[],
  rounds: RoundObject[],
  after: number,
  nowTime: number,
  before: number,
  challengeLength: number,
  gameId: string,
  coach?: UserInterface,
  roundId?: string,
): Promise<{ userRank: UserRank; actReads: number } | undefined> => {
  const user = await getUserById(rank.uid);
  // console.log("here", user);

  if (user) {
    // const eventJoinTime = getEventJoinTeam(user, team.id, after);

    const daysElapsed = getDaysElapsed(
      after,
      getChallengeEndTime(nowTime, before, challengeLength),
    );

    // console.log("after", after);
    // console.log("eventJoinTime", eventJoinTime);
    // console.log(
    //   "getChallengeEndTime(nowTime, before, challengeLength)",
    //   getChallengeEndTime(nowTime, before, challengeLength),
    // );
    // console.log("before", before);
    // console.log("challengeLength", challengeLength);
    // // console.log("rounds", rounds);
    // console.log("daysElapsed", daysElapsed);
    // console.log("daysElapsed", daysElapsed);

    const roundStartTime = getCurrentRoundTime(
      daysElapsed,
      after,
      rounds,
      roundId,
    );

    let sprintId = "";
    if (roundId) {
      sprintId = getSprintIdForRoundId(roundId, rounds);
    } else {
      sprintId = getCurrentSprint(daysElapsed, sprints);
    }

    const filter = getCurrentSprintFilter(sprints, sprintId);
    const filteredState = genderFilter(
      user.gender ? user.gender : "notSpecified",
      filter,
    );

    // if (!filteredState) {
    //   console.log(
    //     "not added",
    //     " | ",
    //     user.uid,
    //     " | ",
    //     user.gender,
    //     " | ",
    //     user.name,
    //     " | ",
    //     user.phone,
    //     " | ",
    //     user.onboarded,
    //     " | ",
    //     filter,
    //   );
    // }

    // time to start
    const timeToStart = roundStartTime; // timeToReconcile(eventJoinTime, roundStartTime);

    // console.log("eventJoinTime", eventJoinTime);
    // console.log("sprintId", sprintId);
    // console.log("daysElapsed", daysElapsed);
    // console.log("roundId", roundId);
    // console.log("roundStartTime", new Date(roundStartTime), roundId);
    // console.log("timeToStart", timeToStart);
    // console.log(
    // "getEndActivityRange(nowTime, before, challengeLength)",
    // getEndActivityRange(nowTime, before, challengeLength),
    // );

    // throw new Error("hi");

    // game has ended. No new round
    if (timeToStart === -1) {
      return undefined;
    }

    const obj = await updateActivityInRankObjV3(
      user,
      after,
      daysElapsed,
      gameId,
      team.id,
      FIT_POINT_TH,
      team.name ? team.name : coach ? `${coach.name}'s team` : "Unnamed team",
      team.eventKey ? team.eventKey : "",
      timeToStart,
      getEndActivityRange(nowTime, before, challengeLength),
      sprints,
      rounds,
      rank,
      team.ownerUID,
      sprintId,
      filteredState,
    );

    return obj;
  }

  return undefined;
};

export const timeToReconcile = (
  eventJoinTime: number,
  roundStartTime: number,
) => {
  if (roundStartTime === -1) {
    return roundStartTime;
  }

  if (eventJoinTime > roundStartTime) {
    return eventJoinTime;
  }

  return roundStartTime;
};

// UserRank
// dayPtObj

// store pts like this
// monthTaskPtObj -> {[month: string]: {[taskId: string]: number}}

// blue cards are individual
// task -> score ->
