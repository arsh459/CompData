import { useCallback, useEffect, useState } from "react";
// import { db } from "config/firebase";
// import { doc, onSnapshot } from "firebase/firestore";
import {
  fitnessGoalKeys,
  fitnessGoalObj,
  genderType,
  UserInterface,
} from "@models/User/User";
import { onboardUserSections } from "@templates/joinBoatTemplate/JoinBoatTemplate";

export const useLocalUser = (user?: UserInterface) => {
  const [localUser, setLocalUser] = useState<UserInterface | undefined>();

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const onUpdateHeight = useCallback((ht: number, inch: number) => {
    setLocalUser((prev) => {
      if (prev)
        return {
          ...prev,
          height: ht * 30.48 + inch * 2.54,
        };
    });
  }, []);

  const onUpdate = (
    cur: onboardUserSections,
    value: string | fitnessGoalObj | undefined | genderType | number
  ) => {
    if (
      cur === "age" ||
      // cur === "height" ||
      cur === "weight" ||
      cur === "name" ||
      cur === "instagramHandle" ||
      cur === "fitnessGoalText"
    ) {
      setLocalUser((prev) => {
        if (prev)
          return {
            ...prev,
            [cur]: value,
          };
      });
    } else if (user && cur === "gender" && value) {
      setLocalUser((prev) => {
        if (prev)
          return {
            ...prev,
            gender: value as genderType,
          };
      });
    } else if (user && cur === "fitnessGoals" && typeof value === "string") {
      setLocalUser((prev) => {
        if (prev)
          return {
            ...prev,
            fitnessGoals: {
              ...prev.fitnessGoals,
              [value]:
                prev.fitnessGoals && prev.fitnessGoals[value as fitnessGoalKeys]
                  ? false
                  : true,
            },
          };
      });
    }
  };

  // console.log("authStatus", authStatus);

  return {
    localUser,
    onUpdate,
    onUpdateHeight,
  };
};
