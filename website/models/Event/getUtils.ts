import { db } from "config/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Cohort, EventInterface } from "./Event";
import { Registration } from "@models/Registrations/Registrations";

export const getEvent = async (eventId: string) => {
  const eventRef = doc(db, `sbEvents`, eventId);
  const docSnap = await getDoc(eventRef);
  const data = docSnap.data() as EventInterface | undefined;
  return data;
};

const createUserEventQuery = (
  userId: string,
  ownerUID: string,
  eventId: string,
  cohortId?: string
) => {
  const userRef = doc(db, `users`, ownerUID);
  const regisRef = collection(userRef, "registrations");

  if (cohortId) {
    return query(
      regisRef,
      where("userUid", "==", userId),
      where("eventId", "==", eventId),
      where("cohortId", "==", cohortId)
    );
  } else {
    return query(
      regisRef,
      where("userUid", "==", userId),
      where("eventId", "==", eventId)
    );
  }
};

export const getUserEventRegistrations = async (
  userId: string,
  ownerUID: string,
  eventId: string,
  cohortId?: string
) => {
  const q = createUserEventQuery(userId, ownerUID, eventId, cohortId);

  const docSnaps = await getDocs(q);

  const regis: Registration[] = [];
  for (const doc of docSnaps.docs) {
    regis.push(doc.data() as Registration);
  }

  return regis;
};

export const getRemoteCohort = async (eventId: string, cohortId: string) => {
  const cohortRef = doc(doc(db, `sbEvents`, eventId), "cohorts", cohortId);

  const cohortSnap = await getDoc(cohortRef);
  const data = cohortSnap.data() as Cohort | undefined;
  return data;
};

export const getEventCohorts = async (eventId: string) => {
  const cohortRef = collection(doc(db, `sbEvents`, eventId), "cohorts");

  const cohortSnap = await getDocs(cohortRef);
  const remoteCohorts: { [cohortId: string]: Cohort } = {};
  for (const cohort of cohortSnap.docs) {
    const tmp = cohort.data() as Cohort;
    remoteCohorts[tmp.id] = tmp;
  }

  return remoteCohorts;
};
