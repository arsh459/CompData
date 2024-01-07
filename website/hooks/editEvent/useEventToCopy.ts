import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { copyChallengeForCreator } from "@models/Event/challengeInvite";
import { useRouter } from "next/router";
import { editChallengeQuery } from "@hooks/drawer/interface";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

export const useEventTopCopy = (uid?: string) => {
  const [remoteEvent, setRemoteEvent] = useState<EventInterface>();
  const [toCopyEvent, setToCopyEvent] = useState<EventInterface>();
  // const [baseLeader, setBaseLeader] = useState<LeaderBoard>();

  const router = useRouter();
  const q = router.query as editChallengeQuery;

  useEffect(() => {
    const getRemoteEvent = async () => {
      if (uid && q.eventId && router.isReady) {
        const remoteData = await getDoc(doc(db, "sbEvents", q.eventId));
        const data = remoteData.data() as EventInterface | undefined;

        // console.log("data", data);
        // if event exists;
        if (data) {
          // const leader = await getDoc(
          //   doc(db, "leaderBoard", `leader-${data?.ownerUID}`)
          // );

          // if (leader) {
          const copiedEvent = copyChallengeForCreator(data, uid, [], "");

          setRemoteEvent(data);
          setToCopyEvent(copiedEvent);
          // setBaseLeader(leader.data() as LeaderBoard | undefined);
          // }

          // setCurrentEvent(data);
        }
      }
    };

    getRemoteEvent();
  }, [q.eventId, uid, router.isReady]);

  return {
    remoteEvent,
    toCopyEvent,
    setToCopyEvent,
    // baseLeader,
  };
};
