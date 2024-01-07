import {TripObjInterface, statusDictInterface} from '../models/TripObj/Trip';

export const updateTrip = (
    trip: TripObjInterface, 
    windowId: string, 
    taskId: string,
    variantId: string,
    qty: number, 
    status: statusDictInterface,
    ) => {
    
    const updatedWindow = trip.trip[windowId].map((item) => {
        if (item.taskId === taskId) {
            return {
                ...item,
                status: status,
                qty: qty,
                variantId: variantId,
            }
        }
        return item
    })

    return {
        ...trip.trip,
        [windowId]: updatedWindow
    }

}