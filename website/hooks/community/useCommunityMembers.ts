import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { onSnapshot, where, query, collection } from "firebase/firestore";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

export const useCommunityMembers = (communityId: string) => {
  const [members, setMembers] = useState<LeaderBoard[]>([]);
  useEffect(() => {
    const getMembers = async () => {
      try {
        const leaderRef = collection(db, "leaderBoard");
        const q = query(
          leaderRef,
          where("enrolledCommunities", "array-contains", communityId)
        );

        const unsubscribe = onSnapshot(q, (mems) => {
          if (mems.docs.length > 0) {
            const remMems: LeaderBoard[] = [];
            for (const mem of mems.docs) {
              remMems.push(mem.data() as LeaderBoard);
            }

            setMembers(remMems);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log("error", error);
      }
    };

    getMembers();
  }, [communityId]);

  return {
    members,
  };
};
