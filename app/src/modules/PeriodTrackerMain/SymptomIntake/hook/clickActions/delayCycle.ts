import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";
import firestore from "@react-native-firebase/firestore";

export const delayCycle = async (uid: string, cycleId: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("cycles")
    .doc(cycleId)
    .update({
      delayLength: firestore.FieldValue.increment(5),
    });

  await axios({
    url: `${BACKEND_URL}/delayCycle`,
    method: "POST",
    params: { uid },
    data: { uid },
  });
};
