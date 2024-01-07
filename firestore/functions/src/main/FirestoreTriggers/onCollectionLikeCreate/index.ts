import * as functions from 'firebase-functions';
import {isDuplicateInvocation} from '../../../eventIds/isDuplicateInvocation';
import {incrementCollectionLike} from '../../../models/Collection/Methods/likeUtils';

export const onCollectionLikeCreateFunc = functions
  .region('asia-south1')
  .firestore.document('collections/{collectionId}/likes/{uid}')
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          'onCollectionLikeCreateFunc',
        )
      ) {
        return;
      }

      const collectionId: string = context.params.collectionId;
      //   console.log('collectionId', collectionId);

      if (collectionId) {
        await incrementCollectionLike(collectionId);
      }
    } catch (error) {
      console.error(error);
    }
  });
