// import { db } from "@config/firebase";
// import {
//   onSnapshot,
//   where,
//   query,
//   collection,
//   limit,
//   orderBy,
// } from "firebase/firestore";

import firestore from "@react-native-firebase/firestore";
import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import {
  ALPHABET_GAME,
  FAT_BURNER_GAME,
  RUNNER_GAME,
  TEAM_ALPHABET_GAME,
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
      const q = firestore()
        .collection("sbEvents")
        .where("enrolledUserUIDs", "array-contains", uid)
        .orderBy("updatedOn", "desc")
        .limit(numVisible);

      const games = [
        FAT_BURNER_GAME,
        RUNNER_GAME,
        WOMENS_GAME,
        ALPHABET_GAME,
        TEAM_ALPHABET_GAME,
        HEADSTART_GAME,
        BURPEE_GAME,
        GURGAON_FIT,
      ];
      const unsubscribe = q.onSnapshot((mems) => {
        const remMems: EventInterface[] = [];
        const teams: { [id: string]: EventInterface } = {};
        for (const mem of mems.docs) {
          const memberTeam = mem.data() as EventInterface;

          if (memberTeam.parentId && games.includes(memberTeam.parentId)) {
            teams[memberTeam.parentId] = memberTeam;

            remMems.push(memberTeam);
          }
        }

        setNextMembersExist(remMems.length === numVisible);
        setUserEvents(remMems);
        setGameTeams(teams);
        setFetching(true);
        // setTimeout(() => setFetching(true), 200);
      });

      return () => {
        setFetching(false);
        unsubscribe();
      };
    }
  }, [uid, numVisible]);

  const onNext = () => {
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
