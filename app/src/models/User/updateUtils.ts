// import { deleteField, doc, updateDoc } from "firebase/firestore";
// import { db } from "@config/firebase";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import {
  fitnessGoalObj,
  fitnessGoalTypes,
  genderType,
  workoutLocation,
  achievementPace,
  fcsTypes,
  RecommendationConfig,
  difficulty,
} from "./User";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import axios from "axios";
import { CustomerInfo } from "react-native-purchases";
import { BodyTypesId } from "@constants/Avatar/utils";
import { BACKEND_URL } from "react-native-dotenv";

export const updateSocialMediaFields = async (
  uid: string,
  insta: string | undefined,
  fb: string | undefined,
  linkedIn: string | undefined,
  youtube: string | undefined,
  external: string | undefined
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      ...(typeof insta === "string" ? { instagramLink: insta } : {}),
      ...(typeof fb === "string" ? { facebookProfile: fb } : {}),
      ...(typeof linkedIn === "string" ? { linkedInLink: linkedIn } : {}),
      ...(typeof youtube === "string" ? { youtubeLink: youtube } : {}),
      ...(typeof external === "string" ? { externalLink: external } : {}),
    });
};

export const startAndPinWorkout = async (uid: string, badgeId: string) => {
  const recObj: RecommendationConfig = {
    start: Date.now(),
    baseTier: 0,
  };

  // update rec obj
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      badgeId: badgeId,
      badgeIdEnrolled: badgeId,
      [`recommendationConfig.start`]: recObj.start,
      [`recommendationConfig.badgeConfig.${badgeId}.start`]: recObj.start,
      [`recommendationConfig.baseTier`]: recObj.baseTier,
    });
};

export const markNotificationsRead = async (uid: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ unreadPushNotifications: false });
};

export const pinWorkout = async (uid: string, badgeId: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      badgeId: badgeId,
      badgeIdEnrolled: badgeId,
    })
    .catch((e) => {
      console.log("e", e);
      crashlytics().recordError(e);
    });
};

export const pinNutrition = async (uid: string, nutritionBadgeId: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      nutritionBadgeId: nutritionBadgeId,
      nutritionBadgeIdEnrolled: nutritionBadgeId,
    })
    .catch((e) => {
      console.log("e", e);
      crashlytics().recordError(e);
    });
};

export const updatePeriodSync = async (uid: string, date: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [`periodTrackerObj.lastRefresh`]: date,
    })
    .catch((e) => {
      console.log("e", e);
      crashlytics().recordError(e);
    });
};

export const startWithoutPin = async (uid: string, badgeId: string) => {
  const recObj: RecommendationConfig = {
    start: Date.now(),
    baseTier: 0,
  };

  // update rec obj
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [`recommendationConfig.badgeConfig.${badgeId}.start`]: recObj.start,
    });
};

export const changeUserPrivacySettings = async (
  uid: string,
  noPrivateQu: boolean
) => {
  await firestore().collection("users").doc(uid).update({ noPrivateQu });
};

export const enrolledFix = async (
  uid: string,
  badgeId: string,
  type: "workout" | "nutrition"
) => {
  if (type === "workout") {
    await firestore().collection("users").doc(uid).update({
      badgeId: badgeId,
      badgeIdEnrolled: badgeId,
    });
  } else {
    await firestore().collection("users").doc(uid).update({
      badgeId: badgeId,
      nutritionBadgeIdEnrolled: badgeId,
    });
  }
};

export const startAndPinNutrition = async (uid: string, badgeId: string) => {
  const recObj: RecommendationConfig = {
    nutritionStart: Date.now(),
  };

  // update rec obj
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      nutritionBadgeId: badgeId,
      nutritionBadgeIdEnrolled: badgeId,
      [`recommendationConfig.nutritionStart`]: recObj.nutritionStart,
      [`recommendationConfig.badgeConfig.${badgeId}.start`]:
        recObj.nutritionStart,
    });
};

export const updateUserEmail = async (uid: string, email: string) => {
  const now = new Date().getTime();

  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      email: email,
      unixWelcomeEmail: now,
      unixDay2Email: now + 24 * 60 * 60 * 1000 * 2,
      unixDay3Email: now + 24 * 60 * 60 * 1000 * 3,
    });
};

export const updateUserTextFields = async (
  uid: string,
  key: "name" | "bio" | "userKey" | "instagramHandle" | "fitnessGoalText",
  value: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [key]: value,
      socialboat: true,
    });
};

export const updateUserBriefFields = async (
  uid: string,
  name?: string,
  instagramHandle?: string,
  email?: string,
  img?: CloudinaryMedia | AWSMedia,
  bio?: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      ...(name ? { name: name } : {}),
      ...(instagramHandle ? { instagramHandle: instagramHandle } : {}),
      ...(email ? { email: email } : {}),
      ...(img ? { profileImage: img } : {}),
      ...(bio ? { bio: bio } : {}),
      socialboat: true,
    });
};

export const updateUserPhoneValue = async (
  uid: string,

  phone: string
) => {
  await firestore().collection("users").doc(uid).update({
    phone,
    socialboat: true,
  });
};

export const updateUserFcs = async (uid: string, fc: fcsTypes[]) => {
  await firestore().collection("users").doc(uid).update({
    fitnessConcerns: fc,
  });
};

export const updateUserListValues = async (
  uid: string,
  listStringValues: fitnessGoalTypes[] | workoutLocation[],
  key: "fitnessGoal" | "preferredWorkoutLocation"
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [key]: listStringValues,
      socialboat: true,
    });
};

export const updateUserStringValue = async (
  uid: string,
  stringValue: achievementPace,
  key: "paceOfAchievement"
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [key]: stringValue,
      socialboat: true,
    });
};

export const updateUserBadgeId = async (
  uid: string,
  pace: difficulty,
  updateMap: boolean
) => {
  // console.log("updateMap", updateMap);
  await axios({
    url: `${BACKEND_URL}/addBadge`,
    method: "POST",
    data: {
      uid,
      pace,
      updateMap,
    },
  });
};

export const updateUserBadgeIdV2 = async (uid: string, updateMap: boolean) => {
  // console.log("updateMap", updateMap);
  await axios({
    url: `${BACKEND_URL}/addBadge`,
    method: "POST",
    data: {
      uid,
      endpoint: "v2",
      updateMap,
    },
  });
};

export type numberFieldKeyType =
  | "weight"
  | "height"
  | "age"
  | "repsCount"
  | "desiredWeight"
  | "paceOfAchievementInMonth";

export const updateUserNumberFields = async (
  uid: string,
  key: numberFieldKeyType,
  value: number
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [key]: value,
      socialboat: true,
    });
};

export const updateCurrentBodyTypeFields = async (
  uid: string,
  value: BodyTypesId,
  dependentValue?: BodyTypesId
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      currentBodyType: value,
      desiredBodyType: dependentValue
        ? dependentValue
        : firestore.FieldValue.delete(),
      socialboat: true,
    });
};

export const updateDesiredBodyTypeFields = async (
  uid: string,
  id: BodyTypesId,
  level: difficulty,
  pace: number
) => {
  await firestore().collection("users").doc(uid).update({
    desiredBodyType: id,
    difficulty: level,
    paceOfAchievementInMonth: pace,
    socialboat: true,
  });
};

export interface UserSnippet {
  paceOfAchievementInMonth?: number;
  difficulty?: difficulty;
  height?: number;
  weight?: number;
  desiredWeight?: number;
}

export const updateUserMultipleNumberFields = async (
  uid: string,
  data: UserSnippet
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      ...data,
      socialboat: true,
    });
};

export const updateUserGender = async (uid: string, value: genderType) => {
  await firestore().collection("users").doc(uid).update({
    gender: value,
  });
};

export const updateUserGenderAndHeight = async (
  uid: string,
  gender: genderType,
  height: number
) => {
  await firestore().collection("users").doc(uid).update({
    gender,
    height,
  });
};

export const updateUserFitnessGoalObj = async (
  uid: string,
  value: fitnessGoalObj
) => {
  await firestore().collection("users").doc(uid).update({
    fitnessGoals: value,
    socialboat: true,
  });
};

export const uploadFavIcon = async (
  uid: string,
  favIconImg: CloudinaryMedia | AWSMedia
) => {
  await firestore().collection("users").doc(uid).update({
    favIconImg: favIconImg,
  });
};

export const removeFavIcon = async (uid: string) => {
  await firestore().collection("users").doc(uid).update({
    favIconImg: firestore.FieldValue.delete(),
  });
};

export const updateCoverMedia = async (
  uid: string,
  coverCloudinary: CloudinaryMedia[]
) => {
  await firestore().collection("users").doc(uid).update({
    coverCloudinary: coverCloudinary,
  });
};

export const removeCoverMedia = async (uid: string) => {
  await firestore().collection("users").doc(uid).update({
    coverCloudinary: [],
  });
};

export const updateProfileImage = async (
  uid: string,
  profileImg: CloudinaryMedia
) => {
  await firestore().collection("users").doc(uid).update({
    profileImage: profileImg,
  });
};

export const removeProfileImage = async (uid: string) => {
  await firestore().collection("users").doc(uid).update({
    profileImage: firestore.FieldValue.delete(),
  });
};

export const updateUserAppDetails = async (
  uid: string,
  buildNumber?: string,
  version?: string,
  installTime?: number
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      ...(buildNumber ? { buildNumber: parseInt(buildNumber) } : {}),
      ...(installTime ? { installTime: installTime } : {}),
      ...(version ? { version: version } : {}),
    });
};

export const updateCustomerInfoDb = async (
  uid: string,
  purchaser: CustomerInfo,
  allExpirationDatesMillis: { [id: string]: number }
) => {
  const batch = firestore().batch();

  batch.update(firestore().collection("users").doc(uid), {
    allExpirationDatesMillis: allExpirationDatesMillis,
  });

  batch.set(
    firestore()
      .collection("users")
      .doc(uid)
      .collection("revenueCat")
      .doc("customerInfo"),
    purchaser
  );

  try {
    await batch.commit();
  } catch (error: any) {
    console.log("user not logged in");
    crashlytics().recordError(error);
  }
};
export const updateUserWeight = async (
  uid: string,

  weight: number
) => {
  await firestore().collection("users").doc(uid).update({
    weight,
  });
};
export const updateUserChallengeJoined = async (
  uid: string,
  challengeJoined: number
) => {
  await firestore().collection("users").doc(uid).update({
    challengeJoined,
  });
};
