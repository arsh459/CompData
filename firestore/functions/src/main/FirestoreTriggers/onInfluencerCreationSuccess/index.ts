import * as functions from 'firebase-functions';
import {toRahul, toSwapnil} from '../../../constants/email/contacts';
import {isDuplicateInvocation} from '../../../eventIds/isDuplicateInvocation';
import {UserInterface} from '../../../models/User/User';
import {onInfluencerCreationSuccess} from '../utils/sendgrid';

export const onInfluencerCreationSuccessFunc = functions
  .region('asia-south1')
  .firestore.document('users/{userId}')
  .onUpdate(async (change, context) => {
    try {
      const nowUser = change.after.data() as UserInterface;
      const prevUser = change.before.data() as UserInterface;
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          'onIfluencerCreationSuccessFunc',
        )
      ) {
        return;
      }

      // mailchimp
      if (
        nowUser.userType &&
        nowUser.userType === 'influencer' &&
        nowUser.userType !== prevUser.userType
      ) {
        if (nowUser.email) {
          await onInfluencerCreationSuccess(
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

        await onInfluencerCreationSuccess(
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
        await onInfluencerCreationSuccess(
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
