import firestore from "@react-native-firebase/firestore";
import { Activity } from "./Activity";

export const getStepActivitiesToday = async (
  uid: string,
  start: number,
  end: number
) => {
  const allActivities = await firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", start)
    .where("createdOn", "<=", end)
    .where("stepsActive", "==", true)
    .get();

  const acts: Activity[] = [];
  for (const act of allActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};
