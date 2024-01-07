import { NotificationToSave } from "@models/notifee/interface";
import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

export type notificationListType = { day: string; data: NotificationToSave[] };

const minElement = 5;

const mergeSection = (
  previous: notificationListType[],
  newDocs: notificationListType[]
) => {
  let lastDt: string = "";
  if (previous.length) {
    lastDt = previous[previous.length - 1].day;
  }

  const mergedDocs = previous;
  for (const newDoc of newDocs) {
    if (newDoc.day === lastDt) {
      mergedDocs[mergedDocs.length - 1].data.push(...newDoc.data);
    } else {
      mergedDocs.push(newDoc);
    }
  }

  return mergedDocs;
};

const queryProcess = async (
  remoteNotificationDocs: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
) => {
  const remoteNotifications: notificationListType[] = [];
  let lDoc: FirebaseFirestoreTypes.DocumentData | undefined;

  for (const remoteNotificationDoc of remoteNotificationDocs.docs) {
    const remoteNotification =
      remoteNotificationDoc.data() as NotificationToSave;

    if (remoteNotification) {
      const tempDate = new Date(
        remoteNotification.createdOn
      ).toLocaleDateString();

      const targetIndex = remoteNotifications.findIndex(
        (item) => item.day === tempDate
      );

      if (targetIndex !== -1) {
        remoteNotifications[targetIndex].data.push(remoteNotification);
      } else {
        remoteNotifications.push({ day: tempDate, data: [remoteNotification] });
      }
    }

    lDoc = remoteNotificationDoc;
  }

  return {
    lDoc,
    remoteNotifications,
  };
};

export const useUserNotifications = () => {
  const { state } = useAuthContext();
  const [notification, setNotification] = useState<notificationListType[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [extraData, setExtraData] = useState<number>(0);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const initialise = async () => {
      if (!init && state.uid) {
        try {
          const remoteNotificationDocs = await firestore()
            .collection("users")
            .doc(state.uid)
            .collection("notifee")
            .orderBy("createdOn", "desc")
            .limit(minElement)
            .get();

          const { lDoc, remoteNotifications } = await queryProcess(
            remoteNotificationDocs
          );

          setInit(true);
          setLastDoc(
            remoteNotificationDocs.docs.length === minElement ? lDoc : undefined
          );

          setNotification((p) => mergeSection(p, remoteNotifications));
          setExtraData((p) => p + 1);
        } catch (error: any) {
          console.log(error);
          crashlytics().recordError(error);
        }
      }
    };

    initialise();
  }, [state.uid, init]);

  const onNext = async () => {
    if (lastDoc && state.uid) {
      const remoteFetched = await firestore()
        .collection("users")
        .doc(state.uid)
        .collection("notifee")
        .orderBy("createdOn", "desc")
        .limit(minElement)
        .startAfter(lastDoc)
        .get();

      if (remoteFetched) {
        const { lDoc, remoteNotifications } = await queryProcess(remoteFetched);

        setLastDoc(remoteFetched.docs.length === minElement ? lDoc : undefined);
        setNotification((p) => mergeSection(p, remoteNotifications));
        setExtraData((p) => p + 1);
      }
    }
  };

  const updateSingleNotification = (
    day: string,
    notifyObj: NotificationToSave
  ) => {
    setNotification((prev) => {
      return prev.map((each) => {
        if (each.day === day) {
          const temp = {
            day: each.day,
            data: each.data.map((item) =>
              item.id === notifyObj.id ? { ...item, seen: true } : item
            ),
          };
          return temp;
        } else {
          return each;
        }
      });
    });
    // setExtraData((p) => p + 1);
  };

  return {
    onNext,
    notification,
    extraData,
    init,
    updateSingleNotification,
  };
};
