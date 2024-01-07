import {ListingInterface} from './Listing';
import {getDistanceFromLatLonInKm} from '../../utils/haversine/haversine';
import {configuration} from '../../constants/configuration/configuration';
import {days} from '../../constants/days/days';
import {leftIsBeforeEqualInTime, shiftToRightDay} from '../../utils/datetime/utils';
import {FeasibleSlot} from '../../recommendations/interface';
import {OperatingHoursInterface} from './OperatingHoursObj';
import * as moment from 'moment';

export const getCoordinatesOfListing = (listing: ListingInterface) => {
    return {
        lat: listing.lat,
        lng: listing.lng
    }
}

export const getTravelTime = (
    listing: ListingInterface, 
    originLat: number, originLng: number, 
    returnHome: boolean) => {

        let distanceInKm = 0;
        if (listing.lat !== 0 && listing.lng !== 0){
            distanceInKm = getDistanceFromLatLonInKm(originLat, originLng, listing.lat, listing.lng);
        };

        if (returnHome){
            return (distanceInKm*configuration.sf*60*2)/configuration.avgSpeed
        }

        return (distanceInKm*configuration.sf*60)/configuration.avgSpeed
    }

export const getMinTat = (
    listing: ListingInterface) => {

        return listing.pricePaxVariants.reduce(
            (min, p) => p.tat < min ? p.tat : min, 
            listing.pricePaxVariants[0].tat
            );
    }

export const getTat = (
    listing: ListingInterface,
    variantId: string) => {

        return listing.pricePaxVariants.filter(item => item.variantId === variantId)[0].tat;
    }


export const getFeasibleSlots = (
    listing: ListingInterface, 
    travelTime: number, 
    timeStart: moment.Moment,
    ): FeasibleSlot[] => {

    // console.log('listingName', listing.listingName);
    // console.log('listingType', listing.listingType);
    // console.log('book complete', listing.bookCompleteSlot);
    // console.log('cutoff time', listing.cutoffTime);
    

    const feasibleBroadSlots = getOperatingHoursForWindow(listing, timeStart);
    // console.log('feasibleBroadSlots', feasibleBroadSlots);
    if (feasibleBroadSlots.length > 0){
        const earliestReachTime = moment(timeStart).add(travelTime, 'minutes');

        // console.log('earliestReachTime', earliestReachTime.format());

        const response : FeasibleSlot[] = []
        return feasibleBroadSlots.reduce((acc, item) => {

            const slot = getSlot(earliestReachTime, item.startTime, item.endTime, listing);

            // console.log('SLOT:')
            // console.log('slotStart', slot?.slotStart.format());
            // console.log('slotEnd', slot?.slotEnd.format());



            if (slot){
                acc.push(slot)
            }
            return acc

        }, response)
    }

    return []
}

const getOperatingHoursForWindow = (
    listing: ListingInterface, 
    timeStart: moment.Moment) => {

    const response: OperatingHoursInterface[] = []

    return listing.operatingHours.reduce((acc, item) => {
        if (item.day === days[timeStart.day()]){

            // console.log('BROAD SLOT:');
            // console.log('day:', days[timeStart.day()]);
            // console.log('start time', item.startTime.format())
            // console.log('end time', item.endTime.format())



            // console.log('startTime:', shiftToRightDay(item.startTime, timeStart).format());
            // console.log('endTime:', shiftToRightDay(item.endTime, timeStart).format());

            acc.push({
                ...item,
                day: days[timeStart.day()],
                startTime: shiftToRightDay(item.startTime, timeStart),
                endTime: shiftToRightDay(item.endTime, timeStart),
            })
        }
        return acc 
    }, response)
}

const getSlot = (
    earliestReachTime: moment.Moment, 
    timeStart: moment.Moment, 
    timeEnd: moment.Moment,
    listing: ListingInterface) => {

    // console.log('Broad slot start', timeStart.format());
    // console.log('Broad slot end', timeEnd.format());

    // only apply cutoff time for these cases 
    if (listing.listingType === 'activities' || listing.listingType === 'events'){
        // only complete slot can be booked
        if (listing.bookCompleteSlot){
            const latestAllowedTime = moment(timeStart).subtract(listing.cutoffTime, 'minutes');

            // console.log('latestAllowedTime', latestAllowedTime.format());
            // console.log('earliestReachTime', earliestReachTime.format());

            // if reach before time 
            if (leftIsBeforeEqualInTime(earliestReachTime, latestAllowedTime)){
                // console.log('slot feasible', timeStart.format(), timeEnd.format());
                return {
                    slotStart: timeStart,
                    slotEnd: timeEnd
                }
            }
        } else {
            // if reached before 
            if (leftIsBeforeEqualInTime(earliestReachTime, timeStart)){

                // console.log('earliestReachTime', earliestReachTime.format());

                return {
                    slotStart: timeStart,
                    slotEnd: timeEnd
                }
            }

            else if (leftIsBeforeEqualInTime(earliestReachTime, timeEnd)){
                // allow partial slot booking 

                // console.log('earliestReachTime', earliestReachTime.format());

                return {
                    slotStart: earliestReachTime,
                    slotEnd: timeEnd
                } 
            }

        }
    }

    else {
        // if reached before 
        if (leftIsBeforeEqualInTime(earliestReachTime, timeStart)){
            return {
                slotStart: timeStart,
                slotEnd: timeEnd
            }
        }

        else if (leftIsBeforeEqualInTime(earliestReachTime, timeEnd)){
            // allow partial slot booking 
            return {
                slotStart: earliestReachTime,
                slotEnd: timeEnd
            } 
        }
    }

    return undefined
}
