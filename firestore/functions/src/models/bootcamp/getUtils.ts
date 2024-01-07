import * as admin from "firebase-admin";
import { Bootcamp } from "./interface";

export const getBootcamp = async (id: string) => {
  const doc = await admin.firestore().collection("bootcamps").doc(id).get();

  if (doc.data()) {
    return doc.data() as Bootcamp;
  }

  return undefined;
};
