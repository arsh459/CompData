import * as functions from 'firebase-functions';
import * as cors from 'cors';
import {getAllUsers_ByCollection} from '../../../../models/User/Methods';
import {reAddInviteURLs} from './utils';

const corsHandler = cors({origin: true});
export const reconcileUsersToLeaderboard = functions
  .region('asia-south1')
  .runWith({timeoutSeconds: 540, memory: '1GB'})
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: moveListingInterface = request.body;
        // const allListings = await getAllListings();
        const allUsers = await getAllUsers_ByCollection();
        await reAddInviteURLs(allUsers);

        return response.status(200).send({status: 'success'});
      } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Invalid request'});
      }
    });
  });
