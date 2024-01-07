import * as functions from 'firebase-functions';
import * as cors from 'cors';
import {ScrapperInputRequest} from './interface';
import {getObjsToUse} from './getObjsToUse';
import {createCityScrappingInput} from './cityScrappingInput';
// import {getCollectionByCollectionId} from '../../../models/Collection/Methods/getUtils';
// import {createThumbnailForCollection} from './thumbnailCreation';
// import {createCollectionDynamicLink} from '../../../models/Collection/Methods/deeplink';

const corsHandler = cors({origin: true});
export const createScrapperInputFunc = functions
  .region('asia-south1')
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: ScrapperInputRequest = request.body;
        const scrappingObjs = await getObjsToUse(result);

        // console.log('scrappingObjs', scrappingObjs);
        const cityScrappingInput = createCityScrappingInput(
          scrappingObjs,
          result.globalDates,
        );

        return response
          .status(200)
          .send({status: 'Success', cityScrappingInput: cityScrappingInput});
      } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Invalid request'});
      }
    });
  });
