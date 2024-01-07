import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  onSnapshot,
  where,
  query,
  collection,
  limit,
  Query,
  orderBy,
} from "firebase/firestore";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

export const useEventMembers = (
  eventId?: string,
  cohortId?: string,
  manualRank?: boolean,
  initialNumToFetch?: number
) => {
  const [members, setMembers] = useState<LeaderBoard[]>([]);
  const [numToFetch, setToFetch] = useState<number>(
    initialNumToFetch ? initialNumToFetch : 5
  );
  const [nextMembersExist, setNextMembersExist] = useState<boolean>(false);

  // console.log("e", eventId);

  useEffect(() => {
    // const getMembers = async () => {
    try {
      if (eventId) {
        const leaderRef = collection(db, "leaderBoard");
        let q: Query | undefined = undefined;
        if (cohortId && numToFetch) {
          q = query(
            leaderRef,
            where("enrolledCohorts", "array-contains", cohortId),
            limit(numToFetch)
          );
        } else if (numToFetch && manualRank) {
          q = query(
            leaderRef,
            where("enrolledEvents", "array-contains", eventId),
            orderBy("manualRank", "asc"),
            limit(numToFetch)
          );
        } else if (numToFetch) {
          q = query(
            leaderRef,
            where("enrolledEvents", "array-contains", eventId),
            limit(numToFetch)
          );
        }

        if (q) {
          const unsubscribe = onSnapshot(q, (mems) => {
            const remMems: LeaderBoard[] = [];
            for (const mem of mems.docs) {
              remMems.push(mem.data() as LeaderBoard);
            }

            setNextMembersExist(remMems.length === numToFetch);
            setMembers(remMems);
          });

          return () => {
            unsubscribe();
          };
        }
      }
    } catch (error) {
      console.log("error", error);
    }
    // };

    // getMembers();
  }, [eventId, cohortId, numToFetch, manualRank]);

  const onNextMember = () => {
    // console.log("here");
    setToFetch((prev) => prev + 10);
  };

  // console.log("m", members);

  return {
    members,
    onNextMember,
    nextMembersExist,
    setToFetch,
  };
};
