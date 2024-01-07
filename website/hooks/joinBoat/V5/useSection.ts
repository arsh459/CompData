import { weEventTrack } from "@analytics/webengage/user/userLog";
import { BodyTypesId } from "@constants/Avatar/utils";
import { orgObj } from "@constants/organization";
import { socialboat } from "@constants/socialboatOrg";
import { teamnames, teams } from "@constants/teams";
import { PlanType } from "@constants/teams/plans";
import { getQueryParamsForJoinBoat } from "@hooks/drawer/utils";
import { useGift } from "@hooks/gifts/useGift";
import { redeemGift } from "@models/Gift/createUtils";

import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  updateCurrentBodyTypeFields,
  updateDesiredBodyTypeFields,
  updateUserBadgeId,
  updateUserBriefFields,
  updateUserFcs,
  updateUserGenderAndHeight,
  updateUserListValues,
  updateUserMultipleNumberFields,
  updateUserNumberFields,
  updateUserOrgDetails,
  updateUserPhoneValue,
} from "@models/User/updateUtils";
import {
  fcsTypes,
  fitnessGoalTypes,
  genderType,
  LocalUser,
  UserInterface,
  // UserInterface,
} from "@models/User/User";
import { difficulty } from "@templates/joinBoatTemplate/V5/Components/SetPace";
import {
  getIntialHeight,
  getIntialWeight,
} from "@templates/joinBoatTemplate/V5/Components/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTeamCreate } from "./useTeamCreate";

export type sectionTypes =
  | "loading"
  | "welcome"
  | "name"
  | "phone"
  | "gender"
  | "goal"
  | "height"
  | "weight"
  | "repsCount"
  | "desiredWeight"
  | "pace"
  | "settingup"
  | "join"
  | "plans"
  | "details"
  | "teamname"
  | "fcs"
  | "assessment"
  | "currentBodyType"
  | "scaningBodyType"
  | "desiredBodyType"
  | "resolutionDetail"
  | "bookConsultation"
  | "consultationSlot"
  | "slotBooked"
  | "getStarted"
  | "auth";

export interface boatParamQueryV5 {
  section?: sectionTypes;
  org?: string;
  team?: string;
  device?: "ios" | "android";
  origin?: string;
  teamId?: string;
  noSlot?: "true" | "false";
  noPayment?: "true" | "false";
}

export type boatParamQueryKeysV5 = "section" | "org";

const useSection = (
  user?: LocalUser,
  device?: "ios" | "android",
  mainUser?: UserInterface
) => {
  const router = useRouter();
  const [sec, setSec] = useState<sectionTypes>("loading");

  const q = router.query as boatParamQueryV5;
  const { teamName, setTeamName, onTeamCreate, dbTeamId, onTeamAdd } =
    useTeamCreate(mainUser, q.teamId);
  const [planData, setPlanData] = useState<PlanType>(socialboat);
  const { gift } = useGift();

  useEffect(() => {
    if (router.isReady && !q.section) {
      q.section = "welcome";
      router.replace(getQueryParamsForJoinBoat(q), undefined, {
        shallow: true,
      });
    } else if (router.isReady && q.section) {
      if (q.org && orgObj[q.org]) {
        const org = orgObj[q.org];
        setPlanData({
          companyCode: org.name,
          plansTitle: org.plansTitle,
          plans: org.plans,
        });
      } else if (q.team && teams[q.team as teamnames]) {
        setPlanData(teams[q.team as teamnames].planData);
      }
      setSec(q.section);
    }
  }, [q, router]);

  const gotoSection = (sec: sectionTypes, replace?: boolean) => {
    q.section = sec;
    if (replace) {
      router.replace(getQueryParamsForJoinBoat(q), undefined, {
        shallow: true,
      });
    } else {
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    }
  };

  const selectPlans = async () => {
    if (gift && gift.status === "PAID" && user?.uid) {
      q.section = "loading";
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });

      try {
        // redeem gift
        await redeemGift(gift, user?.uid);
        weEventTrack("giftCardRedeemed_noClick", {});

        router.push({
          pathname: "org/success",
          query: { platform: device ? device : "" },
        });
      } catch (error) {
        q.section = "plans";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
      }
    } else {
      q.section = "plans";

      weEventTrack("fScanGetFitnessPlan_clickNext", {});

      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    }
  };

  const onNameSave = async (name?: string) => {
    // console.log("name", name, user?.uid);
    if (user?.uid && name) {
      console.log("saving name");
      await updateUserBriefFields(user?.uid, name);
    }

    // if (!user?.phone) {
    //   q.section = "phone";
    // } else {

    // }

    q.section = "gender";

    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
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
        name,
        instagramHandle,
        email,
        img,
        bio
      );
    }

    q.section = section;
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // Team creation flow dtails update
  const onDetailsUpdate = async (
    name?: string,
    organisation?: string,
    phone?: string
  ) => {
    if (user?.uid) {
      await updateUserOrgDetails(user.uid, name, organisation, phone);
    }

    if (dbTeamId) {
      q.section = "assessment";
    } else {
      q.section = "teamname";
    }

    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // Team Name Update
  const onUserTeamnameUpdate = async () => {
    await onTeamCreate();

    q.section = "assessment";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // Phone number Update s
  const onUserPhoneUpdate = async (phone?: string) => {
    if (user?.uid && phone) {
      await updateUserPhoneValue(user.uid, phone);
    }

    q.section = "gender";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // gender update
  const onUseGenderUpdate = async (gender?: genderType) => {
    if (user?.uid && gender) {
      // gender basis height update.
      await updateUserGenderAndHeight(
        user.uid,
        gender,
        user.height ? user.height : getIntialHeight(user.height)
      );
    }

    if (gender && gender === "female") {
      q.section = "fcs";
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    } else {
      q.section = "goal";
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    }
  };

  const onFCSUpdate = async (fc?: fcsTypes[]) => {
    if (user?.uid && fc) {
      await updateUserFcs(user.uid, fc);
    }

    q.section = "goal";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // goal update
  const onFitnessGoalUpdate = async (goals?: fitnessGoalTypes[]) => {
    if (user?.uid && goals) {
      await updateUserListValues(user.uid, goals, "fitnessGoal");
    }

    q.section = "height";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
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

    q.section = "weight";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
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
              "weight",
              user.height,
              user.gender,
              user.weight,
              user.desiredWeight,
              user.fitnessGoal
            ),
      });
    }

    q.section = "repsCount";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
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

    q.section = "currentBodyType";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // desired weight update
  const onUserDesiredWeightUpdate = async (newVal?: number) => {
    if (user?.uid && newVal) {
      await updateUserNumberFields(user.uid, "desiredWeight", newVal);
    }

    q.section = "pace";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // user body type update
  const onUserCurrentBodyTypeUpdate = async (
    newVal?: BodyTypesId,
    dependentValue?: BodyTypesId
  ) => {
    if (user?.uid && newVal) {
      await updateCurrentBodyTypeFields(user.uid, newVal, dependentValue);
    }

    q.section = "scaningBodyType";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

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
      updateUserBadgeId(user.uid, level ? level : "Easy").catch((e) =>
        console.log("e", e)
      );
    }

    q.section = "settingup";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
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

      // have to add to a team
      if (q.teamId) {
        // console.log("Hi I am here");
        onTeamAdd().catch((e) => console.log("adding to team failed", e));
      }

      // console.log("HERE", difficulty);
      updateUserBadgeId(user.uid, difficulty ? difficulty : "Easy").catch((e) =>
        console.log("e", e)
      );
    }

    q.section = "settingup";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  return {
    section: sec,
    selectPlans,
    gotoSection,
    onProfileUpdate,
    onNameSave,
    onUserPhoneUpdate,
    onUseGenderUpdate,
    onFitnessGoalUpdate,
    onUserHeightUpdate,
    onUserWeightUpdate,
    onUserRepsCountUpdate,
    onUserDesiredWeightUpdate,
    onUserCurrentBodyTypeUpdate,
    onUserDesiredBodyTypeUpdate,
    onFitnessPaceUpdate,
    onDetailsUpdate,
    onUserTeamnameUpdate,
    teamName,
    setTeamName,
    planData,
    onFCSUpdate,
    q,
    onTeamAdd,
  };
};

export default useSection;
