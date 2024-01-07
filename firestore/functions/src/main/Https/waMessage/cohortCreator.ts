import * as admin from "firebase-admin";
import { GREESHA_UID } from "../taskGenerator/constants";
import { UserInterface } from "../../../models/User/User";
import { UserAppSubscription } from "../../../models/AppSubscription/Subscription";
import { getUserById } from "../../../models/User/Methods";

export const signupAfterDate = async (unix: number) => {
  const greeshaUsers = await admin
    .firestore()
    .collection("users")
    .where("authSignupTime", ">=", unix)
    // .where("motivatedBy", "==", GREESHA_UID)
    .get();

  const remoteUsers: UserInterface[] = [];
  for (const user of greeshaUsers.docs) {
    remoteUsers.push(user.data() as UserInterface);
  }

  return remoteUsers;
};

export const greeshaSignups = async () => {
  const greeshaUsers = await admin
    .firestore()
    .collection("users")
    .where("gender", "==", "female")
    .where("motivatedBy", "==", GREESHA_UID)
    .get();

  const remoteUsers: UserInterface[] = [];
  for (const user of greeshaUsers.docs) {
    remoteUsers.push(user.data() as UserInterface);
  }

  return remoteUsers;
};

export const filter1FP = (users: UserInterface[]) => {
  return users.filter((item) => item.fpCredit && item.fpCredit >= 1);
};

export const filter0FP = (users: UserInterface[]) => {
  return users.filter((item) => !item.fpCredit);
};

export const filterNeverPaidUsers = async (users: UserInterface[]) => {
  const alwaysUnpaidUsers: UserInterface[] = [];
  console.log("PAID USER CHECKING");
  for (const user of users) {
    const hasPaid = await admin
      .firestore()
      .collection("appSubscriptions")
      .doc("0cPvVrnphNJBnvvOM9Zf")
      .collection("userSubs")
      .where("uid", "==", user.uid)
      .get();

    if (hasPaid.docs.length === 0) {
      alwaysUnpaidUsers.push(user);
    }
  }

  return alwaysUnpaidUsers;
};

export const getPaidUsersLastXMonths = async (numMonths: number) => {
  const paidUsersRemote = await admin
    .firestore()
    .collection("appSubscriptions")
    .doc("0cPvVrnphNJBnvvOM9Zf")
    .collection("userSubs")
    .where(
      "paidPeriodEndsOn",
      ">=",
      Date.now() - numMonths * 30 * 24 * 60 * 60 * 1000,
    )
    .orderBy("paidPeriodEndsOn", "asc")
    .get();

  const paidUsersToUse: UserInterface[] = [];
  const paidUserMap: { [uid: string]: boolean } = {};
  for (const paidUser of paidUsersRemote.docs) {
    const paidUserDoc = paidUser.data() as UserAppSubscription;

    const paidUserInt = await getUserById(paidUserDoc.uid);
    if (paidUserInt) {
      paidUsersToUse.push(paidUserInt);
    }

    paidUserMap[paidUserDoc.uid] = true;
  }

  return { paidUsersToUse, paidUserMap };
};
