import * as functions from "firebase-functions";
import { toSaurav, toSwapnil } from "../../../constants/email/contacts";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { View } from "../../../models/Collection/Collection";
// import { handleView } from "../../../models/Collection/Methods/addView";
import {
  getListingNamesAndTimes,
  // listingsViewedThisDay,
} from "../../../models/User/getListingViews";
import { getUserById } from "../../../models/User/Methods";
import { ListingView } from "../../../models/User/User";
import { onNewCustomerVisit } from "../utils/sendgrid";
// import {addVisitor} from '../../../models/LeaderBoard/Methods';

export const onListingViewCreateFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/listingViews/{listingViewId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onListingViewCreate")) {
        return;
      }

      const userId: string = context.params.userId;

      const user = await getUserById(userId);
      const newView = snapshot.data() as ListingView;

      // const allViewsToday = await listingsViewedThisDay(
      //   userId,
      //   newView.viewTime
      // );

      const { listing_names, times } = getListingNamesAndTimes([newView]);

      // functions.logger.log("user", user);
      // functions.logger.log("listing_names", listing_names);
      // functions.logger.log("times", times);

      if (user) {
        // send email
        await onNewCustomerVisit(
          toSwapnil,
          user.name,
          user.phone,
          user.email,
          listing_names,
          times,
        );

        await onNewCustomerVisit(
          toSaurav,
          user.name,
          user.phone,
          user.email,
          listing_names,
          times,
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
