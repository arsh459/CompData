import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import { getUserById } from "../../../models/User/Methods";
// import { getEventMetrics } from "../onActivityUpdate/getEventMetrics";
// import { handlePrizeSummary } from "../onActivityUpdate/handlePrizeSummary";
import {
  // handleNewActivity,
  handleNewActivityWrapper,
} from "./handleActivityCreate";
import { addTotalCalories } from "./updateTotalCalories";

export const onActivityCreateFunc_dep = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}/activities/{postId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onActivityCreateFunc")
      ) {
        return;
      }

      const userId = context.params.userId;

      const userObj = await getUserById(userId);
      // const after = new Date("Mon Nov 29 2021").getTime();

      const activityObj = snapshot.data() as Activity;

      // const {
      //   after,
      //   calCriterion,
      //   nbMembers,
      //   // engineChoice,
      //   challengeLength,
      //   calThForStreak,
      //   streakLengthTh,
      // } = await getEventMetrics(activityObj.eventId);

      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());

      if (userObj) {
        await handleNewActivityWrapper(
          activityObj,
          userObj,
          // calCriterion,
          // // engineChoice,
          // after,
          // calThForStreak,
          // challengeLength,
          // streakLengthTh,
        );

        if (activityObj) {
          await addTotalCalories(
            userObj?.uid,
            activityObj.calories ? activityObj.calories : 0,
          );
        }

        // if (newRankObj?.rankedCoaches && newRankObj.reRankedUsers && after) {
        //   await handlePrizeSummary(
        //     activityObj.eventId,
        //     newRankObj.reRankedUsers,
        //     newRankObj.rankedCoaches,
        //     calCriterion,
        //     after,
        //     nbMembers,
        //     true,
        //   );
        // }
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
