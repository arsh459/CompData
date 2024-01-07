import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import notifee, {
  Notification,
  AndroidStyle,
  AndroidBadgeIconType,
  AndroidImportance,
  AndroidColor,
  AndroidCategory,
  AndroidVisibility,
} from "@notifee/react-native";
import { NotficationTypeV2, NotifeeData } from "@models/notifee/interface";
// import { saveNotification } from "@models/notifee/methods";
import { DNParseResult } from "@providers/dnLinks/hooks/handleLink";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const parseNotificationData = (data: any) => {
  if (typeof data === "object" && typeof data.notifee === "string") {
    const dataObj = JSON.parse(data.notifee);

    if (
      dataObj &&
      typeof dataObj === "object" &&
      dataObj.notificationType &&
      dataObj.navigateTo
    ) {
      return dataObj as NotifeeData;
    }
  }

  return undefined;
};

export const onMessageReceived = async (
  message: FirebaseMessagingTypes.RemoteMessage
  // uid?: string
) => {
  if (message.data?.notifee) {
    const data = parseNotificationData(message.data);
    if (data) {
      const notificationType = data.notificationType;

      const channelId = await notifee.createChannel({
        id: "main",
        name: "Default Channel",
        badge: true,
        // vibration: true,
        // vibrationPattern: [300, 500],
        lights: true,
        lightColor: AndroidColor.RED,
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        sound: "notif",
      });
      try {
        notifee.displayNotification({
          // ...data,
          title: data.title,
          body: data.body,
          subtitle: data.subtitle,
          id: data.id,

          data: {
            notifeeData: data,

            // notificationType: notificationType,
            // navigateTo: data.navigateTo,
            // ...(data.navigateToParams
            //   ? { navigateToParams: data.navigateToParams }
            //   : {}),
          },
          ...notifications(notificationType, channelId, data.imageUrl),
        });

        notifee.incrementBadgeCount();

        // save notification
        // uid && saveNotification(uid, data);
      } catch (error: any) {
        console.log("error in display notification ", error);
        crashlytics().recordError(error);
      }

      // to get fcm event
      weEventTrack("notification_fcm", { title: data.title });
    }

    // await notifee.requestPermission();
  }
};

export const updateUserTokens = async (uid: string, token: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
};

export const updatePendingUserNav = async (
  uid: string,
  dnsResult: DNParseResult
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ pendingNav: dnsResult });
};

export const removePendingNav = async (uid: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ pendingNav: firestore.FieldValue.delete() });
};

export const updateMixpanelUser = async (
  mixpanel_id: string,
  token: string
) => {
  await firestore()
    .collection("mixpanelUsers")
    .doc(mixpanel_id)
    .set({
      mixpanel_id,
      tokens: firestore.FieldValue.arrayUnion(token),
    });
};

export const updateNotificationSeen = async (
  uid: string,
  notifeeId: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("notifee")
    .doc(notifeeId)
    .update({
      seen: true,
    });
};

export const notifications = (
  type: NotficationTypeV2,
  channelId: string,
  imgUrl?: string
): Notification => {
  switch (type) {
    case "text":
      return {
        android: {
          sound: "notif",
          channelId: channelId,
          autoCancel: false,
          badgeIconType: AndroidBadgeIconType.LARGE,
          importance: AndroidImportance.HIGH,
          category: AndroidCategory.REMINDER,
          visibility: AndroidVisibility.PUBLIC,
          lights: [AndroidColor.RED, 300, 600],
          pressAction: {
            id: "default",
          },
          // fullScreenAction: {
          //   id: "default",
          // },
        },
        ios: {
          sound: "notif.mp3",
        },
      };
    case "image":
      return {
        android: {
          channelId: channelId,
          pressAction: {
            id: "default",
          },
          autoCancel: false,
          sound: "notif",
          lights: [AndroidColor.RED, 300, 600],
          badgeIconType: AndroidBadgeIconType.LARGE,
          importance: AndroidImportance.HIGH,
          category: AndroidCategory.REMINDER,
          visibility: AndroidVisibility.PUBLIC,
          style: imgUrl
            ? {
                type: AndroidStyle.BIGPICTURE,
                picture: imgUrl,
              }
            : undefined,
        },
        ios: {
          interruptionLevel: "timeSensitive",
          // critical: true,
          // criticalVolume: 0.9,
          sound: "notif.mp3",
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
          attachments: imgUrl
            ? [{ url: imgUrl, thumbnailHidden: false }]
            : undefined,
        },
      };
    // case "message":
    //   return {
    //     android: {
    //       channelId: channelId,
    //       pressAction: {
    //         id: "default",
    //       },
    //       actions: [
    //         {
    //           title: "Reply",
    //           pressAction: {
    //             id: "first_action_reply",
    //           },
    //           input: {},
    //         },
    //         {
    //           title: "Nothing",
    //           pressAction: {
    //             id: "second_action_nothing",
    //           },
    //         },
    //       ],
    //     },
    //     ios: {
    //       sound: "default",
    //       categoryId: "quickActions",
    //     },
    //   };
    default:
      return {};
  }
};
