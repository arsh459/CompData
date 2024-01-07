import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UserInterface } from "@models/User/User";
// import mixpanel from "@config/mixpanel";
import { userLog } from "@analytics/webengage/user/userLog";
import * as Sentry from "@sentry/browser";

export const useUser = (
  uid: string,
  authStatus: "PENDING" | "SUCCESS" | "FAILED"
) => {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  // console.log("authStatus", authStatus);

  useEffect(() => {
    try {
      if (authStatus === "SUCCESS" && uid) {
        const unsubscribe = onSnapshot(
          doc(
            db,
            "users",
            // "Ng3E1hNiBGdlk4vkq6DFDgOcqn43"
            // "Ng3E1hNiBGdlk4vkq6DFDgOcqn43"
            // "cp50lgzHdRaeoKdMhFMXUlcxI6u2"
            // "40OqdGRJ0rQdUbSaZDyj9zm36uU2"
            // "NFoIbbtOIVTwdOj8S6FOCx5Wfz92"
            // "Q4JoY0H8F9SjaXadACzKaRua8a52"
            // "Ng3E1hNiBGdlk4vkq6DFDgOcqn43"
            // "96Xj1xjNTLVZy6TQ8Ett48WCXNt2"
            // "blvJ95rzEUSMGoxQ6e4N5BAcCZ43"
            // "U07vvIQ2bNQFRunBjbyPflItKw52"
            // "W1mm9HjTo8apZ11Qes9Mt8ckhpD3"
            uid
          ),
          (doc) => {
            const remUser = doc.data() as UserInterface;
            setUser(remUser);
            setStatus(true);

            // mixpanel.people.set({
            //   name: remUser?.name,
            //   level: remUser?.userLevelV2 ? remUser.userLevelV2 : 0,
            //   fitPoints: remUser?.totalFitPointsV2,
            //   activeFitPoints: remUser?.activeFitPointsV2,

            //   email: remUser?.email,
            //   phone: remUser?.phone,
            // });

            // webengage
            userLog(remUser);
          }
        );

        return () => {
          unsubscribe();
        };
      } else if (authStatus === "FAILED") {
        setStatus(true);
        setUser(undefined);
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  }, [authStatus, uid]);

  return {
    user,
    loaded,
  };
};
