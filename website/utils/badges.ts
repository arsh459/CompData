import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { Badge } from "@models/Prizes/PrizeV2";

export const getBadgesServerSide = async () => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteDocs = await db
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("badges")
    .where("pinned", "==", true)
    .orderBy("priority", "asc")
    .get();

  const badges: Badge[] = [];

  for (const doc of remoteDocs.docs) {
    badges.push(doc.data() as Badge);
  }

  return {
    badges,
  };
};
export const getSingleBadgeServerSide = async (badgeId: string) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  if (badgeId) {
    const remoteDocs = await db
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("badges")
      .doc(badgeId)
      .get();

    const remoteBadge = remoteDocs.data() as Badge;

    return {
      remoteBadge,
    };
  }
  return {
    remoteBadge: {},
  };
};
