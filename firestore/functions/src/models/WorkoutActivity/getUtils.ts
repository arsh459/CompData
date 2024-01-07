import * as admin from "firebase-admin";
import { WorkoutActivity } from "./WorkoutActivity";

export const getStream = async (
  seriesId: string,
  liveId: string,
  streamType: "exercises" | "lives",
  streamId: string,
) => {
  const stream = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection(streamType)
    .doc(liveId)
    .collection("streams")
    .doc(streamId)
    .get();

  if (stream.exists) {
    return stream.data() as WorkoutActivity;
  }

  return undefined;
};
