import * as functions from 'firebase-functions';
import * as cors from 'cors';
import {HotelScrapperObjCreation} from './interface';
import {addHotelScrappingObjs} from './addToDb';

const corsHandler = cors({origin: true});
export const createHotelScrapperObjsFunc = functions
  .region('asia-south1')
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: HotelScrapperObjCreation = request.body;
        await addHotelScrappingObjs(result.toCreateObjs);

        return response.status(200).send({status: 'Success'});
      } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Invalid request'});
      }
    });
  });
