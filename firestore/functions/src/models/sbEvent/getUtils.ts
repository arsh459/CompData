import * as admin from "firebase-admin";
import { Cohort, LocalCohort, sbEventInterface, SessionV2 } from "./sbEvent";

export const getSbEventById = async (id: string) => {
  const eventObj = await admin.firestore().collection("sbEvents").doc(id).get();
  const data = eventObj.data();
  if (data) {
    return data as sbEventInterface;
  }

  console.log("EVENT READ:", 1);

  return undefined;
};

export const getSbEventsInList = async (ids: string[]) => {
  const sbEvents: sbEventInterface[] = [];
  for (const id of ids) {
    const eventObj = await admin
      .firestore()
      .collection("sbEvents")
      .doc(id)
      .get();
    const data = eventObj.data();
    if (data) {
      sbEvents.push(data as sbEventInterface);
    }
  }

  return sbEvents;
};

export const getChildEvents = async (id: string) => {
  const sbEvents: sbEventInterface[] = [];

  const remoteEvents = await admin
    .firestore()
    .collection("sbEvents")
    .where("parentId", "==", id)

    .get();

  for (const remoteEvent of remoteEvents.docs) {
    const data = remoteEvent.data();
    if (data) {
      sbEvents.push(data as sbEventInterface);
    }
  }

  console.log("ALL TEAM READS:", sbEvents.length);

  return sbEvents;
};

export const getSessionStart = (cohort: LocalCohort): Date | null => {
  if (cohort.sessions && cohort.sessions.length > 0) {
    const ses = cohort.sessions[0];

    return ses.startTime;
  }

  return null;
};

export const parseCohort = (cohort: Cohort): LocalCohort => {
  return {
    ...cohort,
    registerBy: new Date(cohort.registerBy),
    sessions: cohort.sessions
      ? cohort.sessions.map((sess) => {
          return { ...sess, startTime: new Date(sess.startTime) };
        })
      : [],
  };
};

export const getCohorts = async (eventId: string) => {
  const cohorts = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("cohorts")
    .get();

  const localCohorts: LocalCohort[] = [];
  for (const cohort of cohorts.docs) {
    localCohorts.push(parseCohort(cohort.data() as Cohort));
  }

  return localCohorts;
};

const findPinnedCohort = (cohorts: LocalCohort[]): LocalCohort | undefined => {
  for (const cohort of cohorts) {
    if (cohort.pinned) {
      return cohort;
    }
  }

  return undefined;
};

export const getPinnedCohort = async (eventId: string) => {
  const cohorts = await getCohorts(eventId);
  return findPinnedCohort(cohorts);
};

export const getCohortById = async (eventId: string, cohortId?: string) => {
  if (cohortId) {
    const cohort = await admin
      .firestore()
      .collection("sbEvents")
      .doc(eventId)
      .collection("cohorts")
      .doc(cohortId)
      .get();

    if (cohort.exists) {
      const remoteCohort = cohort.data() as Cohort;

      return parseCohort(remoteCohort);
    }
  }

  return undefined;
};

export const saveSession = async (session: SessionV2, eventId: string) => {
  await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("program")
    .doc(session.id)
    .set(session);
};

export const updateStudentsInEvent = async (
  students: number,
  eventId: string,
) => {
  await admin.firestore().collection("sbEvents").doc(eventId).update({
    students: students,
  });
};

export const addUIDToEvent = async (uid: string, eventId: string) => {
  try {
    await admin
      .firestore()
      .collection("sbEvents")
      .doc(eventId)
      .update({
        enrolledUserUIDs: admin.firestore.FieldValue.arrayUnion(uid),
      });
  } catch (error) {
    console.log("error");
  }
};
