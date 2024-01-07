import * as functions from 'firebase-functions';
import * as cors from 'cors';
import {HotelScrapperInputRequest} from './interface';
import {getObjsToUse} from './getObjsToUse';
import {createHotelScrapperInput} from './hotelScrapperInput';
// import {getObjsToUse} from './getObjsToUse';
// import {createCityScrappingInput} from './cityScrappingInput';
// import {getCollectionByCollectionId} from '../../../models/Collection/Methods/getUtils';
// import {createThumbnailForCollection} from './thumbnailCreation';
// import {createCollectionDynamicLink} from '../../../models/Collection/Methods/deeplink';

const corsHandler = cors({origin: true});
export const createHotelScrapperInputFunc = functions
  .region('asia-south1')
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: HotelScrapperInputRequest = request.body;
        const scrappingObjs = await getObjsToUse(result);

        const hotelScrappingInput = await createHotelScrapperInput(
          scrappingObjs,
          result.globalDates,
        );

        return response
          .status(200)
          .send({status: 'Success', hotelScrappingInput: hotelScrappingInput});
      } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Invalid request'});
      }
    });
  });
