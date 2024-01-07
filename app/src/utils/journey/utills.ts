import firestore from "@react-native-firebase/firestore";
import { Journey } from "@models/Jounrney/Jourrney";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const createNewJourney = (): Journey => {
  const now = Date.now();
  return {
    createdOn: now,
    updatedOn: now,
    displayOn: now,
    id: uuidv4(),
  };
};

export const saveJourney = async (uid: string, journey: Journey) => {
  const now = Date.now();
  const journeyRef = firestore()
    .collection("users")
    .doc(uid)
    .collection("journey")
    .doc(journey.id);

  if (journey.currWeight && journey.media) {
    await journeyRef.set({ ...journey, updatedOn: now }, { merge: true });
  }
};

export const deleteJourney = async (uid: string, journeyId: string) => {
  const journeyRef = firestore()
    .collection("users")
    .doc(uid)
    .collection("journey")
    .doc(journeyId);

  journeyRef.delete();
};
