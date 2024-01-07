import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "@config/firebase";

export const useEditEventExists = (parentId?: string, uid?: string) => {
  const [teamEvent, setTeamEvent] = useState<EventInterface>();

  useEffect(() => {
    if (uid && parentId) {
      const q = query(
        collection(db, "sbEvents"),
        where("parentId", "==", parentId),
        where("ownerUID", "==", uid)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length > 0) {
          setTeamEvent(snapshot.docs[0].data() as EventInterface);
        }
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [uid, parentId]);

  return {
    teamEvent,
  };
};
