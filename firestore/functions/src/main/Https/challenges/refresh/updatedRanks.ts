import { UserRankV2 } from "../../../../models/Rounds/interface";

export const getUpdatedRanksForUsers = (newSortedOrder: UserRankV2[]) => {
  const toUpdate: UserRankV2[] = [];
  let i: number = 0;

  for (const rk of newSortedOrder) {
    i++;
    if (rk.rank !== i) {
      toUpdate.push({
        ...rk,
        rank: i,
      });
      console.log("ADDING", rk.name);
    }

    console.log("Rank:", i, ` ${rk.fp}FP`, ` lvl${rk.lvl}`, " Name:", rk.name);
  }

  return toUpdate;
};
