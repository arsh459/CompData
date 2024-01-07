import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import database from "@react-native-firebase/database";
import { Cast } from "../../models/Cast/Cast";
import crashlytics from "@react-native-firebase/crashlytics";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export const createNewCast = (): string => {
  const castId = uuidv4();

  const newCast: Cast = {
    id: castId,
    state: "created",
    createdOn: Date.now(),
  };

  try {
    database()
      .ref("casts/" + castId)
      .set(newCast);
  } catch (error: any) {
    console.log("error in creating", error);
    crashlytics().recordError(error);
  }

  return castId;
};

export const updateOnScan = async (
  castId: string,
  userUID: string,
  playbackId: string,
  taskName?: string,
  avatar?: AWSMedia | CloudinaryMedia,
  activityId?: string
) => {
  try {
    await database()
      .ref("casts/" + castId)
      .update({
        taskPlaybackId: playbackId ? playbackId : "",
        state: "scanned",
        taskName: taskName ? taskName : "",
        taskMedia: avatar ? avatar : null,
        taskState: "init",
        appStatus: "SETTING_UP",
        userUID,
        activityId: activityId ? activityId : "",
      });
  } catch (error: any) {
    console.log("error in task update", error);
    crashlytics().recordError(error);
  }
};

// client app
export const updateCastState = async (castId: string) => {
  try {
    await database()
      .ref("casts/" + castId)
      .update({
        state: "welcomed",
      });
  } catch (error: any) {
    console.log("error in state update", error);
    crashlytics().recordError(error);
  }
};

export const updatePlay = async (castId: string) => {
  try {
    await database()
      .ref("casts/" + castId)
      .update({
        taskState: "play",
      });
  } catch (error: any) {
    console.log("error in play update", error);
    crashlytics().recordError(error);
  }
};

export const updatePause = async (castId: string) => {
  try {
    await database()
      .ref("casts/" + castId)
      .update({
        taskState: "pause",
      });
  } catch (error: any) {
    console.log("error in pause update", error);
    crashlytics().recordError(error);
  }
};

// export const updateFinished = async (castId: string) => {
//   try {
//     await database()
//       .ref("casts/" + castId)
//       .update({
//         taskState: "finished",
//       });
//   } catch (error: any) {
//     console.log("error in finished update", error);
//   }
// };

export const updateQuit = async (castId: string) => {
  try {
    await database()
      .ref("casts/" + castId)
      .update({
        state: "created",
        userUID: "",
        taskName: null,
        taskMedia: null,
        taskState: null,
        appStatus: "DISCONNECTED",
      });
  } catch (error: any) {
    console.log("error in finished update", error);
    crashlytics().recordError(error);
  }
};
