import { BodyTypesId } from "@constants/Avatar/utils";
import { LocalUser } from "@hooks/user/useLocalUserV2";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { addUserToTeam } from "@models/User/createUtils";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  updateUserListValues,
  updateUserNumberFields,
  updateUserPhoneValue,
  updateUserBadgeId,
  updateUserGenderAndHeight,
  updateUserMultipleNumberFields,
  updateUserFcs,
  updateCurrentBodyTypeFields,
  updateDesiredBodyTypeFields,
} from "@models/User/updateUtils";
import {
  fcsTypes,
  fitnessGoalTypes,
  genderType,
  UserInterface,
} from "@models/User/User";
import { updateUserBriefFields } from "@modules/UserProfile/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
// import { CommonActions, useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "@routes/MainStack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

import { getTeam } from "@utils/post/createUtils";
import { difficulty } from "../Components/SetPace";
import { getIntialHeight, getIntialWeight } from "../Components/utils";
import { useRoadmapUpdateStore } from "@providers/progress/roadmapUpdateStore";
import { useState } from "react";

export type sectionTypes =
  | "loading"
  | "welcome"
  | "name"
  | "phone"
  | "gender"
  | "fcs"
  | "goal"
  | "height"
  | "weight"
  | "repsCount"
  | "desiredWeight"
  | "pace"
  | "settingup"
  | "join"
  | "currentBodyType"
  | "scaningBodyType"
  | "desiredBodyType"
  | "resolutionDetail"
  | "bookConsultation"
  | "consultationSlot"
  | "slotBooked"
  | "getStarted";

const useSection = (
  section: sectionTypes,
  user?: LocalUser,
  toJoinTeamId?: string,
  toJoinGameId?: string,
  backOnDone?: boolean
) => {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { onChangeGameId } = useAuthContext();
  const [appId, _] = useState<string>("");

  const gotoSection = (sec: sectionTypes, replace?: boolean) => {
    // backOnDone
    //   ? navigation.goBack()
    //   : replace
    //   ? navigation.replace("JoinBoatV2", {
    //       section: sec,
    //     })
    //   : navigation.push("JoinBoatV2", {
    //       section: sec,
    //     });
  };

  const userCont = useUserContext();

  const gotoHome = async () => {
    // add user to team
    if (toJoinGameId && toJoinTeamId && userCont.user?.uid) {
      const remoteTeam = await getTeam(toJoinTeamId);

      if (remoteTeam) {
        await addUserToTeam(
          userCont.user?.uid,
          remoteTeam.ownerUID,
          toJoinGameId,
          toJoinTeamId,
          userCont.user,
          remoteTeam
        );

        onChangeGameId(toJoinGameId);
      }
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.dispatch((state) => {
    //       const routes = state.routes.filter((r) => r.name !== "JoinBoatV2");
    //       routes.push({
    //         key: `Home-${Math.round(Math.random() * 1000)}`,
    //         name: "Home",
    //       });

    //       return CommonActions.reset({
    //         ...state,
    //         routes,
    //         index: routes.length - 1,
    //       });
    //     });
  };

  const onProfileUpdate = async (
    section: "phone" | "gender",
    name?: string,
    instagramHandle?: string,
    email?: string,
    img?: AWSMedia | CloudinaryMedia,
    bio?: string
  ) => {
    if (user?.uid) {
      await updateUserBriefFields(
        user.uid,
        name?.trim(),
        instagramHandle,
        email,
        img,
        bio
      );
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section,
    //     });
  };

  // Phone number Update
  const onUserPhoneUpdate = async (phone?: string) => {
    if (user?.uid && phone) {
      await updateUserPhoneValue(user.uid, phone);
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "gender",
    //     });
  };

  // gender update
  const onUseGenderUpdate = async (gender?: genderType) => {
    if (user?.uid && gender) {
      // gender basis height update.
      await updateUserGenderAndHeight(
        user.uid,
        gender,
        user.height ? user.height : getIntialHeight(user.height, user.gender)
      );
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: gender === "female" ? "fcs" : "goal",
    //     });
  };

  const onFCSUpdate = async (fc?: fcsTypes[]) => {
    if (user?.uid && fc) {
      await updateUserFcs(user.uid, fc);
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "goal",
    //     });
  };

  // goal update
  const onFitnessGoalUpdate = async (goals?: fitnessGoalTypes[]) => {
    if (user?.uid && goals) {
      await updateUserListValues(user.uid, goals, "fitnessGoal");
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "height",
    //     });
  };

  // height update
  const onUserHeightUpdate = async (newVal?: number) => {
    if (user?.uid && newVal) {
      // height, goal basis weight estimation
      await updateUserMultipleNumberFields(user.uid, {
        height: newVal,
        weight: user.weight
          ? user.weight
          : getIntialWeight(
              "weight",
              user.height,
              user.gender,
              user.weight,
              user.desiredWeight,
              user.fitnessGoal
            ),
      });
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "weight",
    //     });
  };

  // weight update
  const onUserWeightUpdate = async (newVal?: number) => {
    if (user?.uid && newVal) {
      // set Desired weight
      await updateUserMultipleNumberFields(user.uid, {
        weight: newVal,
        desiredWeight: user.desiredWeight
          ? user.desiredWeight
          : getIntialWeight(
              "desiredWeight",
              user.height,
              user.gender,
              user.weight,
              user.desiredWeight,
              user.fitnessGoal
            ),
      });
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "repsCount",
    //     });
  };

  // reps count update
  const onUserRepsCountUpdate = async (newVal?: number) => {
    if (user?.uid) {
      if (newVal) {
        await updateUserNumberFields(user.uid, "repsCount", newVal);
      } else {
        weEventTrack("fScanReps_clickSkip", {});
      }
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "currentBodyType",
    //     });
  };

  // user body type update
  const onUserCurrentBodyTypeUpdate = async (
    newVal?: BodyTypesId,
    dependentValue?: BodyTypesId
  ) => {
    if (user?.uid && newVal) {
      await updateCurrentBodyTypeFields(user.uid, newVal, dependentValue);
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "scaningBodyType",
    //     });
  };

  const updateMap = useRoadmapUpdateStore((state) => state.updateMap);

  const onUserDesiredBodyTypeUpdate = async (
    newVal?: BodyTypesId,
    level?: difficulty,
    pace?: number
  ) => {
    if (user?.uid && newVal && level && pace) {
      await updateDesiredBodyTypeFields(user.uid, newVal, level, pace);
    }

    if (level && user?.uid) {
      // update badgeId
      updateUserBadgeId(user.uid, level ? level : "Easy", updateMap).catch(
        (e) => {
          console.log("e", e);
          crashlytics().recordError(e);
        }
      );
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "settingup",
    //     });
  };

  // desired weight update
  const onUserDesiredWeightUpdate = async (newVal?: number) => {
    if (user?.uid && newVal) {
      await updateUserNumberFields(user.uid, "desiredWeight", newVal);
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "pace",
    //     });
  };

  // pace update
  const onFitnessPaceUpdate = async (
    newVal?: number,
    difficulty?: difficulty
  ) => {
    if (user?.uid) {
      if (newVal) {
        await updateUserMultipleNumberFields(user.uid, {
          paceOfAchievementInMonth: newVal,
          ...(difficulty ? { difficulty } : {}),
        });
      }

      // console.log("HERE", difficulty);
      await updateUserBadgeId(
        user.uid,
        difficulty ? difficulty : "Easy",
        updateMap
      ).catch((e) => {
        console.log("e", e);
        crashlytics().recordError(e);
      });
    }

    // backOnDone
    //   ? navigation.goBack()
    //   : navigation.push("JoinBoatV2", {
    //       section: "settingup",
    //     });
  };

  return {
    section,
    gotoHome,
    gotoSection,
    onProfileUpdate,
    onUserPhoneUpdate,
    onUseGenderUpdate,
    onFitnessGoalUpdate,
    onUserHeightUpdate,
    onUserWeightUpdate,
    onUserRepsCountUpdate,
    onUserDesiredWeightUpdate,
    onFitnessPaceUpdate,
    onUserCurrentBodyTypeUpdate,
    onUserDesiredBodyTypeUpdate,
    onFCSUpdate,
    appointmentId: appId,
  };
};

export default useSection;

export const isPresent = (target: any) => {
  if (target === undefined) {
    return false;
  }
  return true;
};

export const isNewUser = (user?: UserInterface) => {
  if (
    !isPresent(user?.name) &&
    !isPresent(user?.phone) &&
    !isPresent(user?.gender) &&
    !isPresent(user?.fitnessGoal) &&
    !isPresent(user?.height) &&
    !isPresent(user?.weight) &&
    !isPresent(user?.desiredWeight) &&
    !isPresent(user?.paceOfAchievement)
  ) {
    return true;
  }
  return false;
};
