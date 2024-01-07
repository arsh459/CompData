import * as admin from "firebase-admin";
import { LocalCohort, sbEventInterface } from "./sbEvent";

const updateSeatsBooked = async (eventId: string, cohortId: string) => {
  await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("cohorts")
    .doc(cohortId)
    .update({
      seatsBooked: admin.firestore.FieldValue.increment(1),
    });
};

export const handleEventRegistration = async (
  eventId: string,
  pinnedCohort: LocalCohort | undefined,
) => {
  if (pinnedCohort) {
    await updateSeatsBooked(eventId, pinnedCohort.id);
  }
};

export const handleUserEnrollment = async (
  userId: string,
  communityId: string,
  eventId: string,
  cohortId?: string,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      enrolledCommunities: admin.firestore.FieldValue.arrayUnion(communityId),
      enrolledEvents: admin.firestore.FieldValue.arrayUnion(eventId),
      welcomeMessagesForEvents: admin.firestore.FieldValue.arrayUnion(eventId),
      ...(cohortId
        ? { enrolledCohorts: admin.firestore.FieldValue.arrayUnion(cohortId) }
        : {}),
    });
};

export const updateChildEvent = async (
  childEventId: string,
  parentEvent: sbEventInterface,
) => {
  await admin
    .firestore()
    .collection("sbEvents")
    .doc(childEventId)
    .update({
      ...(parentEvent.faq ? { faq: parentEvent.faq } : {}),
      ...(parentEvent.whoIsItFor ? { whoIsItFor: parentEvent.whoIsItFor } : {}),
      ...(parentEvent.programDetails
        ? { programDetails: parentEvent.programDetails }
        : {}),
      ...(parentEvent.courseGoal ? { courseGoal: parentEvent.courseGoal } : {}),
    });
};
