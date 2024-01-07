import * as functions from 'firebase-functions';
import {isDuplicateInvocation} from '../../../eventIds/isDuplicateInvocation';
import {updateDiscoveries} from '../../../models/LeaderBoard/ContentKPIs';
import {UGCListing} from '../../../models/UGCListing/UGCListing';
import {discoveryCreateEmail} from '../utils/sendgrid';

export const onDiscoveryCreateFunc = functions
  .region('asia-south1')
  .firestore.document('ugcListings/{ugcListingId}')
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, 'onDiscoveryCreate')) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const discovery = change.data() as UGCListing;
      if (discovery.uid && discovery.saved) {
        await updateDiscoveries(discovery.uid, 1);
        await discoveryCreateEmail(discovery, 'create');
      }
    } catch (error) {
      console.error(error);
    }
  });
