import {HotelScrapperObject} from '../../../models/HotelScrapperObject/HotelScrapperObject';
import * as moment from 'moment';

interface HotelScrapperInput {
  city_code: string;
  hotel_code: string;
  hotel_hmd_code: string;
  checkin_date: string; // yyyymmdd
  checkout_date: string; // yyyymmdd
  rt_configuration: string; // rooms-adults-children
  listing_id: string;
}

export const createHotelScrapperInput = (
  scrappingInputs: HotelScrapperObject[],
  globalDates: string[],
) => {
  const scrappingOutputs: HotelScrapperInput[] = [];
  return scrappingInputs.reduce((acc, item) => {
    // console.log('item', item);
    acc.push(...createCityInputsForWeekdays(item));
    acc.push(...createCityInputsForWeekEnds(item));
    acc.push(...createCityInputsForGlobalDates(item, globalDates));

    return acc;
  }, scrappingOutputs);
};

const createCityInputsForWeekdays = (hotelObj: HotelScrapperObject) => {
  const startDate = moment(new Date());
  const endDate = moment(startDate).add(hotelObj.numWeeksFromNow, 'weeks');

  // console.log('startDate', startDate.format());
  // console.log('endDate', endDate.format());

  const weekdayCityObjs: HotelScrapperInput[] = [];
  for (const m = startDate; m.isBefore(endDate); m.add(1, 'days')) {
    if (moment(m).day() !== 0 && moment(m).day() < 5) {
      // console.log('weekday', moment(m).format('YYYY-MM-DD'));
      weekdayCityObjs.push({
        city_code: hotelObj.cityCode,
        hotel_code: hotelObj.hotelCode,
        hotel_hmd_code: hotelObj.hotelHmdCode,
        checkin_date: moment(m).format('YYYYMMDD'),
        checkout_date: moment(m).add(1, 'day').format('YYYYMMDD'),
        rt_configuration: '1-2-0',
        listing_id: hotelObj.listingId,
      });
    }
  }

  return weekdayCityObjs;
};

const createCityInputsForWeekEnds = (hotelObj: HotelScrapperObject) => {
  const startDate = moment(new Date());
  const endDate = moment(startDate).add(hotelObj.numWeekendsFromNow, 'weeks');

  // console.log('startDate', startDate.format());
  // console.log('endDate', endDate.format());

  const weekdayCityObjs: HotelScrapperInput[] = [];
  for (const m = startDate; m.isBefore(endDate); m.add(1, 'days')) {
    if (moment(m).day() === 0 || moment(m).day() >= 5) {
      // console.log('weekend', moment(m).format('YYYY-MM-DD'));
      weekdayCityObjs.push({
        city_code: hotelObj.cityCode,
        hotel_code: hotelObj.hotelCode,
        hotel_hmd_code: hotelObj.hotelHmdCode,
        checkin_date: moment(m).format('YYYYMMDD'),
        checkout_date: moment(m).add(1, 'day').format('YYYYMMDD'),
        rt_configuration: '1-2-0',
        listing_id: hotelObj.listingId,
      });
    }
  }

  return weekdayCityObjs;
};

const createCityInputsForGlobalDates = (
  hotelObj: HotelScrapperObject,
  globalDates: string[],
) => {
  const globalDateObjs: HotelScrapperInput[] = [];
  globalDates.forEach((date) => {
    const momentDate = moment(date);
    // console.log('momentDate', momentDate.format());
    if (momentDate && momentDate.isAfter(moment(new Date()))) {
      globalDateObjs.push({
        city_code: hotelObj.cityCode,
        hotel_code: hotelObj.hotelCode,
        hotel_hmd_code: hotelObj.hotelHmdCode,
        checkin_date: moment(momentDate).format('YYYYMMDD'),
        checkout_date: moment(momentDate).add(1, 'day').format('YYYYMMDD'),
        rt_configuration: '1-2-0',
        listing_id: hotelObj.listingId,
      });
    }
  });

  return globalDateObjs;
};
