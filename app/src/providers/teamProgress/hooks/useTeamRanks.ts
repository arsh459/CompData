import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { UserRank } from "@models/Activity/Activity";

export type tabs = "Coaches" | "Players" | "My Team";

export const useTeamRanks = (gameId?: string, ownerUID?: string) => {
  const [rankMembers, setRankMembers] = useState<UserRank[]>([]);

  useEffect(() => {
    // const now = Date.now();

    if (gameId && ownerUID) {
      // setLoading(true);
      const rankRef = firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("userRanks")
        .where("coachCommunityId", "==", ownerUID);

      const unsub = rankRef.onSnapshot((ranks) => {
        const userRankObjs: UserRank[] = [];
        for (const rank of ranks.docs) {
          const rankData = rank.data() as UserRank;
          userRankObjs.push(rankData);
        }

        //   setRankObj(rankDict);
        setRankMembers(userRankObjs);
        // setFetching(false);
        // setTimeout(() => setLoading(false), 500);
      });

      return () => {
        if (unsub) {
          unsub();
          // setLoading(false);
          // setRankObj({});
          // setFetched(true);
          // setRankMembers([]);
        }
      };
    }

    // };
    // if (tabValue !== "Coaches") getEventRanks();
  }, [
    gameId,
    // tabValue,
    // numUsers,
    ownerUID,
    // weekString,
  ]);

  // const router = useRouter()

  return {
    rankMembers,
  };
};
