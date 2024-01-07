// import { format } from "date-fns";
// import { format } from "date-fns";
import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";
import { UserInterface } from "../../../models/User/User";
// import { getDayStartIST } from "../../PubSub/activityTracker/utils";

export const isActivityInIfChallengeFinite = (
  activityTime: number,
  challengeLength?: number,
  before?: number,
) => {
  if (!challengeLength) {
    return true;
  }

  if (challengeLength && before && activityTime < before) {
    return true;
  }

  return false;
};

export const isActivityRelevantForChallenge = (
  enrolledTime: number,
  challengeStarts: number,
  challengeLength: number,
  before?: number,
  activityTime?: number,
) => {
  if (
    activityTime &&
    activityTime > enrolledTime &&
    activityTime > challengeStarts &&
    isActivityInIfChallengeFinite(activityTime, challengeLength, before)
  ) {
    return true;
  }

  return false;
};

export const getEventJoinTeam = (
  user: UserInterface,
  eventId: string,
  after: number,
) => {
  if (user.enrolledEventsWithTime && eventId) {
    const enrolledEventList = user.enrolledEventsWithTime.filter(
      (item) => item.eventId === eventId,
    );
    if (enrolledEventList.length) {
      return enrolledEventList[0].enrolledTime;
    }
  }

  return after;
};
export const getSprintIdForRoundId = (
  roundId: string,
  rounds: RoundObject[],
) => {
  for (const round of rounds) {
    if (round.id === roundId) {
      return round.sprintId;
    }
  }

  return "";
};

export const getCurrentSprint = (
  elapsedDays: number,
  // challengeStarts: number,
  sprints: SprintObject[],
) => {
  let d: number = 0;
  // console.log("elap", elapsedDays);
  for (const sprint of sprints) {
    const sprintEnd = d + sprint.length;

    // console.log("d", sprint.id, d, sprintEnd, elapsedDays);
    // const roundEndUnix = challengeStarts + round.length * 24 * 60 * 60 * 1000;

    // console.log("rounds", d, roundEnd, elapsedDays);
    if (elapsedDays >= d && elapsedDays < sprintEnd) {
      // console.log("HERE", sprint.id);
      return sprint.id;
    }

    d = sprintEnd;
    // roundStartUnix = roundEndUnix;
  }

  return "";
};

export const getCurrentRound = (
  elapsedDays: number,
  // challengeStarts: number,
  rounds: RoundObject[],
) => {
  let d: number = 0;
  // let roundStartUnix = challengeStarts;
  for (const round of rounds) {
    const roundEnd = d + round.length;
    // const roundEndUnix = challengeStarts + round.length * 24 * 60 * 60 * 1000;

    // console.log("rounds", d, roundEnd, elapsedDays);
    if (elapsedDays >= d && elapsedDays < roundEnd) {
      // console.log(round.name, round.sprintId);
      return round.id;
    }

    d = roundEnd;
    // roundStartUnix = roundEndUnix;
  }

  return "";
};

export const getCurrentRoundTime = (
  elapsedDays: number,
  challengeStarts: number,
  rounds: RoundObject[],
  roundId?: string,
) => {
  if (roundId) {
    return getRoundStartTimeForId(challengeStarts, rounds, roundId);
  }

  let d: number = 0;
  let roundStartUnix = challengeStarts;

  // console.log("chall", challengeStarts, elapsedDays);
  // console.log(getDayStartIST(challengeStarts));

  for (const round of rounds) {
    const roundEnd = d + round.length;
    const roundEndUnix = roundStartUnix + round.length * 24 * 60 * 60 * 1000;

    // console.log(
    //   "rounds",
    //   round.name,
    //   "d",
    //   d,
    //   "roundEnd",
    //   roundEnd,
    //   elapsedDays,
    //   round.length,
    //   format(new Date(roundStartUnix), "dd-MM-yyy"),
    //   format(new Date(roundEndUnix), "dd-MM-yyyy"),
    // );
    if (elapsedDays >= d && elapsedDays < roundEnd) {
      // console.log(round.name, round.sprintId, new Date(roundStartUnix));
      // throw new Error("ERROR");
      return roundStartUnix;
    }

    d = roundEnd;
    roundStartUnix = roundEndUnix;
  }

  return -1;
};

export const getSprintTimeForId = (
  // elapsedDays: number,
  challengeStarts: number,
  sprints: SprintObject[],
  sprintId: string,
) => {
  let d: number = 0;
  let roundStartUnix = challengeStarts;

  for (const sprint of sprints) {
    const roundEnd = d + sprint.length;
    const roundEndUnix = roundStartUnix + sprint.length * 24 * 60 * 60 * 1000;

    // console.log("r", roundEnd, new Date(roundEndUnix));
    // selected round
    if (sprint.id === sprintId) {
      // console.log("roundStartUnix", new Date(roundStartUnix));
      return roundStartUnix;
    }

    d = roundEnd;
    roundStartUnix = roundEndUnix;
  }

  return -1;
};

export const getCurrentSprintFilter = (
  sprints: SprintObject[],
  sprintId: string,
) => {
  const filtered = sprints.filter((item) => item.id === sprintId);
  if (filtered.length) {
    return filtered[0].filter;
  }

  return undefined;
};

export const getRoundStartTimeForId = (
  // elapsedDays: number,
  challengeStarts: number,
  rounds: RoundObject[],
  roundId: string,
) => {
  let d: number = 0;
  let roundStartUnix = challengeStarts;

  for (const round of rounds) {
    const roundEnd = d + round.length;
    const roundEndUnix = roundStartUnix + round.length * 24 * 60 * 60 * 1000;

    // selected round
    if (round.id === roundId) {
      return roundStartUnix;
    }

    d = roundEnd;
    roundStartUnix = roundEndUnix;
  }

  return -1;
};

export const getEndActivityRange = (
  now: number,
  endTime?: number,
  challengeLength?: number,
) => {
  // if challenge has ended
  if (challengeLength && endTime && now > endTime) {
    return endTime;
  }

  return now;
};

export const getChallengeEndTime = (
  now: number,
  endTime?: number,
  challengeLength?: number,
) => {
  if (challengeLength && endTime && now > endTime) {
    return endTime;
  }

  return now;
};
