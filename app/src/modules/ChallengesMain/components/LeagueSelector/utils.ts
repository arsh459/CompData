import { LevelInterface } from "@models/Level/interface";

export const getLeagueText = (level: LevelInterface, userLevel: number) => {
  if (userLevel === level.lvlNumber) {
    return `To unlock the next level, be in Top ${level.promotionCutoff} ranks & have >${level.minFP}FP`;
  }

  return `Complete your current league - Lvl ${userLevel} to unlock this league`;
};
