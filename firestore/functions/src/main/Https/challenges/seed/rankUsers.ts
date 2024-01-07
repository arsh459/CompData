// import { format } from "date-fns";
import { UserRankV2 } from "../../../../models/Rounds/interface";
// import { getUserById } from "../../../../models/User/Methods";

export const rankUsers = (userRanks: UserRankV2[]) => {
  return userRanks.sort((x, y) => -(x.fp - y.fp));
};

export const addRankToUsers = (
  minRank: number,
  userRanks: UserRankV2[],
  consoleData: boolean,
) => {
  const updatedRanks: UserRankV2[] = [];
  let i: number = minRank;
  for (const rank of userRanks) {
    // const userObj = await getUserById(rank.uid);

    if (consoleData) {
      console.log(
        "Rank:",
        i,
        ` ${rank.fp}FP`,
        ` lvl${rank.lvl}`,
        " Name:",
        rank.name,
      );

      // console.log(
      //   i,
      //   " | ",
      //   rank.fp,
      //   " | ",
      //   rank.name,
      //   " | ",
      //   userObj?.phone,
      //   " | ",
      //   userObj?.challengeJoined
      //     ? format(new Date(userObj?.challengeJoined), "dd-MM-yyyy hh:mma")
      //     : "",
      // );
    }
    updatedRanks.push({
      ...rank,
      rank: i,
    });

    i++;
  }

  return updatedRanks;
};
