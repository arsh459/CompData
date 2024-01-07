import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

// import { db } from "@config/firebase";

// import {
//   onSnapshot,
//   orderBy,
//   query,
//   doc,
//   collection,
//   limit,
// } from "firebase/firestore";
import { UserRank } from "@models/Activity/Activity";
import { handleRankPagination } from "@utils/ranking/utils";

export type leaderboardActions = string | "i";
export type tabs = "Coaches" | "Players" | "My Team";

export const useEventRanks = (
  eventId?: string,
  communityId?: string,

  // selectedLeaderboard?: leaderboardKPIs,
  initNumUsers?: number,
  leaderboardWeek?: string,
  leaderboardMonth?: string,
  // after?: number,
  myUserRank?: UserRank,
  lpg?: string,
  ls?: leaderboardActions,
  setLpg?: (val: string) => void,
  setLs?: (val: leaderboardActions) => void
  // queryChange?: (
  //   querry: communityQueryV3,
  //   replace?: true,
  //   merge?: boolean
  // ) => void
) => {
  const [rankMembers, setRankMembers] = useState<UserRank[]>([]);
  // const [action, setAction] = useState<"REFRESH" | "NEXT_PAGE">("REFRESH");
  const [rankObj, setRankObj] = useState<{ [uid: string]: boolean }>({});
  // const [refresh, setRefresh] = useState<number>(0);
  // const [fetched, setFetched] = useState<boolean>(false);
  // const [tabValue, setTabValue] = useState<tabs>("Players");
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  // const [coaches, setCoachObj] = useState<{ [uid: string]: LeaderBoard }>({});

  // const [numUsers, setNumUsers] = useState<number>(
  //   initNumUsers ? initNumUsers : 10
  // );
  const [nextExists, setNextExists] = useState<boolean>(false);

  // const { weekString } = useCurrentWeek(after);

  // useEffect(() => {
  //   const fetchCoaches = async () => {
  //     const tmpCoachObj: { [uid: string]: LeaderBoard } = {};
  //     for (const member of rankMembers) {
  //       if (!tmpCoachObj[member.coachCommunityId]) {
  //         const ref = doc(
  //           db,
  //           "leaderBoard",
  //           `leader-${member.coachCommunityId}`
  //         );
  //         const remoteDoc = await getDoc(ref);

  //         if (remoteDoc) {
  //           tmpCoachObj[member.coachCommunityId] =
  //             remoteDoc.data() as LeaderBoard;
  //         }
  //       }
  //     }

  //     setCoachObj(tmpCoachObj);
  //   };

  //   if (fetched) {
  //     fetchCoaches();
  //   }
  // }, [fetched, rankMembers]);

  useEffect(() => {
    // const now = Date.now();

    if (eventId) {
      // setLoading(true);
      const rankRef = firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("userRanks");
      // const rankRef = collection(doc(db, "sbEvents", eventId), "userRanks");

      const orderRankRef = rankRef.orderBy(
        leaderboardWeek === "overall"
          ? `monthlyRank.${leaderboardMonth}`
          : `weeklyRank.${leaderboardWeek}`,
        "asc"
      );

      // const orderConstraint = orderBy(
      //   leaderboardWeek === "overall"
      //     ? `monthlyRank.${leaderboardMonth}`
      //     : `weeklyRank.${leaderboardWeek}`,
      //   "asc"
      // );

      // let q = undefined;
      // if (after && after > now && tabValue === "Players") {
      //   q = query(rankRef, orderBy("rank", "asc"), limit(numUsers));
      // } else

      const num = lpg ? parseInt(lpg) * 25 : 10;
      const action = ls && ls === "i" ? "next_page" : "refresh";

      // if (tabValue === "Players") {
      const q = orderRankRef.limit(num);

      // q = query(rankRef, orderConstraint, limit(num));

      // }

      // else if (tabValue === "My Team" && communityId) {
      //   q = query(
      //     rankRef,
      //     where("coachCommunityId", "==", communityId)
      //   );
      // }

      if (q) {
        const unsub = q.onSnapshot((ranks) => {
          const userRankObjs: UserRank[] = [];
          const rankDict: { [uid: string]: boolean } = {};

          // let fromCache: boolean = false;
          // let prevRank: number = 0;
          for (const rank of ranks.docs) {
            const rankData = rank.data() as UserRank;

            // const rankNow = rankData

            // if (!rank.metadata.fromCache) {
            userRankObjs.push(rankData);
            rankDict[rankData.uid] = true;
            // }
          }

          // sort only for team
          // if (tabValue === "My Team") {
          //   userRankObjs.sort(
          //     (a, b) =>
          //       getRank(a, leaderboardWeek, leaderboardMonth) -
          //       getRank(b, leaderboardWeek, leaderboardMonth)
          //   );
          // }

          setRankObj(rankDict);
          setNextExists(userRankObjs.length === num);
          setFetching(false);

          setRankMembers((prev) => {
            return handleRankPagination(
              prev,
              myUserRank,
              rankDict,
              userRankObjs,
              action
            ) as UserRank[];
          });
          setTimeout(() => setLoading(false), 500);
        });

        return () => {
          if (unsub) {
            unsub();
            console.log("unmounting");
            // setLoading(false);
            // setRankObj({});
            // setFetched(true);
            // setRankMembers([]);
          }
        };
      }
    } else if (!eventId) {
      console.log("setting to zero");
      // setRankObj({});
      // setFetched(true);
      // setRankMembers([]);
      // setLoading(false);
    }
    // };
    // if (tabValue !== "Coaches") getEventRanks();
  }, [
    eventId,
    // tabValue,
    // numUsers,
    communityId,
    // after,
    leaderboardWeek,
    leaderboardMonth,
    myUserRank,
    lpg,
    ls,
    // weekString,
  ]);

  // const router = useRouter()

  const onNext = () => {
    if (setLpg && setLs && !fetching) {
      setFetching(true);
      setLpg(lpg ? `${parseInt(lpg) + 1}` : "2");
      setLs("i");
    }
  };

  // const { rankCoaches, loadingCoaches } = useEventCoaches(
  //   eventId,
  //   tabValue === "Coaches",
  //   leaderboardWeek,
  //   leaderboardMonth,
  //   after
  // );

  return {
    rankMembers,
    // setAction,
    // rankCoaches,
    rankObj,
    // coaches,
    // tabValue,
    // setTabValue,
    onNext,
    nextExists,
    loading,
    setRankMembers,
    // onRefresh,
    // loadingCoaches,
  };
};
