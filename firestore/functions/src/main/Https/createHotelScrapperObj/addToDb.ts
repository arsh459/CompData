import * as admin from 'firebase-admin';
import {HotelScrapperObject} from '../../../models/HotelScrapperObject/HotelScrapperObject';

export const addHotelScrappingObjs = async (
  hotelScrappingObjs: HotelScrapperObject[],
) => {
  const batch = admin.firestore().batch();
  hotelScrappingObjs.forEach((hotelScrapObj) => {
    batch.set(
      admin
        .firestore()
        .collection('hotelScrapperObjs')
        .doc(hotelScrapObj.listingId),
      hotelScrapObj,
    );
  });

  await batch.commit();
};
