import { awardTypes, Prize } from "@models/Prizes/Prize";

export const sortPrizes = (prizes: Prize[]) => {
  return prizes.sort((a, b) =>
    prizeRankingAlgo(a.prizeType, b.prizeType, a.rank, b.rank)
  );
};

const prizeRankingAlgo = (
  aPrizeType: awardTypes,
  bPrizeType: awardTypes,
  aRank?: number,
  bRank?: number
) => {
  if (aPrizeType === "rank" && bPrizeType !== "rank") {
    return aRank ? -aRank : -1;
  } else if (aPrizeType !== "rank" && bPrizeType === "rank") {
    return bRank ? bRank : 1;
  } else {
    return (aRank ? aRank : 1) - (bRank ? bRank : 1);
  }
};
