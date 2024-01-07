import * as admin from "firebase-admin";
import { FirestoreTerra, TerraActivity } from "../Terra/TerraUser";
import { WorkoutActivity } from "../WorkoutActivity/WorkoutActivity";
import { Activity, CoachRank, UserRank } from "./Activity";

export const getAllUserRanks = async (eventId: string) => {
  const userRanks = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .get();

  const rankObjs: UserRank[] = [];
  for (const userRank of userRanks.docs) {
    rankObjs.push(userRank.data() as UserRank);
  }

  console.log("ALL RANK READS:", rankObjs.length);

  return rankObjs;
};

export const getAllActivitiesForTask = async (taskId: string) => {
  const allActivities = await admin
    .firestore()
    .collectionGroup("activities")
    .where("taskId", "==", taskId)
    .get();

  const acts: Activity[] = [];
  for (const act of allActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

export const updateCalories = async (
  uid: string,
  id: string,
  calories: number,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(id)
    .update({ calories: calories });
};

export const saveActivityWithCalories = async (
  uid: string,
  id: string,
  selectedAct: Activity,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(id)
    .set(selectedAct, { merge: true });
};

export const getStepActivitiesToday = async (
  uid: string,
  // start: number,
  // end: number,
  date: string,
) => {
  const allActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("date", "==", date)
    // .where("createdOn", ">=", start)
    // .where("createdOn", "<=", end)
    .where("stepsActive", "==", true)
    .get();

  const acts: Activity[] = [];
  for (const act of allActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

export const getActivitiesInRange = async (
  uid: string,
  // date: string,
  start: number,
  end: number,
) => {
  const allActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", start)
    .where("createdOn", "<=", end)
    .get();

  const acts: Activity[] = [];
  for (const act of allActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

export const getActivitiesInRangeForType = async (
  uid: string,
  // date: string,
  start: number,
  end: number,
  source: "nutrition",
) => {
  const allActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", start)
    .where("createdOn", "<=", end)
    .where("source", "==", source)
    .get();

  const acts: Activity[] = [];
  for (const act of allActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

export const getTimedActivitiesToday = async (
  uid: string,
  // date: string,
  start: number,
  end: number,
  taskId: string,
) => {
  const allActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", start)
    .where("createdOn", "<=", end)
    .where("taskId", "==", taskId)
    .get();

  const acts: Activity[] = [];
  for (const act of allActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

export const getStepActivitiesTodayV2 = async (
  uid: string,
  date: string,
  // start: number,
  // end: number,
  taskId: string,
) => {
  const allActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    // .where("createdOn", ">=", start)
    // .where("createdOn", "<=", end)
    .where("date", "==", date)
    .where("taskId", "==", taskId)
    .get();

  const acts: Activity[] = [];
  for (const act of allActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

export const getAllActivityById = async (uid: string, id: string) => {
  const actDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(id)
    .get();

  if (actDoc.exists) {
    return actDoc.data() as Activity;
  }

  return undefined;
};

export const changeActivityNotifyState = async (uid: string, actId: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(actId)
    .update({
      notifyUser: "SUCCESS",
    });
};

export const getUserRankForUID = async (eventId: string, uid: string) => {
  const userRank = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .doc(`rank-${uid}`)
    .get();

  // const rankObjs: UserRank[] = [];
  // for (const userRank of userRanks.docs) {
  if (userRank.exists) {
    return userRank.data() as UserRank;
  }

  return undefined;

  // }
};

export const getTopNUserRanks = async (eventId: string, num: number) => {
  const userRanks = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .orderBy("rank", "asc")
    .limit(num)
    .get();

  const rankObjs: UserRank[] = [];
  for (const userRank of userRanks.docs) {
    rankObjs.push(userRank.data() as UserRank);
  }

  return rankObjs;
};

export const getTopNUserRanksInWeek = async (
  eventId: string,
  num: number,
  week: string,
) => {
  const userRanks = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .orderBy(`weeklyRank.${week}`, "asc")
    .limit(num)
    .get();

  const rankObjs: UserRank[] = [];
  for (const userRank of userRanks.docs) {
    rankObjs.push(userRank.data() as UserRank);
  }

  return rankObjs;
};

export const getTopNUserRanksInMonth = async (
  eventId: string,
  num: number,
  month: string,
) => {
  const userRanks = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .orderBy(`monthlyRank.${month}`, "asc")
    .limit(num)
    .get();

  const rankObjs: UserRank[] = [];
  for (const userRank of userRanks.docs) {
    rankObjs.push(userRank.data() as UserRank);
  }

  return rankObjs;
};

export const getRankForUser = async (eventId: string, uid: string) => {
  const userRanks = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .where("uid", "==", uid)
    .get();

  const rankObjs: UserRank[] = [];
  for (const userRank of userRanks.docs) {
    rankObjs.push(userRank.data() as UserRank);
  }

  if (rankObjs.length > 0) {
    return rankObjs[0];
  }

  return undefined;
};

export const getAllUserRanksForCoach = async (
  eventId: string,
  coachCommunityId: string,
) => {
  const userRanks = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("userRanks")
    .where("coachCommunityId", "==", coachCommunityId)
    .get();

  const rankObjs: UserRank[] = [];
  for (const userRank of userRanks.docs) {
    rankObjs.push(userRank.data() as UserRank);
  }

  return rankObjs;
};

// export const getUserEventActivities = async (
//   userId: string,
//   eventId: string,
// ) => {
//   const userActivities = await admin
//     .firestore()
//     .collection("users")
//     .doc(userId)
//     .collection("activities")
//     .where("eventId", "==", eventId)
//     .get();

//   const acts: Activity[] = [];
//   for (const act of userActivities.docs) {
//     acts.push(act.data() as Activity);
//   }

//   return acts;
// };

export const getAllCoachRanks = async (eventId: string) => {
  const userRanks = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("coachRanks")
    .get();

  const rankObjs: CoachRank[] = [];
  for (const userRank of userRanks.docs) {
    rankObjs.push(userRank.data() as CoachRank);
  }

  return rankObjs;
};

export const getCoachRank = async (eventId: string, uid: string) => {
  const coach = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("coachRanks")
    .doc(`rank-${uid}`)
    .get();

  if (coach.exists) {
    return coach.data() as CoachRank;
  }

  return undefined;
};

export const getUserActivityAfter = async (
  uid: string,
  after: number,
  before: number,
  // eventId?: string,
) => {
  const activities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", after)
    .where("createdOn", "<=", before)
    .get();

  // console.log("here", activities.docs.length);

  const acts: Activity[] = [];
  for (const act of activities.docs) {
    const activity = act.data() as Activity;
    acts.push(activity);
  }

  return acts;
};

export const getUserActivitiesCalories = async (uid: string) => {
  const activities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("calories", ">=", 0)
    .orderBy("calories", "desc")
    .get();

  const acts: Activity[] = [];
  for (const act of activities.docs) {
    const activity = act.data() as Activity;
    acts.push(activity);
  }

  console.log("FETCHING USER ACTS", activities.docs.length);

  return acts;
};

export const getUserActivitiesCaloriesV2 = async (uid: string) => {
  const activities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("calories", ">", 0)
    .orderBy("calories", "desc")
    .get();

  const acts: Activity[] = [];
  for (const act of activities.docs) {
    const activity = act.data() as Activity;
    acts.push(activity);
  }

  console.log("FETCHING USER ACTS", activities.docs.length);

  return acts;
};

export const getUserActivities = async (
  uid: string,
  limit?: number,
  // eventId?: string,
) => {
  const acts: Activity[] = [];
  if (limit) {
    const activities = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .orderBy("createdOn", "desc")
      .limit(limit)
      .get();
    for (const act of activities.docs) {
      const activity = act.data() as Activity;
      acts.push(activity);
    }
  } else {
    const activities = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .orderBy("createdOn", "asc")
      .get();
    for (const act of activities.docs) {
      const activity = act.data() as Activity;
      acts.push(activity);
    }
  }

  return acts;
};

// export const filterActivitiesForEvent = (
//   activities: Activity[],
//   eventId: string,
// ) => {
//   return activities.filter((item) => item.eventId === eventId);
// };

export const getUserTerraActivities = async (uid: string, date: string) => {
  const userActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("date", "==", date)
    .where("source", "==", "terra")
    .get();

  const acts: Activity[] = [];
  for (const act of userActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

const getUpdatedActivity = (act: Activity): Activity => {
  if (act.calories) {
    return {
      ...act,
      calories: 300,
    };
  }

  return act;
};

export const saveNewActivity = async (
  uid: string,
  activity: Activity,
  rawActivities: TerraActivity[],
) => {
  const batch = admin.firestore().batch();

  batch.set(
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .doc(activity.postId),
    getUpdatedActivity(activity),
  );

  for (const raw of rawActivities) {
    if (raw.metadata.summary_id) {
      batch.set(
        admin
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("activities")
          .doc(activity.postId)
          .collection("raw")
          .doc(raw.metadata.summary_id),

        createFirestoreTerra(raw),
      );
    }
  }

  await batch.commit();
};

export const getRawActivities = async (uid: string, activityId: string) => {
  const rawActs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(activityId)
    .collection("raw")
    .get();

  const rawActsList: FirestoreTerra[] = [];
  for (const raw of rawActs.docs) {
    if (raw.exists) {
      rawActsList.push(raw.data() as FirestoreTerra);
    }
  }

  return rawActsList;
};

export const getActivityById = async (uid: string, activityId: string) => {
  const act = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(activityId)
    .get();

  if (act.exists) {
    return act.data() as Activity;
  }

  return undefined;
};

const createFirestoreTerra = (raw: TerraActivity): FirestoreTerra => {
  return {
    metadata: raw.metadata,
    device_data: raw.device_data,
    calories_data: raw.calories_data,
    createdOnUnix: new Date(
      raw.metadata.start_time ? raw.metadata.start_time : 0,
    ).getTime(),
  };
};

export const getUserStreamActivities = async (uid: string, date: string) => {
  const userActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("date", "==", date)
    .where("source", "==", "ondemandVideo")
    .get();

  const acts: Activity[] = [];
  for (const act of userActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};

export const saveTaskStreamActivity = async (
  uid: string,
  activity: Activity,
  taskId: string,
  streamId: string,
) => {
  const batch = admin.firestore().batch();

  batch.set(
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .doc(activity.postId),
    activity,
  );

  batch.update(
    admin
      .firestore()
      .collection("tasks")
      .doc(taskId)
      .collection("streams")
      .doc(streamId),
    {
      activityId: activity.postId,
    },
  );

  await batch.commit();
};

export const saveStreamActivity = async (
  uid: string,
  activity: Activity,
  seriesId: string,
  videoId: string,
  streamId: string,
  key: "exercises" | "lives",
) => {
  const batch = admin.firestore().batch();

  batch.set(
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .doc(activity.postId),
    activity,
  );

  batch.update(
    admin
      .firestore()
      .collection("workouts")
      .doc(seriesId)
      .collection(key)
      .doc(videoId)
      .collection("streams")
      .doc(streamId),
    {
      activityId: activity.postId,
    },
  );

  await batch.commit();
};

export const updateStreamActivityState = async (
  seriesId: string,
  videoId: string,
  streamId: string,
  key: "exercises" | "lives",
  state: "active" | "inactive",
) => {
  await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection(key)
    .doc(videoId)
    .collection("streams")
    .doc(streamId)
    .update({
      state: state,
    });
};

export const updateStreamActivity = async (
  uid: string,
  activityId: string,
  nowCals: number,
  updatedOn: number,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(activityId)
    .update({
      calories: nowCals,
      updatedOn: updatedOn,
    });
};

export const getWorkoutStream = async (
  seriesId: string,
  videoId: string,
  streamId: string,
  key: "exercises" | "lives",
) => {
  const userStream = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection(key)
    .doc(videoId)
    .collection("streams")
    .doc(streamId)
    .get();

  if (userStream.exists) {
    return userStream.data() as WorkoutActivity;
  }

  return undefined;
};

export const updateTaskStreamActivity = async (
  uid: string,
  activityId: string,
  fitPoints: number,
  updatedOn: number,
  postRef?: admin.firestore.DocumentReference,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(activityId)
    .update({
      fitPointsV2: fitPoints,
      updatedOn,
      ...(postRef ? { postRef } : {}),
    });
};

export const updateLiveStreamActivity = async (
  uid: string,
  activityId: string,
  seriesId: string,
  videoId: string,
  streamId: string,
  key: "exercises" | "lives",
  nowCals: number,
  updatedOn: number,
  nbSeconds: number,
) => {
  const batch = admin.firestore().batch();

  batch.update(
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .doc(activityId),
    {
      calories: nowCals,
      updatedOn: updatedOn,
    },
  );

  batch.update(
    admin
      .firestore()
      .collection("workouts")
      .doc(seriesId)
      .collection(key)
      .doc(videoId)
      .collection("streams")
      .doc(streamId),
    {
      streamedSeconds: admin.firestore.FieldValue.increment(nbSeconds),
      updatedOn: updatedOn,
    },
  );

  await batch.commit();
};
