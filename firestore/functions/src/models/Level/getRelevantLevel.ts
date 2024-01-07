import * as admin from "firebase-admin";
import { LevelInterface } from "./interface";
import { TEAM_ALPHABET_GAME } from "../../constants/challenge";

export const getLevelByNumber_transaction = async (
  transaction: admin.firestore.Transaction,
  levelNumber: number,
) => {
  const levelDocs = await transaction.get(
    admin
      .firestore()
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("level")
      .where("lvlNumber", "==", levelNumber),
  );

  if (levelDocs.docs.length) {
    return levelDocs.docs[0].data() as LevelInterface;
  }

  return undefined;
};

export const getLevelByNumber = async (levelNumber: number) => {
  const levelDocs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("level")
    .where("lvlNumber", "==", levelNumber)
    .get();

  if (levelDocs.docs.length) {
    return levelDocs.docs[0].data() as LevelInterface;
  }

  return undefined;
};

export const getGameLevels = async () => {
  const levelDocs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("level")
    .orderBy("lvlNumber", "asc")
    .get();

  const gameLevels: LevelInterface[] = [];
  for (const doc of levelDocs.docs) {
    gameLevels.push(doc.data() as LevelInterface);
  }

  return gameLevels;
};

// export const getLvlInRange = async (fp: number) => {
//   const lvlInRange = await admin
//     .firestore()
//     .collection("levels")
//     .where("minFP", "<=", fp)
//     .where("maxFP", ">=", fp)
//     .get();

//   // has a level in fixed range
//   if (lvlInRange.docs.length) {
//     return lvlInRange.docs[0].data() as LevelInterface;
//   }

//   const lastLevel = await admin
//     .firestore()
//     .collection("levels")
//     .where("minFP", "<=", fp)
//     .orderBy("minFP", "desc")
//     .limit(1)
//     .get();

//   if (lastLevel.docs.length) {
//     return lastLevel.docs[0].data() as LevelInterface;
//   }
// };

/**
 *
 * 1120
 * LVL 6
 * 900
 * 234
 * LVL 7
 *
 *
 * Earn 1FP -> Then you get ranked on leaderboard
 *
 * 12 week journey. Each level should have minFP && rank crit.
 *
 * Day 0 -> 5FP
 *
 * Lvl 1 - 0 - 1FP
 * Lvl 2 - 1 - 10FP
 * Lvl 3 - 10 - 100FP
 * Lvl 4 - 100 - 300FP
 *
 *
 *
 * ROUND End -> LVL calculation
 * LVL1 - Bronze League - Base League - Rank 0 - 45 && minFP > 10FP proceed. Rest stay
 * LVL2 - Silver League - 0 - 10 Progress | 10 - 40 stay | 40+ demote
 * LVL3 - Gold League - 0 - 40 stay | 40+ demote
 *
 *
 */
