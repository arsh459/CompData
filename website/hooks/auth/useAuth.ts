import { useEffect, useState } from "react";

import {
  addNewUserObj,
  updateSocialBoatUser,
  updateUserObjOnAuth,
} from "@models/User/createUtils";
import { useUser } from "@hooks/auth/useUser";

import { onAuthStateChanged, User, signInAnonymously } from "firebase/auth";
import { auth } from "@config/firebase";
import mixpanel from "@config/mixpanel";
import { useRouter } from "next/router";
import * as Sentry from "@sentry/browser";
import { useOrgDetails } from "./useOrgDetails";

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
  const [authUser, setAuthUser] = useState<User>();
  const [uid, setUID] = useState<string>("");
  const [hideRecapcha, setHideRecapcha] = useState<boolean>(false);

  const router = useRouter();
  const { utm_source } = router.query as { utm_source?: string };

  useOrgDetails(uid);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // try {
      if (user) {
        if (
          user.metadata.creationTime &&
          new Date().getTime() -
            new Date(user.metadata.creationTime).getTime() <=
            10000
        ) {
          // console.log('creating new user');
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

          // track sign up
          try {
            mixpanel.track("sign_up", { utm_source });
          } catch (e) {
            Sentry.captureException(e);
          }
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

          mixpanel.track("sign_up", { utm_source });
        }
        setAuthStatus("SUCCESS");
        setAuthUser(user);
        setUID(user.uid);
        setLoadComplete(true);
        setTimeout(() => setHideRecapcha(true), 500);

        // identify user
        mixpanel.identify(user.uid);
      } else {
        // console.log("Fail");
        setAuthStatus("FAILED");
        setUID("");
        setLoadComplete(true);
      }
    });
  }, [
    referrerId,
    utm_source,
    // eventId, cohortId, communityId
  ]);

  const signOut = async () => {
    await auth.signOut();
  };

  const annonymousSignin = async () => {
    if (authStatus === "FAILED") {
      await signInAnonymously(auth);
    }
  };

  const { user, loaded } = useUser(uid, authStatus);

  return {
    uid,
    authStatus,
    annonymousSignin,
    loaded,
    loadComplete,
    user,
    hideRecapcha,
    signOut,
    authUser,
  };
};
