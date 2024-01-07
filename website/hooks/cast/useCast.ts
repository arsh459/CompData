import { useEffect, useState } from "react";
import { Cast } from "@models/Cast/Cast";
// import { createNewCast } from "@models/Cast/utils";
// import { db } from "config/firebase";
import { getDatabase, ref, onValue } from "firebase/database";

const database = getDatabase();

export const useCast = (castId?: string) => {
  const [cast, setCast] = useState<Cast>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // const castId = createNewCast();

    if (castId) {
      const reference = ref(database, "casts/" + castId);
      const onsub = onValue(reference, (snapshot) => {
        const snapData = snapshot?.val() as Cast | null;
        if (snapData) {
          setCast(snapData);
          setTimeout(() => setLoading(false), 200);
        }
      });

      return () => {
        onsub();
      };
    }
  }, [castId]);

  return {
    cast,
    loading,
  };
};
