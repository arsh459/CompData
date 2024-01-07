import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { onSnapshot, where, query, collection } from "firebase/firestore";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

export const useSelectCommunityMembers = (communityId: string) => {
  const [members, setMembers] = useState<LeaderBoard[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<{
    [communityId: string]: boolean;
  }>({});
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
            const remMembersObj: { [communityId: string]: boolean } = {};
            for (const mem of mems.docs) {
              const user = mem.data() as LeaderBoard;
              remMems.push(user);
              remMembersObj[user.uid] = true;
            }

            setMembers(remMems);
            setSelectedMembers(remMembersObj);
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

  const onMemberTap = (memberUID: string) => {
    if (selectedMembers[memberUID]) {
      const { [memberUID]: _, ...rest } = selectedMembers;
      setSelectedMembers(rest);
    } else {
      setSelectedMembers({
        ...selectedMembers,
        [memberUID]: true,
      });
    }
  };

  return {
    members,
    selectedMembers,
    onMemberTap,
  };
};
