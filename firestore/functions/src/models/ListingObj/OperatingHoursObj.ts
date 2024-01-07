import * as t from 'io-ts';
import {MomentFromString} from '../CustomTypes/Date';
import * as moment from 'moment';

export const OperatingHoursObj = t.type({
    day: t.string,
    startTime: MomentFromString,
    endTime: MomentFromString
});


export interface OperatingHoursInterface {
    day: string,
    startTime: moment.Moment,
    endTime: moment.Moment,
}

