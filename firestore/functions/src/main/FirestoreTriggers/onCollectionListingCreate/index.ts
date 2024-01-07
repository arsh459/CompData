import * as functions from 'firebase-functions';
import {isDuplicateInvocation} from '../../../eventIds/isDuplicateInvocation';
import {updateCollectionListings} from '../../../models/LeaderBoard/ContentKPIs';
import {CollectionListing} from '../../../models/Collection/Collection';

export const onCollectionListingCreateFunc = functions
  .region('asia-south1')
  .firestore.document('collections/{collectionId}/listings/{listingId}')
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          'onCollectionListingUpdateFunc',
        )
      ) {
        return;
      }

      const collectionListing = change.data() as CollectionListing;

      if (collectionListing.uid) {
        await updateCollectionListings(collectionListing.uid, 1);
      }
    } catch (error) {
      console.error(error);
    }
  });
