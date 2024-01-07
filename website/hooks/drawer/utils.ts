import {
  communityQuery,
  communityQueryKeys,
} from "@hooks/community/useCommunityParams";
import {
  communityQueryKeysV2,
  communityQueryV2,
} from "@hooks/community/v2/useCommunityParamsV2";
import {
  communityQueryKeysV3,
  communityQueryV3,
} from "@hooks/community/v2/useCommunityParamsV3";
import {
  adminDashboardQuery,
  adminDashboardQueryKeys,
} from "@hooks/dashboard/useAdminDashboard";
import { FeedQuery, feedQueryTypes } from "@hooks/feed/useFeed";
import { urlParams, urlParamsKey } from "@hooks/ghost/useGhostPosts";
import {
  boatParamQuery,
  boatParamQueryKeys,
} from "@hooks/joinBoat/useJoinBoatParams";
import {
  boatParamQueryV2,
  boatParamQueryV3,
} from "@hooks/joinBoat/useJoinBoatParamsV2";
import { giftQuery, giftQueryKeys } from "@hooks/joinBoat/V5/useGiftSection";
import {
  boatParamQueryKeysV7,
  boatParamQueryV7,
} from "@hooks/joinBoat/V7/useSectionV2";
import {
  profileQuery,
  profileQueryKeys,
} from "@hooks/profile/useProfileParams";
import {
  workoutV2Query,
  workoutV2QueryKeys,
} from "@hooks/tasks/useWorkoutV2Params";
import {
  workoutV3Query,
  workoutV3QueryKeys,
} from "@hooks/tasks/useWorkoutV3Params";
import {
  workoutQuery,
  workoutQueryKeys,
} from "@hooks/workouts/query/useWorkoutQuery";
import {
  editorQuery,
  editorQueryKeys,
} from "@templates/editEvent/ProfileEditor/ProfileEditorV2";
import {
  editUserProfileQuery,
  editUserQueryKeys,
} from "@templates/EditUserProfile/EditUserProfile";
import { onboardUserQuery } from "@templates/joinBoatTemplate/JoinBoatTemplate";
import { onboardUserQueryKeys } from "@templates/joinBoatTemplate/JoinBoatTemplate";
import { liveEditorQuery } from "@templates/WorkoutEditor/LiveEditorHolder";
import { nutritionEditorQuery } from "@templates/WorkoutEditor/NutritionEditorHolder";
import {
  workoutEditorQuery,
  workoutEditorQueryKeys,
} from "@templates/WorkoutEditor/WorkoutEditorHolder";
import { dashboardQuery, dashboardQueryKeys } from "./interface";
import {
  boatParamQueryKeysV6,
  boatParamQueryV6,
} from "@hooks/joinBoat/V6/useSection";
import {
  planParams,
  planQueryKeys,
} from "@templates/OurPlans/Components/PlanTypeToggler";

export const getQueryParams = (query: dashboardQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as dashboardQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForOnboard = (query: editorQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as editorQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForUserOnboard = (query: onboardUserQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as onboardUserQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForJoinBoat = (
  query: boatParamQuery | boatParamQueryV2 | boatParamQueryV3
) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as boatParamQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForGift = (query: giftQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as giftQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForAdminDashboard = (query: adminDashboardQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as adminDashboardQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForEditProfile = (query: editUserProfileQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as editUserQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForWorkout = (query: workoutEditorQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as workoutEditorQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForNutrition = (query: nutritionEditorQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as workoutEditorQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForLive = (query: liveEditorQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as workoutEditorQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForCommunity = (query: communityQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as communityQueryKeys])
    .join("&")}`;
};

export const getQueryForPlan = (query: planParams) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as planQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForProfile = (query: profileQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as profileQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForCommunityV2 = (query: communityQueryV2) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as communityQueryKeysV2])
    .join("&")}`;
};

export const getQueryParamsForCommunityV3 = (query: communityQueryV3) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as communityQueryKeysV3])
    .join("&")}`;
};

export const getQueryParamsForWorkoutPage = (query: workoutQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as workoutQueryKeys])
    .join("&")}`;
};

export const getQueryParamsForWorkoutPageV2 = (query: workoutV2Query) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as workoutV2QueryKeys])
    .join("&")}`;
};

export const getQueryParamsForWorkoutPageV3 = (query: workoutV3Query) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as workoutV3QueryKeys])
    .join("&")}`;
};

export const getQueryParamsForFeed = (query: FeedQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as feedQueryTypes])
    .join("&")}`;
};

export const getQueryParamsForJoinBoatV6 = (query: boatParamQueryV6) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as boatParamQueryKeysV6])
    .join("&")}`;
};

export const getQueryParamsForJoinBoatV7 = (query: boatParamQueryV7) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as boatParamQueryKeysV7])
    .join("&")}`;
};

export const getQueryParamsForBlogs = (query: urlParams) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as urlParamsKey])
    .join("&")}`;
};
