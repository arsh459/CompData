import { useEffect, useState } from "react";
import { Cast } from "@models/Cast/Cast";
import database from "@react-native-firebase/database";
// import { createNewCast } from "@models/Cast/utils";

export const useCast = (castId?: string) => {
  const [cast, setCast] = useState<Cast>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // const castId = createNewCast();

    if (castId) {
      const unsub = database()
        .ref("casts/" + castId)
        .on("value", (snapshot) => {
          const snapData = snapshot?.val() as Cast | null;
          if (snapData) {
            setCast(snapData);
            setTimeout(() => setLoading(false), 200);
          }
        });

      return () => {
        database()
          .ref("casts/" + castId)
          .off("value", unsub);
      };
    }
  }, [castId]);

  return {
    cast,
    loading,
  };
};
