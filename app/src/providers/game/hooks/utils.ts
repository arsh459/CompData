import { RoundObject, SprintObject } from "@models/Event/Event";
import { format } from "date-fns";
import { GameParameters } from "../interface";

export const timeToUseForNow = (
  challengeStarts: number,
  challengeLength?: number
) => {
  let endTime: number | undefined = undefined;
  const now = Date.now();
  if (challengeLength) {
    endTime = challengeStarts + 24 * 60 * 60 * 1000 * challengeLength;
  }

  return {
    now,
    endTime,
    currentTimeToUse: endTime && endTime < now ? endTime : now,
  };
};

export const getGameParameters = (
  sprints?: SprintObject[],
  after?: number,
  challengeLength?: number,
  rounds?: RoundObject[],
  timeToUse?: number
): GameParameters => {
  if (after && sprints && rounds) {
    let currentTimeToUse: number = -1;
    if (timeToUse) {
      currentTimeToUse = timeToUse;
    } else {
      const tmp = timeToUseForNow(after, challengeLength);
      currentTimeToUse = tmp.currentTimeToUse;
    }

    const daysElapsed = Math.floor(
      (currentTimeToUse - after) / (24 * 60 * 60 * 1000)
    );

    // const daysElapsed = 68;

    let roundStart: number = 0;
    let roundStartUnix = after;

    for (const round of rounds) {
      // sprint end
      let roundEnd: number = roundStart + round.length;
      const roundEndUnix = roundStartUnix + round.length * 24 * 60 * 60 * 1000;

      if (daysElapsed >= roundStart && daysElapsed < roundEnd) {
        let sprintStart: number = 0;
        let selectedSprint: SprintObject | undefined = undefined;
        let sprintStartUnix: number = after;

        for (const sprint of sprints) {
          const spSt = sprintStartUnix;
          sprint.startString = format(new Date(spSt), "dMMM");

          // spEnd
          const spEnd = spSt + sprint.length * 24 * 60 * 60 * 1000;
          sprint.endString = format(new Date(spEnd), "dMMM");

          if (sprint.id === round.sprintId) {
            selectedSprint = sprint;
            break;
          }

          sprintStart += sprint.length;
          sprintStartUnix += sprint.length * 24 * 60 * 60 * 1000;
        }

        return {
          currentRound: round,
          currentSprint: selectedSprint,
          daysElapsed,
          currentRoundDay: daysElapsed - roundStart,
          currentSprintDay: daysElapsed - sprintStart,
          roundStartUnix,
          sprintStartUnix,
        };
      }

      roundStart = roundEnd;
      roundStartUnix = roundEndUnix;
    }

    return {
      currentRound: undefined,
      currentSprint: undefined,
      daysElapsed,
      currentRoundDay: -1,
      currentSprintDay: -1,
      roundStartUnix: -1,
      sprintStartUnix: -1,
    };
  }

  return {
    currentRound: undefined,
    currentSprint: undefined,
    daysElapsed: -1,
    currentRoundDay: -1,
    currentSprintDay: -1,
    roundStartUnix: -1,
    sprintStartUnix: -1,
  };
};
