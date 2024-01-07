import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { MealTypes } from "@models/Tasks/Task";
import { dayRecommendation } from "@models/User/User";

export const useRecommendationById = (
  dayRecommendationId?: string,
  taskId?: string
) => {
  const [taskMealType, setTaskMealType] = useState<MealTypes>();
  const { uid } = useUserStore((state) => ({
    uid: state.user?.uid,
  }));

  useEffect(() => {
    const fetchRecs = async () => {
      if (dayRecommendationId && uid && taskId) {
        const recs = await firestore()
          .collection("users")
          .doc(uid)
          .collection("dayRecommendations")
          .doc(dayRecommendationId)
          .get();

        if (recs) {
          let dayRecommendationObject = recs.data() as dayRecommendation;
          let taskRecArray = dayRecommendationObject.tasks;
          taskRecArray.forEach((item) => {
            if (taskId === item.id && item.overrideMealType) {
              setTaskMealType(item.overrideMealType);
            }
          });
        }
      }
    };

    fetchRecs();
  }, [dayRecommendationId, uid, taskId]);

  return {
    taskMealType,
  };
};
