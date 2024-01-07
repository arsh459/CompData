import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";

export const getEventMetrics = async (eventId: string) => {
  const remoteEvent = await getSbEventById(eventId);

  return getEventMetricsForEventObj(remoteEvent);
};

const getEventStarts = (remoteEvent?: sbEventInterface) => {
  return remoteEvent?.configuration?.starts
    ? remoteEvent?.configuration?.starts
    : remoteEvent?.eventStarts;
};

const getChallengeLength = (remoteEvent?: sbEventInterface) => {
  return remoteEvent?.configuration?.challengeLength
    ? remoteEvent?.configuration?.challengeLength
    : remoteEvent?.challengeLength
    ? remoteEvent.challengeLength
    : 0;
};

const getNumberOfWorkoutsToCount = (remoteEvent?: sbEventInterface) => {
  if (remoteEvent?.configuration && remoteEvent.configuration.kpis) {
    const nbWorkoutsKPI = remoteEvent.configuration.kpis.filter(
      (item) => item.kpi === "nb_workouts",
    );
    if (nbWorkoutsKPI.length) {
      return nbWorkoutsKPI[0].targetValue;
    }
  }

  return 15;
};

export const getEventMetricsForEventObj = (remoteEvent?: sbEventInterface) => {
  return {
    after: getEventStarts(remoteEvent),
    judgeCrit: remoteEvent?.judgeCriterion
      ? remoteEvent.judgeCriterion
      : "calories",
    calCriterion: remoteEvent?.calCritieron ? remoteEvent?.calCritieron : 0,
    nbMembers: remoteEvent?.nbTotalParticipants
      ? remoteEvent?.nbTotalParticipants
      : 1,
    state: remoteEvent?.state ? remoteEvent.state : "UNKNOWN",
    before: getBefore(
      getEventStarts(remoteEvent),
      remoteEvent?.configuration?.challengeLength,
    ),
    challengeLength: getChallengeLength(remoteEvent),
    calThForStreak: remoteEvent?.calThForStreak
      ? remoteEvent.calThForStreak
      : 0,
    streakLengthTh: remoteEvent?.streakLengthTh
      ? remoteEvent.streakLengthTh
      : 0,
    sprintLength: remoteEvent?.sprintLength ? remoteEvent.sprintLength : 28,
    roundLength: remoteEvent?.roundLength ? remoteEvent.roundLength : 7,
    sprints: remoteEvent?.configuration?.sprints,
    rounds: remoteEvent?.configuration?.rounds,
    gameType: remoteEvent?.configuration?.gameType
      ? remoteEvent.configuration.gameType
      : "individual",
    nbWorkoutsToCount: getNumberOfWorkoutsToCount(remoteEvent),
  };
};

const getBefore = (after?: number, challengeLength?: number) => {
  if (after && challengeLength) {
    return after + challengeLength * 24 * 60 * 60 * 1000;
  }
  if (after) {
    return after;
  }

  return -1;
};
