import {OperatingWindow, TripElementInterface, State_TripStart} from '../models/TripObj/Trip';
import {TripRequestInterface} from './interface';
import {CircuitInterface} from '../models/Circuit/Circuit';
import {HotelInterface} from '../models/Hotel/Hotel';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import {configuration} from '../constants/configuration/configuration';

// const msInDay = 24*60*60*1000;

export const getOperatingWindows = (trip: TripRequestInterface): {[windowId: string]: OperatingWindow} => {

    // const numDays = (trip.timeEnd.getTime() - trip.timeStart.getTime())/(msInDay);

    // console.log('start', trip.timeStart);
    // console.log('end', trip.timeEnd);

    const response: {[windowId: string]: OperatingWindow} = {};
    // add zeroeth day
    const zeroethWindow = addZeroethDay(trip.timeStart);
    response[zeroethWindow.windowId] = zeroethWindow;

    // t+1 -> tn
    for (const m=moment(trip.timeStart).add(1, 'days'); m.isBefore(trip.timeEnd); m.add(1, 'days')){

        const newId = uuid();
        response[newId] = {
            timeStart: moment(m).set({hours: configuration['defaultStartTime'], minutes: 0}),
            timeEnd: moment(m).set({hours: configuration.defaultStartTime+configuration.maxHoursToPlanFor, minutes: 0}),
            windowId: newId,
        }
    }

    return response
}

const addZeroethDay = (timeStart: moment.Moment): OperatingWindow => {

    // clone
    const timeEnd = moment(timeStart);
    if (timeStart.hours() + configuration['maxHoursToPlanFor'] < 24){
        timeEnd.set({hours: timeEnd.hours() + configuration.maxHoursToPlanFor})
    } else {
        timeEnd.set({hours: 23, minutes: 59});
    }

    return {
        timeStart: timeStart,
        timeEnd: timeEnd,
        windowId: uuid(),
    }
}

const getZeroethStartCoordinates = (
    tripRequest: TripRequestInterface, 
    circuit: CircuitInterface,
    hotel?: HotelInterface): State_TripStart => {
    // if trip start is present 
    if (tripRequest.startLat && tripRequest.startLng){
        return {
            lat: tripRequest.startLat,
            lng: tripRequest.startLng
        }
    } else {
        return getGeneralStartCoordinates(circuit, hotel ? hotel : undefined)
    }
};

const getGeneralStartCoordinates = (
    circuit: CircuitInterface, 
    hotel?: HotelInterface) => {

    if (hotel){
        return {
            lat: hotel.lat,
            lng: hotel.lng,
        }
    } 
    // return circuit coordinates
    return {
        lat: circuit.lat,
        lng: circuit.lng
    }
}


export const createTripSubObj = (operatingWindows: {[windowId: string]: OperatingWindow}) => {

    const response: {[windowId: string]: TripElementInterface[]} = {};

    return Object.keys(operatingWindows).reduce((acc, item) => {
        // add empty list 
        acc[item] = []
        return acc
    }, response)

}

export const createTripState = (
    trip: TripRequestInterface, 
    operatingWindows: {[windowId: string]: OperatingWindow}, 
    circuit: CircuitInterface, 
    hotel?: HotelInterface) => {

    const response: {[windowId: string] : State_TripStart} = {};

    return Object.keys(operatingWindows).reduce((acc, item, index) => {

        // zeroeth day
        if (index === 0){
            acc[item] = getZeroethStartCoordinates(trip, circuit, hotel ? hotel : undefined);
        } else {
            acc[item] = getGeneralStartCoordinates(circuit, hotel ? hotel : undefined);
        }

        return acc

    }, response)
};

export const regularisePax = (tripRequest: TripRequestInterface): number => {
    if (tripRequest.pax && tripRequest.pax > 0){
        return tripRequest.pax
    }
    return 1
};

export const convertOperatingWindowsForRemote = (
    operatingWindows: {[windowId: string]: OperatingWindow}) => {

    const response: {[windowId: string]: {}} = {};
    return Object.keys(operatingWindows).reduce((acc, item) => {

        acc[item] = {
            ...operatingWindows[item],
            timeStart: operatingWindows[item].timeStart.format(),
            timeEnd: operatingWindows[item].timeEnd.format(),
        }
        
        return acc
    }, response)

}


/*

const getCoordinatesForOperatingWindow = (
    trip: TripObjInterface, 
    window: OperatingWindow, 
    allTasks: {[name: string]: ListingInterface}) => {

    let tLast = window.timeStart.getTime();
    let startLat = trip.startLat;
    let startLng = trip.startLng;
    trip.trip.map((item) => {
        if (item.windowId === window.windowId){
            if (item.timeStart.getTime() > tLast){
                tLast = item.timeStart.getTime();
                startLat = allTasks[item.listingId].lat;
                startLng = allTasks[item.listingId].lng;
            }
        }
        return 
    })

    return {
        tLast: new Date(tLast),
        startLat: startLat,
        startLng: startLng
    }
}


const getStartsForOperatingWindows = (trip: TripObjInterface, allTasks: {[name: string]: ListingInterface}) => {



    //trip.operatingWindows.reduce((acc, item) => {
    //    acc[item.windowId] = getCoordinatesForOperatingWindow(trip, item, allTasks)
    //    return acc; 
    //}, {});

}

*/