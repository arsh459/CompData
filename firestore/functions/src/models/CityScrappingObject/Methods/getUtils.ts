import * as admin from 'firebase-admin';
import {CityScrappingObject} from '../CityScrappingObject';

export const getAllScrappingObjs = async () => {
  const allDocs = await admin
    .firestore()
    .collection('circuitScrapperObjs')
    .get();

  const scrappingObjs: CityScrappingObject[] = [];
  return allDocs.docs.reduce((acc, scrappingObj) => {
    if (scrappingObj.exists) {
      acc.push(scrappingObj.data() as CityScrappingObject);
    }

    return acc;
  }, scrappingObjs);
};

export const getAllScrappingObjsInList = async (circuitIds: string[]) => {
  const scrappingObjs: CityScrappingObject[] = [];
  circuitIds.forEach(async (circuitId) => {
    const scrappingObj = await admin
      .firestore()
      .collection('circuitScrapperObjs')
      .doc(circuitId)
      .get();
    if (scrappingObj.exists) {
      scrappingObjs.push(scrappingObj.data() as CityScrappingObject);
    }
  });

  return scrappingObjs;
};
