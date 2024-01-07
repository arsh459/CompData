import {
  levelBeginnerIconWhiteFrame16,
  levelHardIconWhiteFrame16,
  levelMediumIconWhiteFrame16,
} from "@constants/icons/iconURLs";
import { DifficultyLevelsTypes } from "@models/Tasks/Task";

export const getImgUrlByDifficulty = (
  difficulty: DifficultyLevelsTypes
): string => {
  switch (difficulty) {
    case "easy":
      return levelBeginnerIconWhiteFrame16;
    case "medium":
      return levelMediumIconWhiteFrame16;
    case "hard":
      return levelHardIconWhiteFrame16;
    default:
      return "";
  }
};