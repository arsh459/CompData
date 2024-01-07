import { Cycle, PeriodDateObj } from "../../../models/User/User";
import * as admin from "firebase-admin";

export const saveFutureCycleData = async (
  uid: string,
  cycles: Cycle[],
  periodDates: PeriodDateObj[][],
) => {
  for (let i: number = 0; i < cycles.length; i++) {
    const cycle = cycles[i];
    const periodDetails = periodDates[i];

    const batch = admin.firestore().batch();

    for (const periodDateObj of periodDetails) {
      const newPeriodObj: PeriodDateObj = {
        ...periodDateObj,
        cycleId: cycle.id,
      };

      // set all periodDates
      batch.set(
        admin
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("periodDates")
          .doc(periodDateObj.id),
        newPeriodObj,
      );
    }

    // update cycle
    batch.set(
      admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("cycles")
        .doc(cycle.id),
      cycle,
    );

    // set the batch to db
    await batch.commit();
  }
};

const batchSizeCheck = async (
  batchSize: number,
  batch: admin.firestore.WriteBatch,
) => {
  if (batchSize > 498) {
    console.log("committing batch");
    await batch.commit();

    const newBatch = admin.firestore().batch();
    return { batch: newBatch, batchSize: 0 };
  }

  return { batch, batchSize };
};

export const savePeriodData = async (
  uid: string,
  cycles: Cycle[],
  periodDates: PeriodDateObj[][],
  cycleDateMap: { [date: string]: PeriodDateObj },
  dbCycledates: PeriodDateObj[],
  cyclesToDelete: Cycle[],
  deleteOld: boolean,
) => {
  let start: number = -1;
  let end: number = -1;
  let batchSize: number = 0;
  let batch = admin.firestore().batch();
  // old cycles
  for (let i: number = 0; i < cycles.length; i++) {
    const cycle = cycles[i];
    const periodDetails = periodDates[i];

    console.log("cycleId saving", cycle.id);

    // create batch

    for (const periodDateObj of periodDetails) {
      if (start === -1) {
        start = periodDateObj.unix;
      }
      end = periodDateObj.unix;

      if (cycleDateMap && cycleDateMap[periodDateObj.date]) {
        const docToUpdate: PeriodDateObj = {
          ...periodDateObj,
          id: cycleDateMap[periodDateObj.date].id,
          cycleId: cycle.id,
          ...(deleteOld
            ? // remove any old value
              { recommendations: {}, insight: "", loggedSymptoms: [] }
            : {}),
        };

        // set all periodDates
        batch.update(
          admin
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("periodDates")
            .doc(cycleDateMap[periodDateObj.date].id),
          { ...docToUpdate },
        );
        batchSize++;
        const interim = await batchSizeCheck(batchSize, batch);
        batch = interim.batch;
        batchSize = interim.batchSize;
      } else {
        const newPeriodObj: PeriodDateObj = {
          ...periodDateObj,
          cycleId: cycle.id,
        };

        // set all periodDates
        batch.set(
          admin
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("periodDates")
            .doc(periodDateObj.id),
          newPeriodObj,
        );
        batchSize++;
        const interim2 = await batchSizeCheck(batchSize, batch);
        batch = interim2.batch;
        batchSize = interim2.batchSize;
      }
    }

    // update cycle
    batch.set(
      admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("cycles")
        .doc(cycle.id),
      cycle,
    );
    batchSize++;
    const interim3 = await batchSizeCheck(batchSize, batch);
    batch = interim3.batch;
    batchSize = interim3.batchSize;
  }

  // set the batch to db
  await batch.commit();
  console.log("committed batch");

  // if (deleteOld) {
  await removeStaleDates(uid, dbCycledates, "start", start);
  await removeStaleDates(uid, dbCycledates, "end", end);
  await removeStaleCycles(uid, cyclesToDelete);
  // }

  // clean the rest
};

const removeStaleCycles = async (uid: string, cyclesToDelete: Cycle[]) => {
  const batch = admin.firestore().batch();
  for (const cycle of cyclesToDelete) {
    batch.delete(
      admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("cycles")
        .doc(cycle.id),
    );
  }

  await batch.commit();
};

const removeStaleDates = async (
  uid: string,
  dbCycledates: PeriodDateObj[],
  type: "start" | "end",
  unix: number,
) => {
  if (type === "start" && unix > 0) {
    const staleDates1 = dbCycledates.filter((item) => item.unix < unix);
    console.log("start stale dates", staleDates1.length);
    await deleteDates(uid, staleDates1);
  } else if (type === "end" && unix > 0) {
    const staleDates1 = dbCycledates.filter((item) => item.unix > unix);
    console.log("end stale dates", staleDates1.length);
    await deleteDates(uid, staleDates1);
  }
};

const deleteDates = async (uid: string, dateObjs: PeriodDateObj[]) => {
  const batch = admin.firestore().batch();
  for (const dateObj of dateObjs) {
    batch.delete(
      admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("periodDates")
        .doc(dateObj.id),
    );
  }

  await batch.commit();
};
