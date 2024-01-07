import { dayRecommendation } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

const fetchRecommendationObject = async (date: string) => {
  const nutritionalBadgeId = useUserStore.getState().user?.nutritionBadgeId;
  const uid = useUserStore.getState().user?.uid;
  let recsRef: FirebaseFirestoreTypes.Query;
  if (nutritionalBadgeId) {
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

      return recsData[0];
    }
  }
};

export default fetchRecommendationObject;
