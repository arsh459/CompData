import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { UserInterface } from "@models/User/User";
// import mixpanel from "@config/mixpanel";
// import * as Sentry from "@sentry/browser";

export const useUser = (
  uid: string,
  authStatus: "PENDING" | "SUCCESS" | "FAILED"
) => {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (authStatus === "SUCCESS" && uid) {
        const unsubscribe = firestore()
          .collection("users")

          .doc(uid)
          .onSnapshot((doc) => {
            if (doc) {
              const remUser = doc.data() as UserInterface | undefined;
              setUser(remUser);
              setStatus(true);

              //   mixpanel.people.set({
              //     name: remUser?.name,
              //     level: remUser?.userLevelV2 ? remUser.userLevelV2 : 0,
              //     fitPoints: remUser?.totalFitPointsV2,

              //     email: remUser?.email,
              //     phone: remUser?.phone,
              //   });
            }
          });

        return () => {
          unsubscribe();
        };
      } else if (authStatus === "FAILED") {
        setStatus(true);
        setUser(undefined);
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
      //   Sentry.captureException(error);
    }
  }, [authStatus, uid]);

  return {
    user,
    loaded,
  };
};
