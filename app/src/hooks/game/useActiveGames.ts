import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

// import { db } from "@config/firebase";
// import { collection, where, onSnapshot, query } from "firebase/firestore";
import { EventInterface } from "@models/Event/Event";

export const useActiveGames = () => {
  const [games, setGames] = useState<EventInterface[]>([]);
  const [activeGames, setActiveGames] = useState<EventInterface[]>([]);
  const [activeGamesObj, setActiveGamesObj] = useState<{
    [id: string]: EventInterface;
  }>({});
  const [gamesObj, setGamesObj] = useState<{ [id: string]: EventInterface }>(
    {}
  );

  useEffect(() => {
    // const q = query(
    //   collection(db, "sbEvents"),
    //   // where("state", "==", "active"),
    //   where("challengeType", "==", "game")
    // );

    const unsub = firestore()
      .collection("sbEvents")
      .where("challengeType", "==", "game")
      .where("state", "==", "active")
      .onSnapshot((snapshot) => {
        const remoteGames: EventInterface[] = [];
        const remoteGamesObj: { [id: string]: EventInterface } = {};
        const remoteActiveGames: EventInterface[] = [];
        const remoteActiveGamesObj: { [id: string]: EventInterface } = {};
        for (const doc of snapshot.docs) {
          if (doc) {
            const remData = doc.data() as EventInterface;

            remoteGames.push(remData);
            remoteGamesObj[remData.id] = remData;

            if (remData.state === "active") {
              remoteActiveGames.push(remData);
              remoteActiveGamesObj[remData.id] = remData;
            }
          }
        }

        setGamesObj(remoteGamesObj);
        setGames(remoteGames);
        setActiveGamesObj(remoteActiveGamesObj);
        setActiveGames(remoteActiveGames);
      });

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  return {
    games,
    gamesObj,
    activeGames,
    activeGamesObj,
  };
};
