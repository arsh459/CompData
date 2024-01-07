import { useEffect, useState } from "react";
// import { db } from "@config/firebase";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { UserInterface } from "@models/User/User";
// import { useUserStore } from "@providers/user/store/useUserStore";
// import { shallow } from "zustand/shallow";
// import { userLog } from "@utils/analytics/webengage/userLog";

export const useUserV2 = (uid?: string) => {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [loaded, setloaded] = useState<boolean>(false);

  // const setUserInStore = useUserStore((state) => state.setUser, shallow);

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = firestore()
          .collection("users")
          // .doc("XdrshWXNC8a6jSO7vtpGOx8Xhfu1")
          .doc(uid)
          .onSnapshot(
            // doc(db, "users", uid),
            (doc) => {
              if (doc) {
                const remUser = doc.data() as UserInterface | undefined;

                setUser(remUser);
                // setUserInStore(remUser);
              }
              setloaded(true);
            }
          );

        return () => {
          unsubscribe();
        };
      } else {
        setUser(undefined);
        setloaded(true);
      }
    } catch (error: any) {
      console.log("permission error", error);
      crashlytics().recordError(error);
      //   Sentry.captureException(error);
    }
  }, [uid]);

  return {
    user,
    loaded,
  };
};
