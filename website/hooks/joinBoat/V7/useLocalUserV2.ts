import { UserInterface } from "@models/User/User";
import { useEffect, useState } from "react";
import { LocalUser, numberFieldKeyType } from "./interface";

export const useLocalUserV2 = (user?: UserInterface) => {
  const [localUser, setLocalUser] = useState<LocalUser>();

  useEffect(() => {
    setLocalUser((prev) => {
      return {
        ...prev,
        uid: user?.uid,
        name: user?.name,
        age: user?.age,
        height: user?.height,
        weight: user?.weight,
        email: user?.email,
        phone: user?.phone,
        onboarded: user?.onboarded,
        accurateGoal: user?.accurateGoal,
        pastUsedMethod: user?.pastUsedMethod,
        isOkWithPaidPlan: user?.isOkWithPaidPlan,
        dailyHealthIssues: user?.dailyHealthIssues,
        howBusy: user?.howBusy,
      };
    });
  }, [
    user?.uid,

    user?.name,

    user?.age,
    user?.height,
    user?.weight,
    user?.email,
    user?.phone,
    user?.onboarded,
    user?.accurateGoal,
    user?.pastUsedMethod,
    user?.isOkWithPaidPlan,
    user?.dietForm,
    user?.howBusy,
    user?.dailyHealthIssues,
  ]);

  const onNameUpdate = (newName: string) => {
    setLocalUser((prev) => {
      if (prev && typeof newName === "string") {
        return { ...prev, name: newName };
      }
    });
  };
  const onEmailUpdate = (newName: string) => {
    setLocalUser((prev) => {
      if (prev && typeof newName === "string") {
        return { ...prev, email: newName };
      }
    });
  };

  const onNumberFieldsUpdate = (newVal: number, key: numberFieldKeyType) => {
    setLocalUser((prev) => {
      return { ...prev, [key]: newVal };
    });
  };

  return {
    localUser,
    onNameUpdate,
    onNumberFieldsUpdate,
    onEmailUpdate,
    setLocalUser,
  };
};
