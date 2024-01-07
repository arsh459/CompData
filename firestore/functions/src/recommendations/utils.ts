// import {fetchOne} from '../utils/firestore/fetchOne';

import { TripObjInterface } from "../models/TripObj/Trip";
import { CircuitInterface } from "../models/Circuit/Circuit";
import { ListingInterface } from "../models/ListingObj/Listing";
import {
  RecommendationInterface,
  RecommendationResponseInterface,
  IndividualRecommendationResponseInterface,
  FeasibleSlot,
  FeasibleResponseSlot,
} from "./interface";

export const getTrip = async (tripId: string) => {
  try {
    // const tripObj = await fetchOne('trips', tripId);
    // return await tPromise.decode(TripObj, tripObj.data());
  } catch {
    throw new Error("Trip not present");
  }
};

export const regulariseTrip = (
  tripObj: TripObjInterface,
  circuit: CircuitInterface,
) => {
  //const tripCoords = regulariseCoordinates(tripObj, circuit);
  //const regularisedTrip = regularisePax(tripCoords);

  return tripObj;
};

export const regulariseOutput = (
  recommendations: { [name: string]: RecommendationInterface[] },
  needCircuit: boolean,
  allTasks: { [name: string]: ListingInterface },
): RecommendationResponseInterface => {
  // add circuit packet if needed
  //if (needCircuit){
  //    return {
  //        recommendations: recommendations,
  //        circuitPacket: allTasks
  //    }
  //}

  return {
    recommendations: regulariseRecs(recommendations),
  };
};

const regulariseRecs = (recs: {
  [name: string]: RecommendationInterface[];
}): { [name: string]: IndividualRecommendationResponseInterface[] } => {
  const response: {
    [name: string]: IndividualRecommendationResponseInterface[];
  } = {};
  return Object.keys(recs).reduce((acc, item) => {
    acc[item] = regulariseRecArray(recs[item]);
    return acc;
  }, response);
};

const regulariseRecArray = (
  recList: RecommendationInterface[],
): IndividualRecommendationResponseInterface[] => {
  const response: IndividualRecommendationResponseInterface[] = [];
  return recList.reduce((acc, item) => {
    acc.push({
      ...item,
      feasibleSlots: regulariseFeasibleSlot(item.feasibleSlots),
    });

    return acc;
  }, response);
};

const regulariseFeasibleSlot = (
  slots: FeasibleSlot[],
): FeasibleResponseSlot[] => {
  const response: FeasibleResponseSlot[] = [];
  return slots.reduce((acc, item) => {
    acc.push({
      slotStart: item.slotStart.format(),
      slotEnd: item.slotEnd.format(),
    });

    return acc;
  }, response);
};
