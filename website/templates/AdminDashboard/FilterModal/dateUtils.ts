import { RoundObject, SprintObject } from "@models/Event/Event";

export const getSprintStartTimeForId = (
  // elapsedDays: number,
  challengeStarts: number,
  sprints: SprintObject[],
  sprintId: string
) => {
  let d: number = 0;
  let roundStartUnix = challengeStarts;

  for (const sprint of sprints) {
    const sprintEnd = d + sprint.length;
    const sprintEndUnix = challengeStarts + sprint.length * 24 * 60 * 60 * 1000;

    // selected round
    if (sprint.id === sprintId) {
      return roundStartUnix;
    }

    d = sprintEnd;
    roundStartUnix = sprintEndUnix;
  }

  return -1;
};

export const getRoundStartTimeForId = (
  // elapsedDays: number,
  challengeStarts: number,
  rounds: RoundObject[],
  roundId: string
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
