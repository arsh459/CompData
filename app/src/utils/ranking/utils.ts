import { CoachRank, UserRank } from "@models/Activity/Activity";

export const handleRankPagination = (
  prev: (UserRank | CoachRank)[],
  myRank: UserRank | CoachRank | undefined,
  rankDict: { [uid: string]: boolean },
  userRankObjs: (UserRank | CoachRank)[],
  action: "next_page" | "refresh"
) => {
  // if no entry is given
  if (userRankObjs.length === 0) {
    return prev;
  }
  // some race condition
  //   if (userRankObjs.length < prev.length) {

  // return prev;
  //   }

  if (action === "refresh") {
    if (!myRank) {
      return userRankObjs;
    } else if (myRank && rankDict[myRank.uid]) {
      return userRankObjs;
    } else if (myRank && !rankDict[myRank.uid]) {
      return [...userRankObjs, myRank];
    } else {
      userRankObjs;
    }
  } else {
    if (prev.length === 0) {
      return userRankObjs;
    } else if (!myRank) {
      return [...prev, ...userRankObjs.slice(prev.length, userRankObjs.length)];
    } else if (
      prev[prev.length - 1].uid === myRank?.uid &&
      !rankDict[myRank.uid]
    ) {
      return [
        ...prev.slice(0, prev.length - 1),
        ...userRankObjs.slice(prev.length - 1, userRankObjs.length),
        myRank,
      ];
    } else if (
      prev[prev.length - 1].uid === myRank?.uid &&
      rankDict[myRank.uid]
    ) {
      return [
        ...prev.slice(0, prev.length - 1),
        ...userRankObjs.slice(prev.length - 1, userRankObjs.length),
      ];
    } else if (
      prev[prev.length - 1].uid !== myRank?.uid &&
      myRank &&
      rankDict[myRank?.uid]
    ) {
      return [...prev, ...userRankObjs.slice(prev.length, userRankObjs.length)];
    } else if (
      prev[prev.length - 1].uid !== myRank?.uid &&
      myRank &&
      !rankDict[myRank.uid]
    ) {
      return [
        ...prev,
        ...userRankObjs.slice(prev.length, userRankObjs.length),
        myRank,
      ];
    }

    return [...prev, ...userRankObjs.slice(prev.length, userRankObjs.length)];
  }
};
