// import { ActivityKPIScore } from "./Activity";
import * as admin from "firebase-admin";
import { SystemKPIs } from "../Task/SystemKPIs";
import { KPIValue } from "../Task/Task";

export const kpiRankUpdate = async (
  gameId: string,
  uid: string,
  values: KPIValue,
  sprintId: string,
) => {
  for (const kpiKey of Object.keys(values)) {
    const kpiKeyWithType = kpiKey as SystemKPIs;
    const val = values[kpiKeyWithType];

    await admin
      .firestore()
      .collection("sbEvents")
      .doc(gameId)
      .collection("userRanks")
      .doc(`rank-${uid}`)
      .update({
        [`kpiScoresV2.${sprintId}.${kpiKey}`]: val ? val : 0,
      });
  }
};

export const kpiCoachRankUpdate = async (
  gameId: string,
  uid: string,
  values: KPIValue,
  sprintId: string,
) => {
  for (const kpiKey of Object.keys(values)) {
    const kpiKeyWithType = kpiKey as SystemKPIs;
    const val = values[kpiKeyWithType];

    await admin
      .firestore()
      .collection("sbEvents")
      .doc(gameId)
      .collection("coachRanks")
      .doc(`rank-${uid}`)
      .update({
        [`kpiScoresV2.${sprintId}.${kpiKey}`]: val ? val : 0,
      });
  }
};
