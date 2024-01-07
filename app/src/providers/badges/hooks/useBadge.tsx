import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Badge } from "@models/Prizes/Prizes";
import crashlytics from "@react-native-firebase/crashlytics";

export const useBadge = (gameId?: string, id?: string) => {
  const [badge, setBadge] = useState<Badge>();
  const [fetched, setFetching] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (gameId && id) {
        const ref = firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .doc(id);

        //   .orderBy("priority", "asc");

        if (ref) {
          const unsub = ref.onSnapshot((snapshot) => {
            if (snapshot) {
              setBadge(snapshot.data() as Badge);

              setTimeout(() => setFetching(true), 200);
            } else {
              setBadge(undefined);

              setTimeout(() => setFetching(true), 200);
            }
          });

          return () => {
            if (unsub) {
              setFetching(false);
              unsub();
            }
          };
        }
      } else {
        setBadge(undefined);
        setTimeout(() => setFetching(true), 200);
      }
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error", error);
    }
  }, [gameId, id]);

  return {
    badge,
    fetched,
  };
};
