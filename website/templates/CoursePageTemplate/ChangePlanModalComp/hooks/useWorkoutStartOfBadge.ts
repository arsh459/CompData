import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import { getStartTime } from "@modules/ProPlanModule/utils";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const useWorkoutStartOfBadge = (badge: Badge, user: UserInterface) => {
  const [workoutStartOfBadge, setWorkoutStartOfBadge] = useState<Date>(
    new Date()
  );

  useEffect(() => {
    const stTime = getStartTime(user, badge?.id, "workout");
    if (stTime) {
      setWorkoutStartOfBadge(new Date(stTime));
    }
  }, [badge?.id, user]);

  const onSaveWorkoutStartOfBadge = async () => {
    if (user?.uid && badge?.id) {
      const start = workoutStartOfBadge.getTime();

      await updateDoc(doc(db, "users", user.uid), {
        [`recommendationConfig.badgeConfig.${badge.id}.start`]: start,
      });
    }
  };

  return {
    workoutStartOfBadge,
    setWorkoutStartOfBadge,
    onSaveWorkoutStartOfBadge,
  };
};
