import { TeamRequest } from "@models/Notifications/interface";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useTeamJoinRequest = (
  gameId: string,
  requesterId?: string,
  teamId?: string
) => {
  const [myRequests, setRemoteRequests] = useState<TeamRequest[]>([]);

  useEffect(() => {
    if (teamId && requesterId && gameId) {
      const ref = firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("joinRequests")
        .where("requestedBy", "==", requesterId)
        .where("teamId", "==", teamId)
        .where("state", "==", "PENDING");

      ref.onSnapshot((docs) => {
        if (docs) {
          const requestsToJoin: TeamRequest[] = [];
          for (const doc of docs.docs) {
            requestsToJoin.push(doc.data() as TeamRequest);
          }

          setRemoteRequests(requestsToJoin);
        } else {
          setRemoteRequests([]);
        }
      });
    }
  }, [gameId, requesterId, teamId]);

  return { myRequests };
};
