import { BodyTypesId } from "@constants/Avatar/utils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { numberFieldKeyType } from "@models/User/updateUtils";
import {
  difficulty,
  fcsTypes,
  fitnessGoalTypes,
  genderType,
  UserInterface,
  // workoutLocation,
} from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useCallback, useEffect, useState } from "react";

export interface LocalUser {
  name?: string;
  phone?: string;
  gender?: genderType;
  height?: number;
  weight?: number;
  desiredWeight?: number;
  currentBodyType?: BodyTypesId;
  desiredBodyType?: BodyTypesId;
  profileImage?: CloudinaryMedia | AWSMedia;
  email?: string;
  difficulty?: difficulty;
  bio?: string;
  fitnessGoal?: fitnessGoalTypes[];
  repsCount?: number;
  paceOfAchievementInMonth?: number;
  fitnessConcerns?: fcsTypes[];
  uid?: string;
}

export const useLocalUserV2 = (user?: UserInterface) => {
  const [localUser, setLocalUser] = useState<LocalUser>();
  // const [initLoad, setInitLoad] = useState<boolean>(false);

  // const onKeyChange = (newKey: string) => {
  //   if (localUser) {
  //     setLocalUser({
  //       ...localUser,
  //       name: newKey,
  //       userKey: newKey,
  //     });
  //   }
  // };
  useEffect(() => {
    // if (!initLoad) {
    setLocalUser((prev) => {
      return {
        ...prev,
        name: user?.name,
        phone: user?.phone,
        gender: user?.gender || "female",
        profileImage: user?.profileImage,
        email: user?.email,
        difficulty: user?.difficulty,
        bio: user?.bio,
        fitnessGoal: user?.fitnessGoal,
        weight: user?.weight,
        desiredWeight: user?.desiredWeight,
        currentBodyType: user?.currentBodyType,
        desiredBodyType: user?.desiredBodyType,
        height: user?.height,
        repsCount: user?.repsCount,
        paceOfAchievementInMonth: user?.paceOfAchievementInMonth,
        fitnessConcerns: user?.fitnessConcerns,
        uid: user?.uid,
      };
    });
    // user && setInitLoad(true);
    // }
  }, [
    user?.name,
    user?.phone,
    user?.gender,
    user?.profileImage,
    user?.email,
    user?.difficulty,
    user?.bio,
    user?.fitnessGoal,
    user?.weight,
    user?.height,
    user?.desiredWeight,
    user?.repsCount,
    user?.paceOfAchievementInMonth,
    user?.fitnessConcerns,
    user?.uid,
    user?.currentBodyType,
    user?.desiredBodyType,
  ]);

  const onCurrentBodyTypeUpdate = useCallback((value: BodyTypesId) => {
    setLocalUser((prev) => {
      if (prev)
        return {
          ...prev,
          currentBodyType: value,
          desiredBodyType:
            prev?.currentBodyType === value ? prev.desiredBodyType : undefined,
        };
    });

    weEventTrack("fScanBodyType_changeCurrentBodyType", {
      currentBodyType: value,
    });
  }, []);

  const onDesiredBodyTypeUpdate = useCallback(
    (id: BodyTypesId, level: difficulty, pace: number) => {
      setLocalUser((prev) => {
        if (prev)
          return {
            ...prev,
            desiredBodyType: id,
            difficulty: level,
            paceOfAchievementInMonth: pace,
          };
      });

      weEventTrack("fScanBodyType_changeDesiredBodyType", {
        desiredBodyType: id,
        difficulty: level,
        paceOfAchievementInMonth: pace,
      });
    },

    []
  );

  const onNameUpdate = (newName: string) => {
    if (typeof newName === "string" && localUser) {
      setLocalUser({
        ...localUser,
        name: newName,
      });
    }
  };

  const onPhoneUpdate = (phone: string) => {
    if (typeof phone === "string" && localUser) {
      setLocalUser({
        ...localUser,

        phone,
      });
    }
  };

  const onGenderUpdate = (gender: genderType) => {
    if (localUser) {
      setLocalUser({
        ...localUser,
        gender,
      });

      // update gender
      weEventTrack("fScanGender_changeGender", { gender: gender });
    }
  };

  // const onInstaUpdate = (newVal: string) => {
  //   if (typeof newVal === "string" && localUser)
  //     setLocalUser({
  //       ...localUser,
  //       instagramHandle: newVal,
  //     });
  // };

  const onEmailUpdate = (newVal: string) => {
    if (typeof newVal === "string" && localUser)
      setLocalUser({
        ...localUser,
        email: newVal,
      });
  };

  const onBioUpdate = (newVal: string) => {
    if (typeof newVal === "string" && localUser)
      setLocalUser({
        ...localUser,
        bio: newVal,
      });
  };

  const onGoalUpdate = (newVal: fitnessGoalTypes) => {
    if (localUser) {
      setLocalUser({ ...localUser, fitnessGoal: [newVal] });
      weEventTrack("fScanGoal_changeGoal", { goal: newVal });
    }
  };

  // const onLocationUpdate = (newVal: workoutLocation[]) => {
  //   if (localUser) {
  //     setLocalUser({ ...localUser, preferredWorkoutLocation: newVal });
  //   }
  // };

  const onDifficultyUpdate = (newVal: difficulty) => {
    setLocalUser((p) => {
      if (p) return { ...p, difficulty: newVal };
    });
  };

  const onNumberFieldsUpdate = (newVal: number, key: numberFieldKeyType) => {
    setLocalUser((p) => {
      if (p) return { ...p, [key]: newVal };
    });
  };

  const uploadProfileImg = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setLocalUser((prev) => {
        if (prev && newFiles.length) {
          return {
            ...prev,
            profileImage: newFiles[0],
          };
        }
      });
    },
    []
  );

  const removeProfileImg = async () => {
    if (user?.uid) {
      setLocalUser((prev) => {
        if (prev) {
          const { profileImage, ...rest } = prev;
          return {
            ...rest,
          };
        }
      });
    }
  };

  const onFCLocalUpdate = (fc: fcsTypes[]) => {
    setLocalUser((p) => {
      if (p) return { ...p, fitnessConcerns: fc };
    });
  };

  return {
    localUser,
    setLocalUser,
    onNameUpdate,
    onPhoneUpdate,
    onGenderUpdate,
    uploadProfileImg,
    removeProfileImg,
    onEmailUpdate,
    onBioUpdate,
    onGoalUpdate,
    onFCLocalUpdate,
    onNumberFieldsUpdate,
    onDifficultyUpdate,
    onCurrentBodyTypeUpdate,
    onDesiredBodyTypeUpdate,
  };
};
