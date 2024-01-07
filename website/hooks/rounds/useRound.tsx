import { db } from "@config/firebase";
import { uuidv4 } from "@firebase/util";
import { RoundInterface } from "@models/Event/Round";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useRound = (gameId: string, id: string) => {
  const [round, setRounds] = useState<RoundInterface>();

  useEffect(() => {
    const getSprintDetail = async () => {
      console.log({ gameId, id });
      if (gameId && id) {
        const document = await getDoc(
          doc(doc(db, "sbEvents", gameId), "rounds", id)
        );
        const data = document.data();
        if (data) {
          const sd = data as RoundInterface;
          setRounds(sd);
        } else {
          setRounds({
            id: uuidv4(),
            start: 1695181468000,
            end: 1696477468000,
            name: "",
            roundKey: "",
            description: "",
            fpTarget: 100,
            taskOrder: [
              "dailyReward",
              "assignedWorkout",
              "assignedDiet",
              "additionalBadgeIds",
            ],
          });
        }
      }
    };
    getSprintDetail();
  }, [gameId, id]);

  return {
    round,
    setRounds,
  };
};

export default useRound;
