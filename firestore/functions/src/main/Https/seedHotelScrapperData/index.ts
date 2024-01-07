import * as functions from 'firebase-functions';
import * as cors from 'cors';
import {SeedCityScraperData} from './interface';
import {seedHotelScrappedData} from './seedData';
// import {getObjsToUse} from './getObjsToUse';
// import {createCityScrappingInput} from './cityScrappingInput';
// import {getCollectionByCollectionId} from '../../../models/Collection/Methods/getUtils';
// import {createThumbnailForCollection} from './thumbnailCreation';
// import {createCollectionDynamicLink} from '../../../models/Collection/Methods/deeplink';

const corsHandler = cors({origin: true});
export const seedHotelScrappedDataFunc = functions
  .region('asia-south1')
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // console.log('request', request);
        const result: SeedCityScraperData = request.body;
        // console.log('resultData', result.scrappedData);
        await seedHotelScrappedData(result.scrappedData);
        return response.status(200).send({status: 'Success'});
      } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Invalid request'});
      }
    });
  });
