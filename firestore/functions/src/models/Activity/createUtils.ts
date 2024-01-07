import { Activity, CoachRank, UserRank } from "./Activity";
import * as admin from "firebase-admin";
import { UserInterface, userLevel } from "../User/User";
// import { getUserEventActivities } from "./getUtils";
import { getStreakPrize } from "../Prizes/getStreakPrize";
import { createRankObjForActivities } from "./createRankObj";
import { getUserActivityAfter } from "./getUtils";
import { CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

export const getUserRankObj = (rankObjs: UserRank[], uid: string) => {
  const filteredRanks = rankObjs.filter((item) => item.uid === uid);

  if (filteredRanks.length) {
    return filteredRanks[0];
  }

  return undefined;
};

export const updateNameImageInRank_ByRef = async (
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  name: string,
  img?: CloudinaryMedia,
) => {
  await ref.update({
    name: name,
    ...(img ? { img: img } : {}),
  });
};

export const updateNameImageInRank = async (
  eventId: string,
  uid: string,
  name: string,
  img?: CloudinaryMedia,
  userKey?: string,
) => {
  await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .doc(`rank-${uid}`)
    .update({
      authorName: name,
      ...(img ? { authorImg: img } : {}),
      ...(userKey ? { userKey: userKey } : {}),
    });
};

export const sumCaloriesFromDayObj = (dayCalObj: {
  [dayString: string]: number;
}) => {
  let sumCal: number = 0;
  for (const cal of Object.values(dayCalObj)) {
    sumCal += cal;
  }

  return sumCal;
};

export const getKPIValue = (
  totalValues?: number,
  nowValue?: number,
  prevValue?: number,
) => {
  if (totalValues && prevValue && nowValue) {
    return totalValues - prevValue + nowValue;
  } else if (totalValues && nowValue && !prevValue) {
    return totalValues + nowValue;
  } else if (totalValues && !nowValue && prevValue) {
    return totalValues - prevValue;
  } else if (totalValues && !nowValue && !prevValue) {
    return totalValues;
  } else if (!totalValues && prevValue && nowValue) {
    return -prevValue + nowValue;
  } else if (!totalValues && !prevValue && nowValue) {
    return nowValue;
  } else if (!totalValues && !prevValue && !nowValue) {
    return 0;
  } else if (!totalValues && prevValue && !nowValue) {
    return prevValue;
  } else {
    return 0;
  }
};

export const reconcileUser_activities = async (
  eventId: string,
  author: UserInterface,
  th: number,
  challengeLength: number,
  streakLength: number,
  after: number,
  before: number,
  communityId: string,
  coachEventId: string,
  coachCohortId: string,
) => {
  const userActivities = await getUserActivityAfter(author.uid, after, before);

  return createRankObjForActivities(
    userActivities,
    author,
    th,
    challengeLength,
    streakLength,
    after,
    eventId,
    communityId,
    coachEventId,
    coachCohortId,
  );
  // for (const act of userActivities) {
  //   rankObj = updateUserRankObj(act, author, rankObj);
  // }

  // return rankObj;
};

export const updateActivityInRankObj = async (
  prev: Activity,
  now: Activity,
  user: UserInterface,
  after: number,
  before: number,
  th: number,
  challengeLength: number,
  streakLength: number,
  eventId: string,
  coachEventId: string,
  coachCohortId: string,
  communityId: string,
  rankObj?: UserRank,
): Promise<UserRank | undefined> => {
  if (rankObj) {
    const {
      numStreaks,
      scoreMinCal,
      remoteActivitiesObj,
      weekCalObj,
      avgSpeed,
      totalDistance,
      weekCalMin,
    } = await getStreakPrize(
      after,
      before,
      th,
      challengeLength,
      streakLength,
      eventId,
      rankObj,
    );

    // console.log("numStreaks", numStreaks);
    // console.log("remoteActivitiesObj", remoteActivitiesObj);

    return {
      ...rankObj,
      totalCalories: sumCaloriesFromDayObj(remoteActivitiesObj),
      avgSpeed: avgSpeed,
      scoreMinCal: scoreMinCal,
      weekCalMin: weekCalMin,
      totalDistance: totalDistance,
      lastTotalCalories: rankObj.totalCalories,
      totalFitPoints: getKPIValue(
        rankObj.totalFitPoints,
        now.fitPoints,
        prev.fitPoints,
      ),
      ...(coachEventId ? { coachEventId: coachEventId } : {}),
      ...(coachCohortId ? { coachCohortId: coachCohortId } : {}),
      numActivities: rankObj.numActivities ? rankObj.numActivities + 1 : 1,
      updatedOn: Date.now(),

      numStreaks: numStreaks,
      dayCalObj: remoteActivitiesObj,
      weekCalObj: weekCalObj,
    };
  } else {
    return await reconcileUser_activities(
      eventId,
      user,
      th,
      challengeLength,
      streakLength,
      after,
      before,
      communityId,
      coachEventId,
      coachCohortId,
    );
  }
};

export const updateUserRankObj = async (
  activity: Activity,
  author: UserInterface,
  after: number,
  before: number,
  th: number,
  challengeLength: number,
  streakLength: number,
  eventId: string,
  coachEventId: string,
  coachCohortId: string,
  communityId: string,
  rankObj?: UserRank,
): Promise<UserRank | undefined> => {
  if (rankObj) {
    // console.log("after", after);
    // console.log("th", th);
    // console.log("challengeLength", challengeLength);
    // console.log("rankObj", rankObj.uid);
    const {
      numStreaks,
      remoteActivitiesObj,
      weekCalObj,
      avgSpeed,
      totalDistance,
      weekCalMin,
    } = await getStreakPrize(
      after,
      before,
      th,
      challengeLength,
      streakLength,
      eventId,
      rankObj,
    );

    console.log("numStreaks", numStreaks);
    // console.log("remoteActivitiesObj", remoteActivitiesObj);

    return {
      ...rankObj,
      totalCalories: sumCaloriesFromDayObj(remoteActivitiesObj),
      lastTotalCalories: rankObj.totalCalories,
      totalFitPoints: getKPIValue(rankObj.totalFitPoints, activity.fitPoints),
      updatedOn: Date.now(),
      numActivities: rankObj.numActivities ? rankObj.numActivities + 1 : 1,
      ...(author.name ? { authorName: author.name } : {}),
      ...(author.profileImage ? { authorImg: author.profileImage } : {}),

      numStreaks: numStreaks,
      dayCalObj: remoteActivitiesObj,
      weekCalObj: weekCalObj,
      weekCalMin: weekCalMin,
      avgSpeed,
      totalDistance,
    };
  } else {
    return await reconcileUser_activities(
      eventId,
      author,
      th,
      challengeLength,
      streakLength,
      after,
      before,
      communityId,
      coachEventId,
      coachCohortId,
    );
  }
};

export const flipRankObj = (
  rankObjs: (UserRank | CoachRank)[],
  newRankObj: UserRank | CoachRank,
) => {
  return [
    ...rankObjs.filter((rankObj) => rankObj.uid !== newRankObj.uid),
    newRankObj,
  ];
};

export const saveRankedUsers = async (
  userObjs: UserRank[],
  eventId: string,
) => {
  for (const userRank of userObjs) {
    // console.log(
    //   "saved",
    //   userRank.authorName,
    //   userRank.monthPointObj,
    //   userRank.teamName,
    // );
    await admin
      .firestore()
      .collection("sbEvents")
      .doc(eventId)
      .collection("userRanks")
      .doc(`rank-${userRank.uid}`)
      .set(userRank);
  }
};

export const updateStreakState = async (
  eventId: string,
  userRank: UserRank,
) => {
  if (eventId) {
    await admin
      .firestore()
      .collection("sbEvents")
      .doc(eventId)
      .collection("userRanks")
      .doc(`rank-${userRank.uid}`)
      .update({ onStreak: true });
  }
};

export const updateRemoteUserActivityData = async (
  uid: string,
  totalCalories: number,
  numActivities: number,
  regularityScore: number,
  userLev: userLevel,
  progress: number,
) => {
  await admin.firestore().collection("users").doc(uid).update({
    totalCalories,
    numActivities,
    regularityScore,
    userLevel: userLev,
    progress,
  });
};
