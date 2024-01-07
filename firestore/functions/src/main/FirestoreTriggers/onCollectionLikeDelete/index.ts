import * as functions from 'firebase-functions';
import {isDuplicateInvocation} from '../../../eventIds/isDuplicateInvocation';
import {decrementCollectionLike} from '../../../models/Collection/Methods/likeUtils';

export const onCollectionLikeDeleteFunc = functions
  .region('asia-south1')
  .firestore.document('collections/{collectionId}/likes/{uid}')
  .onDelete(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          'onCollectionLikeDeleteFunc',
        )
      ) {
        return;
      }

      const collectionId: string = context.params.collectionId;
      //   console.log('collectionId', collectionId);

      if (collectionId) {
        await decrementCollectionLike(collectionId);
      }
    } catch (error) {
      console.error(error);
    }
  });
