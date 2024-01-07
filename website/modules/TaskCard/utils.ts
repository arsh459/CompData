import {
  POINTS_LEVEL_FIVE,
  POINTS_LEVEL_FOUR,
  POINTS_LEVEL_ONE,
  POINTS_LEVEL_THREE,
  POINTS_LEVEL_TWO,
} from "@constants/gameStats";

export const getTaskPoints = (
  fitPoints?: number,
  levelBooster?: boolean,
  activeFitPointsV2?: number
) => {
  if (levelBooster) {
    return getBoostPoints(activeFitPointsV2);
  }

  return fitPoints;
};

const getBoostPoints = (currentPoints?: number) => {
  if (!currentPoints) {
    return POINTS_LEVEL_ONE;
  } else if (
    currentPoints >= POINTS_LEVEL_ONE &&
    currentPoints < POINTS_LEVEL_TWO
  ) {
    return POINTS_LEVEL_TWO - currentPoints;
  } else if (
    currentPoints >= POINTS_LEVEL_TWO &&
    currentPoints < POINTS_LEVEL_THREE
  ) {
    return POINTS_LEVEL_THREE - currentPoints;
  } else if (
    currentPoints >= POINTS_LEVEL_THREE &&
    currentPoints < POINTS_LEVEL_FOUR
  ) {
    return POINTS_LEVEL_FOUR - currentPoints;
  } else if (
    currentPoints >= POINTS_LEVEL_FOUR &&
    currentPoints < POINTS_LEVEL_FIVE
  ) {
    return POINTS_LEVEL_FIVE - currentPoints;
  } else {
    return 0;
  }
};
