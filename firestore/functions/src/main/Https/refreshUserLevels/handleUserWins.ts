import { getUserPrizes } from "../../../models/Prizes/createUtils";

export const handleUserWins = async (uid: string) => {
  const allPrizes = await getUserPrizes(uid);

  let individualWins: number = 0;
  let teamWins: number = 0;

  for (const prize of allPrizes) {
    if (prize.isTeamAward) {
      teamWins += 1;
    } else {
      individualWins += 1;
    }
  }

  return {
    teamWins,
    individualWins,
  };
};
