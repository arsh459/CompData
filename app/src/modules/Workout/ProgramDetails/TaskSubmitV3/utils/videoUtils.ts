import { socialboatLogo } from "@constants/imageKitURL";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import {
  onWorkoutDoneOnboardDone,
  onWorkoutProgOnboardDone,
} from "@modules/HomeScreen/utills/guidedOnboardUtils";
import {
  MIN_FP_TH,
  calculateFPFromProgress,
} from "@providers/task/hooks/useTaskStream";
import firestore from "@react-native-firebase/firestore";
import { getWidthHeightMedia } from "@utils/media/mediaDimensions";
import { getURLToFetch } from "@utils/media/mediaURL";
import { Dimensions } from "react-native";
import { resolutionType } from "./useWorkoutVideoStore";

const dims = Dimensions.get("screen");

export const getVideoURI = (
  orientation?: "landscape" | "portrait",
  playbackId?: string,
  avatar?: AWSMedia | CloudinaryMedia,
  max_resolution?: resolutionType,
  lowResMedia?: AWSMedia | CloudinaryMedia,
  lowResPlaybackId?: string
) => {
  if (max_resolution === "720p" && lowResMedia) {
    if (lowResPlaybackId) {
      return `https://stream.mux.com/${lowResPlaybackId}.m3u8?${
        max_resolution === "720p" ? "max_resolution=720p" : ""
      }`;
    } else {
      const { width, height } = getWidthHeightMedia(
        dims.width,
        dims.height,
        lowResMedia,
        orientation
      );

      return getURLToFetch(lowResMedia, width, height);
    }
  }

  if (playbackId) {
    // console.log("playbackId", playbackId);
    return `https://stream.mux.com/${playbackId}.m3u8?${
      max_resolution === "720p" ? "max_resolution=720p" : ""
    }`;
  }

  if (avatar) {
    const { width, height } = getWidthHeightMedia(
      dims.width,
      dims.height,
      avatar,
      orientation
    );

    return getURLToFetch(avatar, width, height);
  }

  return socialboatLogo;
};

export const onUpdateProgressFunc = (
  uid?: string,
  activityId?: string,
  taskId?: string,
  progress?: number,
  storeProgress?: number,
  taskFP?: number
): {
  fpAward?: number;
  calories?: number;

  visibleProgress?: number;
} => {
  // console.log("##");
  // console.log("uid", uid);
  // console.log("activityId", activityId);
  // console.log("taskId", taskId);
  // console.log("progress", progress);
  // console.log("storeProgress", storeProgress);
  // console.log("taskFP", taskFP);
  // console.log("##");
  if (
    !uid ||
    !activityId ||
    !taskId ||
    typeof progress !== "number" ||
    typeof storeProgress !== "number" ||
    typeof taskFP !== "number"
  ) {
    return {};
  }

  const { fpAward, visibleProgress } = calculateFPFromProgress(
    storeProgress,
    taskFP
  );
  // console.log("fp", fpAward);

  const calories = fpAward * 300;
  // console.log("calories", calories);

  firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(activityId)
    .update({
      progress: progress,
      fpProgress: storeProgress > 1 ? 1 : storeProgress,
      ...(calories ? { calories: calories, reviewStatus: "REVIEWED" } : {}),
    })
    .catch((e) => console.log("error is here", e));

  if (storeProgress > MIN_FP_TH && storeProgress < 0.95) {
    onWorkoutProgOnboardDone(uid, taskId).catch((e) => console.log("e", e));
  } else if (storeProgress > 0.95) {
    onWorkoutDoneOnboardDone(uid, taskId).catch((e) => console.log("e", e));
  }

  return {
    fpAward,
    calories,
    // storeProgress,
    visibleProgress,
  };
};
