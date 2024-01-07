import { db } from "@config/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export type calendlySessionTypes = "PROGRESS" | "DONE" | "FAILED";

export interface CalendlySession {
  uid: string;
  name?: string;
  id: string;
  createdOn: number;
  status: calendlySessionTypes;
}

export const updateCalendlySession = async (
  id: string,
  status: calendlySessionTypes
) => {
  await updateDoc(doc(db, "calendly", id), { status });
};

export const createCalendlySession = async (uid: string, name?: string) => {
  if (uid) {
    const newDoc: CalendlySession = {
      id: uuidv4(),
      createdOn: Date.now(),
      status: "PROGRESS",
      uid: uid,
      name: name ? name : "",
    };

    await setDoc(doc(db, "calendly", newDoc.id), newDoc);

    return newDoc.id;
  }
};
