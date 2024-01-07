import { TeamRequest } from "@models/Notifications/interface";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useJoinRequestsForOwner = (gameId: string, ownerUID?: string) => {
  const [remoteRequests, setRemoteRequests] = useState<TeamRequest[]>([]);

  useEffect(() => {
    if (ownerUID && gameId) {
      const ref = firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("joinRequests")
        .where("requestedTo", "==", ownerUID)
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
  }, [gameId, ownerUID]);

  return { remoteRequests };
};
