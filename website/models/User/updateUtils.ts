import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  fitnessGoalObj,
  fitnessGoalTypes,
  genderType,
  workoutLocation,
  achievementPace,
  fcsTypes,
  RecommendationConfig,
} from "./User";
import { difficulty } from "@templates/joinBoatTemplate/V5/Components/SetPace";
import axios from "axios";
import { BodyTypesId } from "@constants/Avatar/utils";

export const updateSocialMediaFields = async (
  uid: string,
  insta: string | undefined,
  fb: string | undefined,
  linkedIn: string | undefined,
  youtube: string | undefined,
  external: string | undefined
) => {
  await updateDoc(doc(db, "users", uid), {
    ...(typeof insta === "string" ? { instagramLink: insta } : {}),
    ...(typeof fb === "string" ? { facebookProfile: fb } : {}),
    ...(typeof linkedIn === "string" ? { linkedInLink: linkedIn } : {}),
    ...(typeof youtube === "string" ? { youtubeLink: youtube } : {}),
    ...(typeof external === "string" ? { externalLink: external } : {}),
  });
};

export const updateUserEmail = async (uid: string, email: string) => {
  // const now = new Date().getTime();

  await updateDoc(doc(db, "users", uid), {
    email: email,
    // unixWelcomeEmail: now,
    // unixDay2Email: now + 24 * 60 * 60 * 1000 * 2,
    // unixDay3Email: now + 24 * 60 * 60 * 1000 * 3,
  });
};

export const updateUserTextFields = async (
  uid: string,
  key: "name" | "bio" | "userKey" | "instagramHandle" | "fitnessGoalText",
  value: string
) => {
  await updateDoc(doc(db, "users", uid), {
    [key]: value,
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
  await updateDoc(doc(db, "users", uid), {
    ...(name ? { name: name } : {}),
    ...(instagramHandle ? { instagramHandle: instagramHandle } : {}),
    ...(email ? { email: email } : {}),
    ...(img ? { profileImage: img } : {}),
    ...(bio ? { bio: bio } : {}),
  });
};

export const updateUserOrgDetails = async (
  uid: string,
  name?: string,
  organisation?: string,
  phone?: string
) => {
  await updateDoc(doc(db, "users", uid), {
    ...(name ? { name } : {}),
    ...(organisation ? { organisation } : {}),
    ...(phone ? { phone } : {}),
  });
};

export const updateUserPhoneValue = async (uid: string, phone: string) => {
  await updateDoc(doc(db, "users", uid), {
    phone,
    socialboat: true,
  });
};

export const updateUserGenderAndHeight = async (
  uid: string,
  gender: genderType,
  height: number
) => {
  await updateDoc(doc(db, "users", uid), {
    gender,
    height,
  });
};

export const updateUserFcs = async (uid: string, fc: fcsTypes[]) => {
  await updateDoc(doc(db, "users", uid), {
    fitnessConcerns: fc,
  });
};

export const updateUserListValues = async (
  uid: string,
  listStringValues: fitnessGoalTypes[] | workoutLocation[],
  key: "fitnessGoal" | "preferredWorkoutLocation"
) => {
  await updateDoc(doc(db, "users", uid), {
    [key]: listStringValues,
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
  await updateDoc(doc(db, "users", uid), {
    ...data,
    socialboat: true,
  });
};

export const updateUserStringValue = async (
  uid: string,
  stringValue: achievementPace,
  key: "paceOfAchievement"
) => {
  await updateDoc(doc(db, "users", uid), {
    [key]: stringValue,
  });
};

export const updateUserConfigFields = async (
  uid: string,
  dailyStepTarget?: number,
  nutritionBadgeId?: string,
  badgeId?: string,
  challengeJoined?: number
) => {
  const finalObj = {
    ...(dailyStepTarget ? { dailyStepTarget } : {}),
    ...(challengeJoined ? { challengeJoined } : {}),
    ...(nutritionBadgeId ? { nutritionBadgeId } : {}),
    ...(badgeId ? { badgeId } : {}),
  };

  try {
    await updateDoc(doc(db, "users", uid), finalObj);
    console.log("Update successful!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
export const updateUserConfigRecommendation = async (
  uid: string,
  recommendationConfig: RecommendationConfig
) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      recommendationConfig: {
        ...recommendationConfig,
      },
    });
    console.log("Recommendation Config update successful!");
  } catch (error) {
    console.error("Error updating Recommendation Config:", error);
  }
};

export const updateUserBadgeId = async (uid: string, pace: difficulty) => {
  await axios({
    url: "https://asia-south1-holidaying-prod.cloudfunctions.net/addBadge",
    method: "POST",
    data: {
      uid,
      pace,
    },
  });
};

export const updateUserBadgeIdV2 = async (uid: string, challenge?: boolean) => {
  await axios({
    url: "https://asia-south1-holidaying-prod.cloudfunctions.net/addBadge",
    method: "POST",
    data: {
      uid,
      endpoint: "v2",
      addToChallenge: challenge,
    },
  });
};

export const recaliberateBadge = async (uid: string) => {
  console.log(
    "url",
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconfigureRoadmap`,
    uid
  );
  await axios({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconfigureRoadmap`,
    method: "POST",
    data: {
      uid,
    },
    params: {
      uid,
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
  await updateDoc(doc(db, "users", uid), {
    [key]: value,
  });
};

export const updateUserGender = async (uid: string, value: genderType) => {
  await updateDoc(doc(db, "users", uid), {
    gender: value,
  });
};

export const updateUserFitnessGoalObj = async (
  uid: string,
  value: fitnessGoalObj
) => {
  await updateDoc(doc(db, "users", uid), {
    fitnessGoals: value,
  });
};

export const uploadFavIcon = async (
  uid: string,
  favIconImg: CloudinaryMedia | AWSMedia
) => {
  await updateDoc(doc(db, "users", uid), {
    favIconImg: favIconImg,
  });
};

export const removeFavIcon = async (uid: string) => {
  await updateDoc(doc(db, "users", uid), {
    favIconImg: deleteField(),
  });
};

export const updateCoverMedia = async (
  uid: string,
  coverCloudinary: CloudinaryMedia[]
) => {
  await updateDoc(doc(db, "users", uid), {
    coverCloudinary: coverCloudinary,
  });
};

export const removeCoverMedia = async (uid: string) => {
  await updateDoc(doc(db, "users", uid), {
    coverCloudinary: [],
  });
};

export const updateProfileImage = async (
  uid: string,
  profileImg: CloudinaryMedia
) => {
  await updateDoc(doc(db, "users", uid), {
    profileImage: profileImg,
  });
};

export const removeProfileImage = async (uid: string) => {
  await updateDoc(doc(db, "users", uid), {
    profileImage: deleteField(),
  });
};

export const updateCurrentBodyTypeFields = async (
  uid: string,
  value: BodyTypesId,
  dependentValue?: BodyTypesId
) => {
  await updateDoc(doc(db, "users", uid), {
    currentBodyType: value,
    desiredBodyType: dependentValue ? dependentValue : deleteField(),
    socialboat: true,
  });
};

export const updateDesiredBodyTypeFields = async (
  uid: string,
  id: BodyTypesId,
  level: difficulty,
  pace: number
) => {
  await updateDoc(doc(db, "users", uid), {
    desiredBodyType: id,
    difficulty: level,
    paceOfAchievementInMonth: pace,
    socialboat: true,
  });
};
