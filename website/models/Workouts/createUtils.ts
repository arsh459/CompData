import { WorkoutSeries } from "./Series";
import { v4 as uuidv4 } from "uuid";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { Workout } from "./Workout";
import { NutritionPlan } from "./NutritionPlan";
import { LiveClass } from "./LiveClass";
import { WorkoutActivitySelfie } from "./WorkoutActivity";

export const createNewSeries = (uid: string): WorkoutSeries => {
  const now = Date.now();
  return {
    name: "",
    description: "",
    seriesKey: "",

    id: uuidv4(),

    numWorkouts: 0,

    createdOnUnix: now,
    updatedOnUnix: now,

    cost: 0,
    currency: "₹",
    ownerUID: uid,
  };
};

export const createNewWorkout = (uid: string, initDay?: number): Workout => {
  const now = Date.now();
  return {
    name: "",
    description: "",
    videoKey: "",
    day: initDay ? initDay : 0,
    equipmentNeeded: "",
    calories: 0,

    id: uuidv4(),
    ownerUID: uid,

    createdOnUnix: now,
    updatedOnUnix: now,

    isFree: true,
    durationInSeconds: 10,
  };
};

export const createNewNutrition = (
  uid: string,
  initDay?: number
): NutritionPlan => {
  const now = Date.now();
  return {
    name: "",
    description: "",
    planKey: "",
    day: initDay ? initDay : 0,
    ingredients: "",
    calories: 0,

    type: "nutrition",
    ownerUID: uid,

    id: uuidv4(),

    createdOnUnix: now,
    updatedOnUnix: now,

    isFree: true,
  };
};

export const createNewSelfie = (
  uid: string,
  img: string
): WorkoutActivitySelfie => {
  const now = Date.now();
  return {
    id: uuidv4(),
    img,
    createdOn: now,
    updatedOn: now,
    uid,
  };
};

export const updateNewSelfie = async (
  img: string,
  selfieId: string,
  taskId: string,
  streamId: string
) => {
  await updateDoc(
    doc(
      doc(doc(db, "tasks", taskId), "streams", streamId),
      "private",
      selfieId
    ),
    {
      img: img,
      updatedOn: Date.now(),
    }
  );
};

export const saveNewSelfie = async (
  selfie: WorkoutActivitySelfie,
  taskId: string,
  streamId: string
) => {
  // console.log("selfie", selfie);
  await setDoc(
    doc(
      doc(doc(db, "tasks", taskId), "streams", streamId),
      "private",
      selfie.id
    ),
    selfie
  );
};

export const createNewLive = (uid: string, initDay?: number): LiveClass => {
  const now = Date.now();
  return {
    name: "",
    description: "",
    liveKey: "",
    day: initDay ? initDay : 0,
    calories: 0,

    ownerUID: uid,

    type: "live",

    id: uuidv4(),

    createdOnUnix: now,
    updatedOnUnix: now,

    isFree: true,
  };
};

export const saveNewSeries = async (newSeries: WorkoutSeries) => {
  const docRef = doc(db, "workouts", newSeries.id);
  await setDoc(docRef, newSeries);
};

export const deleteSeries = async (seriesId: string) => {
  const docRef = doc(db, "workouts", seriesId);
  await deleteDoc(docRef);
};

export const saveNewWorkout = async (seriesId: string, workout: Workout) => {
  // console.log("seriesId");
  const docRef = doc(doc(db, "workouts", seriesId), "exercises", workout.id);
  // console.log("doc", docRef);
  await setDoc(docRef, workout);
};

export const saveNewNutrition = async (
  seriesId: string,
  nutrition: NutritionPlan
) => {
  // console.log("seriesId");
  const docRef = doc(doc(db, "workouts", seriesId), "nutrition", nutrition.id);
  // console.log("doc", docRef);
  await setDoc(docRef, nutrition);
};

export const saveNewLive = async (seriesId: string, liveClass: LiveClass) => {
  // console.log("seriesId");
  const docRef = doc(doc(db, "workouts", seriesId), "lives", liveClass.id);
  // console.log("doc", docRef);
  await setDoc(docRef, liveClass);
};

export const deleteWorkout = async (seriesId: string, workoutId: string) => {
  // console.log("seriesId");
  const docRef = doc(doc(db, "workouts", seriesId), "exercises", workoutId);
  // console.log("doc", docRef);
  await deleteDoc(docRef);
};

export const deleteNutrition = async (
  seriesId: string,
  nutritionId: string
) => {
  // console.log("seriesId");
  const docRef = doc(doc(db, "workouts", seriesId), "nutrition", nutritionId);
  // console.log("doc", docRef);
  await deleteDoc(docRef);
};

export const deleteLive = async (seriesId: string, liveId: string) => {
  // console.log("seriesId");
  const docRef = doc(doc(db, "workouts", seriesId), "lives", liveId);
  // console.log("doc", docRef);
  await deleteDoc(docRef);
};
export const addEventIdToSeries = async (seriesId: string, eventId: string) => {
  const docRef = doc(db, "workouts", seriesId);
  await updateDoc(docRef, { eventIds: arrayUnion(eventId) });
};

export const removeEventIdToSeries = async (
  seriesId: string,
  eventId: string
) => {
  const docRef = doc(db, "workouts", seriesId);
  await updateDoc(docRef, { eventIds: arrayRemove(eventId) });
};
