import * as admin from "firebase-admin";
import { Badge } from "../../../models/Prizes/Badges";
import {
  dayRecommendation,
  NutritionConsumption,
  TaskRec,
} from "../../../models/User/User";

import { v4 as uuidv4 } from "uuid";
import { getProgValuesForTkList } from "../../FirestoreTriggers/onBadgeProgressUpdate/userRecProgress";
import { getTask } from "../../../models/Task/getUtils";
import { Task } from "../../../models/Task/Task";
import { getAllTasksForBadgeDay } from "../../FirestoreTriggers/onBaseTaskWrite/badgeUpdater";

export const getBadgeForTier = async (
  gameId: string,
  tier: number,
  coachUID: string,
) => {
  const badges = await admin
    .firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("badges")
    .where("tier", "==", tier)
    .where("primaryCoach", "==", coachUID)
    .get();

  if (badges.docs.length) {
    return badges.docs[0].data() as Badge;
  }

  return undefined;
};

export const getManualRec = async (
  uid: string,
  date: string,
  badgeId: string,
) => {
  const recObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("date", "==", date)
    .where("badgeId", "==", badgeId)
    .where("manual", "==", true)
    .get();

  const recs: dayRecommendation[] = [];
  for (const dayTask of recObj.docs) {
    recs.push(dayTask.data() as dayRecommendation);
  }

  return recs;
};

export const getRecsForDate = async (uid: string, date: string) => {
  const recObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("date", "==", date)

    .get();

  const recs: dayRecommendation[] = [];
  for (const dayTask of recObj.docs) {
    recs.push(dayTask.data() as dayRecommendation);
  }

  console.log("FETCHING RECS", recObj.docs.length);

  return recs;

  // if (recObj.docs.length) {
  //   return recObj.docs[0].data() as dayRecommendation;
  // }

  // return undefined;
};

export const getAllPreviousDayRecs = async (
  uid: string,
  date: string,
  type: "workout" | "nutrition",
) => {
  const recObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("date", "==", date)
    .where("type", "==", type)

    .get();

  const recs: dayRecommendation[] = [];
  for (const dayTask of recObj.docs) {
    recs.push(dayTask.data() as dayRecommendation);
  }

  console.log("FETCHING RECS", recObj.docs.length);

  return recs;

  // if (recObj.docs.length) {
  //   return recObj.docs[0].data() as dayRecommendation;
  // }

  // return undefined;
};

export const getPreviousDayRecs = async (
  uid: string,
  date: string,
  type: "workout" | "nutrition",
  badgeId: string,
) => {
  const recObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("date", "==", date)
    .where("type", "==", type)
    .where("badgeId", "==", badgeId)
    .get();

  if (recObj.docs.length) {
    return recObj.docs[0].data() as dayRecommendation;
  }

  return undefined;
};

export const getAllRecsForUserAndType = async (
  uid: string,
  type: "workout" | "nutrition",
) => {
  const recObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("type", "==", type)
    .get();

  const recs: dayRecommendation[] = [];
  for (const rec of recObj.docs) {
    recs.push(rec.data() as dayRecommendation);
  }

  console.log("READ ALL RECS", recObj.docs.length);

  return recs;
};

export const getPreviousDayRecsBetween = async (
  uid: string,
  start: number,
  end: number,
) => {
  const recObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("unix", ">=", start)
    .where("unix", "<=", end)
    .get();

  const recs: dayRecommendation[] = [];
  for (const rec of recObj.docs) {
    recs.push(rec.data() as dayRecommendation);
  }

  return recs;
};

export const updateRec = async (
  uid: string,
  id: string,
  doneFP: number,
  nutrition?: NutritionConsumption,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .doc(id)
    .update({
      doneFP: doneFP,
      ...(nutrition ? { consumedNutrition: nutrition } : {}),
    });
};

const haveTasksChangedV2 = (prevList: TaskRec[], nowList: TaskRec[]) => {
  if (nowList.length === prevList.length) {
    const taskMap: { [tkId: string]: boolean } = {};
    for (const tk of prevList) {
      taskMap[tk.id] = true;
    }

    for (const tk2 of prevList) {
      if (!taskMap[tk2.id]) {
        return true;
      }
    }
  } else {
    return true;
  }

  return false;
};

const haveTasksChanged = (
  rec: dayRecommendation,
  previousRec: dayRecommendation,
) => {
  if (rec.tasks.length === previousRec.tasks.length) {
    const taskMap: { [tkId: string]: boolean } = {};
    for (const tk of rec.tasks) {
      taskMap[tk.id] = true;
    }

    for (const tk2 of previousRec.tasks) {
      if (!taskMap[tk2.id]) {
        return true;
      }
    }
  } else {
    return true;
  }

  return false;
};

const getManualTasks = (rec: dayRecommendation) => {
  return rec.tasks.filter((item) => item.manual);
};

const createNewTaskList = (manualTasks: TaskRec[], newTasks: TaskRec[]) => {
  const allTks = [...manualTasks, ...newTasks];
  const filteredArray: TaskRec[] = [];
  const mappedTasks: { [id: string]: boolean } = {};
  for (const tk of allTks) {
    if (!mappedTasks[tk.id]) {
      filteredArray.push(tk);
    }
  }
  return filteredArray;
};

const getFPSum = async (recs: TaskRec[]) => {
  const badgeTasks: Task[] = [];
  for (const tk of recs) {
    const taskObj = await getTask(tk.id);
    if (taskObj) {
      badgeTasks.push(taskObj);
    }
  }

  const tkFP = badgeTasks.reduce((acc, item) => {
    return acc + (item.fitPoints ? item.fitPoints : 0);
  }, 0);

  return tkFP;
};

const deleteSaveRecs = async (
  uid: string,
  badgeId: string,
  // newRecs: { [date: string]: dayRecommendation },
) => {
  const previousRecs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("badgeId", "==", badgeId)
    .get();

  const batch = admin.firestore().batch();

  for (const prev of previousRecs.docs) {
    batch.delete(prev.ref);
  }

  // for (const recDate of Object.keys(newRecs)) {
  //   const rec = newRecs[recDate];
  //   if (rec) {
  //     // get progress values
  //     const progValue = await getProgValuesForTkList(rec.tasks, uid, rec.unix);

  //     // update FP
  //     rec.doneFP = progValue;

  //     batch.set(
  //       admin
  //         .firestore()
  //         .collection("users")
  //         .doc(uid)
  //         .collection("dayRecommendations")
  //         .doc(rec.id),
  //       rec,
  //     );
  //   }
  // }

  await batch.commit();
};

export const saveRec = async (
  uid: string,
  rec: dayRecommendation,
  previousRec?: dayRecommendation,
) => {
  if (previousRec) {
    const change = haveTasksChanged(rec, previousRec);

    // console.log("change", change);
    // console.log("rec", rec);
    // console.log("previousRec", previousRec);

    const docToSave: dayRecommendation = {
      ...rec,
      id: previousRec.id,
      doneFP: previousRec.doneFP ? previousRec.doneFP : 0,
    };

    if (change) {
      const manualTaskList = getManualTasks(previousRec);

      // console.log("manualTasks", manualTaskList);

      let newTkList = rec.tasks;
      if (manualTaskList.length) {
        newTkList = createNewTaskList(manualTaskList, rec.tasks);

        // console.log("newTkList", newTkList);
        const fp = await getFPSum(newTkList);

        // console.log("fp", fp);

        // fp have changed due to manual tasks
        docToSave.taskFP = fp;
      }

      const { dayFP, nutrition } = await getProgValuesForTkList(
        newTkList,
        uid,
        rec.unix,
      );

      // update for done tasks
      docToSave.tasks = newTkList;
      docToSave.doneFP = dayFP;

      if (nutrition) {
        docToSave.consumedNutrition = nutrition;
      }

      // console.log("docToSave", docToSave);
    }

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("dayRecommendations")
      .doc(previousRec.id)
      .set(docToSave);
  } else {
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("dayRecommendations")
      .doc(rec.id)
      .set(rec);
  }
};

export const createDayRecommendationList = async (
  uid: string,
  badgeId: string,
  // overrideBadgeId: string,
  day: number,
  // tier: number,
  date: string,
  unix: number,
  type: "workout" | "nutrition",
  previousRec?: dayRecommendation,
  // overrideBadgeId?: string,
  // overrideDay?: number,
  restDay?: boolean,
): Promise<dayRecommendation> => {
  if (restDay) {
    return {
      id: previousRec?.id ? previousRec.id : uuidv4(),
      date,
      unix,
      type,
      tasks: [],
      updatedOn: Date.now(),
      day,
      badgeId,
      taskFP: 0,
      doneFP: 0,

      // manual params
      ...(previousRec?.overrideBadgeId
        ? { overrideBadgeId: previousRec.overrideBadgeId }
        : {}),
      ...(typeof previousRec?.overrideDay === "number"
        ? { overrideDay: previousRec.overrideDay }
        : {}),
      manual: previousRec?.manual ? previousRec.manual : false,
      propagateDate: previousRec?.propagateDate
        ? previousRec.propagateDate
        : false,
    };
  }

  let tkListToUse: TaskRec[] | undefined = undefined;
  if (previousRec?.manual) {
    const manualTaskList = getManualTasks(previousRec);
    if (manualTaskList.length) {
      tkListToUse = previousRec.tasks; // manual list
    }
  }

  // console.log("tkList", tkListToUse);

  // there is a task list
  let tkFP: number = 0;
  if (tkListToUse) {
    tkFP = await getFPSum(tkListToUse);
  } else {
    const badgeTasks = await getAllTasksForBadgeDay(badgeId, day);
    tkFP = badgeTasks.reduce((acc, item) => {
      return acc + (item.fitPoints ? item.fitPoints : 0);
    }, 0);
    tkListToUse = badgeTasks.map((item) => {
      return { id: item.id };
    });
  }

  // if tasks have changed, recalculate
  const change = haveTasksChangedV2(
    previousRec?.tasks ? previousRec?.tasks : [],
    tkListToUse,
  );
  let newFP = previousRec?.doneFP ? previousRec.doneFP : 0;
  let consumedNutrition = previousRec?.consumedNutrition
    ? previousRec.consumedNutrition
    : undefined;
  if (change) {
    const { dayFP, nutrition } = await getProgValuesForTkList(
      tkListToUse,
      uid,
      unix,
    );
    newFP = dayFP;
    consumedNutrition = nutrition;
  }

  const newRec: dayRecommendation = {
    id: previousRec?.id ? previousRec.id : uuidv4(),
    doneFP: newFP,
    ...(consumedNutrition ? { consumedNutrition: consumedNutrition } : {}),
    date,
    unix,
    type,
    tasks: tkListToUse,
    updatedOn: Date.now(),
    day,
    badgeId,
    taskFP: tkFP,

    ...(previousRec?.overrideBadgeId
      ? { overrideBadgeId: previousRec.overrideBadgeId }
      : {}),
    ...(typeof previousRec?.overrideDay === "number"
      ? { overrideDay: previousRec.overrideDay }
      : {}),
    manual: previousRec?.manual ? previousRec.manual : false,
    propagateDate: previousRec?.propagateDate
      ? previousRec.propagateDate
      : false,
  };

  return newRec;
};

export const saveDayRecommendationList_dep = async (
  recs: { [date: string]: dayRecommendation },
  uid: string,
  type: "workout" | "nutrition",
  badgeId: string,
  deletePrevious?: boolean,
) => {
  if (deletePrevious) {
    await deleteSaveRecs(uid, badgeId);
  }

  for (const date of Object.keys(recs)) {
    const previousRec = await getPreviousDayRecs(uid, date, type, badgeId);
    if (!previousRec?.manual) {
      await saveRec(uid, recs[date], previousRec);
    }
  }
};

export const saveAndDeleteForDay = async (
  rec: dayRecommendation,
  uid: string,
) => {
  const previousDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("date", "==", rec.date)
    .where("badgeId", "==", rec.badgeId)
    .get();

  for (const prevDoc of previousDocs.docs) {
    await prevDoc.ref.delete();
  }

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .doc(rec.id)
    .set(rec);
};

export const saveDayRecommendationListV2 = async (
  recs: { [date: string]: dayRecommendation },
  uid: string,
  badgeId: string,
  deletePrevious?: boolean,
) => {
  if (deletePrevious) {
    await deleteSaveRecs(uid, badgeId);
  }
  for (const date of Object.keys(recs)) {
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("dayRecommendations")
      .doc(recs[date].id)
      .set(recs[date]);
  }
};

// if task is manually added
// if nutrition
// if there is any manually swapped task
// useManualTask
//
// doneFP <- reconciliation happens when user does task
// totalFP <- onCreation
//
// if workout
// badgeId, badgeDay
// create for badgeId, badgeDay
