import * as functions from 'firebase-functions';
import {isDuplicateInvocation} from '../../../eventIds/isDuplicateInvocation';
import {addVisitor} from '../../../models/LeaderBoard/Methods';
import {Visitor} from '../../../models/User/User';

export const onVisitorCreateFunc = functions
  .region('asia-south1')
  .firestore.document('users/{userId}/visitors/{visitorId}')
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, 'onVisitorCreate')) {
        return;
      }

      const newVisitor = change.data() as Visitor;

      if (newVisitor.storeId && newVisitor.visitorId) {
        await addVisitor(newVisitor.storeId);
      }
    } catch (error) {
      console.error(error);
    }
  });
