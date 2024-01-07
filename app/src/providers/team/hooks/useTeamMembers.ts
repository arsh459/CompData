import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { UserInterface } from "@models/User/User";

export const useTeamMembers = (
  eventId?: string,
  imageFirst?: boolean,
  initialNumToFetch?: number
) => {
  const [members, setMembers] = useState<UserInterface[]>([]);
  const [numToFetch, setToFetch] = useState<number>(
    initialNumToFetch ? initialNumToFetch : 5
  );
  const [nextMembersExist, setNextMembersExist] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (eventId) {
        const leaderRef = firestore().collection("leaderBoard");
        let q: FirebaseFirestoreTypes.Query | undefined = undefined;
        if (numToFetch && imageFirst) {
          q = leaderRef
            .where("enrolledEvents", "array-contains", eventId)
            .orderBy("manualRank", "asc")
            .limit(numToFetch);
        } else if (numToFetch) {
          q = leaderRef
            .where("enrolledEvents", "array-contains", eventId)
            .limit(numToFetch);
        }

        if (q) {
          const unsubscribe = q.onSnapshot((mems) => {
            const remMems: UserInterface[] = [];
            for (const mem of mems.docs) {
              const usr = mem.data() as UserInterface | undefined;
              if (usr) {
                remMems.push(usr);
              }
            }

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
  }, [eventId, numToFetch, imageFirst]);

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
