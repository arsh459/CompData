import {OperatingWindow, OperatingWindowISO, TripElementInterface, TripElementISOInterface} from './Trip';

export const getFormattedOperatingWindows = (operatingWindows: {[windowId: string]: OperatingWindow}) => {

    const response: {[windowId: string]: OperatingWindowISO} = {}

    return Object.keys(operatingWindows).reduce((acc, item) => {
        acc[item] = {
            ...operatingWindows[item],
            timeStart: operatingWindows[item].timeStart.format(),
            timeEnd: operatingWindows[item].timeEnd.format(),
        }
        return acc 
    }, response)

}


export const getFormattedTrip = ( trip: {[windowId: string]: TripElementInterface[]}) => {

    const response: {[windowId: string]: TripElementISOInterface[]} = {};
    return Object.keys(trip).reduce((acc, item) => {
        acc[item] = getFormattedTripWindow(trip[item]);
        return acc 
    }, response)

}

const getFormattedTripWindow = (tripWindow: TripElementInterface[]) => {

    const response: TripElementISOInterface[] = [];
    return tripWindow.reduce((acc, el) => {
        acc.push({
            ...el,
            timeStart: el.timeStart.format(),
            timeEnd: el.timeEnd.format(),
        })

        return acc
    }, response)
}