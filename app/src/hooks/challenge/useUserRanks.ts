import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { UserRankV2 } from "@models/Rounds/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export const useUserRanks = (myId?: string) => {
  const { levelId, fetch } = useUserStore((state) => {
    const usrLevel = state.user?.userLevelV2 ? state.user?.userLevelV2 : 1;

    if (
      state.levelsCache &&
      state.selectedLevelNumString &&
      state.levelsCache[state.selectedLevelNumString]
    ) {
      if (
        state.levelsCache[state.selectedLevelNumString].lvlNumber === usrLevel
      ) {
        return {
          levelId: state.levelsCache[state.selectedLevelNumString].id,
          fetch: "done",
        };
      } else {
        return {
          levelId: state.levelsCache[state.selectedLevelNumString].id,
          fetch: "done",
        };
      }
    }

    return {
      fetch: "fetching",
    };
  }, shallow);

  const [userRanks, setUserRanks] = useState<UserRankV2[]>([]);
  const [intialFetch, setIntialFetch] = useState<boolean>(true);
  const [nextExists, setNextExists] = useState<boolean>(true);
  const [myRankIndex, setMyRankIndex] = useState<number[]>();
  const [limit, setLimit] = useState<number>(25);

  useEffect(() => {
    if (fetch === "done" && levelId) {
      try {
        const q = firestore()
          .collection("sbEvents")
          .doc(TEAM_ALPHABET_GAME)
          .collection("level")
          .doc(levelId)
          .collection("userRanksV2")
          .orderBy("rank", "asc")
          .limit(limit);

        const unsub = q.onSnapshot((querySnapshot) => {
          const newRtPosts: UserRankV2[] = [];

          for (const doc of querySnapshot.docs) {
            const { lvlBreakUp, ...remoteUserRank } = doc.data() as UserRankV2;

            if (remoteUserRank.uid === myId) {
              setMyRankIndex([newRtPosts.length]);
            }
            if (lvlBreakUp) {
              newRtPosts.push({ ...remoteUserRank, lvlBreakUp });
            }
            newRtPosts.push(remoteUserRank);
          }

          setNextExists(querySnapshot.docs.length === limit);
          setUserRanks(newRtPosts);
          setIntialFetch(false);
        });

        return () => {
          if (unsub) {
            unsub();
          }
        };
      } catch (error: any) {
        crashlytics().recordError(error);
        console.log("error", error);
      }
    } else if (fetch === "done") {
      setUserRanks([]);
      setIntialFetch(false);
    }
  }, [limit, myId, fetch, levelId]);

  const onNext = async () => {
    if (nextExists) {
      setLimit((prev) => prev + prev);
    }
  };

  return {
    myRankIndex,
    intialFetch,
    userRanks,
    onNext,
  };
};
