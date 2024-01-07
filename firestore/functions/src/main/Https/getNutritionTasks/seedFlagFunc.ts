import * as functions from "firebase-functions";
import * as cors from "cors";
// import * as admin from "firebase-admin";
// import { subTaskDataItem, subTasksToUpdate } from "./constants";
// import { seedData, userStarts } from "./constants";
// import { getAllSbplans, getPaidUsers } from "../export/paidUsers";
// import { SbPlans } from "../../../models/AppSubscription/Subscription";
// import { mixpanel } from "../../../mixpanel/mixpanel";
import { format } from "date-fns";
// import moment = require("moment");
import { getAllSbplans, getPaidUsers } from "../export/paidUsers";
import { SbPlans } from "../../../models/AppSubscription/Subscription";
// import { roadmapFlags, seedData } from "./constants";
// import { runInventorySync } from "../../FirestoreTriggers/onAppointmentUpdate/inventorySync";

// import { notificationMessage } from "../../PubSub/WorkoutCron/main";
// import { runInventorySync } from "../../FirestoreTriggers/onAppointmentUpdate/inventorySync";
// import { RahulUID } from "../../../constants/email/contacts";
// seed -> paidPeriodEndsOn |

const corsHandler = cors({ origin: true });

export const seedFlagFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        let i: number = 0;

        // throw new Error("HI");

        // await runInventorySync(RahulUID);
        // for (const roadmapDt of roadmapFlags) {
        //   console.log("roadmapDt", roadmapDt.UID, roadmapDt["ROADMAP CREATED"]);
        //   if (roadmapDt["ROADMAP CREATED"] === "DONE") {
        //     await admin
        //       .firestore()
        //       .collection("users")
        //       .doc(roadmapDt.UID)
        //       .update({
        //         ["deliverableFlags.roadmap_updated"]: true,
        //       });
        //   }
        // }

        // throw new Error("Paused");

        // for (const dataPt of seedData) {
        //   let docSch: boolean = false;
        //   let dietSch: boolean = false;
        //   let docDone: boolean = false;
        //   let dietDone: boolean = false;

        //   if (dataPt["doc schedule"] === "Done") {
        //     docSch = true;
        //   }

        //   if (dataPt["diet schedule"] === "Done") {
        //     dietSch = true;
        //   }

        //   if (dataPt["doc done"] === "Done") {
        //     docDone = true;
        //   }

        //   if (dataPt["diet done"] === "Done") {
        //     dietDone = true;
        //   }

        //   if (docSch || dietSch || docDone || dietDone)
        //     await admin
        //       .firestore()
        //       .collection("users")
        //       .doc(dataPt.uid)
        //       .update({
        //         ...(docSch
        //           ? {
        //               ["deliverableFlags.doc_consultation_booked"]: true,
        //             }
        //           : {}),
        //         ...(dietSch
        //           ? {
        //               ["deliverableFlags.diet_consultation_booked"]: true,
        //             }
        //           : {}),
        //         ...(docDone
        //           ? {
        //               ["deliverableFlags.doc_consultation_done"]: true,
        //               ["deliverableFlags.prescription_sent"]: true,
        //               ["deliverableFlags.doc_fyi_message"]: true,
        //             }
        //           : {}),
        //         ...(dietDone
        //           ? {
        //               ["deliverableFlags.diet_plan_created"]: true,
        //               ["deliverableFlags.first_diet_consultation"]: true,
        //               ["deliverableFlags.diet_fyi_message"]: true,
        //             }
        //           : {}),
        //       });

        //   console.log(
        //     dataPt.uid,
        //     dataPt["doc schedule"],
        //     dataPt["diet schedule"],
        //     dataPt["doc done"],
        //     dataPt["diet done"],
        //   );
        // }

        const { paidUsers, userAppSubs } = await getPaidUsers();
        const allPlans = await getAllSbplans();
        const planObj: { [id: string]: SbPlans } = {};
        const remotePlanObj = allPlans.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, planObj);

        for (const paidUser of paidUsers) {
          if (paidUser.sbPlanId) {
            const plan = remotePlanObj[paidUser.sbPlanId];
            const userSub = userAppSubs[i];

            // await mixpanel.people.set(
            //   paidUser.uid,
            //   {
            //     planName: plan?.name ? plan?.name : "SB Plan",
            //   },
            //   { $ignore_time: true },
            // );

            // await runInventorySync(paidUser.uid);

            // await admin
            //   .firestore()
            //   .collection("users")
            //   .doc(paidUser.uid)
            //   .update({
            //     ["deliverableFlags.initial_flags_checked"]: true,
            //     // ...(paidUser.nutritionBadgeId
            //     //   ? {
            //     //       ["deliverableFlags.diet_plan_created"]: true,
            //     //     }
            //     //   : {}),
            //   });

            if (userSub) {
              console.log(
                i,
                " | ",
                paidUser.uid,
                " | ",
                paidUser.name,
                " | ",
                paidUser.sbPlanId,
                " | ",
                plan.name,
                " | ",
                userSub.paidPeriodEndsOn
                  ? format(new Date(userSub.paidPeriodEndsOn), "dd/MM/yyyy")
                  : "na",
                " | ",
                userSub.lastPaidUnix
                  ? format(new Date(userSub.lastPaidUnix), "dd/MM/yyyy")
                  : "na",
                " | ",
                paidUser.consultations?.nbDoctorConsultationsTotal,
                " | ",
                paidUser.consultations?.nbDietConsultationsTotal,
                " | ",
                paidUser.consultations?.nbDoctorConsultationsDone,
                " | ",
                paidUser.consultations?.nbDietConsultationsDone,
                " | ",
                paidUser.deliverableFlags?.welcome_paid_message,
                " | ",
                paidUser.deliverableFlags?.invoice_sent,
                " | ",
                paidUser.deliverableFlags?.doc_consultation_booked,
                " | ",
                paidUser.deliverableFlags?.doc_consultation_done,
                " | ",
                paidUser.deliverableFlags?.call_user_for_pending_doc,
                " | ",
                paidUser.deliverableFlags?.message_user_for_pending_doc,
                " | ",
                paidUser.deliverableFlags?.doc_fyi_message,
                " | ",
                paidUser.deliverableFlags?.prescription_sent,
                " | ",
                paidUser.deliverableFlags?.diet_consultation_booked,
                " | ",
                paidUser.deliverableFlags?.first_diet_consultation,
                " | ",
                paidUser.deliverableFlags?.call_user_for_diet_cons,
                " | ",
                paidUser.deliverableFlags?.message_user_for_pending_diet_cons,
                " | ",
                paidUser.deliverableFlags?.diet_plan_created,
                " | ",
                paidUser.deliverableFlags?.diet_fyi_message,
                " | ",
                paidUser.deliverableFlags?.roadmap_updated,
                " | ",
                paidUser.deliverableFlags?.roadmap_consultation_time,
                " | ",
                paidUser.deliverableFlags?.first_workout_consultation,
                " | ",
                paidUser.deliverableFlags?.call_user_for_pending_roadmap,
                " | ",
                paidUser.deliverableFlags
                  ?.message_user_for_pending_roadmap_cons,
                " | ",
                paidUser.deliverableFlags?.workout_fyi_message,
              );
            }
            i++;
          } else {
            throw new Error("UPDATE SB PLAN");
          }
        }

        console.log();
        console.log();
        console.log();

        // for (const doc of seedData) {
        //   console.log(
        //     doc.uid,
        //     typeof doc["doc cons"],
        //     doc["doc cons"],
        //     typeof doc["diet cons"],
        //     doc["diet cons"],
        //   );
        //   await admin
        //     .firestore()
        //     .collection("users")
        //     .doc(doc.uid)
        //     .update({
        //       ["consultations.nbDoctorConsultationsTotal"]:
        //         typeof doc["doc cons"] === "number" ? doc["doc cons"] : 0,
        //       ["consultations.nbDietConsultationsTotal"]:
        //         typeof doc["diet cons"] === "number" ? doc["diet cons"] : 0,
        //     });
        // }

        // throw new Error("PAUSED");

        // for (const lastPaidUserDoc of userStarts) {
        //   //   const sub = userAppSubs[i];

        //   const lastPaidUnix =
        //     moment(lastPaidUserDoc["MAX of Start Date"], "DD/MM/YYYY").unix() *
        //     1000;

        //   console.log(
        //     i,
        //     " | ",
        //     lastPaidUserDoc.UID,
        //     " | ",
        //     lastPaidUserDoc["MAX of Start Date"],
        //     format(new Date(lastPaidUnix), "dd-MM-yyyy"),
        //     lastPaidUnix,
        //   );

        //   try {
        //     await admin
        //       .firestore()
        //       .collection("appSubscriptions")
        //       .doc("0cPvVrnphNJBnvvOM9Zf")
        //       .collection("userSubs")
        //       .doc(lastPaidUserDoc.UID)
        //       .update({
        //         lastPaidUnix: lastPaidUnix,
        //       });
        //   } catch (e) {
        //     console.log("UID TO CHECK", lastPaidUserDoc.UID);
        //   }
        //   }

        //   if (sub.paidPeriodEndsOn) {

        //   if (lastPaidUserDoc["Start Date"] && lastPaidUserDoc.UID) {
        //     const lastPaidUnix =
        //       moment(lastPaidUserDoc["Start Date"], "DD/MM/YYYY").unix() * 1000;

        //     let docCons: number = 0;
        //     let dietCons: number = 0;
        //     if (
        //       lastPaidUserDoc["PLAN STATUS"] === "LIVE CLASS ACTIVE" ||
        //       lastPaidUserDoc["PLAN STATUS"] === "LIVE CLASS  ACTIVE"
        //     ) {
        //     } else if (lastPaidUserDoc["PLAN STATUS"] === "ON DEMAND ACTIVE") {
        //     } else if (lastPaidUserDoc["PLAN STATUS"] === "ON DEMAND EXPIRED") {
        //     } else if (lastPaidUserDoc["PLAN STATUS"] === "RESUBSCRIBED") {
        //     } else {
        //       console.log("lastPaidUserDoc", lastPaidUserDoc);
        //       throw new Error("PAUSED");
        //     }

        //     console.log(
        //       i,
        //       " | ",
        //       lastPaidUserDoc.UID,
        //       " | ",
        //       lastPaidUserDoc["Start Date"],

        //       lastPaidUserDoc["PLAN STATUS"],
        //       format(new Date(lastPaidUnix), "dd-MM-yyyy"),
        //       lastPaidUnix,
        //     );

        // try {
        //   await admin
        //     .firestore()
        //     .collection("appSubscriptions")
        //     .doc("0cPvVrnphNJBnvvOM9Zf")
        //     .collection("userSubs")
        //     .doc(lastPaidUserDoc.UID)
        //     .update({
        //       lastPaidUnix: lastPaidUnix,
        //     });
        // } catch (e) {
        //   console.log("UID TO CHECK", lastPaidUserDoc.UID);
        // }
        //   }

        //   await admin
        //     .firestore()
        //     .collection("appSubscriptions")
        //     .doc("0cPvVrnphNJBnvvOM9Zf")
        //     .collection("userSubs")
        //     .doc(lastPaidUserDoc.uid)
        //     .update({
        //       lastPaidUnix: lastPaidUnix,
        //     });

        //   await mixpanel.people.set(
        //     paidUser.uid,
        //     {
        //       paidPeriodEndsOn: new Date(sub.paidPeriodEndsOn),
        //     },
        //     { $ignore_time: true },
        //   );

        //   i++;
        //   }
        // }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 *
 * - SCHEDULED FOLLOWUPS
 * Mixpanel - User - lastDietConsultation | lastDocConsultation
 * Mixpanel - User - nextDietConsultation | nextDocConsultation
 *
 * - UNSCHEDULED FOLLOWUPS
 *
 *
 * uid/followups/id
 * SCHEDULED | DONE | POSTPONED
 *
 *
 * SCHEDULE_FOLLOWUPS_TODAY
 * nextFollowupTime is in PAST && dayToday
 * nextFollowupTime is not present && day Today
 * SCHEDULE_FOLLOWUPS_TODAY
 *
 *
 *
 * // view
 * // followups due today
 *
 * // followups to schedule today. Basis day of week
 *
 * // followups
 *
 *
 *
 *
 * First consultation done && unscheduled followup
 * Has not blocked followup -> Block Followup
 *
 * First consultation done && scheduled followup
 * Mixpanel - User - nextConsultation
 *
 *
 *
 */
