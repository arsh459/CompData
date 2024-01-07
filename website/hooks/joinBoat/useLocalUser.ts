import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import {
//   updateProfileImage,
//   removeProfileImage,
// } from "@models/User/updateUtils";
import {
  achievementPace,
  fitnessGoalTypes,
  UserInterface,
  workoutLocation,
} from "@models/User/User";
import { useCallback, useEffect, useState } from "react";

export const useLocalUser = (user: UserInterface) => {
  const [localUser, setLocalUser] = useState<UserInterface>();
  const [initLoad, setInitLoad] = useState<boolean>(false);
  const onKeyChange = (newKey: string) => {
    if (localUser)
      setLocalUser({
        ...localUser,
        userKey: newKey,
      });
  };

  const onNameUpdate = (newName: string) => {
    if (typeof newName === "string" && localUser)
      setLocalUser({
        ...localUser,
        name: newName,
      });
  };

  const onInstaUpdate = (newVal: string) => {
    if (typeof newVal === "string" && localUser)
      setLocalUser({
        ...localUser,
        instagramHandle: newVal,
      });
  };

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

  const onGoalUpdate = (newVal: fitnessGoalTypes[]) => {
    if (localUser) {
      setLocalUser({ ...localUser, fitnessGoal: newVal });
    }
  };

  const onLocationUpdate = (newVal: workoutLocation[]) => {
    if (localUser) {
      setLocalUser({ ...localUser, preferredWorkoutLocation: newVal });
    }
  };

  const onPaceUpdate = (newVal: achievementPace) => {
    if (localUser) {
      setLocalUser({ ...localUser, paceOfAchievement: newVal });
    }
  };

  const uploadProfileImg = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      // if (user?.uid) {
      setLocalUser((prev) => {
        if (prev && newFiles.length) {
          return {
            ...prev,
            profileImage: newFiles[0],
          };
        }
      });

      // }
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

  useEffect(() => {
    if (!initLoad) {
      setLocalUser(user);
      setInitLoad(true);
    }
  }, [user, initLoad]);

  return {
    localUser,
    onNameUpdate,
    uploadProfileImg,
    removeProfileImg,
    onKeyChange,
    onInstaUpdate,
    onEmailUpdate,
    onBioUpdate,
    onGoalUpdate,
    onLocationUpdate,
    onPaceUpdate,
  };
};
