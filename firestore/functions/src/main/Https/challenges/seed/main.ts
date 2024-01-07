import { getGameLevels } from "../../../../models/Level/getRelevantLevel";
import { saveUserRanks } from "../../../../models/Rounds/getUserRankV2";
import { getAllUsersWithFPAndLevel } from "../../../../models/User/Methods";
import { createRanksFromUserArr_SingleLevel } from "./createRankFromUser";

export const mainSeedFunc = async () => {
  const gameLevels = await getGameLevels();

  for (const gameLevel of gameLevels) {
    console.log();
    console.log();
    console.log("LEVEL", gameLevel.lvlNumber);

    const allUsersWithFP = await getAllUsersWithFPAndLevel(gameLevel.lvlNumber);
    console.log("Users with FP", allUsersWithFP.length);

    const ranks = createRanksFromUserArr_SingleLevel(allUsersWithFP);

    // save ranks
    await saveUserRanks(ranks, gameLevel.id);
  }
};
