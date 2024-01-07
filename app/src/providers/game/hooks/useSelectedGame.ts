import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
// import { doc, onSnapshot } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { getGameParameters } from "./utils";
import { GameMonthParams, GameParameters, GameWeekParams } from "../interface";
import {
  getCurrentMonthV3,
  getCurrentWeekV3,
} from "@utils/challange/challengeWeekUtils";
import { getRoundsForHome } from "@providers/badges/utils";

export const useSelectedGame = (selectedEventId?: string) => {
  const [game, setSelectedEvent] = useState<EventInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [gameParams, setGameParams] = useState<GameParameters>();
  const [monthParams, setMonthParams] = useState<GameMonthParams>();
  const [weekParams, setWeekParams] = useState<GameWeekParams>();
  const [activeFutureRounds, setRounds] = useState<string[]>([]);
  const [allRounds, setAllRounds] = useState<string[]>([]);

  useEffect(() => {
    try {
      if (selectedEventId) {
        const unsub = firestore()
          .collection("sbEvents")
          .doc(selectedEventId)
          .onSnapshot(
            // doc(db, "sbEvents", selectedEventId),
            (doc) => {
              if (doc) {
                const data = doc.data() as EventInterface | undefined;

                if (data) {
                  const params = getGameParameters(
                    data.configuration?.sprints,
                    data.configuration?.starts,
                    data.configuration?.challengeLength,
                    data.configuration?.rounds
                    // Date.now() - 24 * 60 * 60 * 1000
                  );

                  const {
                    rangeDate,
                    sprintId,
                    nowObj,
                    defaultObj,
                    lastSprintId,
                  } = getCurrentMonthV3(
                    data?.configuration?.sprints,
                    data?.configuration?.starts,
                    data?.configuration?.challengeLength,
                    data?.configuration?.rounds
                  );

                  const { roundEndUnix, roundStartUnix, isFinale, roundId } =
                    getCurrentWeekV3(
                      data?.configuration?.rounds,
                      data?.configuration?.starts,
                      data?.configuration?.challengeLength
                    );

                  const activeRounds = getRoundsForHome(
                    roundId,
                    data.configuration?.rounds
                  );

                  setAllRounds(
                    data.configuration?.rounds
                      ? data.configuration?.rounds.map((item) => item.id)
                      : []
                  );

                  setRounds(activeRounds);
                  setGameParams(params);
                  setMonthParams({
                    rangeDate,
                    sprintId,
                    nowObj,
                    defaultObj,
                    lastSprintId,
                  });
                  setWeekParams({
                    roundEndUnix,
                    roundStartUnix,
                    isFinale,
                    roundId,
                  });
                  setSelectedEvent(data);
                }

                setLoading(false);
              }
            }
          );

        return () => {
          if (unsub) {
            unsub();
            setSelectedEvent(undefined);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error", error);
    }
  }, [selectedEventId]);

  return {
    game,
    loading,
    gameParams,
    monthParams,
    weekParams,
    activeFutureRounds,
    allRounds,
  };
};
