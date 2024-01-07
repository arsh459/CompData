import { Badge, SBPrizeV2 } from "@models/Prizes/Prizes";
import firestore from "@react-native-firebase/firestore";

export const cashUnlockBadges = (
  independentBadges?: string[],
  relativeBadges?: string[]
) => {
  const indepBadges = independentBadges ? independentBadges.length : 0;
  const relatBadges = relativeBadges ? relativeBadges.length : 0;

  if (indepBadges + relatBadges < 5) {
    return {
      unlocked: false,
      cardsNeeded: 5 - (indepBadges + relatBadges),
      cardType: "any",
    };
  }

  return {
    unlocked: true,
  };
};

export const getCashPrize = async (
  gameId: string,
  independentBadges?: string[],
  relativeBadges?: string[]
) => {
  const badges: Badge[] = [];

  if (independentBadges) {
    for (const badgeId of independentBadges) {
      const badge = await firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("badges")
        .doc(badgeId)
        .get();

      if (badge.exists) {
        badges.push(badge.data() as Badge);
      }
    }
  }

  if (relativeBadges) {
    for (const badgeId of relativeBadges) {
      const badge = await firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("badges")
        .doc(badgeId)
        .get();

      if (badge.exists) {
        badges.push(badge.data() as Badge);
      }
    }
  }

  let value: number = 0;
  for (const badge of badges) {
    value += badge.baseValue ? badge.baseValue : 0;
  }

  return {
    value: value,
    numIndependentBadges: independentBadges ? independentBadges.length : 0,
    numRelativeBadges: relativeBadges ? relativeBadges.length : 0,
  };
};

export const hasWon = (
  badgeId: string,
  independentBadges?: string[],
  relativeBadges?: string[]
) => {
  if (independentBadges && independentBadges.includes(badgeId)) {
    return true;
  }

  if (relativeBadges && relativeBadges.includes(badgeId)) {
    return true;
  }

  return false;
};

const badgePresent = (specificId: string, independentBadges?: string[]) => {
  if (independentBadges && independentBadges.includes(specificId)) {
    return true;
  }

  return false;
};

export const isPrizeUnlocked = (
  prize: SBPrizeV2,
  independentBadges?: string[],
  relativeBadges?: string[]
): {
  unlocked: boolean;
  cardType?: "specificId" | "independent" | "any";
  cardsNeeded?: number;
  specificId?: string;
} => {
  const numNeeded = prize.minNumBadges;
  const specificBadges = prize.badgeIds;
  const indepBadges = independentBadges ? independentBadges.length : 0;
  const relatBadges = relativeBadges ? relativeBadges.length : 0;

  if (prize.strategy === "anyBadge" && numNeeded <= indepBadges + relatBadges) {
    return { unlocked: true };
  } else if (prize.strategy === "specificBadge") {
    for (const specificId of specificBadges) {
      const indPresent = badgePresent(specificId, independentBadges);
      const relPresent = badgePresent(specificId, relativeBadges);

      if (!indPresent && !relPresent) {
        return {
          unlocked: false,
          cardsNeeded: 1,
          cardType: !relPresent ? "specificId" : "independent",
          specificId,
        };
      }
    }

    return { unlocked: true };
  }

  return {
    unlocked: false,
    cardsNeeded: numNeeded - (indepBadges + relatBadges),
    cardType: "any",
  };
};

export const isBadge = (x: Badge | SBPrizeV2): x is Badge => {
  return (<Badge>x).badgeId !== undefined;
};
