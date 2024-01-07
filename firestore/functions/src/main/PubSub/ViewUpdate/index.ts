import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
// import {getUserLeads} from '../../../models/Lead/Methods/getUtils';
// import {getAllNotificationsForUser} from '../../../models/Notifications/Methods';
// import {getUserTrips} from '../../../models/Trip/Methods/getUtils';
import { getAllUsers_ByCollection } from "../../../models/User/Methods";
// import { UserInterface } from "../../../models/User/User";
import {
  handleLeadFetchRequest,
  handleViewFetchRequest,
  handleEarningFetchRequest,
} from "./viewUtils";

export const cronViewsLeadsEarningFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("0 0 * * *")
  .onRun(async (context) => {
    try {
      const users = await getAllUsers_ByCollection();
      const currDate = new Date().getTime();
      const twoWeekAgoDate = currDate - 24 * 60 * 60 * 14 * 1000;
      const twoWeekAgoDate_1 = currDate - 24 * 60 * 60 * 15 * 1000;
      const oneMonthAgoDate = currDate - 24 * 60 * 60 * 30 * 1000;
      const oneMonthAgoDate_1 = currDate - 24 * 60 * 60 * 31 * 1000;

      for (const user of users) {
        // const userNotifications = await getAllNotificationsForUser(
        //   user.uid,
        //   oneMonthAgoDate,
        // );
        // const user: UserInterface = {
        // uid: "9mI1kK05eAaxAVmYTAirdeqh5PV2",
        // };

        // functions.logger.log("user", user.uid);

        const {
          views_month_reduce,
          views_week_reduce,
        } = await handleViewFetchRequest(
          user.uid,
          oneMonthAgoDate,
          oneMonthAgoDate_1,
          twoWeekAgoDate,
          twoWeekAgoDate_1
        );

        const {
          leads_month_reduce,
          leads_week_reduce,
        } = await handleLeadFetchRequest(
          user.uid,
          oneMonthAgoDate,
          oneMonthAgoDate_1,
          twoWeekAgoDate,
          twoWeekAgoDate_1
        );

        const {
          earnings_month_reduce,
          earnings_week_reduce,
        } = await handleEarningFetchRequest(
          user.uid,
          oneMonthAgoDate,
          oneMonthAgoDate_1,
          twoWeekAgoDate,
          twoWeekAgoDate_1
        );

        // functions.logger.debug(
        // `views_week_reduce:${views_week_reduce} views_month_reduce:${views_month_reduce} leads_week_reduce:${leads_week_reduce} leads_month_reduce:${leads_month_reduce} earnings_week_reduce:${earnings_week_reduce} earnings_month_reduce:${earnings_month_reduce}`
        // );

        await firestore()
          .collection("leaderBoard")
          .doc(`leader-${user.uid}`)
          .update({
            // views
            numViews2Weeks: firestore.FieldValue.increment(-views_week_reduce),
            numViews1Month: firestore.FieldValue.increment(-views_month_reduce),

            // leads
            numLeads2Weeks: firestore.FieldValue.increment(-leads_week_reduce),
            numLeads1Month: firestore.FieldValue.increment(-leads_month_reduce),

            // earning reconcile
            earnings2Weeks: firestore.FieldValue.increment(
              -earnings_week_reduce
            ),
            earnings1Month: firestore.FieldValue.increment(
              -earnings_month_reduce
            ),
          });
      }
    } catch (error) {
      console.log("Not updating Views");
    }
    return null;
  });
