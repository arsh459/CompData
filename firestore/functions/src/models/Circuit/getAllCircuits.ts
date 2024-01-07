import * as admin from "firebase-admin";
import { CircuitInterface } from "./Circuit";

export const getAllCircuits = async () => {
  const allCircuits = await admin.firestore().collection("circuits").get();

  const circuits: CircuitInterface[] = [];
  allCircuits.docs.forEach((doc) => {
    if (doc.exists) {
      circuits.push(doc.data() as CircuitInterface);
    }
  });

  return circuits;
};
