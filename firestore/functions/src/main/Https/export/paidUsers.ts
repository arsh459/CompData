import * as admin from "firebase-admin";
import { UserInterface } from "../../../models/User/User";
import {
  SbPlans,
  UserAppSubscription,
  planKey,
} from "../../../models/AppSubscription/Subscription";
import { getUserById } from "../../../models/User/Methods";

export const getUsersWithDietPlan = async () => {
  // admin.firestore().collection("users").doc()
  const allPaidSubs = await admin
    .firestore()
    .collection("users")
    .where("nutritionBadgeId", "!=", "")
    .get();

  const paidUsers: UserInterface[] = [];
  for (const paidUser of allPaidSubs.docs) {
    const user = paidUser.data() as UserInterface;
    paidUsers.push(user);
  }

  return paidUsers;
};

export const getPaidUsers = async (min?: number) => {
  // admin.firestore().collection("users").doc()
  const allPaidSubs = await admin
    .firestore()
    .collection("appSubscriptions")
    .doc("0cPvVrnphNJBnvvOM9Zf")
    .collection("userSubs")
    .where("paidPeriodEndsOn", ">=", min ? min : Date.now())
    .orderBy("paidPeriodEndsOn", "asc")
    .get();

  const userAppSubs: UserAppSubscription[] = [];
  const paidUsers: UserInterface[] = [];
  for (const paidUser of allPaidSubs.docs) {
    const appSubObj = paidUser.data() as UserAppSubscription;

    const user = await getUserById(appSubObj.uid);
    if (user) {
      paidUsers.push(user);
      userAppSubs.push(appSubObj);
    }
  }

  return { paidUsers, userAppSubs };
};

export const getAllPROPlusPlans = async () => {
  const allPaidSubs = await admin
    .firestore()
    .collection("sbplans")
    .where("planType", "==", "proPlus")
    .get();

  const sbPlanDocs: SbPlans[] = [];
  for (const doc of allPaidSubs.docs) {
    sbPlanDocs.push(doc.data() as SbPlans);
  }

  return sbPlanDocs;
};

export const getAllSbplans = async () => {
  const allPaidSubs = await admin.firestore().collection("sbplans").get();

  const sbPlanDocs: SbPlans[] = [];
  for (const doc of allPaidSubs.docs) {
    sbPlanDocs.push(doc.data() as SbPlans);
  }

  return sbPlanDocs;
};

export const getSBPlan = async (id: string) => {
  const sbPlan = await admin.firestore().collection("sbplans").doc(id).get();

  if (sbPlan.data()) {
    return sbPlan.data() as SbPlans;
  }

  return undefined;
};

export const getSBPlanByKey = async (id: planKey) => {
  const sbPlan = await admin
    .firestore()
    .collection("sbplans")
    .where("planKey", "==", id)
    .get();

  if (sbPlan.docs.length) {
    return sbPlan.docs[0].data() as SbPlans;
  }

  return undefined;
};
