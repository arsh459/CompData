import {
  POINTS_LEVEL_FIVE,
  POINTS_LEVEL_FOUR,
  POINTS_LEVEL_ONE,
  POINTS_LEVEL_THREE,
  POINTS_LEVEL_TWO,
} from "@constants/gameStats";
import {
  baseImageKit,
  fPointsL0,
  fPointsL1,
  fPointsL2,
  fPointsL3,
  fPointsL4,
  fPointsL5,
} from "@constants/imageKitURL";

export const getLevelIcon = (
  level: number | undefined,
  widthString: string
) => {
  if (level === 0 || !level) {
    return `${baseImageKit}/tr:${widthString},c-maintain_ratio/${fPointsL0}`;
  } else if (level === 1) {
    return `${baseImageKit}/tr:${widthString},c-maintain_ratio/${fPointsL1}`;
  } else if (level === 2) {
    return `${baseImageKit}/tr:${widthString},c-maintain_ratio/${fPointsL2}`;
  } else if (level === 3) {
    return `${baseImageKit}/tr:${widthString},c-maintain_ratio/${fPointsL3}`;
  } else if (level === 4) {
    return `${baseImageKit}/tr:${widthString},c-maintain_ratio/${fPointsL4}`;
  } else if (level === 5) {
    return `${baseImageKit}/tr:${widthString},c-maintain_ratio/${fPointsL5}`;
  } else {
    return `${baseImageKit}/tr:${widthString},c-maintain_ratio/${fPointsL0}`;
  }
};

export const getFitPointsLeft = (fPoints?: number) => {
  if (!fPoints) {
    return POINTS_LEVEL_ONE;
  }

  if (fPoints < POINTS_LEVEL_ONE) {
    return POINTS_LEVEL_ONE - fPoints;
  } else if (fPoints >= POINTS_LEVEL_ONE && fPoints < POINTS_LEVEL_TWO) {
    return POINTS_LEVEL_TWO - fPoints;
  } else if (fPoints >= POINTS_LEVEL_TWO && fPoints < POINTS_LEVEL_THREE) {
    return POINTS_LEVEL_THREE - fPoints;
  } else if (fPoints >= POINTS_LEVEL_THREE && fPoints < POINTS_LEVEL_FOUR) {
    return POINTS_LEVEL_FOUR - fPoints;
  } else if (fPoints >= POINTS_LEVEL_FOUR && fPoints < POINTS_LEVEL_FIVE) {
    return POINTS_LEVEL_FIVE - fPoints;
  } else if (fPoints >= POINTS_LEVEL_FIVE) {
    return 0;
  } else {
    return POINTS_LEVEL_ONE;
  }
};

export const getLvlPtsProgress = (fPoints: number | undefined, lvl: number) => {
  if (!fPoints) {
    return {
      pts: 0,
      total: 0,
      progress: 0,
    };
  }

  if (lvl === 1) {
    return {
      pts: fPoints > POINTS_LEVEL_ONE ? POINTS_LEVEL_ONE : fPoints,
      total: POINTS_LEVEL_ONE,
      progress:
        fPoints < POINTS_LEVEL_ONE
          ? Math.round((fPoints / POINTS_LEVEL_ONE) * 100)
          : 100,
    };
  } else if (lvl === 2) {
    return {
      pts: fPoints > POINTS_LEVEL_TWO ? POINTS_LEVEL_TWO : fPoints,
      total: POINTS_LEVEL_TWO,
      progress:
        fPoints < POINTS_LEVEL_TWO
          ? Math.round((fPoints / POINTS_LEVEL_TWO) * 100)
          : 100,
    };
  } else if (lvl === 3) {
    return {
      pts: fPoints > POINTS_LEVEL_THREE ? POINTS_LEVEL_THREE : fPoints,
      total: POINTS_LEVEL_THREE,
      progress:
        fPoints < POINTS_LEVEL_THREE
          ? Math.round((fPoints / POINTS_LEVEL_THREE) * 100)
          : 100,
    };
  } else if (lvl === 4) {
    return {
      pts: fPoints > POINTS_LEVEL_FOUR ? POINTS_LEVEL_FOUR : fPoints,
      total: POINTS_LEVEL_FOUR,
      progress:
        fPoints < POINTS_LEVEL_FOUR
          ? Math.round((fPoints / POINTS_LEVEL_FOUR) * 100)
          : 100,
    };
  } else if (lvl === 5) {
    return {
      pts: fPoints > POINTS_LEVEL_FIVE ? POINTS_LEVEL_FIVE : fPoints,
      total: POINTS_LEVEL_FIVE,
      progress:
        fPoints < POINTS_LEVEL_FIVE
          ? Math.round((fPoints / POINTS_LEVEL_FIVE) * 100)
          : 100,
    };
  } else {
    return {
      pts: 0,
      total: 0,
      progress: 0,
    };
  }
};
