import { db } from "@config/firebase";
import { SprintDetail } from "@hooks/sprints/useSprint";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useSprintDetails = (gameId?: string) => {
  const [spDetails, setSpDetails] = useState<SprintDetail[]>([]);
  useEffect(() => {
    const getSpDetails = async () => {
      if (gameId) {
        const docs = await getDocs(
          collection(doc(db, "sbEvents", gameId), "sprintDetails")
        );

        const remoteSprints: SprintDetail[] = [];
        for (const doc of docs.docs) {
          remoteSprints.push(doc.data() as SprintDetail);
        }

        setSpDetails(remoteSprints);
      }
    };

    getSpDetails();
  }, [gameId]);

  return {
    spDetails,
  };
};
