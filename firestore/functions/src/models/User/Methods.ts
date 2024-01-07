import {
  Cycle,
  fitnessGoalObj,
  fitnessGoalTypes,
  goalKeys,
  PeriodDateObj,
  UserInterface,
} from "./User";
import { v4 as uuidv4 } from "uuid";
import * as admin from "firebase-admin";
import { AuthorInterface } from "../Collection/Collection";
import {
  FirestoreLocation,
  // Location,
} from "../../main/Https/location/interface";

import { UserAppSubscription } from "../AppSubscription/Subscription";
import { MenstrualPhaseDays } from "../../main/Https/period/utils";

export const getUsersForPlanId = async (planId: string) => {
  const usersWithBadge = await admin
    .firestore()
    .collection("users")
    .where("sbPlanId", "==", planId)
    .get();

  const userDocs: UserInterface[] = [];
  for (const user of usersWithBadge.docs) {
    userDocs.push(user.data() as UserInterface);
  }

  return userDocs;
};

export const getUsersForPlusTrial = async () => {
  const usersWithBadge = await admin
    .firestore()
    .collection("users")
    .where("plusTrial", "==", true)
    .get();

  const userDocs: UserInterface[] = [];
  for (const user of usersWithBadge.docs) {
    userDocs.push(user.data() as UserInterface);
  }

  return userDocs;
};

export const getUsersForBadge = async (badgeId: string) => {
  const usersWithBadge = await admin
    .firestore()
    .collection("users")
    .where(`recommendationConfig.badgeConfig.${badgeId}.start`, ">=", 0)
    .get();

  const userDocs: UserInterface[] = [];
  for (const user of usersWithBadge.docs) {
    userDocs.push(user.data() as UserInterface);
  }

  return userDocs;
};

export const getCyclesToDelete = (
  cyclesInUse: Cycle[],
  pastCycles: { [st_en: string]: Cycle },
) => {
  const cyclesInUseMap: { [st_en: string]: Cycle } = {};
  for (const cycle of cyclesInUse) {
    console.log(
      "cycle in use",
      cycle.id,
      `${cycle.startDate}_${cycle.endDate}`,
    );
    cyclesInUseMap[`${cycle.startDate}_${cycle.endDate}`] = cycle;
  }

  // console.log("pastCycles", pastCycles);
  // console.log("Object.keys(pastCycles)", Object.keys(pastCycles));
  // console.log("cyclesInUseMap", cyclesInUseMap);

  const toDeleteCycles: Cycle[] = [];
  for (const pastCycleId of Object.keys(pastCycles)) {
    // console.log("pastCycleId", pastCycleId);
    if (!cyclesInUseMap[pastCycleId]) {
      console.log("to delte", pastCycleId);
      toDeleteCycles.push(pastCycles[pastCycleId]);
    }
  }

  // console.log("toDeleteCycles", toDeleteCycles);

  return toDeleteCycles;
};

export const getCycleToAddAndRemove = (
  previousUserCycles: { [st_en: string]: Cycle },
  startDate: string,
  endDate: string,
  length: number,
  startUnix: number,
  endUnix: number,
  periodCharacter: MenstrualPhaseDays,
): { cycleToUse: Cycle; action: "KEEP" | "ADD_NEW" } => {
  if (previousUserCycles[`${startDate}_${endDate}`]) {
    return {
      cycleToUse: updateExistingCycle(
        previousUserCycles[`${startDate}_${endDate}`],
        length,
        startDate,
        endDate,
        startUnix,
        endUnix,
        periodCharacter,
      ),
      action: "KEEP",
    };
  }

  return {
    cycleToUse: createNewCycle(
      length,
      startDate,
      endDate,
      startUnix,
      endUnix,
      periodCharacter,
    ),
    action: "ADD_NEW",
  };
};

const createNewCycle = (
  length: number,
  startDate: string,
  endDate: string,
  startUnix: number,
  endUnix: number,
  periodCharacter: MenstrualPhaseDays,
): Cycle => {
  return {
    length,
    startDate,
    id: uuidv4(),
    endDate,
    startUnix,
    endUnix,
    status: length >= 21 && length <= 35 ? "regular" : "irregular",
    phaseSplits: periodCharacter,
  };
};

const updateExistingCycle = (
  oldCycle: Cycle,
  length: number,
  startDate: string,
  endDate: string,
  startUnix: number,
  endUnix: number,
  periodCharacter: MenstrualPhaseDays,
): Cycle => {
  return {
    ...oldCycle,
    length,
    startDate,
    endDate,
    startUnix,
    endUnix,
    status: length >= 21 && length <= 35 ? "regular" : "irregular",
    phaseSplits: periodCharacter,
  };
};

// export const getPeriodDateObj = (date: string, unix: number): PeriodDateObj => {
//   return {
//     date: date,
//     type: "UNKNOWN",
//     unix,
//     id: uuidv4(),
//     estimationType: "GENERATED",
//   };
// };

export const getUserCycles = async (uid: string) => {
  const remCycles = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("cycles")
    .orderBy("startUnix", "asc")
    .get();

  let currentUserCycle: Cycle | undefined = undefined;
  const cycleObjs: { [st_en: string]: Cycle } = {};
  for (const pDate of remCycles.docs) {
    const prevCycle = pDate.data() as Cycle;
    cycleObjs[`${prevCycle.startDate}_${prevCycle.endDate}`] = prevCycle;

    if (prevCycle.endUnix > Date.now()) {
      currentUserCycle = prevCycle;
    }
  }

  console.log("READ PREVIOUS CYCLES", Object.keys(cycleObjs).length);

  return { pastUserCycles: cycleObjs, currentUserCycle };
};

export const fetchOnlyPeriodDates = async (uid: string) => {
  const userPeriodDates = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("type", "==", "PERIOD")
    .get();

  const periodDateMap: { [date: string]: PeriodDateObj } = {};
  const periodDates: PeriodDateObj[] = [];
  for (const pDate of userPeriodDates.docs) {
    const pDateRemote = pDate.data() as PeriodDateObj;
    periodDates.push(pDateRemote);

    periodDateMap[pDateRemote.date] = pDateRemote;
  }

  console.log("READ PERIOD DATES", periodDates.length);

  return {
    periodDatesInArray: periodDates.sort((x, y) => x.unix - y.unix),
    periodDateMap,
  };
};

export const getUserPeriodDateForDateString = async (
  uid: string,
  date: string,
) => {
  const remoteObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("date", "==", date)
    .get();

  if (remoteObj.docs.length) {
    return remoteObj.docs[0].data() as PeriodDateObj;
  }

  return undefined;
};

export const getOnlyPeriodDatesFromDB = async (uid: string) => {
  const userPeriodDates = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("type", "==", "PERIOD")
    .get();

  const periodDates: string[] = [];
  for (const pDate of userPeriodDates.docs) {
    const pDateRemote = pDate.data() as PeriodDateObj;

    if (pDateRemote.type === "PERIOD") {
      periodDates.push(pDateRemote.date);
    }
  }

  return periodDates;
};

export const getLastSavedPeriodDate = async (uid: string) => {
  const lastDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .orderBy("unix", "desc")
    .limit(1)
    .get();

  if (lastDoc.docs.length) {
    return lastDoc.docs[0].data() as PeriodDateObj;
  }

  return undefined;
};

export const getPeriodDateForDate = async (uid: string, date: string) => {
  const todayDateObjDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("date", "==", date)
    .get();
  if (todayDateObjDoc.docs.length) {
    return todayDateObjDoc.docs[0].data() as PeriodDateObj;
  }
  return undefined;
};

export const fetchLastSavedPeriodDate = async (uid: string) => {
  const lastDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("type", "==", "PERIOD")
    .orderBy("unix", "desc")
    .limit(1)
    .get();

  if (lastDoc.docs.length) {
    return lastDoc.docs[0].data() as PeriodDateObj;
  }

  return undefined;
};

export const getCycleById = async (uid: string, cycleId: string) => {
  const lastDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("cycles")
    .doc(cycleId)

    .get();

  if (lastDoc.data()) {
    return lastDoc.data() as Cycle;
  }

  return undefined;
};

export const getUserPeriodDates = async (uid: string) => {
  const userPeriodDates = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .orderBy("unix", "asc")
    .get();

  const cycleDateMap: { [date: string]: PeriodDateObj } = {};
  const allCycleDates: PeriodDateObj[] = [];
  const periodDates: PeriodDateObj[] = [];
  for (const pDate of userPeriodDates.docs) {
    const pDateRemote = pDate.data() as PeriodDateObj;

    cycleDateMap[pDateRemote.date] = pDateRemote;
    allCycleDates.push(pDateRemote);

    if (pDateRemote.type === "PERIOD") {
      periodDates.push(pDateRemote);
    }
  }

  console.log("READ ALL CYCLE DATES", userPeriodDates.docs.length);

  return { allCycleDates, cycleDateMap, periodDates };
};

export const getOnlyPeriodDates = (periodDates: PeriodDateObj[]) => {
  return periodDates.filter((item) => item.type === "PERIOD");
};

export const getUsersAssignedWorkoutBadge = async (badgeId: string) => {
  const usersWithBadge = await admin
    .firestore()
    .collection("users")
    .where("badgeId", "==", badgeId)
    .get();

  const userDocs: UserInterface[] = [];
  for (const user of usersWithBadge.docs) {
    userDocs.push(user.data() as UserInterface);
  }

  if (userDocs.length === 0) {
    return await getUsersForBadge(badgeId);
  }

  return userDocs;
};

export const getUsersAssignedDietBadge = async (badgeId: string) => {
  const usersWithBadge = await admin
    .firestore()
    .collection("users")
    .where("nutritionBadgeId", "==", badgeId)
    .get();

  const userDocs: UserInterface[] = [];
  for (const user of usersWithBadge.docs) {
    userDocs.push(user.data() as UserInterface);
  }

  // if (userDocs.length === 0) {
  //   return await getUsersForBadge(badgeId);
  // }

  return userDocs;
};

export const updateUserRoom = async (uid: string, hmsRoomId: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ hmsRoomId: hmsRoomId });
};

export const getAllUsersToRecommend = async (now: number) => {
  const toRecommendUsers = await admin
    .firestore()
    .collection("users")
    .where("recommendationConfig.start", ">=", now)
    .get();

  const userObjs: UserInterface[] = [];
  for (const user of toRecommendUsers.docs) {
    userObjs.push(user.data() as UserInterface);
  }

  return userObjs;
};

export const getUserByTrUUID = async (uuid: string) => {
  try {
    const userObj = await admin
      .firestore()
      .collection("users")
      .where("trSoftUUID", "==", uuid)
      .get();

    if (userObj.docs.length) {
      return userObj.docs[0].data() as UserInterface;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const updateUserTotalFp = async (uid: string, fps: number) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ fpCredit: fps });
};

export const saveTrResponse = async (
  uid: string,
  location: FirestoreLocation,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("location")
    .doc()
    .set(location);
};

export const getUserByPhone = async (phone: string) => {
  const userObj = await admin
    .firestore()
    .collection("users")
    .where("phone", "==", phone)
    .get();

  const res: UserInterface[] = [];
  return userObj.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const getUserById = async (userId: string) => {
  try {
    const userObj = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (userObj.exists) {
      // console.log("READ - User Update", 1);
      return userObj.data() as UserInterface;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }

  // console.log('remoteTripObj', tripObj.data());

  // await tPromise.decode(User, userObj.data());
};

export const getUserGoalString = (fitnessGoals?: fitnessGoalObj) => {
  if (!fitnessGoals) {
    return "";
  }

  const goals: string[] = [];
  for (const goal of Object.keys(fitnessGoals)) {
    if (fitnessGoals[goal as goalKeys]) {
      goals.push(goal);
    }
  }

  if (goals.length > 0) {
    return goals.join(", ");
  }

  return "-";
};

export const getUserGoalStringV2 = (fitnessGoals?: fitnessGoalTypes[]) => {
  if (!fitnessGoals || fitnessGoals.length === 0) {
    return "get fit";
  }

  if (fitnessGoals.length && fitnessGoals.includes("pcos_pcod")) {
    return "manage PCOS";
  } else if (fitnessGoals.length && fitnessGoals.includes("lose_weight")) {
    return "lose weight";
  } else {
    return "get fit";
  }
};

export const updateWelcomeMessageUserObj = async (
  userId: string,
  pendingEvents: string[],
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({ welcomeMessagesForEvents: pendingEvents });
};

export const updateCourseMessageUserObj = async (
  userId: string,
  pendingEvents: string[],
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({ welcomeMessagesForCourses: pendingEvents });
};

export const updateTeamCreateMessages = async (
  userId: string,
  pendingEvents: string[],
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({ teamCreateMessage: pendingEvents });
};

export const updateInviteMessagesForUserObj = async (
  userId: string,
  pendingEvents: string[],
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({ inviteMessagesForEvents: pendingEvents });
};

export const getBootcampUsers = async () => {
  const allUserDocs = await admin
    .firestore()
    .collection("users")
    .where("bootcampDetails.bootcampId", "!=", "")
    .get();

  const res: UserInterface[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const updateUserSubscription = async (
  userId: string,
  gameId: string,
  sprintId: string,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("subscriptions")
    .doc(gameId)
    .set(
      {
        gameId: gameId,
        paidOnUnix: Date.now(),
        paidSprints: admin.firestore.FieldValue.arrayUnion(sprintId),
      },
      { merge: true },
    );
};

export const getAllUsers = async () => {
  return await admin.auth().listUsers();
};

export const getAllUsersPostUnix = async (unix: number) => {
  const allUserDocs = await admin
    .firestore()
    .collection("users")
    .where("authSignupTime", ">=", unix)
    .orderBy("authSignupTime", "desc")
    .get();
  const res: UserInterface[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const getAllSocialboatUsers = async (): Promise<UserInterface[]> => {
  const allUserDocs = await admin
    .firestore()
    .collection("users")
    .where("socialBoat", "==", true)
    .get();
  const res: UserInterface[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const getUsersSubscriptions = async (): Promise<
  UserAppSubscription[]
> => {
  const allUserDocs = await admin
    .firestore()
    .collection("appSubscriptions")
    .doc("0cPvVrnphNJBnvvOM9Zf")
    .collection("userSubs")
    .get();

  const res: UserAppSubscription[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserAppSubscription);
    }
    return acc;
  }, res);
};

export const getUsersBetween = async (
  start: number,
  end: number,
  key: string,
): Promise<UserInterface[]> => {
  const allUserDocs = await admin
    .firestore()
    .collection("users")
    .where(key, ">=", start)
    .where(key, "<=", end)
    .get();

  const res: UserInterface[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const getAllUsers_ByCollection = async (): Promise<UserInterface[]> => {
  const allUserDocs = await admin
    .firestore()
    .collection("users")
    .orderBy("uid", "asc")
    .get();
  const res: UserInterface[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const addCircuitIds = async (uid: string, circuitId: string) => {
  return await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(
      {
        circuitIds: admin.firestore.FieldValue.arrayUnion(circuitId),
      },
      { merge: true },
    );
};

export const addListingId = async (uid: string, listingId: string) => {
  return await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(
      {
        listingIds: admin.firestore.FieldValue.arrayUnion(listingId),
      },
      { merge: true },
    );
};

export const removeListingId = async (uid: string, listingId: string) => {
  return await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(
      {
        listingIds: admin.firestore.FieldValue.arrayRemove(listingId),
      },
      { merge: true },
    );
};

export const getAuthor = (user: UserInterface): AuthorInterface => {
  return {
    name: user.name ? user.name : "",
    imageURI: user.imageURI ? user.imageURI : "",
    allFollowers: user.allFollowers ? user.allFollowers : 0,
    tagline: user.tagline ? user.tagline : "",
    bio: user.bio ? user.bio : "",
  };
};

export const getUsersForEvent = async (eventId: string) => {
  const allUserDocs = await admin
    .firestore()
    .collection("users")
    .where("enrolledEvents", "array-contains", eventId)
    .get();
  const res: UserInterface[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const getUsersWithTerraTag = async () => {
  const allUserDocs = await admin
    .firestore()
    .collection("users")
    .where("terraUser.user_id", "!=", "")
    .get();
  const res: UserInterface[] = [];
  return allUserDocs.docs.reduce((acc, doc) => {
    if (doc.exists) {
      acc.push(doc.data() as UserInterface);
    }
    return acc;
  }, res);
};

export const updateGoogleFitAccessToken = async (
  uid: string,
  accessToken?: string,
  expiresOnUnix?: number,
  refreshToken?: string,
) => {
  const now = Date.now();

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      ...(refreshToken ? { [`googleFit.refreshToken`]: refreshToken } : {}),
      ...(accessToken ? { [`googleFit.accessToken`]: accessToken } : {}),
      ...(expiresOnUnix
        ? { [`googleFit.expiresOnUnix`]: now + expiresOnUnix * 1000 }
        : {}),
    });
};

export const removeGoogleFitScope = async (uid: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      [`googleFit.scopes`]: [],
    });
};

export const saveCronFit = async (uid: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ lastCronRun: Date.now() });
};

export const getAllUsersWithFit = async () => {
  const resp = await admin
    .firestore()
    .collection("users")
    .orderBy("googleFit.serverAuthCode", "asc")
    .get();

  const users: UserInterface[] = [];
  for (const doc of resp.docs) {
    users.push(doc.data() as UserInterface);
  }

  return users;
};

export const askForRefreshToken = async (uid: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      [`googleFit.forceRefreshToken`]: true,
      [`googleFit.scopes`]: [],
    });
};

export const getAllChallengeUsers = async () => {
  const docs = await admin
    .firestore()
    .collection("users")
    .where("challengeJoined", ">", 0)
    .get();

  const userRanks: UserInterface[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserInterface);
  }

  return userRanks;
};

export const getAllUsersByLevel = async () => {
  const docs = await admin
    .firestore()
    .collection("users")
    .orderBy("userLevelV2", "asc")
    .get();

  const userRanks: UserInterface[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserInterface);
  }

  return userRanks;
};

export const updateUserLevel = async (uid: string, userLevel: number) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ userLevelV2: userLevel });
};

export const addChallengeJoinedToUser = async (
  uid: string,
  challengeJoined: number,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ challengeJoined, userLevelV2: 1 });
};

export const removeChallengeJoinedTime = async (uid: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ challengeJoined: admin.firestore.FieldValue.delete() });
};

export const getAllUsersWithEmail = async (limit?: number) => {
  const q = admin.firestore().collection("users").where("email", "!=", "");

  // .limit(20)
  // .get();

  let docs: admin.firestore.QuerySnapshot<admin.firestore.DocumentData>;
  if (limit) {
    docs = await q.limit(limit).get();
  } else {
    docs = await q.get();
  }

  const userRanks: UserInterface[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserInterface);
  }

  return userRanks;
};

export const getAllUsersWithFP = async (limit?: number) => {
  const q = admin
    .firestore()
    .collection("users")
    .where("fpCredit", ">", 0)
    .orderBy("fpCredit", "desc");
  // .limit(20)
  // .get();

  let docs: admin.firestore.QuerySnapshot<admin.firestore.DocumentData>;
  if (limit) {
    docs = await q.limit(limit).get();
  } else {
    docs = await q.get();
  }

  const userRanks: UserInterface[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserInterface);
  }

  return userRanks;
};

export const getAllUsersWithFPAndLevel = async (level: number) => {
  const docs = await admin
    .firestore()
    .collection("users")
    .where("userLevelV2", "==", level)
    .where("fpCredit", ">", 0)
    .orderBy("fpCredit", "desc")
    .limit(20)
    .get();

  const userRanks: UserInterface[] = [];
  for (const doc of docs.docs) {
    userRanks.push(doc.data() as UserInterface);
  }

  return userRanks;
};
