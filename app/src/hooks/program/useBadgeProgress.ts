import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { BadgeProgress } from "@models/Prizes/Prizes";

export interface BadgeSummaryPerf {
  nbWorkouts: number;
  nbWorkoutsDone: number;
  fp: number;
  fpDone: number;
}

export const useBadgeProgress = (badgeId?: string) => {
  const { state } = useAuthContext();

  const [progress, setProgress] = useState<BadgeProgress>();
  const [summaryProgress, setSummaryProgress] = useState<BadgeSummaryPerf>();
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    const getBadgeProgress = async () => {
      if (state.uid && badgeId && state.gameId) {
        const userBadgeProg = await firestore()
          .collection("sbEvents")
          .doc(state.gameId)
          .collection("badges")
          .doc(badgeId)
          .collection("badgeProgress")
          .doc(state.uid)
          .get();

        if (!userBadgeProg.data()) {
          const newBadgeProgress: BadgeProgress = {
            uid: state.uid,
            currentDay: 0,
            progress: [],
          };

          await firestore()
            .collection("sbEvents")
            .doc(state.gameId)
            .collection("badges")
            .doc(badgeId)
            .collection("badgeProgress")
            .doc(state.uid)
            .set(newBadgeProgress);

          setRefresh((p) => p + 1);
        }
      }
    };

    getBadgeProgress();
  }, [state.uid, badgeId, state.gameId]);

  useEffect(() => {
    if (state.uid && badgeId) {
      const badgeProgDoc = firestore()
        .collection("sbEvents")
        .doc(state.gameId)
        .collection("badges")
        .doc(badgeId)
        .collection("badgeProgress")
        .doc(state.uid);

      const unsub = badgeProgDoc.onSnapshot((doc) => {
        if (doc?.exists) {
          const prog = doc.data() as BadgeProgress | null;
          if (prog) {
            const remSummary: BadgeSummaryPerf = {
              nbWorkouts: 0,
              nbWorkoutsDone: 0,
              fp: 0,
              fpDone: 0,
            };
            prog.progress.map((item) => {
              remSummary.fp += item.nbFitpoints;
              remSummary.fpDone += item.nbFPEarnt;
              remSummary.nbWorkouts += item.nbWorkouts;
              remSummary.nbWorkoutsDone += item.nbWorkoutsDone;
            });

            setSummaryProgress(remSummary);
            setProgress(prog);
          }
        }
      });

      return () => {
        unsub();
      };
    }
  }, [state.uid, state.gameId, refresh]);

  return {
    progress,
    summaryProgress,
  };
};
