import * as admin from "firebase-admin";
import { TeamRequest } from "./interface";

export const getAllTeamRequests = async (gameId: string, uid: string) => {
  const requests = await admin
    .firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("joinRequests")
    .where("requestedBy", "==", uid)
    .get();

  const userReqs: TeamRequest[] = [];
  for (const request of requests.docs) {
    if (request.exists) {
      userReqs.push(request.data() as TeamRequest);
    }
  }

  return userReqs;
};

export const updateRequest = (
  batch: FirebaseFirestore.WriteBatch,
  gameId: string,
  requestId: string,
  status: "ACCEPTED" | "REJECTED" | "EXPIRED",
) => {
  batch.update(
    admin
      .firestore()
      .collection("sbEvents")
      .doc(gameId)
      .collection("joinRequests")
      .doc(requestId),
    { state: status },
  );
};
