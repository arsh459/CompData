import { CoachRank, UserRank } from "@models/Activities/Activity";

export const handleRankPagination = (
  prev: (UserRank | CoachRank)[],
  myRank: UserRank | CoachRank | undefined,
  rankDict: { [uid: string]: boolean },
  userRankObjs: (UserRank | CoachRank)[],
  action: "next_page" | "refresh"
) => {
  // console.log("");
  // console.log(prev.length, "prev");
  // console.log(myRank?.uid, "myRank");
  // console.log(Object.keys(rankDict).length, "rankObj");
  // console.log(userRankObjs.length, "userRankObjs");
  // console.log(
  //   prev[prev.length - 1] && prev[prev.length - 1].uid === myRank?.uid,
  //   "last UID"
  // );
  // console.log(myRank && rankDict[myRank.uid], "UID in Obj");
  // console.log(rankDict, "rankDict");
  // console.log(userRankObjs, "userRankObjs");
  // console.log(prev, "prev");

  // if no entry is given
  if (userRankObjs.length === 0) {
    return prev;
  }
  // some race condition
  //   if (userRankObjs.length < prev.length) {
  // console.log("RACE CONDITION");

  // return prev;
  //   }
  // console.log("action", action);

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
      // console.log("FIRST RENDER");
      return userRankObjs;
    } else if (!myRank) {
      // console.log("NO USER");
      return [...prev, ...userRankObjs.slice(prev.length, userRankObjs.length)];
    } else if (
      prev[prev.length - 1].uid === myRank?.uid &&
      !rankDict[myRank.uid]
    ) {
      // console.log("USER AT END, NOT IN Fetched data");
      return [
        ...prev.slice(0, prev.length - 1),
        ...userRankObjs.slice(prev.length - 1, userRankObjs.length),
        myRank,
      ];
    } else if (
      prev[prev.length - 1].uid === myRank?.uid &&
      rankDict[myRank.uid]
    ) {
      // console.log("USER AT END, AND IN Fetched data");
      return [
        ...prev.slice(0, prev.length - 1),
        ...userRankObjs.slice(prev.length - 1, userRankObjs.length),
      ];
    } else if (
      prev[prev.length - 1].uid !== myRank?.uid &&
      myRank &&
      rankDict[myRank?.uid]
    ) {
      // console.log("USER NOT AT END, IN Fetched data");
      return [...prev, ...userRankObjs.slice(prev.length, userRankObjs.length)];
    } else if (
      prev[prev.length - 1].uid !== myRank?.uid &&
      myRank &&
      !rankDict[myRank.uid]
    ) {
      // console.log("USER NOT AT END, NOT IN Fetched data");
      return [
        ...prev,
        ...userRankObjs.slice(prev.length, userRankObjs.length),
        myRank,
      ];
    }

    return [...prev, ...userRankObjs.slice(prev.length, userRankObjs.length)];
  }
};
