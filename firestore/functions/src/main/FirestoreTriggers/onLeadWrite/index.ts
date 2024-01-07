import * as functions from "firebase-functions";
import { toSwapnil, toSaurav } from "../../../constants/email/contacts";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Lead } from "../../../models/Lead/interface";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import {
  onInfluencerLeadRequestEmail,
  onLeadRequestEmail,
} from "../utils/sendgrid";
import { onLeadTaken } from "./Methods";

export const onLeadCreateFunc = functions
  .region("asia-south1")
  .firestore.document("leadsV2/{leadId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onLeadCreateFunc")) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const lead = change.after.data() as Lead;
      const leadBefore = change.before.data() as Lead | undefined;

      let user: UserInterface | undefined = undefined;
      if (lead.creatorId) {
        user = await getUserById(lead.creatorId);
      }

      await onLeadRequestEmail(
        lead,
        toSwapnil,
        user?.name,
        user?.phone,
        user?.email,
        user?.instagramHandle,
      );
      await onLeadRequestEmail(
        lead,
        toSaurav,
        user?.name,
        user?.phone,
        user?.email,
        user?.instagramHandle,
      );

      // onCreate fire
      if (!leadBefore && user && user.email) {
        await onInfluencerLeadRequestEmail(
          lead,
          user.email,
          user.name,
          user.instagramHandle,
        );
      }

      // increment leaderboard
      if (!leadBefore && user) {
        await onLeadTaken(lead);
      }
    } catch (error) {
      console.error(error);
    }
  });
