import * as moment from 'moment';

export const addMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() + minutes*60000);
}

export const leftIsBeforeEqualInTime = (dateLeft: moment.Moment, dateRight: moment.Moment): boolean => {


    return moment(dateLeft).isSameOrBefore(moment(dateRight))
    
    /*
    if (dateLeft.hours() < dateRight.hours()){
        return true
    }

    if (dateLeft.hours() === dateRight.hours()){
        if (dateLeft.minutes() <= dateRight.minutes()){
            return true
        }
    }

    return false
    */


}

export const shiftToRightDay = (dateLeft: moment.Moment, dateRight: moment.Moment): moment.Moment => {
    return moment(dateRight).set({hours: dateLeft.hours(), minutes: dateLeft.minutes()})
}