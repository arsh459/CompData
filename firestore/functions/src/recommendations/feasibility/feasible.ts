import {TripObjInterface} from '../../models/TripObj/Trip';
import {ListingInterface} from '../../models/ListingObj/Listing';
// import {CircuitInterface} from '../../models/Circuit/Circuit';
import {getCurrentTripState} from '../../models/TripObj/Methods';
import {getMinTat, getTravelTime, getFeasibleSlots} from '../../models/ListingObj/Methods';
import {RecommendationInterface} from '../interface';
import * as moment from 'moment';


export const getFeasibleTasks = (
    allTasks: {[name: string]: ListingInterface}, 
    tripObj: TripObjInterface) => {

        // console.log('ts', tripObj.timeStart.format());
        // console.log('te', tripObj.timeEnd.format());

        const obj: {[name: string]: RecommendationInterface[]} = {};
        return Object.values(tripObj.operatingWindows).reduce((acc, item) => {

            // get current location 
            const currentState = getCurrentTripState(allTasks, tripObj, item);
            // console.log('currentState', currentState.lat, currentState.lng);
            // console.log('currentState time', currentState.timeStart.format());
            // get this time based on available time (tEnd-tStart-currentTripTime)
            const operatingTimeInMinutes = item.timeEnd.diff(currentState.timeStart, 'minutes');
            // console.log('window left', operatingTimeInMinutes);
            acc[item.windowId] = pruneTasksBasedOnTime(allTasks, currentState.lat, currentState.lng, operatingTimeInMinutes, currentState.timeStart, item.windowId);

            return acc
        }, obj);   
    };


const pruneTasksBasedOnTime = (
    allTasks: {[name: string]: ListingInterface}, 
    currentLat: number, 
    currentLng: number, 
    availableTime: number,
    timeStart: moment.Moment,
    windowId: string) => {
        
        // type of array
        const obj: RecommendationInterface [] = [];
        // console.log('timeStart for window', timeStart);

        return Object.keys(allTasks).reduce((acc, item) => {

            const travelTime = getTravelTime(allTasks[item], currentLat, currentLng, false);
            const tat =  getMinTat(allTasks[item]);

            // console.log('travelTime', travelTime);
            // console.log('tat', tat);
            // console.log('time start for task', timeStart.format())

            const feasibleSlots = getFeasibleSlots(allTasks[item], travelTime, timeStart);
            // console.log('feasibleSlots', feasibleSlots);
            // console.log('feasible', availableTime > travelTime && feasibleSlots.length > 0);

            // console.log('');
            // console.log('');

            if (availableTime > travelTime && feasibleSlots.length > 0){
                // assign item 
                acc.push({
                    listingId: item,
                    feasible: true,
                    finalScore: 0,
                    travelTime: travelTime,
                    journeyTime: travelTime + tat,
                    feasibleFromCurrent: true,
                    windowId: windowId,
                    feasibleSlots: feasibleSlots,
                });
            }else {
                // assign item 
                acc.push({
                    listingId: item,
                    feasible: false,
                    finalScore: 0,
                    travelTime: travelTime,
                    journeyTime: travelTime + tat,
                    feasibleFromCurrent: false,
                    windowId: windowId,
                    feasibleSlots: feasibleSlots,
                });
            }

            return acc 
        }, obj);
};
