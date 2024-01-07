import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
// import { doc, onSnapshot } from "firebase/firestore";
import { UserInterface } from "@models/User/User";
// import mixpanel from "@config/mixpanel";
// import * as Sentry from "@sentry/browser";

export const useTeamCaptain = (uid?: string) => {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = firestore()
          .collection("users")
          .doc(uid)
          .onSnapshot(
            // doc(db, "users", uid),
            (doc) => {
              if (doc.data()) {
                const remUser = doc.data() as UserInterface;
                setUser(remUser);
                setStatus(true);
              }
            }
          );

        return () => {
          unsubscribe();
        };
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
      //   Sentry.captureException(error);
    }
  }, [uid]);

  return {
    user,
    loaded,
  };
};
