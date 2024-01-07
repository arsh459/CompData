import {
  getAllScrappingObjs,
  getAllScrappingObjsInList,
} from '../../../models/CityScrappingObject/Methods/getUtils';
import {ScrapperInputRequest} from './interface';

export const getObjsToUse = async (result: ScrapperInputRequest) => {
  if (result.allCities) {
    return await getAllScrappingObjs();
  } else {
    return await getAllScrappingObjsInList(result.specificCityList);
  }
};
