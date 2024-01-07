import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  onSnapshot,
  where,
  query,
  collection,
  doc,
  //   limit,
  Query,
  //   orderBy,
} from "firebase/firestore";
// import { UserInterface } from "@models/User/User";
import { UserRank } from "@models/Activities/Activity";

export const useEventUsers = (
  parentId?: string,
  eventId?: string,
  //   cohortId?: string,
  initialNumToFetch?: number,
  currentMonth?: string,
  isOpen?: boolean
) => {
  const [members, setMembers] = useState<UserRank[]>([]);
  const [numToFetch, setToFetch] = useState<number>(
    initialNumToFetch ? initialNumToFetch : 5
  );
  const [nextMembersExist, setNextMembersExist] = useState<boolean>(false);

  // console.log("e", eventId);

  useEffect(() => {
    // const getMembers = async () => {
    try {
      if (eventId && parentId && isOpen) {
        const gameRef = doc(db, "sbEvents", parentId);
        const userRankRef = collection(gameRef, "userRanks");
        let q: Query | undefined = undefined;
        if (numToFetch) {
          q = query(
            userRankRef,
            where("coachEventId", "==", eventId)
            // orderBy('')
            // orderBy(`monthlyRank.${currentMonth}`, "asc"),
            // limit(numToFetch)
          );
        }

        if (q) {
          const unsubscribe = onSnapshot(q, (mems) => {
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
    } catch (error) {
      console.log("error", error);
    }
    // };

    // getMembers();
  }, [eventId, numToFetch, parentId, currentMonth, isOpen]);

  const onNextMember = () => {
    // console.log("here");
    setToFetch((prev) => prev + 10);
  };

  //   console.log("m", members, parentId, eventId);

  return {
    members,
    onNextMember,
    nextMembersExist,
    setToFetch,
  };
};
