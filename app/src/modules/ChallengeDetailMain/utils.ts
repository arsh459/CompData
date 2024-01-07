import firestore from "@react-native-firebase/firestore";
import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";

export const joinChallengeFunc = async (uid: string) => {
  await axios({
    url: `${BACKEND_URL}/rankUser`,
    method: "POST",
    data: {
      uid,
    },
    params: {
      uid,
    },
  });

  await firestore().collection("users").doc(uid).update({
    challengeJoined: Date.now(),
  });
};
