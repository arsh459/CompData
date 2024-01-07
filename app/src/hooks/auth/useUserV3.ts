import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { UserInterface } from "@models/User/User";

export const useUserV3 = (uid?: string) => {
  const [user, setUser] = useState<UserInterface>();
  const [loaded, setloaded] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      if (uid) {
        try {
          const doc = await firestore().collection("users").doc(uid).get();

          if (doc.data()) {
            setUser(doc.data() as UserInterface);
          }
        } catch (error: any) {
          console.log("error", error);
          crashlytics().recordError(error);
        }
      }

      setloaded(true);
    };

    getUser();
  }, [uid]);

  return {
    user,
    loaded,
  };
};
