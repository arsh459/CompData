import { UserInterface } from "@models/User/User";
import { useEffect, useState } from "react";

export interface ConfigTargets {
  dailyStepTarget?: number;

  dietBadgeId?: string;
  workoutTimeStr?: string;
  workoutBadgeId?: string;
  nutritionStart?: number;
  workoutStart?: number;
  challengeStart?: number;
}
export type numberFieldKeyType =
  | "dailyStepTarget"
  | "dailyKCalTarget"
  | "dailyCarbTarget"
  | "dailyFiberTarget"
  | "dailyFatTarget";
export const useUserConfigTargets = (user?: UserInterface) => {
  const [localConfig, setLocalConfig] = useState<ConfigTargets>();
  const [selectDateNSD, setSelectDateNSD] = useState<Date>(
    user?.recommendationConfig?.nutritionStart
      ? new Date(user?.recommendationConfig?.nutritionStart)
      : new Date()
  );
  const [selectDateCSD, setSelectDateCSD] = useState<Date>(
    user?.challengeJoined ? new Date(user?.challengeJoined) : new Date()
  );
  const [selectDateWSD, setSelectDateWSD] = useState<Date>(
    user?.recommendationConfig?.start
      ? new Date(user?.recommendationConfig?.start)
      : new Date()
  );

  // const [initLoad, setInitLoad] = useState<boolean>(false);

  // console.log("name", localUser?.name, localUser?.userKey, user?.userKey);

  const onBadgeIdUpdate = (badgeId: string) => {
    if (typeof badgeId === "string" && localConfig) {
      setLocalConfig({
        ...localConfig,
        workoutBadgeId: badgeId,
      });
    }
  };
  const onWorkoutTimeStrUpdate = (val: string) => {
    if (typeof val === "string" && localConfig) {
      setLocalConfig({
        ...localConfig,
        workoutTimeStr: val,
      });
    }
  };

  const onNutritionBadgeIdUpdate = (badgeId: string) => {
    if (typeof badgeId === "string" && localConfig) {
      setLocalConfig({
        ...localConfig,
        dietBadgeId: badgeId,
      });
    }
  };

  const onNumberFieldsUpdate = (newVal: number, key: numberFieldKeyType) => {
    // console.log("new value here", newVal);

    // console.log("new value", newVal);
    setLocalConfig((p) => {
      if (p) return { ...p, [key]: newVal };
    });
  };

  useEffect(() => {
    setLocalConfig((prev) => {
      return {
        ...prev,
        dailyStepTarget: user?.dailyStepTarget ? user?.dailyStepTarget : 0,
        dailyKCalTarget: user?.dailyKCalTarget ? user?.dailyKCalTarget : 0,
        workoutBadgeId: user?.badgeId,
        dietBadgeId: user?.nutritionBadgeId,
        challengeStart: user?.challengeJoined,
        workoutStart: user?.recommendationConfig?.start,
        nutritionStart: user?.recommendationConfig?.nutritionStart,
        workoutTimeStr: user?.recommendationConfig?.workoutTimeStr,
      };
    });
  }, [
    user?.badgeId,
    user?.nutritionBadgeId,
    user?.dailyStepTarget,
    user?.dailyKCalTarget,
    user?.recommendationConfig?.nutritionStart,
    user?.challengeJoined,
    user?.recommendationConfig?.start,
    user?.recommendationConfig?.workoutTimeStr,
  ]);

  return {
    localConfig,
    onBadgeIdUpdate,

    onNumberFieldsUpdate,

    onNutritionBadgeIdUpdate,
    onWorkoutTimeStrUpdate,
    selectDateCSD,
    selectDateNSD,
    selectDateWSD,
    setSelectDateCSD,
    setSelectDateNSD,
    setSelectDateWSD,
  };
};
