// import { RahulUID } from "../../../../constants/email/contacts";
import { getLevelByNumber } from "../../../../models/Level/getRelevantLevel";
import {
  getRoundById,
  saveUserRanks,
} from "../../../../models/Rounds/getUserRankV2";
import {
  getAllChallengeUsers,
  // getUserById,
} from "../../../../models/User/Methods";
import { mainClearFunc } from "../clear/main";
import { createRanksFromUserArrV2 } from "../seed/createRankFromUser_withPeriod";

export const mainUpdateFunc = async (
  roundId: string,
  clearOld?: boolean,
  skipSave?: boolean,
) => {
  const round = await getRoundById(roundId);

  if (!round) {
    return false;
  }

  const usersInChallenge = await getAllChallengeUsers();
  // const usr = await getUserById(RahulUID);

  // console.log("");
  // for (const userDoc of usersInChallenge) {
  //   console.log(
  //     userDoc.uid,
  //     " | ",
  //     userDoc.phone,
  //     " | ",
  //     userDoc.email,
  //     " | ",
  //     userDoc.name,
  //   );
  // }
  // console.log("");
  // throw new Error("PAUSED");
  // const usersInChallenge = [usr];

  const ranksObj = await createRanksFromUserArrV2(
    usersInChallenge,
    round.start,
    round.fpStrategy ? round.fpStrategy : "totalFP",
  );

  // throw new Error("paused");

  if (clearOld) {
    console.log("CLEARING OLD RANKS");
    await mainClearFunc();
  }

  for (const lvl of Object.keys(ranksObj)) {
    const ranksToSave = ranksObj[lvl];

    console.log("lvl", lvl);

    const lvlObj = await getLevelByNumber(parseInt(lvl));

    if (lvlObj?.id) {
      console.log("ADDING RANKS:", ranksToSave.length, ` Lvl: ${lvl}`);

      if (!skipSave) await saveUserRanks(ranksToSave, lvlObj?.id);
    } else {
      console.log(
        "SKIPPING RANKS:",
        ranksToSave.length,
        ` Lvl: ${lvl} NO LEVEL OBJ`,
      );
    }
  }

  return true;
};
