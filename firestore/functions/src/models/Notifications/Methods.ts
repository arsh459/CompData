import { firestore, messaging } from "firebase-admin";
import { getUserById } from "../User/Methods";
import { v4 as uuidv4 } from "uuid";
import { Notification, TemplateNotification } from "./interface";
import * as functions from "firebase-functions";
import { updateOne } from "../../utils/firestore/fetchOne";
// import { getPreviousDayRecs } from "../../main/Https/taskGenerator/getterSetter";
import { getTodaysGoal } from "../../main/FirestoreTriggers/onActivityUpdateV2/updateKPIs";

const appIcon =
  "https://firebasestorage.googleapis.com/v0/b/vocal-pad-262908.appspot.com/o/prodDb%2FGroup%2025.png?alt=media&token=6bfd57ad-f6ac-4549-85f1-68de0da999c7";

export const getAllNotificationsForUser = async (
  uid: string,
  afterTime: number,
) => {
  const notificationsOnMonth = await firestore()
    .collection("users")
    .doc(uid)
    .collection("notifications")
    .where("createdOn", ">=", afterTime)
    .get();

  const notifs: Notification[] = [];
  for (const notification of notificationsOnMonth.docs) {
    if (notification.exists) {
      notifs.push(notification.data() as Notification);
    }
  }
  return notifs;
};

export const getTemplateNotificationByBadgeIdDay = async (
  badgeId: string,
  badgeDay: number,
) => {
  const notDoc = await firestore()
    .collection("notificationTemplates")
    .where(`pushParams.badgeId`, "==", badgeId)
    .where(`pushParams.badgeDay`, "==", badgeDay)
    .get();

  if (notDoc.docs.length) {
    return notDoc.docs[0].data() as TemplateNotification;
  }

  return undefined;
};

export const getTemplateNotificationForSummary = async (
  uid: string,
  date: string,
  // badgeId: string,
): Promise<TemplateNotification | undefined> => {
  const user = await getUserById(uid);

  console.log("date", date);

  let fpTarget = user?.dailyFPTarget ? user.dailyFPTarget : undefined;
  let doneFP = 0;

  const todaysGoal = await getTodaysGoal(uid, date);

  if (todaysGoal?.achievedFP) {
    doneFP = todaysGoal?.achievedFP;
  }

  // if (user?.badgeId) {
  //   const workoutRec = await getPreviousDayRecs(
  //     uid,
  //     date,
  //     "workout",
  //     user.badgeId,
  //   );

  //   if (workoutRec?.doneFP) {
  //     doneFP += workoutRec.doneFP;
  //   }
  // }

  // if (user?.nutritionBadgeId) {
  //   const dietRec = await getPreviousDayRecs(
  //     uid,
  //     date,
  //     "workout",
  //     user?.nutritionBadgeId,
  //   );

  //   if (dietRec?.doneFP) {
  //     doneFP += dietRec.doneFP;
  //   }
  // }

  let title: string = "";
  let body: string = "";
  if (fpTarget && doneFP >= fpTarget) {
    title = "Completed your goal! 🎯";
    body =
      "Keep up the motivation! Do it everyday and you will achieve your goal";
  } else if (fpTarget && doneFP < fpTarget) {
    title = "You can still do it! 🥁";
    body = `You just need to get ${
      fpTarget - doneFP
    }FP! Go for a quick walk and get it done. `;
  } else {
    return undefined;
  }

  return {
    id: "summary_notification_v1",
    channel: "push",
    templateName: "summary_message",
    pushParams: {
      notificationType: "text",
      navigateTo: "Home",
      navigateToParams: {},
      title: title,
      body: body,
      id: uuidv4(),
      imageUrl: "",
      uid: uid,
      imgRounded: true,
      createdOn: Date.now(),
    },
    scheduleType: "cron",
  };
};

export const getTemplateNotification = async (id?: string) => {
  if (id) {
    const notDoc = await firestore()
      .collection("notificationTemplates")
      .doc(id)

      .get();

    if (notDoc.exists) {
      return notDoc.data() as TemplateNotification;
    }
  }

  return undefined;
};

export const sendNotification = async (
  uid: string,
  notification: Notification,
) => {
  try {
    const user = await getUserById(uid);

    if (user && user.tokens) {
      const message = {
        tokens: user.tokens,
        data: {
          notifi: JSON.stringify(notification),
        },
        notification: {
          title: notification.title,
          body: notification.body,
          imageUrl: notification.imageURL ? notification.imageURL : appIcon,
        },
      };

      // console.log("message", message);

      await messaging().sendMulticast(message);
      await updateOne("users", uid, { unreadPushNotifications: true });
    }
  } catch (error) {
    functions.logger.log("Error in sending notification ", error);
  }
};

export const sendNotificationToUserTokens = async (
  userTokens: string[],
  notification: Notification,
) => {
  try {
    const message = {
      tokens: userTokens,
      data: {
        notifi: JSON.stringify(notification),
      },
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageURL ? notification.imageURL : appIcon,
      },
    };

    // console.log("message", message);

    await messaging().sendMulticast(message);
  } catch (error) {
    functions.logger.log("Error in sending notification ", error);
  }
};
