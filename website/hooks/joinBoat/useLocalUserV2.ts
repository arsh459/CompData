import { weEventTrack } from "@analytics/webengage/user/userLog";
import { BodyTypesId } from "@constants/Avatar/utils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { numberFieldKeyType } from "@models/User/updateUtils";
import {
  fcsTypes,
  fitnessGoalTypes,
  genderType,
  LocalUser,
  UserInterface,
} from "@models/User/User";
import { DietAndWorkoutType } from "@templates/DietAndWorkout";
import { HowItWorksType } from "@templates/HowItWorks";
import { difficulty } from "@templates/joinBoatTemplate/V5/Components/SetPace";
import { useCallback, useEffect, useState } from "react";
import { DateTime } from "luxon";

function getTimezoneOffset(timezone: string): number {
  const now = DateTime.now().setZone(timezone);
  return now.offset;
}

export const useLocalUserV2 = (user?: UserInterface) => {
  const [localUser, setLocalUser] = useState<LocalUser>();
  // const [initLoad, setInitLoad] = useState<boolean>(false);

  const onKeyChange = (newKey: string) => {
    if (localUser) {
      // console.log("localUser", localUser.name);
      setLocalUser({
        ...localUser,
        // name: newKey,
        userKey: newKey,
      });
    }
  };

  const onFPUpdate = (newKey: string, key: "fpCredit" | "fpDebit") => {
    if (localUser) {
      // console.log("localUser", localUser.name);
      setLocalUser({
        ...localUser,
        // name: newKey,
        [key]: parseInt(newKey),
      });
    }
  };

  const onDailyFPUpdate = (newKey: string) => {
    if (localUser) {
      // console.log("localUser", localUser.name);
      setLocalUser({
        ...localUser,
        // name: newKey,
        dailyFPTarget: parseInt(newKey),
      });
    }
  };

  // console.log("name", localUser?.name, localUser?.userKey, user?.userKey);

  const onBadgeIdUpdate = (badgeId: string) => {
    if (typeof badgeId === "string" && localUser) {
      setLocalUser({
        ...localUser,
        badgeId: badgeId,
      });
    }
  };

  const onNutritionBadgeIdUpdate = (newBadgeId: string) => {
    if (typeof newBadgeId === "string" && localUser) {
      setLocalUser({
        ...localUser,
        nutritionBadgeId: newBadgeId,
      });
    }
  };

  const onNameUpdate = (newName: string) => {
    if (typeof newName === "string" && localUser) {
      setLocalUser({
        ...localUser,
        name: newName,
      });
    }
  };
  const onMyAdSourceKeyUpdate = (newName: string) => {
    if (typeof newName === "string" && localUser) {
      setLocalUser({
        ...localUser,
        myAdSourceKey: newName,
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

  const onFCLocalUpdate = (fc: fcsTypes[]) => {
    setLocalUser((p) => {
      if (p) return { ...p, fitnessConcerns: fc };
    });
  };

  const onNumberFieldsUpdate = (newVal: number, key: numberFieldKeyType) => {
    // console.log("new value here", newVal);

    // console.log("new value", newVal);
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

  const onOrganisationUpdate = (org: string) => {
    if (typeof org === "string" && localUser) {
      setLocalUser({
        ...localUser,
        organisation: org,
      });
    }
  };

  const onCurrentBodyTypeUpdate = useCallback((value: BodyTypesId) => {
    setLocalUser((prev) => {
      if (prev)
        weEventTrack("fScanBodyType_changeCurrentBodyType", {
          currentBodyType: value,
        });
      return {
        ...prev,
        currentBodyType: value,
        desiredBodyType:
          prev?.currentBodyType === value ? prev.desiredBodyType : undefined,
      };
    });
  }, []);

  const onDesiredBodyTypeUpdate = useCallback(
    (id: BodyTypesId, level: difficulty, pace: number) => {
      setLocalUser((prev) => {
        if (prev)
          weEventTrack("fScanBodyType_changeDesiredBodyType", {
            desiredBodyType: id,
            difficulty: level,
            paceOfAchievementInMonth: pace,
          });
        return {
          ...prev,
          desiredBodyType: id,
          difficulty: level,
          paceOfAchievementInMonth: pace,
        };
      });
    },
    []
  );

  const onUpdateOffset = (tz: string) => {
    const offset = getTimezoneOffset(tz);

    setLocalUser((prev) => {
      if (prev) {
        const { recommendationConfig, ...rest } = prev;
        return {
          ...rest,
          recommendationConfig: {
            ...recommendationConfig,
            timezone: { tzString: tz, offset: offset },
          },
        };
      }
    });
  };

  const onRecommendationObjChange = (
    key: "primaryWorkoutCoach" | "baseTier",
    newVal?: string | number
  ) => {
    setLocalUser((prev) => {
      if (prev) {
        const { recommendationConfig, ...rest } = prev;
        return {
          ...rest,
          recommendationConfig: { ...recommendationConfig, [key]: newVal },
        };
      }
    });
  };

  const onLandingContentChange = (
    key:
      | "heading"
      | "docRegistrationId"
      | "subtitle"
      | "qualification"
      | "superWomanLeader"
      | "superWomanIncentive"
      | "experienceYears",
    newVal?: string | number | boolean
  ) => {
    // console.log(key, newVal);
    setLocalUser((prev) => {
      if (prev) {
        const { landingContent, ...rest } = prev;
        return {
          ...rest,
          landingContent: { ...landingContent, [key]: newVal },
        };
      }
    });
  };

  const uploadLandingImg = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setLocalUser((prev) => {
        if (prev && newFiles.length) {
          const { landingContent, ...rest } = prev;
          return {
            ...rest,
            landingContent: { ...landingContent, img: newFiles[0] },
          };
        }
      });
    },
    []
  );

  const removeLandingImg = async () => {
    if (user?.uid) {
      setLocalUser((prev) => {
        if (prev) {
          const { landingContent, ...rest } = prev;
          delete landingContent?.img;
          return {
            ...rest,
            landingContent: landingContent,
          };
        }
      });
    }
  };

  const onAddDietAndWorkout = useCallback((newObj: DietAndWorkoutType) => {
    setLocalUser((prev) => {
      if (prev) {
        const { landingContent, ...rest } = prev;

        // let arr: DietAndWorkoutType[] = [newObj];
        // if (landingContent?.dietAndWorkout) {
        //   arr = landingContent?.dietAndWorkout?.map((each) =>
        //     each.id === newObj.id ? newObj : each
        //   );
        // }

        let arr: DietAndWorkoutType[] = [];
        if (landingContent?.dietAndWorkout) {
          let changed: boolean = false;
          for (const item of landingContent.dietAndWorkout) {
            if (item.id === newObj.id) {
              arr.push(newObj);
              changed = true;
            } else {
              arr.push(item);
            }
          }

          if (!changed) {
            arr.push(newObj);
          }
        } else {
          arr.push(newObj);
        }

        return {
          ...rest,
          landingContent: {
            ...landingContent,
            dietAndWorkout: arr
              ? arr.includes(newObj)
                ? arr
                : [...arr, newObj]
              : [newObj],
          },
        };
      }
    });
  }, []);

  const onRemoveDietAndWorkout = async (id: string) => {
    if (user?.uid) {
      setLocalUser((prev) => {
        if (prev) {
          const { landingContent, ...rest } = prev;

          const arr = landingContent?.dietAndWorkout?.filter(
            (each) => each.id !== id
          );
          if (!arr || !arr.length) {
            delete landingContent?.dietAndWorkout;
          }
          return {
            ...rest,
            landingContent: arr?.length
              ? { ...landingContent, dietAndWorkout: arr }
              : landingContent,
          };
        }
      });
    }
  };

  const onAddHowItWorks = useCallback((newObj: HowItWorksType) => {
    setLocalUser((prev) => {
      if (prev) {
        const { landingContent, ...rest } = prev;

        // console.log("newObj", newObj);

        let arr: HowItWorksType[] = [];
        if (landingContent?.howItWorks) {
          let changed: boolean = false;
          for (const item of landingContent.howItWorks) {
            if (item.id === newObj.id) {
              arr.push(newObj);
              changed = true;
            } else {
              arr.push(item);
            }
          }

          if (!changed) {
            arr.push(newObj);
          }
        } else {
          arr.push(newObj);
        }

        // if (landingContent?.howItWorks) {
        //   arr = landingContent?.howItWorks?.map((each) =>
        //     each.id === newObj.id ? newObj : each
        //   );
        // }

        // console.log("arr", arr);

        return {
          ...rest,
          landingContent: {
            ...landingContent,
            howItWorks: arr,
            // ? arr.includes(newObj)
            //   ? arr
            //   : [...arr, newObj]
            // : [newObj],
          },
        };
      }
    });
  }, []);

  const onRemoveHowItWorks = async (id: string) => {
    if (user?.uid) {
      setLocalUser((prev) => {
        if (prev) {
          const { landingContent, ...rest } = prev;
          const arr = landingContent?.howItWorks?.filter(
            (each) => each.id !== id
          );
          if (!arr || !arr.length) {
            delete landingContent?.howItWorks;
          }
          return {
            ...rest,
            landingContent: arr?.length
              ? { ...landingContent, HowItWorks: arr }
              : landingContent,
          };
        }
      });
    }
  };

  useEffect(() => {
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
        height: user?.height,
        repsCount: user?.repsCount,
        currentBodyType: user?.currentBodyType,
        desiredBodyType: user?.desiredBodyType,
        paceOfAchievementInMonth: user?.paceOfAchievementInMonth,
        uid: user?.uid,
        userKey: user?.userKey ? user?.userKey : "",
        organisation: user?.organisation,
        fitnessConcerns: user?.fitnessConcerns,
        badgeId: user?.badgeId,
        nutritionBadgeId: user?.nutritionBadgeId,
        fpCredit: user?.fpCredit ? user?.fpCredit : 0,
        fpDebit: user?.fpDebit ? user?.fpDebit : 0,
        dailyFPTarget: user?.dailyFPTarget ? user?.dailyFPTarget : 0,
        landingContent: user?.landingContent,
        recommendationConfig: user?.recommendationConfig,
        myAdSourceKey: user?.myAdSourceKey ? user.myAdSourceKey : "",
      };
    });
  }, [
    user?.name,
    user?.phone,
    user?.gender,
    user?.nutritionBadgeId,
    user?.profileImage,
    user?.email,
    user?.difficulty,
    user?.bio,
    user?.fitnessGoal,
    user?.weight,
    user?.height,
    user?.desiredWeight,
    user?.repsCount,
    user?.currentBodyType,
    user?.desiredBodyType,
    user?.paceOfAchievementInMonth,
    user?.uid,
    user?.userKey,
    user?.organisation,
    user?.fitnessConcerns,
    user?.badgeId,
    user?.fpCredit,
    user?.fpDebit,
    user?.dailyFPTarget,
    user?.landingContent,
    user?.recommendationConfig,
    user?.myAdSourceKey,
  ]);

  return {
    localUser,
    onNameUpdate,
    onFPUpdate,
    onPhoneUpdate,
    onGenderUpdate,
    uploadProfileImg,
    removeProfileImg,
    onKeyChange,
    onBadgeIdUpdate,
    onEmailUpdate,
    onBioUpdate,
    onGoalUpdate,
    onCurrentBodyTypeUpdate,
    onDesiredBodyTypeUpdate,
    onNumberFieldsUpdate,
    onDifficultyUpdate,
    onOrganisationUpdate,
    onFCLocalUpdate,
    onDailyFPUpdate,
    onNutritionBadgeIdUpdate,
    onLandingContentChange,
    uploadLandingImg,
    removeLandingImg,
    onRecommendationObjChange,
    onUpdateOffset,
    onAddDietAndWorkout,
    onRemoveDietAndWorkout,
    onAddHowItWorks,
    onRemoveHowItWorks,
    onMyAdSourceKeyUpdate,
  };
};
