import { createJoinRequest } from "@models/Notifications/createUtils";
import firestore from "@react-native-firebase/firestore";
import axios from "axios";
import crashlytics from "@react-native-firebase/crashlytics";

export const askToJoinTeam = async (
  teamId: string,
  toLeader: string,
  requester: string,
  gameId: string
) => {
  // create notification
  const request = createJoinRequest(toLeader, requester, teamId);

  // set request
  await firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("joinRequests")
    .doc(request.id)
    .set(request);
};

export const acceptInvite = async (
  // oldTeamId: string,
  newTeamId: string,
  uid: string,
  gameId: string
) => {
  try {
    await axios({
      url: "https://asia-south1-holidaying-prod.cloudfunctions.net/moveUserToOtherTeam",
      method: "POST",
      data: {
        uid,
        // oldTeamId,
        newTeamId,
        gameId,
      },
    });

    return "success";
  } catch (error: any) {
    crashlytics().recordError(error);
    console.log("error");
    return "error";
  }
};

export const rejectInvite = async (gameId: string, requestId: string) => {
  // reject request request
  await firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("joinRequests")
    .doc(requestId)
    .update({
      state: "REJECTED",
    });
};
