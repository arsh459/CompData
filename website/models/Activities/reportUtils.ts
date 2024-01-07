import {
  doc,
  //   DocumentReference,
  arrayUnion,
  updateDoc,
  arrayRemove,
  writeBatch,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { ActivityTicket, reviewTicketStatus } from "./Activity";
import { v4 as uuidv4 } from "uuid";

// export const raiseTicket = async (
//   authorId: string,
//   actId: string,
//   ticketOwner: string
// ) => {
//   await updateDoc(doc(doc(db, "users", authorId), "activities", actId), {
//     reviewRequestedBy: arrayUnion(ticketOwner),
//     // reviewStatus: "REVIEW_REQUEST",
//   });
// };

export const createNewTicket = (
  uid: string,
  userName: string,
  authorPhone: string,
  userMessage: string
): ActivityTicket => {
  return {
    id: uuidv4(),
    reviewStatus: "PENDING",
    createdOn: Date.now(),
    createdBy: uid,
    userMessage: userMessage,
    isActive: true,
    createdByName: userName,
    createdByPhone: authorPhone,
  };
};

export const raiseTicket = async (
  authorId: string,
  authorName: string,
  authorPhone: string,
  actId: string,
  ticketOwner: string,
  ticketMessage: string
) => {
  const batch = writeBatch(db);

  const actRef = doc(doc(db, "users", authorId), "activities", actId);
  batch.update(actRef, {
    reviewStatus: "REVIEW_REQUEST",
    reviewRequestedBy: arrayUnion(ticketOwner),
  });

  const newTicket = createNewTicket(
    ticketOwner,
    authorName,
    authorPhone,
    ticketMessage
  );

  batch.set(doc(actRef, "tickets", newTicket.id), newTicket);

  await batch.commit();
};

// export const clearTicketForOther = async (
//   authorId: string,
//   actId: string,
//   ticketOwner: string
// ) => {
//   const actRef = doc(doc(db, "users", authorId), "activities", actId);

//   await updateDoc(actRef, {
//     reviewRequestedBy: arrayRemove(ticketOwner),
//   });
// };

export const clearTicket = async (
  authorId: string,
  actId: string,
  ticketOwner: string,
  ticketId: string
) => {
  const batch = writeBatch(db);
  const actRef = doc(doc(db, "users", authorId), "activities", actId);

  batch.update(actRef, {
    reviewRequestedBy: arrayRemove(ticketOwner),
    reviewStatus: "REVIEWED",
  });

  batch.update(doc(actRef, "tickets", ticketId), { isActive: false });

  await batch.commit();

  // await updateDoc(doc(doc(db, "users", authorId), "activities", actId), {
  //   reviewRequestedBy: arrayRemove(ticketOwner),
  //   // reviewStatus: "REVIEWED",
  // });
};

export const onSeePoints = async (authorId: string, actId: string) => {
  await updateDoc(doc(doc(db, "users", authorId), "activities", actId), {
    pointsSeen: true,
  });
};

export const onMarkTicket = async (
  uid: string,
  activityId: string,
  ticketId: string,
  status: reviewTicketStatus,
  text: string
) => {
  await updateDoc(
    doc(
      doc(doc(db, "users", uid), "activities", activityId),
      "tickets",
      ticketId
    ),
    {
      reviewStatus: status,
      judgeMessage: text,
    }
  );
};

export const onMakeTicketInActive = async (
  uid: string,
  activityId: string,
  ticketId: string
) => {
  await updateDoc(
    doc(
      doc(doc(db, "users", uid), "activities", activityId),
      "tickets",
      ticketId
    ),
    {
      isActive: false,
    }
  );
};
