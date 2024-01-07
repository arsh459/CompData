import { db } from "config/firebase";
import {
  onSnapshot,
  where,
  query,
  collection,
  limit,
  orderBy,
} from "firebase/firestore";
import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";

export const useUserEnrolledEvents = (uid?: string, numToFetch?: number) => {
  const [userEvents, setUserEvents] = useState<EventInterface[]>([]);
  const [gameTeams, setGameTeams] = useState<{
    [gameId: string]: EventInterface;
  }>({});
  const [numVisible, setNumVisible] = useState<number>(
    numToFetch ? numToFetch : 3
  );
  const [nextMembersExist, setNextMembersExist] = useState<boolean>(false);
  const [fetched, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (uid && numVisible) {
      const q = query(
        collection(db, "sbEvents"),
        where("enrolledUserUIDs", "array-contains", uid),
        orderBy("updatedOn", "desc"),
        limit(numVisible)
      );
      const unsubscribe = onSnapshot(q, (mems) => {
        const remMems: EventInterface[] = [];
        const teams: { [id: string]: EventInterface } = {};
        for (const mem of mems.docs) {
          const memberTeam = mem.data() as EventInterface;
          remMems.push(memberTeam);

          if (memberTeam.parentId) {
            teams[memberTeam.parentId] = memberTeam;
          }
        }

        setNextMembersExist(remMems.length === numVisible);
        setUserEvents(remMems);
        setGameTeams(teams);
        setTimeout(() => setFetching(true), 200);
      });

      return () => {
        setFetching(false);
        unsubscribe();
      };
    }
  }, [uid, numVisible]);

  const onNext = () => {
    // console.log("here");
    setNumVisible((prev) => prev + (numToFetch ? numToFetch : 10));
  };

  return {
    userEvents,
    onNext,
    nextMembersExist,
    numVisible,
    fetched,
    gameTeams,
  };
};
