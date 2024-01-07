import * as admin from "firebase-admin";
import { TEAM_ALPHABET_GAME } from "../../constants/challenge";
import { RoundInterface, UserRankV2 } from "./interface";

export const getActiveRound = async () => {
  const roundDocs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("rounds")
    .where("start", "<=", Date.now()) // has already started
    .orderBy("start", "desc")
    .get(); // get last first

  if (roundDocs.docs.length) {
    for (const roundDoc of roundDocs.docs) {
      const roundObj = roundDoc.data() as RoundInterface;

      const now = Date.now();
      if (roundObj.start <= now && roundObj.end > now) {
        return roundObj;
      }
    }
  }

  return undefined;
};

export const getUpcomingRound = async () => {
  const roundDocs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("rounds")
    .where("end", ">=", Date.now()) // finishes in future
    .orderBy("end", "desc")
    .get(); // get last first

  if (roundDocs.docs.length) {
    return roundDocs.docs[0].data() as RoundInterface;
  }

  return undefined;
};

export const getRoundById = async (id: string) => {
  const roundDocs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("rounds")
    .doc(id)
    .get(); // get last first

  if (roundDocs.data()) {
    return roundDocs.data() as RoundInterface;
  }

  return undefined;
};

export const getRoundByWithBadgeId = async (badgeId: string) => {
  const roundDocs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("rounds")
    .where("additionalBadgeIds", "array-contains", badgeId)
    .get(); // get last first

  const rounds: RoundInterface[] = [];
  for (const roundDoc of roundDocs.docs) {
    rounds.push(roundDoc.data() as RoundInterface);
  }

  return rounds;
};

export const getAllUserRanksV2 = async (order: "asc" | "desc") => {
  const docs = await admin
    .firestore()
    .collectionGroup("userRanksV2")
    // .orderBy("rank", order)
    .get();

  return docs.docs;
};

export const getUserRankByRank = async (rank: number, levelId: string) => {
  const docs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("level")
    .doc(levelId)
    .collection("userRanksV2")
    .where("rank", "==", rank)
    .get();

  const userRanks: UserRankV2[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserRankV2);
  }

  return userRanks;
};

export const getUserRankV2ByUID_transaction = async (
  transaction: admin.firestore.Transaction,
  uid: string,
  // levelId: string,
) => {
  const docs = await transaction.get(
    admin.firestore().collectionGroup("userRanksV2").where("uid", "==", uid),

    // admin
    //   .firestore()
    //   .collection("sbEvents")
    //   .doc(TEAM_ALPHABET_GAME)
    //   .collection("level")
    //   .doc(levelId)
    //   .collection("userRanksV2")
    //   .where("uid", "==", uid),
  );

  if (docs.docs.length) {
    return docs.docs[0].data() as UserRankV2;
  }

  return undefined;
};

export const getUserRankV2ByUID_docs = async (uid: string) => {
  // get user

  const docs = await admin
    .firestore()
    .collectionGroup("userRanksV2")
    .where("uid", "==", uid)
    .get();

  return docs.docs;
};

export const getUserRankV2ByUID = async (uid: string) => {
  // get user

  const docs = await admin
    .firestore()
    .collectionGroup("userRanksV2")
    .where("uid", "==", uid)
    .get();

  if (docs.docs.length) {
    return docs.docs[0].data() as UserRankV2;
  }

  return undefined;
};

export const getRanksWithMoreFP_transaction = async (
  transaction: admin.firestore.Transaction,
  levelId: string,
  fpTh: number,
  limit: number,
) => {
  const docs = await transaction.get(
    admin
      .firestore()
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("level")
      .doc(levelId)
      .collection("userRanksV2")
      .where("fp", ">", fpTh)
      .limit(limit),
  );

  const userRanks: UserRankV2[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserRankV2);
  }

  return userRanks;
};

export const getRanksWithMoreFP = async (
  fpTh: number,
  levelId: string,
  limit: number,
) => {
  const docs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("level")
    .doc(levelId)
    .collection("userRanksV2")
    .where("fp", ">", fpTh)
    .limit(limit)
    .get();

  const userRanks: UserRankV2[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserRankV2);
  }

  return userRanks;
};

export const getLastRank = async (levelId: string) => {
  const docs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("level")
    .doc(levelId)
    .collection("userRanksV2")
    .orderBy("rank", "desc")
    .limit(1)
    .get();

  if (docs.docs.length) {
    return docs.docs[0].data() as UserRankV2;
  }

  return undefined;
};

export const getRanksInFPRange = async (
  start: number,
  end: number,
  levelId: string,
) => {
  const docs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("level")
    .doc(levelId)
    .collection("userRanksV2")
    .where("fp", ">=", start)
    .where("fp", "<=", end)
    .orderBy("fp", "desc")
    .get();

  const userRanks: UserRankV2[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserRankV2);
  }

  return userRanks;
};

export const getRanksInFPRange_transaction = async (
  transaction: admin.firestore.Transaction,
  start: number,
  end: number,
  levelId: string,
) => {
  const docs = await transaction.get(
    admin
      .firestore()
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("level")
      .doc(levelId)
      .collection("userRanksV2")
      .where("fp", ">=", start)
      .where("fp", "<=", end)
      .orderBy("fp", "desc"),
  );

  const userRanks: UserRankV2[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserRankV2);
  }

  return userRanks;
};

export const getAllUserRanksV2ByFP = async (
  order: "asc" | "desc",
  levelId: string,
) => {
  const docs = await admin
    .firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("level")
    .doc(levelId)
    .collection("userRanksV2")
    .orderBy("fp", order)
    .get();

  const userRanks: UserRankV2[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserRankV2);
  }

  return userRanks;
};

export const saveUserRanks_transaction = async (
  transaction: admin.firestore.Transaction,
  ranks: UserRankV2[],
  levelId: string,
) => {
  for (const rank of ranks) {
    transaction.set(
      admin
        .firestore()
        .collection("sbEvents")
        .doc(TEAM_ALPHABET_GAME)
        .collection("level")
        .doc(levelId)
        .collection("userRanksV2")
        .doc(rank.uid),
      rank,
    );
  }
};

export const removeUserRank_doc = async (
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
) => {
  await doc.ref.delete();
};

export const saveUserRanks = async (ranks: UserRankV2[], levelId: string) => {
  let i: number = 0;
  let batch = admin.firestore().batch();
  for (const rank of ranks) {
    i++;
    if (i < 498) {
      batch.set(
        admin
          .firestore()
          .collection("sbEvents")
          .doc(TEAM_ALPHABET_GAME)
          .collection("level")
          .doc(levelId)
          .collection("userRanksV2")
          .doc(rank.uid),
        rank,
      );
    } else {
      i = 0;
      await batch.commit();
      batch = admin.firestore().batch();
    }
  }

  await batch.commit();
};

export const clearAllRanks = async (
  docs: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>[],
  consoleData: boolean,
) => {
  let i: number = 0;
  let batch = admin.firestore().batch();
  for (const doc of docs) {
    i++;

    if (consoleData) {
      const rank = doc.data() as UserRankV2;
      console.log(
        "DELETE Rank:",
        i,
        ` ${rank.fp}FP`,
        ` lvl${rank.lvl}`,
        " Name:",
        rank.name,
      );
    }

    if (i < 498) {
      batch.delete(doc.ref);
    } else {
      i = 0;
      await batch.commit();
      batch = admin.firestore().batch();
    }
  }

  await batch.commit();
};
