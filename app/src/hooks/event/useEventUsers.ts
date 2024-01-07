import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import { UserRank } from "@models/Activity/Activity";
// import { UserInterface } from "@models/User/User";

export const useEventUsers = (
  parentId?: string,
  eventId?: string,
  //   cohortId?: string,
  initialNumToFetch?: number,
  currentMonth?: string,
  canFetch?: boolean
) => {
  const [members, setMembers] = useState<UserRank[]>([]);
  const [numToFetch, setToFetch] = useState<number>(
    initialNumToFetch ? initialNumToFetch : 5
  );
  const [nextMembersExist, setNextMembersExist] = useState<boolean>(false);

  useEffect(() => {
    // const getMembers = async () => {
    try {
      if (eventId && parentId && canFetch) {
        const userRankRef = firestore()
          .collection("sbEvents")
          .doc(parentId)
          .collection("userRanks");

        // const gameRef = doc(db, "sbEvents", parentId);
        // const userRankRef = collection(gameRef, "userRanks");
        let q: FirebaseFirestoreTypes.Query | undefined = undefined;
        if (numToFetch) {
          q = userRankRef.where("coachEventId", "==", eventId);
          // q = query(
          //   userRankRef,
          //   where("coachEventId", "==", eventId)
          //   // orderBy('')
          //   // orderBy(`monthlyRank.${currentMonth}`, "asc"),
          //   // limit(numToFetch)
          // );
        }

        if (q) {
          const unsubscribe = q.onSnapshot((mems) => {
            const remMems: UserRank[] = [];
            for (const mem of mems.docs) {
              remMems.push(mem.data() as UserRank);
            }

            remMems.sort((a, b) =>
              a.monthlyRank && b.monthlyRank && currentMonth
                ? a.monthlyRank[currentMonth] - b.monthlyRank[currentMonth]
                : a.rank - b.rank
            );

            setNextMembersExist(remMems.length === numToFetch);
            setMembers(remMems);
          });

          return () => {
            unsubscribe();
          };
        }
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
    // };

    // getMembers();
  }, [eventId, numToFetch, parentId, currentMonth, canFetch]);

  const onNextMember = () => {
    setToFetch((prev) => prev + 10);
  };

  return {
    members,
    onNextMember,
    nextMembersExist,
    setToFetch,
  };
};
