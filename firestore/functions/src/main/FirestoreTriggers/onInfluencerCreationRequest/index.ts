import * as functions from 'firebase-functions';
import {toRahul, toSwapnil} from '../../../constants/email/contacts';
import {isDuplicateInvocation} from '../../../eventIds/isDuplicateInvocation';
import {UserInterface} from '../../../models/User/User';
import {onInfluencerCreationRequest} from '../utils/sendgrid';

export const onInfluencerCreationRequestFunc = functions
  .region('asia-south1')
  .firestore.document('users/{userId}')
  .onUpdate(async (change, context) => {
    try {
      const nowUser = change.after.data() as UserInterface;
      const prevUser = change.before.data() as UserInterface;
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, 'onIfluencerCreationFunc')
      ) {
        return;
      }

      // mailchimp
      if (
        nowUser.userType &&
        nowUser.userType === 'InfluencerRequest' &&
        nowUser.userType !== prevUser.userType
      ) {
        if (nowUser.email) {
          await onInfluencerCreationRequest(
            nowUser.email,
            nowUser.instagramHandle,
            nowUser.facebookProfile,
            nowUser.youtubeLink,
            nowUser.externalLink,
            nowUser.bio,
            nowUser.knownFor,
            nowUser.expertIn,
            nowUser.tagline,
            nowUser.name,
            nowUser.phone,
            nowUser.email,
          );
        }

        await onInfluencerCreationRequest(
          toSwapnil,
          nowUser.instagramHandle,
          nowUser.facebookProfile,
          nowUser.youtubeLink,
          nowUser.externalLink,
          nowUser.bio,
          nowUser.knownFor,
          nowUser.expertIn,
          nowUser.tagline,
          nowUser.name,
          nowUser.phone,
          nowUser.email,
        );
        await onInfluencerCreationRequest(
          toRahul,
          nowUser.instagramHandle,
          nowUser.facebookProfile,
          nowUser.youtubeLink,
          nowUser.externalLink,
          nowUser.bio,
          nowUser.knownFor,
          nowUser.expertIn,
          nowUser.tagline,
          nowUser.name,
          nowUser.phone,
          nowUser.email,
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
