import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { UserInterface } from "../../../models/User/User";
import { updateUserLedgerEntry } from "./leaderboardUpdate";
import { updateFPConv, updateMixpanelCallStatus } from "./updateFPConv";
import { notificationTimeUpdate } from "./notificationTimeUpdate";
import { handleAdSourceNotification } from "./adSourceUserNotification";
import { userMixpanelFlags } from "./mixpanelFlags";
import { handleBootcampInviteRecersive } from "./bootcampInvite";
import { handleDietFormNotification } from "./handleDietFormNotification";
import { mixpanelPaidFlags } from "./mixpanelPaidFlags";
import { updateUserRankNameImgV2 } from "./updateUserRankV2";
import { sendBlockedUserNotification } from "./blockedUserNotification";
import { sendChallengeJoinNotification } from "./onChallengeJoinNotification";
import { tzUpdate } from "./tzUpdate";

export const onUserUpdateFunc = functions
  .region("asia-south1")
  // .runWith({ timeoutSeconds: 360 })
  .firestore.document("users/{userId}")
  .onUpdate(async (change, context) => {
    try {
      const nowUser = change.after.data() as UserInterface;
      const prevUser = change.before.data() as UserInterface;
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onUserUpdate")) {
        return;
      }

      // generate newInviteUrlId needed
      // let inviteURL: string | undefined = undefined;
      // if (inviteURLToBeUpdated(nowUser, prevUser)) {
      //   inviteURL = await createUserStoreLink(
      //     nowUser.uid,
      //     "influencer",
      //     nowUser.name,
      //     nowUser.bio,
      //     nowUser.imageURI,
      //     nowUser.instagramHandle,
      //   );
      // }
      console.log("uid", nowUser.uid);
      console.log("uid2", prevUser.uid);
      console.log("functionEventId", functionEventId);

      // update invite urls
      await updateUserLedgerEntry(nowUser, "inviteURL");
      console.log("run updateUserLedgerEntry");
      // await updateUGCListingValues(nowUser);

      // will retrigger same update
      // if (inviteURL) {
      //   await setOne("users", nowUser.uid, { inviteURL: inviteURL }, true);
      // }

      // update collections, trips & messages
      // await updateCollectionAuthor(nowUser, prevUser);

      // update userRank
      await updateUserRankNameImgV2(nowUser, prevUser);
      console.log("run updateUserRankNameImgV2");

      // update timezones
      try {
        await tzUpdate(nowUser, prevUser);
      } catch (error) {
        console.log("error updating timezone");
      }

      // socialboat users signup
      // await handleSocialBoatSignUp(prevUser, nowUser);

      try {
        await updateFPConv(nowUser, prevUser);
        await updateMixpanelCallStatus(nowUser, prevUser, true);
      } catch (e) {
        console.log("error in updateFPConv or updateMixpanelCallStatus", e);
      }

      console.log("run updateFPConv");

      try {
        await notificationTimeUpdate(nowUser, prevUser);
      } catch (e) {
        console.log("error in notificationTimeUpdate", e);
      }

      console.log("run notificationTimeUpdate");

      try {
        await handleAdSourceNotification(nowUser, prevUser);
      } catch (error) {
        console.log("error in handleAdSourceNotification", error);
      }

      console.log("run handleAdSourceNotification");

      // mixpanel flags
      try {
        await userMixpanelFlags(nowUser, prevUser);
      } catch (error) {
        console.log("error in userMixpanelFlags", error);
      }

      console.log("run userMixpanelFlags");

      try {
        await mixpanelPaidFlags(nowUser, prevUser);
      } catch (error) {
        console.log("error in mixpanelPaidFlags", error);
      }

      console.log("run mixpanelPaidFlags");

      try {
        await handleBootcampInviteRecersive(nowUser, prevUser);
      } catch (error) {
        console.log("error in handleBootcampInviteRecersive", error);
      }

      console.log("run handleBootcampInviteRecersive");

      try {
        await handleDietFormNotification(nowUser, prevUser);
      } catch (error) {
        console.log("error in handleDietFormNotification", error);
      }

      console.log("run handleDietFormNotification");

      try {
        await sendBlockedUserNotification(nowUser, prevUser);
      } catch (error) {}

      try {
        await sendChallengeJoinNotification(nowUser, prevUser);
      } catch (error) {}

      return;

      // opt in message
      // if (nowUser.uid === RahulUID) {
      // try {
      //   await handleOptIn(nowUser);
      // } catch (error) {}
      // }

      // handle welcome messages
      // console.log("welcomeMessagesForEvents", nowUser.welcomeMessagesForEvents);
      // if (
      //   nowUser.welcomeMessagesForEvents &&
      //   nowUser.welcomeMessagesForEvents.length > 0
      // ) {
      //   await handleWelcomeMessages(nowUser.welcomeMessagesForEvents, nowUser);
      // }

      // if (nowUser.teamCreateMessage && nowUser.teamCreateMessage.length > 0) {
      //   await handleTeamCreateMessage(
      //     nowUser.teamCreateMessage,
      //     nowUser,
      //     "new_team",
      //   );
      // }

      // handle course welcome messages
      // if (
      //   nowUser.welcomeMessagesForCourses &&
      //   nowUser.welcomeMessagesForCourses.length > 0
      // ) {
      //   await handleCourseMessage(
      //     nowUser.welcomeMessagesForCourses,
      //     nowUser,
      //     "workout_series",
      //   );
      // }

      // if (
      //   nowUser.inviteMessagesForEvents &&
      //   nowUser.inviteMessagesForEvents.length > 0
      // ) {
      //   await handleInviteMessages(nowUser.inviteMessagesForEvents, nowUser);
      // }
    } catch (error) {
      console.error("Error in main", error);
    }
  });
