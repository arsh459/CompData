import { firestore } from "firebase-admin";
import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import { Lead } from "../../../models/Lead/interface";
import { isLeadOverBooking } from "../../../models/Lead/Methods/getUtils";
import { createNotification } from "../../../models/Notifications/createNotification";
import {
  Notification,
  NotificationOpenOnType,
} from "../../../models/Notifications/interface";
import { sendNotification } from "../../../models/Notifications/Methods";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";

export const onLeadTaken = async (
  leadData: Lead | BookingRequestISO,
  //   type: "lead" | "booking"
) => {
  // viewer
  const lead_taker = leadData.uid ? await getUserById(leadData.uid) : undefined;

  if (isLeadOverBooking(leadData) && leadData.creatorId) {
    await handleNotifcationForLead(
      "New lead",
      `${
        leadData.name ? leadData.name : "Someone"
      } just sent a new request to your store`,
      "lead",
      leadData.creatorId,
      leadData.leadId,
      "lead",
      lead_taker,
    );
  } else if (!isLeadOverBooking(leadData) && leadData.storeId) {
    await handleNotifcationForLead(
      "New booking request",
      `${
        leadData.name ? leadData.name : "Someone"
      } just submitted a new booking for ${leadData.listingName}`,
      "lead",
      leadData.storeId,
      leadData.requestId,
      "booking",
      lead_taker,
    );
  }
};

// const handleNotification = async (booking: BookingRequestISO) => {

// 	const trip_info =
//     type === "lead" && leadData.tripId
//       ? await getTripBytripId(leadData.tripId)
//       : undefined;

// 	  `New ${type} has been taken on your collection ${
//       trip_info && trip_info.collectionName
//     }`,

// }

const handleNotifcationForLead = async (
  title: string,
  body: string,
  norificationType: "view" | "lead" | "booking" | "earning",
  storeId: string,
  notificationId: string,
  notificationOpenType: NotificationOpenOnType,
  lead_taker?: UserInterface,
) => {
  const batch = firestore().batch();

  batch.update(firestore().collection("leaderBoard").doc(`leader-${storeId}`), {
    numLeads: firestore.FieldValue.increment(1),
    numLeads2Weeks: firestore.FieldValue.increment(1),
    numLeads1Month: firestore.FieldValue.increment(1),
  });

  const notification: Notification = createNotification(
    title,
    body,
    norificationType,
    notificationId,
    notificationOpenType,
    lead_taker,
  );

  batch.set(
    firestore()
      .collection(`users`)
      .doc(storeId)
      .collection("notifications")
      .doc(notification.notificationId),
    notification,
  );

  await batch.commit();
  await sendNotification(storeId, notification);
};
