import { useEffect } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { UserRankV2 } from "@models/Rounds/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export const useUserRankStore = () => {
  const { lvlId, uid, setUserRank } = useUserStore((state) => {
    if (state.user?.userLevelV2) {
      const lvlStr = `${state.user.userLevelV2}`;

      return {
        lvlId: state.levelsCache[lvlStr]
          ? state.levelsCache[lvlStr].id
          : undefined,
        uid: state.user.uid,
        setUserRank: state.setUserRank,
      };
    }

    return {};
  }, shallow);

  useEffect(() => {
    if (lvlId && uid)
      try {
        const q = firestore()
          .collection("sbEvents")
          .doc(TEAM_ALPHABET_GAME)
          .collection("level")
          .doc(lvlId)
          .collection("userRanksV2")
          .doc(uid);

        const unsub = q.onSnapshot((querySnapshot) => {
          const remoteUserRank = querySnapshot.data() as UserRankV2;

          //   setRank(remoteUserRank);
          setUserRank(remoteUserRank);
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
  }, [uid, lvlId]);
};