import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Badge } from "@models/Prizes/Prizes";

export const useHallOfFameBadges = (gameId?: string) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  useEffect(() => {
    const getBadges = async () => {
      const badges = await firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("badges")
        .orderBy("hallOfFamePriority", "asc")
        .limit(5)
        .get();
      const rbadges: Badge[] = [];

      for (const badge of badges.docs) {
        if (badge) {
          rbadges.push(badge.data() as Badge);
        }
      }

      setBadges(rbadges);
      setLastDoc(badges.docs[badges.docs.length - 1]);
      setTimeout(() => setFetching(true), 200);
    };
    getBadges();
  }, [gameId]);

  const onNext = () => {
    const getBadges = async () => {
      const badges = await firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("badges")
        .orderBy("hallOfFamePriority", "asc")
        .startAfter(lastDoc)
        .limit(5)
        .get();

      const rbadges: Badge[] = [];

      for (const badge of badges.docs) {
        if (badge) {
          rbadges.push(badge.data() as Badge);
        }
      }

      setLastDoc(badges.docs[badges.docs.length - 1]);
      setBadges((prev) => [...prev, ...rbadges]);
    };
    if (gameId && lastDoc) {
      getBadges();
    }
  };

  return {
    badges,
    fetched,
    onNext,
  };
};
