import { UserRankV2 } from "../../../../models/Rounds/interface";
import { UserInterface } from "../../../../models/User/User";
import { getTimezone } from "../../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { addRankToUsers, rankUsers } from "./rankUsers";

export const createRanksFromUserArr_SingleLevel = (users: UserInterface[]) => {
  const ranks: UserRankV2[] = [];
  for (const user of users) {
    const newRank = createRankForUser(user);
    ranks.push(newRank);
  }

  const rankedUserArray = rankUsers(ranks);
  const usersWithRank = addRankToUsers(1, rankedUserArray, true);

  return usersWithRank;
};

export const createRanksFromUserArr = (users: UserInterface[]) => {
  const ranks: { [lvl: string]: UserRankV2[] } = {};
  for (const user of users) {
    const newRank = createRankForUser(user);
    console.log("newRank", newRank.uid, user.name, newRank.lvl);
    if (ranks[newRank.lvl]) {
      ranks[newRank.lvl].push(newRank);
    } else {
      ranks[newRank.lvl] = [newRank];
    }
  }

  const finalRanks: { [lvl: string]: UserRankV2[] } = {};
  for (const lvl of Object.keys(ranks)) {
    const lvlRanks = ranks[lvl];

    const rankedUserArray = rankUsers(lvlRanks);
    const usersWithRank = addRankToUsers(1, rankedUserArray, true);

    finalRanks[lvl] = usersWithRank;
  }

  return finalRanks;
};

export const createRankForUser = (
  user: UserInterface,
  initLevel?: number,
): UserRankV2 => {
  return {
    uid: user.uid,
    // fp: getUserFP(user),
    fp: 0,
    fpObj: {},
    // totalFP: getUserFP(user),
    rank: -1,
    tz: getTimezone(user),
    name: user.name ? user.name : "New Player",
    lvl: initLevel ? initLevel : user.userLevelV2 ? user.userLevelV2 : 1,
    ...(user.profileImage ? { img: user.profileImage } : {}),
  };
};

export const getUserFP = (user: UserInterface) => {
  if (typeof user.fpCredit === "number" && typeof user.fpDebit === "number") {
    const del = user.fpCredit - user.fpDebit;
    if (del > 0) {
      return del;
    }

    return 0;
  } else if (user.fpCredit) {
    return user.fpCredit;
  }

  return 0;
};
