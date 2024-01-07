import { dayRecommendation } from "@models/User/User";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { DIETPLAN_NOT_AVAILABLE } from "@utils/GptToolsFunction/functions/constants/errorConstants";
import { fetchTasksbyRecTasks } from "../../tasks/nutrition/fetchTasksByRecTasks";

export const fetchRecommendations = async (
  uid: string,
  nutritionalBadgeId: string,
  date: string
) => {
  let recsRef: FirebaseFirestoreTypes.Query;
  recsRef = firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("type", "==", "nutrition")
    .where("badgeId", "==", nutritionalBadgeId)
    .where("date", "==", date);

  const docs = await recsRef.get();
  if (docs && docs.docs.length) {
    const recsData = docs.docs.map((eachDoc) => {
      return eachDoc.data() as dayRecommendation;
    });

    const tasks = await fetchTasksbyRecTasks(recsData[0].tasks);

    if (tasks.length) {
      return tasks;
    }
  }

  return DIETPLAN_NOT_AVAILABLE;
};
