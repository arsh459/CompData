import { LevelInterface } from "@models/Level/interface";
import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

export const useLevels = () => {
  const [loading, setLoading] = useState<boolean>();
  const [levels, setLevels] = useState<LevelInterface[]>([]);

  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(
      query(
        collection(doc(db, "sbEvents", TEAM_ALPHABET_GAME), "level"),
        orderBy("lvlNumber", "asc")
      ),
      (levelsDocs) => {
        const remoteLevels: LevelInterface[] = [];
        for (const levelDoc of levelsDocs.docs) {
          if (levelDoc.data()) {
            const remoteLevel = levelDoc.data() as LevelInterface;

            remoteLevels.push(remoteLevel);
          }
        }

        setLevels(remoteLevels);
        setLoading(false);
      }
    );

    return () => {
      if (unsub) {
        unsub();
        setLoading(false);
      }
    };
  }, []);

  return { levels, loading };
};
