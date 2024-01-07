import * as admin from "firebase-admin";
import {
  AppointmentInterface,
  CategoryTypes,
  appointmentStatus,
} from "./interface";

export const getLastSalesAppointment = async () => {
  const remoteDoc = await admin
    .firestore()
    .collection("appointments")
    .where("category", "==", "sales")
    .orderBy("createdOn", "desc")
    .limit(1)
    .get();

  if (remoteDoc.docs.length) {
    return remoteDoc.docs[0].data() as AppointmentInterface;
  }

  return undefined;
};

export const getAppointmentsByType = async (category: CategoryTypes) => {
  const remoteDocs = await admin
    .firestore()
    .collection("appointments")
    .where("category", "==", category)
    .orderBy("createdOn", "desc")
    // .limit(1)
    .get();

  const appointmentDocs: AppointmentInterface[] = [];
  for (const doc of remoteDocs.docs) {
    appointmentDocs.push(doc.data() as AppointmentInterface);
  }

  return appointmentDocs;
};

export const getAppointmentDoc = async (appointmentId: string) => {
  const remoteDoc = await admin
    .firestore()
    .collection("appointments")
    .doc(appointmentId)
    .get();

  if (remoteDoc.exists) {
    return remoteDoc.data() as AppointmentInterface;
  }

  return undefined;
};

export const getUserAppointmentsStatus = async (
  uid: string,
  category: CategoryTypes,
  status: appointmentStatus,
) => {
  const remoteDocs = await admin
    .firestore()
    .collection("appointments")
    .where("patientId", "==", uid)
    .where("status", "==", status)
    .where("category", "==", category)
    .get();

  const appointmentDocs: AppointmentInterface[] = [];
  for (const doc of remoteDocs.docs) {
    appointmentDocs.push(doc.data() as AppointmentInterface);
  }

  return appointmentDocs;
};
