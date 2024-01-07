import { format } from "date-fns";
import firestore from "@react-native-firebase/firestore";
export const checkFutureRecs = (uid: string, badgeId: string, unix: number) => {
  try {
    const date = format(new Date(unix), "yyyy-MM-dd");
    firestore()
      .collection("users")
      .doc(uid)
      .collection("dayRecommendations")
      .where("date", "==", date)
      .where("type", "==", "nutrition")
      .where("badgeId", "==", badgeId)
      .get()
      .then((res) => {
        if (res.docs.length === 0) {
          return "Your diet plan is not available for particuar date.You can not do anything with it. Please check for another date less than this.";
        } else {
          return undefined;
        }
      });
  } catch (error) {
    return "Your diet plan is not available for particuar date.You can not do anything with it. Please check for another date less than this. ";
  }
};
