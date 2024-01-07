import {
  getAllHotelScrappingObjs,
  getAllHotelScrappingObjsInList,
} from '../../../models/HotelScrapperObject/Methods/getUtils';
import {HotelScrapperInputRequest} from './interface';

export const getObjsToUse = async (result: HotelScrapperInputRequest) => {
  if (result.allHotels) {
    return await getAllHotelScrappingObjs();
  } else {
    return await getAllHotelScrappingObjsInList(result.specificHotelList);
  }
};
