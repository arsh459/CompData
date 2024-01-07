import * as admin from 'firebase-admin';
import {HotelScrapperObject} from '../HotelScrapperObject';

export const getAllHotelScrappingObjs = async () => {
  const allDocs = await admin.firestore().collection('hotelScrapperObjs').get();

  const scrappingObjs: HotelScrapperObject[] = [];
  return allDocs.docs.reduce((acc, scrappingObj) => {
    if (scrappingObj.exists) {
      acc.push(scrappingObj.data() as HotelScrapperObject);
    }

    return acc;
  }, scrappingObjs);
};

export const getAllHotelScrappingObjsInList = async (listingIds: string[]) => {
  const scrappingObjs: HotelScrapperObject[] = [];
  listingIds.forEach(async (listingId) => {
    const scrappingObj = await admin
      .firestore()
      .collection('hotelScrapperObjs')
      .doc(listingId)
      .get();
    if (scrappingObj.exists) {
      scrappingObjs.push(scrappingObj.data() as HotelScrapperObject);
    }
  });

  return scrappingObjs;
};
