import {TripObjInterface, TripElementInterface} from '../../models/TripObj/Trip';


export const getBookingDetails = (tripObj: TripObjInterface, taskId: string, listingType: string, listingId: string) => {

    if (listingType === 'stays') {
        return getStaySnippet(tripObj, listingId)
    }
    else {
        return getElementSnippet(tripObj, taskId)
    }   
}

const getElementSnippet = (tripObj: TripObjInterface, taskId: string) => {
    const response: TripElementInterface[] = [];

    const tasks = Object.values(tripObj.trip).reduce((acc, item) => {
        const selectedTaskList = item.filter((task) => task.taskId === taskId)
        if (selectedTaskList.length > 0){
            acc.push(selectedTaskList[0])
        }
        return acc
    }, response)

    if (tasks.length > 0){
        return tasks[0]
    }

    return undefined

}

const getStaySnippet = (tripObj: any, listingId: string) => {
    return tripObj.stays[listingId]
}