import { useEffect, useState } from "react";
import {
  addNewUserObj,
  updateSocialBoatUser,
  updateUserObjOnAuth,
} from "@models/User/createUtils";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@config/firebase";

export const useBasicAuth = () => {
  const [authStatus, setAuthStatus] = useState<
    "PENDING" | "SUCCESS" | "FAILED"
  >("PENDING");
  const [loadComplete, setLoadComplete] = useState<boolean>(false);
  const [uid, setUID] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      //   console.log("user", user);
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
            "",
            user.phoneNumber ? user.phoneNumber : undefined,
            user.email ? user.email : undefined,
            false
          );
        } else if (
          user.metadata.creationTime &&
          new Date().getTime() -
            new Date(user.metadata.creationTime).getTime() >
            10000
        ) {
          // regular user with creation time
          await updateSocialBoatUser(user.uid);
        } else {
          // no creation time present
          await updateUserObjOnAuth(
            user.uid,
            "web",
            true,
            user.phoneNumber ? user.phoneNumber : undefined,
            user.email ? user.email : undefined,
            undefined
          );
        }

        // console.log('user', user);
        setAuthStatus("SUCCESS");
        setUID(user.uid);
        setLoadComplete(true);
      } else {
        setAuthStatus("FAILED");
        setLoadComplete(true);
      }
      // console.log('user', user);
      //   } catch (error) {}
    });
  }, []);

  //   const { user, loaded } = useUser(uid, authStatus);
  // console.log("user", user);

  return {
    uid,
    authStatus,
    loadComplete,
  };
};
