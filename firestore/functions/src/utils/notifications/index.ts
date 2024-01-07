import * as admin from "firebase-admin";
import { NotifeeData } from "../../models/Notifications/interface";
import { getUserById } from "../../models/User/Methods";

export const getTokensFromDatastore = async (uid: string) => {
  const user = await getUserById(uid);
  if (user?.tokens) {
    return user.tokens;
  }

  return [];
};

export const sendNotification = async (
  uid: string,
  notifeeData: NotifeeData,
) => {
  // const tokens = await getTokensFromDatastore(uid);
  const user = await getUserById(uid);

  console.log("pushing to", uid, user?.name, "tokens:", user?.tokens?.length);

  if (user?.tokens && user.tokens.length) {
    try {
      console.log("Sending", user.uid);

      await admin.messaging().sendMulticast({
        tokens: user.tokens,
        data: {
          notifee: JSON.stringify({
            ...notifeeData,
            android: { channelId: "main" },
          }),
        },
        android: {
          priority: "high",
        },
        apns: {
          headers: {
            "apns-push-type": "alert",
          },
          payload: {
            aps: {
              badge: 1,
              sound: "media/notif.mp3",
              contentAvailable: true,
              mutableContent: true,
            },
          },
        },
      });

      console.log("");

      return true;
    } catch (error) {
      console.log("error", error);
      console.log("failed for", user.uid, user.tokens.length);
    }
  }

  return false;
};
