import { sevenDaySteps } from "@hooks/steps/useSteps";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import axios from "axios";
import { CoachRank, UserRank } from "./Activity";
import crashlytics from "@react-native-firebase/crashlytics";

export const createBaseUserRank = (
  uid: string,
  userProgress: number,
  teamName: string,
  teamKey: string,
  teamId: string,
  userLevelV2: number,
  coachCommunityId: string,
  name?: string,
  img?: AWSMedia | CloudinaryMedia
): UserRank => {
  return {
    authorName: name ? name : "",
    ...(img ? { authorImg: img } : {}),
    uid: uid,
    rank: -1,
    communityRank: -1,
    coachCommunityId,
    coachEventId: teamId,
    eventId: teamId,
    numActivities: 0,
    prizes: [],
    fitPointsV2: 0,
    totalCalories: 0,
    progressV2: userProgress,
    updatedOn: Date.now(),
    teamName,
    teamKey,
    userLevelV2,
  };
};

export const createBaseCoachRank = (
  uid: string,
  teamName: string,
  teamKey: string,
  teamId: string,
  name?: string,
  img?: AWSMedia | CloudinaryMedia
): CoachRank => {
  return {
    authorName: name ? name : "",
    ...(img ? { authorImg: img } : {}),
    uid: uid,
    rank: -1,
    coachEventId: teamId,
    prizes: [],
    totalCalories: 0,
    updatedOn: Date.now(),
    teamName,
    teamKey,
  };
};

export const saveStepActivities = async (
  uid: string,
  steps: sevenDaySteps,
  sessionId?: string
) => {
  axios({
    url: "https://asia-south1-holidaying-prod.cloudfunctions.net/addSteps",
    method: "POST",
    data: {
      uid,
      steps,
      sessionId: sessionId ? sessionId : "",
    },
  }).catch((e) => {
    console.log("error in step call");
    crashlytics().recordError(e);
  });
};

export const saveNutritionActivities = async (
  uid: string,
  kcl: number,
  day: string
) => {
  axios({
    url: "https://asia-south1-holidaying-prod.cloudfunctions.net/addNutrition",
    method: "POST",
    data: {
      uid,
      kcl,
      day,
    },
  }).catch((e) => {
    console.log("error in nutrition call");
    crashlytics().recordError(e);
  });
};
