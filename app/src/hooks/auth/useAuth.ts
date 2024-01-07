import { useEffect, useState } from "react";

import {
  addNewUserObj,
  updateSocialBoatUser,
  updateUserObjOnAuth,
} from "@models/User/createUtils";
import { useUser } from "@hooks/auth/useUser";
import auth from "@react-native-firebase/auth";
// import { mixpanel } from "App";
// import mixpanel from "@config/mixpanel";
// import { useRouter } from "next/router";
// import * as Sentry from "@sentry/browser";

export const useAuth = (
  referrerId?: string
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  const [authStatus, setAuthStatus] = useState<
    "PENDING" | "SUCCESS" | "FAILED"
  >("PENDING");
  const [loadComplete, setLoadComplete] = useState<boolean>(false);
  const [uid, setUID] = useState<string>("");
  const [hideRecapcha, setHideRecapcha] = useState<boolean>(false);

  //   const router = useRouter();
  //   const { utm_source } = router.query as { utm_source?: string };

  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      // try {
      if (user) {
        if (
          user.metadata.creationTime &&
          new Date().getTime() -
            new Date(user.metadata.creationTime).getTime() <=
            10000
        ) {
          await addNewUserObj(
            user.uid,
            "web",
            true,
            referrerId ? referrerId : "",
            user.phoneNumber ? user.phoneNumber : undefined,
            user.email ? user.email : undefined,
            false
            // eventId,
            // cohortId,
            // communityId
          );
        } else if (
          user.metadata.creationTime &&
          new Date().getTime() -
            new Date(user.metadata.creationTime).getTime() >
            10000
        ) {
          // regular user with creation time
          await updateSocialBoatUser(
            user.uid
            // eventId, cohortId, communityId
          );

          // mixpanel.track("sign_in", { utm_source });
        } else {
          // no creation time present
          await updateUserObjOnAuth(
            user.uid,
            "web",
            true,
            user.phoneNumber ? user.phoneNumber : undefined,
            user.email ? user.email : undefined,
            referrerId ? referrerId : undefined
            // eventId,
            // cohortId,
            // communityId
          );

          //   mixpanel.track("sign_up", { utm_source });
        }
        setAuthStatus("SUCCESS");
        setUID(user.uid);
        setLoadComplete(true);
        setTimeout(() => setHideRecapcha(true), 500);

        // identify user
        // mixpanel.identify(user.uid);
      } else {
        setAuthStatus("FAILED");
        setUID("");
        setLoadComplete(true);
      }
    });
  }, [
    referrerId,
    // utm_source,
    // eventId, cohortId, communityId
  ]);

  const signOut = async () => {
    await auth().signOut();
    // mixpanel.reset();
  };

  const { user, loaded } = useUser(uid, authStatus);

  return {
    uid,
    authStatus,
    // authStatus: "FAILED",
    loaded,
    loadComplete,
    user,
    hideRecapcha,
    signOut,
  };
};
