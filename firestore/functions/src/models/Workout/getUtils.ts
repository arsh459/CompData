import * as admin from "firebase-admin";
import { LiveClass, Workout, WorkoutSeries } from "./Workout";

export const getWorkout = async (seriesId: string, videoId: string) => {
  const remoteVideo = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection("exercises")
    .doc(videoId)
    .get();

  if (remoteVideo.exists) {
    return remoteVideo.data() as Workout;
  }

  return undefined;
};

export const getWorkoutSeries = async (seriesId: string) => {
  const remoteVideo = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .get();

  if (remoteVideo.exists) {
    return remoteVideo.data() as WorkoutSeries;
  }

  return undefined;
};

export const getWorkoutSeriesForEventId = async (eventId: string) => {
  const remoteSeries = await admin
    .firestore()
    .collection("workouts")
    .where("eventIds", "array-contains", eventId)
    .get();

  const workoutSeries: WorkoutSeries[] = [];
  for (const remSeries of remoteSeries.docs) {
    workoutSeries.push(remSeries.data() as WorkoutSeries);
  }
  return workoutSeries;
};

export const getExercise = async (
  seriesId: string,
  videoId: string,
  key: "lives" | "exercises",
) => {
  const workout = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection(key)
    .doc(videoId)
    .get();

  if (key === "lives" && workout.exists) {
    return workout.data() as LiveClass;
  } else if (key === "exercises" && workout.exists) {
    return workout.data() as Workout;
  }

  return undefined;
};

export const getLiveClass = async (
  seriesId: string,
  videoId: string,
  // key: "exercises" | "lives" | "nutrition",
) => {
  const remoteVideo = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection("lives")
    .doc(videoId)
    .get();

  if (remoteVideo.exists) {
    return remoteVideo.data() as LiveClass;
  }

  return undefined;
};

export const getAllLives = async (seriesId: string) => {
  const remoteVideo = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection("lives")
    .get();

  const liveClasses: LiveClass[] = [];
  for (const rem of remoteVideo.docs) {
    liveClasses.push(rem.data() as LiveClass);
  }

  return liveClasses;
};

export const getAllVideos = async (seriesId: string) => {
  const remoteVideo = await admin
    .firestore()
    .collection("workouts")
    .doc(seriesId)
    .collection("exercises")
    .get();

  const workouts: Workout[] = [];
  for (const rem of remoteVideo.docs) {
    workouts.push(rem.data() as Workout);
  }

  return workouts;
};
