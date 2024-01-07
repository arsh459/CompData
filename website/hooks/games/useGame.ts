import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { EventInterface } from "@models/Event/Event";

export const useGame = (id: string) => {
  const [game, setGame] = useState<EventInterface>();

  useEffect(() => {
    const ref = doc(db, "sbEvents", id);

    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.data()) {
        const remoteGame = snapshot.data() as EventInterface;

        setGame(remoteGame);
      }
    });

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [id]);

  return {
    game,
  };
};
