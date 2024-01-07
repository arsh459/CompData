import { createNewCast } from "@utils/cast/utils";
import { useEffect, useState } from "react";
// import { Cast } from "@models/Cast/Cast";

// import { db } from "config/firebase";
// import { doc, onSnapshot } from "firebase/firestore";
import { useCast } from "./useCast";

export const useNewCast = () => {
  const [castId, setCastId] = useState<string>("");

  // const [loading, setLoading] = useState<boolean>(true);

  const { cast, loading } = useCast(castId);

  useEffect(() => {
    const castId = createNewCast();
    setCastId(castId);

    // const unsub = onSnapshot(
    //   doc(db, "casts", "1261a670-363a-4709-9b8f-75ec2906e0ba"),
    //   (snapshot) => {
    //     const snapData = snapshot?.data() as Cast | null;
    //     if (snapData) {
    //       setCast(snapData);
    //       setTimeout(() => setLoading(false), 200);
    //     } else {
    //     }
    //   }
    // );

    // return () => {
    //   if (unsub) {
    //     unsub();
    //   }
    // };
  }, []);

  return {
    cast,
    loading,
  };
};
