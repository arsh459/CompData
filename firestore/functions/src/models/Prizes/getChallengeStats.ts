import { RoundObject, SprintObject } from "../sbEvent/sbEvent";

export const getRoundsInSprint = (
  sprintLength: number,
  roundLength: number,
) => {
  return Math.floor(sprintLength / roundLength);
};

export const getCurrentWeekV3 = (
  sprints: SprintObject[],
  rounds: RoundObject[],
  elapsedDays: number,
) => {
  let week: number = -1;
  let month: number = -1;
  if (elapsedDays >= 0) {
    let wStart: number = 0;
    let currentRound = 0;
    for (const round of rounds) {
      const wEnd = round.length;

      if (elapsedDays >= wStart && elapsedDays < wEnd) {
        week = currentRound;
        break;
      }

      currentRound++;
      wStart = wEnd;
    }

    let mStart: number = 0;
    let currentSprint = 0;
    for (const sprint of sprints) {
      const mEnd = sprint.length;

      if (elapsedDays >= mStart && elapsedDays < mEnd) {
        month = currentSprint;
        break;
      }

      currentSprint++;
      mStart = mEnd;
    }
  }

  return {
    week,
    month,
  };
};

export const getCurrentWeekV2 = (
  sprintLength: number,
  roundLength: number,
  after: number,
  elapsedDays: number,
) => {
  //   const days = getDaysInChallenge(after);

  // current sprint
  const currentSprint = Math.floor(elapsedDays / sprintLength);
  const roundsInSprint = getRoundsInSprint(sprintLength, roundLength);

  // const absRounds = days/roundLength;

  // currentSprint start
  const currentSprintStart = currentSprint * sprintLength;

  // relative days
  const relativeDays = elapsedDays - currentSprintStart;

  // relative week number
  const relativeWeekNumber = Math.floor(relativeDays / roundLength);
  const actualWeekNumber = relativeWeekNumber + roundsInSprint * currentSprint;

  const relativeDeltaSeconds =
    relativeWeekNumber * (roundLength * 24 * 60 * 60 * 1000);

  const totalDeltaSeconds =
    relativeDeltaSeconds + sprintLength * currentSprint * 24 * 60 * 60 * 1000;

  return {
    weekStartsUnix: after + totalDeltaSeconds,
    currentWeekNumber: actualWeekNumber,
    currentWeek: `week-${actualWeekNumber}`,
    currentMonthNumber: currentSprint,
    currentMonth: `month-${currentSprint}`,
  };
};
