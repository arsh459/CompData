import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { UserInterface, deliverableType } from "@models/User/User";
import * as Sentry from "@sentry/browser";
import { useRouter } from "next/router";

export const useUserFlags = (uid?: string) => {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  // console.log("authStatus", authStatus);

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = onSnapshot(doc(db, "users", uid), (doc) => {
          const remUser = doc.data() as UserInterface;
          setUser(remUser);
          setStatus(true);
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  }, [uid]);

  const onUpdateFlagObj = (key: deliverableType, val: boolean) => {
    setUser((prev) => {
      if (prev) {
        return {
          ...prev,
          deliverableFlags: {
            ...(prev.deliverableFlags ? prev.deliverableFlags : {}),
            [key]: val,
          },
        };
      }
    });
  };

  const onUpdateTestUser = (val: boolean) => {
    setUser((prev) => {
      if (prev) {
        return {
          ...prev,
          testUser: val,
        };
      }
    });
  };

  const onDietFormFilled = (val: boolean) => {
    setUser((prev) => {
      if (prev) {
        return {
          ...prev,
          [`flags.dietFormFilled`]: val,
        };
      }
    });
  };

  const router = useRouter();
  const onSave = async () => {
    uid &&
      user &&
      (await updateDoc(doc(db, "users", uid), {
        ...user,
        flagUpdate: increment(1),
      }));

    router.back();
  };

  return {
    user,
    loaded,
    onUpdateFlagObj,
    onSave,
    onUpdateTestUser,
    onDietFormFilled,
  };
};
