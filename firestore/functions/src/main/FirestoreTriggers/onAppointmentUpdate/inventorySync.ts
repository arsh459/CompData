import { getUserAppointmentsStatus } from "../../../models/Appointments/getUtils";
import * as admin from "firebase-admin";
import { AppointmentInterface } from "../../../models/Appointments/interface";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { getDayStartForTz } from "../onActivityUpdateV2/dateBucket";

export const runInventorySync = async (uid: string) => {
  const doneDoc = await getUserAppointmentsStatus(uid, "gynaecologist", "DONE");
  console.log("done doc consultations", doneDoc.length);

  const doneDiet = await getUserAppointmentsStatus(
    uid,
    "nutrtitionist",
    "DONE",
  );

  console.log("done diet consultations", doneDiet.length);

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      [`consultations.nbDoctorConsultationsDone`]:
        admin.firestore.FieldValue.increment(doneDoc.length),
      [`consultations.nbDietConsultationsDone`]:
        admin.firestore.FieldValue.increment(doneDiet.length),
    });

  const schDoc = await getUserAppointmentsStatus(
    uid,
    "gynaecologist",
    "SCHEDULED",
  );

  console.log("sch doc consultations", schDoc.length);

  const schDiet = await getUserAppointmentsStatus(
    uid,
    "nutrtitionist",
    "SCHEDULED",
  );

  console.log("sch diet consultations", schDiet.length);

  await runTimeSync(uid, doneDoc, schDoc, "doc");
  await runTimeSync(uid, doneDiet, schDiet, "diet");

  await markUnresolvedStatus(uid, schDiet, "diet");
  await markUnresolvedStatus(uid, schDoc, "doc");

  await markMissingNotes(uid, doneDoc, "doc");
  await markMissingNotes(uid, doneDiet, "diet");
};

export const markDietFollowupDate = async (
  uid: string,
  doneDiet: AppointmentInterface[],
) => {
  const sortedDoneDiet = sortedAppsInPast(doneDiet);
  if (sortedDoneDiet.length) {
    const lastApp = sortedDoneDiet[0];
    if (lastApp.startSlot) {
      const startDate = getDayStartForTz("Asia/Kolkata", lastApp.startSlot);

      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          dietFollowupDay: new Date(startDate).getDay(),
        });
    }
  }
};

export const addUserStreakLength = async (
  uid: string,
  currentLength: number,
) => {
  await mixpanel.people.set(
    uid,
    {
      currentStreakLength: currentLength,
    },
    { $ignore_time: true },
  );
};

const markUnresolvedStatus = async (
  uid: string,
  schApps: AppointmentInterface[],
  type: "doc" | "diet",
) => {
  const pastApps = getAppsInPast(schApps);

  await mixpanel.people.set(
    uid,
    {
      [`unresolved_${type}_consultations`]: pastApps.length ? true : false,
    },
    { $ignore_time: true },
  );
};

const markMissingNotes = async (
  uid: string,
  doneApps: AppointmentInterface[],
  type: "diet" | "doc" | "habit",
) => {
  //
  const emptyNots = getEmptyAppointments(doneApps);

  await mixpanel.people.set(
    uid,
    {
      [`empty_${type}_prescription`]: emptyNots.length ? true : false,
    },
    { $ignore_time: true },
  );
};

export const runTimeSync = async (
  uid: string,
  doneApps: AppointmentInterface[],
  scheduledApps: AppointmentInterface[],
  type: "doc" | "diet",
) => {
  const sortedForFutureDate = sortedAppsInFuture(scheduledApps);
  const sortedForPastDate = sortedAppsInPast(doneApps);

  if (
    sortedForFutureDate.length &&
    sortedForFutureDate[0] &&
    sortedForFutureDate[0].startSlot
  ) {
    console.log(
      "next consultation",
      type,
      new Date(sortedForFutureDate[0].startSlot),
    );
    await mixpanel.people.set(
      uid,
      {
        [`nextConsultation_${type}`]: new Date(
          sortedForFutureDate[0].startSlot,
        ),
      },
      { $ignore_time: true },
    );
  }

  if (
    sortedForPastDate.length &&
    sortedForPastDate[0] &&
    sortedForPastDate[0].startSlot
  ) {
    console.log(
      "last consultation",
      type,
      new Date(sortedForPastDate[0].startSlot),
    );

    await mixpanel.people.set(
      uid,
      {
        [`lastConsultation_${type}`]: new Date(sortedForPastDate[0].startSlot),
      },
      { $ignore_time: true },
    );
  }
};

const getAppsInPast = (appointments: AppointmentInterface[]) => {
  return appointments.filter(
    (item) => item.startSlot && item.startSlot < Date.now(),
  );
};

const getEmptyAppointments = (appointments: AppointmentInterface[]) => {
  return appointments.filter((item) => isEmptyAppointment(item));
};

const isEmptyAppointment = (appointment: AppointmentInterface) => {
  if (
    appointment.prescriptionData?.diagnosis ||
    appointment.prescriptionData?.tests ||
    appointment.prescriptionData?.medications ||
    appointment.prescriptionData?.supplements ||
    appointment.prescriptionData?.miscData ||
    appointment.prescriptionData?.diet?.noteForDietician ||
    appointment.prescriptionData?.diet?.nutrientsToInclude
  ) {
    return true;
  }

  return false;
};

const sortedAppsInFuture = (appointments: AppointmentInterface[]) => {
  return appointments
    .filter((item) => item.startSlot && item.startSlot > Date.now())
    .sort(
      (a, b) =>
        (a.startSlot ? a.startSlot : 0) - (b.startSlot ? b.startSlot : 0),
    );
};

const sortedAppsInPast = (appointments: AppointmentInterface[]) => {
  return appointments
    .filter((item) => item.startSlot && item.startSlot < Date.now())
    .sort(
      (a, b) =>
        -(a.startSlot ? a.startSlot : 0) - (b.startSlot ? b.startSlot : 0),
    );
};
