import { CoachRank, UserRank } from "@models/Activity/Activity";
import { RoundObject } from "@models/Event/Event";
// import { GoalKPIList } from "@utils/goalprogram/utils";

export const getFPsToDisplay = (
  coachRank?: CoachRank,
  currentSprintId?: string
) => {
  if (
    coachRank &&
    currentSprintId &&
    coachRank.monthPointObj &&
    coachRank.monthPointObj[currentSprintId]
  ) {
    return `${coachRank.monthPointObj[currentSprintId]} FP`;
  }

  return "0 FP";
};

export const getFPsToDisplayInt = (
  coachRank?: CoachRank,
  currentSprintId?: string
) => {
  if (
    coachRank &&
    currentSprintId &&
    coachRank.monthPointObj &&
    coachRank.monthPointObj[currentSprintId]
  ) {
    return coachRank.monthPointObj[currentSprintId];
  }

  return 0;
};

export const getRankToDisplay = (
  coachRank?: CoachRank,
  currentSprintId?: string
) => {
  if (
    coachRank &&
    currentSprintId &&
    coachRank.monthlyRank &&
    coachRank.monthlyRank[currentSprintId]
  ) {
    return `#${coachRank.monthlyRank[currentSprintId]}`;
  }

  return "";
};

export const getCurrentCoachRank = (
  coachRank?: CoachRank,
  currentSprintId?: string
) => {
  if (
    coachRank &&
    currentSprintId &&
    coachRank.monthlyRank &&
    coachRank.monthlyRank[currentSprintId]
    // coachRank.monthPointObj &&
    // coachRank.monthPointObj[currentSprintId]
  ) {
    return {
      myRank: true,
      preRank:
        coachRank.monthlyRank[currentSprintId] !== 1
          ? coachRank.monthlyRank[currentSprintId] - 1
          : undefined,
      afterRank: coachRank.monthlyRank[currentSprintId] + 1,
      afterRank2: coachRank.monthlyRank[currentSprintId] === 1 ? 3 : undefined,
    };
  }

  return {
    myRank: false,
    preRank: 1,
    afterRank: 2,
    afterRank2: 3,
  };
};

export const getCurrentTeamPts = (
  coachRank?: CoachRank,
  currentSprintId?: string
) => {
  if (coachRank && currentSprintId) {
    let fps = 0;
    let nbWorkouts = 0;

    if (coachRank.monthPointObj && coachRank.monthPointObj[currentSprintId]) {
      fps = coachRank.monthPointObj[currentSprintId];
    }

    if (coachRank.monthActPts && coachRank.monthActPts[currentSprintId]) {
      nbWorkouts = coachRank.monthActPts[currentSprintId].length;
    }

    return {
      fps,
      streak: 0,
      nbWorkouts,
    };
  }

  return {
    fps: 0,
    streak: 0,
    nbWorkouts: 0,
  };
};

export const getCurrentPlayerPts = (
  userRank?: UserRank,
  currentSprintId?: string
) => {
  if (userRank && currentSprintId) {
    let fps = 0;
    let nbWorkouts = 0;

    if (userRank.monthPointObj && userRank.monthPointObj[currentSprintId]) {
      fps = userRank.monthPointObj[currentSprintId];
    }

    if (userRank.monthActPts && userRank.monthActPts[currentSprintId]) {
      nbWorkouts = userRank.monthActPts[currentSprintId].length;
    }

    return {
      fps,
      streak: 0,
      nbWorkouts,
    };
  }

  return {
    fps: 0,
    streak: 0,
    nbWorkouts: 0,
  };
};

export const getPlayerPts = (userRank?: UserRank, currentSprintId?: string) => {
  if (
    userRank &&
    currentSprintId &&
    userRank.monthPointObj &&
    userRank.monthPointObj[currentSprintId]
  ) {
    return userRank.monthPointObj[currentSprintId];
  }

  return 0;
};

export const getPlayerProgress = (
  playerOne?: UserRank,
  playerTwo?: UserRank,
  currentSprintId?: string
) => {
  const p1Pts = getPlayerPts(playerOne, currentSprintId);
  const p2Pts = getPlayerPts(playerTwo, currentSprintId);
  // const p1Pts = 55;
  // const p2Pts = 45;

  if (p1Pts || p2Pts) {
    return {
      playerOneProgress: Math.round((p1Pts / (p1Pts + p2Pts)) * 100),
      p1Pts,
      p2Pts,
    };
  } else {
    return { playerOneProgress: 0, p1Pts, p2Pts };
  }

  // else if (p2Pts > p1Pts && p2Pts) {
  //   return  Math.round((p2Pts / (p1Pts + p2Pts)) * 100);
  // } else if (p1Pts === p2Pts && !p1Pts) {
  //   return 0;
  // } else {
  //   return 100;
  // }
};

export const getSelectedSprintId = (
  rounds?: RoundObject[],
  roundsIds?: string[]
) => {
  const selectedRound = rounds?.filter((each) => roundsIds?.includes(each.id));
  if (selectedRound?.length) {
    return selectedRound[0].sprintId;
  }
  return undefined;
};
