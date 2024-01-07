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
import {
  ALPHABET_GAME,
  FAT_BURNER_GAME,
  RUNNER_GAME,
  TEAM_ALPHABET_GAME,
  STUDENT_OLYMPICS,
  WOMENS_GAME,
  HEADSTART_GAME,
  BURPEE_GAME,
  GURGAON_FIT,
} from "@constants/gameStats";

export const useUserEnrolledEventsV2 = (uid?: string, numToFetch?: number) => {
  const [userEvents, setUserEvents] = useState<EventInterface[]>([]);
  const [gameTeams, setGameTeams] = useState<{
    [gameId: string]: EventInterface;
  }>({});
  const [numVisible, setNumVisible] = useState<number>(
    numToFetch ? numToFetch : 4
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

      const games = [
        FAT_BURNER_GAME,
        RUNNER_GAME,
        WOMENS_GAME,
        ALPHABET_GAME,
        TEAM_ALPHABET_GAME,
        STUDENT_OLYMPICS,
        HEADSTART_GAME,
        BURPEE_GAME,
        GURGAON_FIT,
      ];
      const unsubscribe = onSnapshot(q, (mems) => {
        const remMems: EventInterface[] = [];
        const teams: { [id: string]: EventInterface } = {};
        for (const mem of mems.docs) {
          const memberTeam = mem.data() as EventInterface;

          if (memberTeam.parentId && games.includes(memberTeam.parentId)) {
            // console.log("m", memberTeam.name);
            teams[memberTeam.parentId] = memberTeam;

            remMems.push(memberTeam);
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
    setNumVisible((prev) => prev + 10);
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
