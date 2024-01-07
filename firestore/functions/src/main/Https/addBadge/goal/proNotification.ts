import { NotifeeData } from "../../../../models/Notifications/interface";
import { v4 as uuid } from "uuid";
import * as admin from "firebase-admin";
import { sendNotification } from "../../../../utils/notifications";
import { updateNotificationUserDB } from "../../../../models/Notifications/updateNotificationUserDB";
import { UserAppSubscription } from "../../../../models/AppSubscription/Subscription";
import { sendHSMV2 } from "../../../../models/Conversations/sendHSMV2";
import {
  toJaytiPhone,
  toSauravPhone,
  toSwapnilPhone,
} from "../../../../constants/email/contacts";

export const sendRoadmapUpdateNotification = async (
  uid: string,
  name?: string,
) => {
  //   const award = await getAwardById(achiever.awardId);

  let isPaid: boolean = false;
  const paidUsersRemote = await admin
    .firestore()
    .collection("appSubscriptions")
    .doc("0cPvVrnphNJBnvvOM9Zf")
    .collection("userSubs")
    .where("uid", "==", uid)
    .get();

  if (paidUsersRemote.docs.length) {
    const appSub = paidUsersRemote.docs[0].data() as UserAppSubscription;

    //
    if (appSub.paidPeriodEndsOn && appSub.paidPeriodEndsOn > Date.now()) {
      isPaid = true;
    }
  }

  let data: NotifeeData | undefined;
  if (isPaid) {
    data = getRedoNotificationData_Paid(uid);
  } else {
    data = getRedoNotificationData_UnPaid(uid);
  }

  if (data) {
    await sendNotification(uid, data);
    await updateNotificationUserDB(uid, data);
  }

  await agentMessage(uid, name);
};

const agentMessage = async (uid: string, name?: string) => {
  await sendHSMV2(
    toSauravPhone,
    "roadmap_update",
    [name ? name : "user"],
    {
      "0": [uid],
    },
    undefined,
    undefined,
  );

  await sendHSMV2(
    toJaytiPhone,
    "roadmap_update",
    [name ? name : "user"],
    {
      "0": [uid],
    },
    undefined,
    undefined,
  );

  await sendHSMV2(
    toSwapnilPhone,
    "roadmap_update",
    [name ? name : "user"],
    {
      "0": [uid],
    },
    undefined,
    undefined,
  );
};

const getRedoNotificationData_Paid = (uid: string): NotifeeData => {
  // const award = await getAwardById(achiever.awardId);

  // const dt = achiever.endTime
  // ? `until ${format(new Date(achiever.endTime), "dd MMM yy")}`
  // : "sometime";

  return {
    notificationType: "image",
    navigateTo: "Home",
    navigateToParams: {},
    imageUrl:
      "https://ik.imagekit.io/socialboat/Group%201000001074_BPc-iyzPQ.png?updatedAt=1692183347430",

    title: `Roadmap Update Requested`,
    body: `Thank you for the information. Your habit coach will reach out to you with an updated plan.`,
    uid: uid,
    createdOn: Date.now(),
    subtitle: "",
    id: uuid(),
  };
};

const getRedoNotificationData_UnPaid = (uid: string): NotifeeData => {
  // const award = await getAwardById(achiever.awardId);

  // const dt = achiever.endTime
  // ? `until ${format(new Date(achiever.endTime), "dd MMM yy")}`
  // : "sometime";

  return {
    notificationType: "image",
    navigateTo: "UpgradeScreen",
    navigateToParams: {},
    imageUrl:
      "https://ik.imagekit.io/socialboat/Group%201653_0V3ZIYfeM.png?updatedAt=1692183347491",

    title: `Roadmap Updated`,
    body: `We have updated your goal. To get expert human help with your program, Subscribe to PRO.`,
    uid: uid,
    createdOn: Date.now(),
    subtitle: "",
    id: uuid(),
  };
};
