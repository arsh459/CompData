import { db } from "@config/firebase";

import {
  collection,
  query,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useParticipants = () => {
  const [participantsCount, setParticipantsCount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "users"),
        orderBy("challengeJoined", "desc")
      );

      const count = await getCountFromServer(q);

      if (count.data()) {
        setParticipantsCount(count.data().count);
      }
    };

    getData();
  }, []);

  return { participantsCount };
};
