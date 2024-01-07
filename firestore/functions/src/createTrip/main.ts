/*
import axios from 'axios';
import {googlePlacesURL, googlePlaceDetailURL} from '../constants/urls/urls';
import {parsePlacesResult, parseDetailResponse} from './parsePlacesCall';

import {RequestInterface, GooglePlacesResponse} from './interface';

import {incomingValidation} from '../validations/middlewareValidation';
*/
import { writeOne } from "../utils/firestore/fetchOne";
import { TripRequestInterface } from "./interface";
import { TripObjInterface } from "../models/TripObj/Trip";
import {
  getOperatingWindows,
  createTripSubObj,
  createTripState,
  regularisePax,
  convertOperatingWindowsForRemote,
} from "./utils";
import { getCircuitById } from "../models/Circuit/Methods";
import { HotelInterface } from "../models/Hotel/Hotel";
import { CircuitInterface } from "../models/Circuit/Circuit";
import { getHotelById } from "../models/Hotel/Methods";

export const createNewTrip = async (trip: TripRequestInterface) => {
  // get required data
  // console.time('getCircuitId');
  const circuit = await getCircuitById(trip.circuitId);
  // console.timeEnd('getCircuitId');
  // console.log('circuit', circuit);

  if (trip.hotelId) {
    const hotel = await getHotelById(trip.hotelId);
    const tripObj = createTripObj(trip, circuit, hotel);
    const tripObjForRemote = createTripObjForRemote(tripObj);
    await writeOne("trips", trip.tripId, tripObjForRemote);

    return {
      tripObj: tripObj,
      circuit: circuit,
      hotel: hotel,
    };
  } else {
    const tripObj = createTripObj(trip, circuit);
    const tripObjForRemote = createTripObjForRemote(tripObj);

    // console.time('tripWrite');
    await writeOne("trips", trip.tripId, tripObjForRemote);
    // console.timeEnd('tripWrite');

    return {
      tripObj: tripObj,
      circuit: circuit,
    };
  }
};

const createTripObj = (
  trip: TripRequestInterface,
  circuit: CircuitInterface,
  hotel?: HotelInterface,
): TripObjInterface => {
  const operatingWindows = getOperatingWindows(trip);
  // console.log('operatingWindows', operatingWindows);
  // console.log('UPDATED');

  return {
    ...trip,
    // ...() => trip.hotelId ? {hotelId: trip.hotelId} : {},
    //tripId: trip.tripId,
    //circuitId: trip.circuitId,
    //timeStart: trip.timeStart,
    //timeEnd: trip.timeEnd,
    pax: regularisePax(trip),
    //tags: trip.tags,
    //uid: trip.uid,
    trip: createTripSubObj(operatingWindows),
    tripState: {
      starts: hotel
        ? createTripState(trip, operatingWindows, circuit, hotel)
        : createTripState(trip, operatingWindows, circuit),
    },
    operatingWindows: operatingWindows,
  };
};

const createTripObjForRemote = (trip: TripObjInterface) => {
  return {
    ...trip,
    timeStart: trip.timeStart.format(),
    timeEnd: trip.timeEnd.format(),
    operatingWindows: convertOperatingWindowsForRemote(trip.operatingWindows),
  };
};
