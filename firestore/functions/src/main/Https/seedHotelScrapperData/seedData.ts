import {HotelScrappingOutput} from '../../../models/HotelScrappingOutput/HotelScrappingOutput';
import * as admin from 'firebase-admin';
import {ListingDetailInterface} from '../../../models/ListingDetail/interface';
import {
  ListingInventory,
  SingleDateInventory,
} from '../../../models/ListingInventory/ListingInventory';

export const seedHotelScrappedData = async (
  scrappedData: HotelScrappingOutput[],
) => {
  const uniqueHotelScrapped: {[listingId: string]: HotelScrappingOutput[]} = {};
  scrappedData.forEach((item) => {
    if (item.listing_id && uniqueHotelScrapped[item.listing_id]) {
      uniqueHotelScrapped[item.listing_id].push(item);
    } else if (item.listing_id) {
      uniqueHotelScrapped[item.listing_id] = [item];
    }
  });

  // console.log('unique hotels', Object.keys(uniqueHotelScrapped).length);

  Object.keys(uniqueHotelScrapped).forEach(async (listingId) => {
    const matchingHotel = await admin
      .firestore()
      .collection('stays')
      .doc(listingId)
      .get();

    // console.log('matchingHotel', matchingHotel.docs);

    // if a matching doc is found
    if (matchingHotel.exists) {
      const detailObj = matchingHotel.data() as ListingDetailInterface;

      // listing inventories
      const listingInventories = getListingInventory(
        detailObj,
        uniqueHotelScrapped[listingId],
      );

      // seed data
      await admin
        .firestore()
        .collection('stays')
        .doc(detailObj.listingId)
        .collection('inventory')
        .doc('variantInventory')
        .set(listingInventories, {merge: true});
    }
  });
};

const getListingInventory = (
  detail: ListingDetailInterface,
  scrappedValues: HotelScrappingOutput[],
) => {
  const inventoryObjs: ListingInventory = {};
  return scrappedValues.reduce((acc, item) => {
    // getVariantIdForScrappedOutput(detail.variants, item);
    detail.variants.forEach((variant) => {
      if (acc[variant.variantId]) {
        acc[variant.variantId][item.checkin_date] = createSingleDateInventory(
          item,
        );
      } else {
        acc[variant.variantId] = {
          [item.checkin_date]: createSingleDateInventory(item),
        };
      }
    });

    return acc;
  }, inventoryObjs);
};

const createSingleDateInventory = (
  item: HotelScrappingOutput,
): SingleDateInventory => {
  return {
    inventory: 99,
    basePrice: item.room_base_price,
  };
};
