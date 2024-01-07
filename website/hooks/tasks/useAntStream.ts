import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AntStream } from "@models/AntStream/AntStream";

export const useAntStream = (id?: string) => {
  const [stream, setAntStream] = useState<AntStream>();
  useEffect(() => {
    // console.log("here");
    if (id) {
      const ref = doc(db, "antStreams", id);

      const unsubscribe = onSnapshot(ref, (task) => {
        setAntStream(task.data() as AntStream);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [id]);

  return {
    stream,
  };
};
