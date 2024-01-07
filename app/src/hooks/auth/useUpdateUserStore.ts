import { useEffect } from "react";
import { UserInterface } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";

export const useUpdateUserStore = (uid?: string) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = firestore()
          .collection("users")
          .doc(uid)
          .onSnapshot((doc) => {
            if (doc) {
              const remUser = doc.data() as UserInterface | undefined;

              if (remUser) {
                setUser(remUser);
                // setUser(undefined);
              }
            }
          });

        return () => {
          unsubscribe();
        };
      }
    } catch (error: any) {
      console.log("error in useUpdateUser", error);
      crashlytics().recordError(error);
    }
  }, [uid]);
};
