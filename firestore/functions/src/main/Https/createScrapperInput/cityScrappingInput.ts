import {CityScrappingObject} from '../../../models/CityScrappingObject/CityScrappingObject';
import * as moment from 'moment';

interface CityScrappingInput {
  city_code: string;
  checkin_date: string; // yyyymmdd
  checkout_date: string; // yyyymmdd
  max_pages: number;
  rt_configuration: string; // rooms-adults-children
}

export const createCityScrappingInput = (
  scrappingInputs: CityScrappingObject[],
  globalDates: string[],
) => {
  const scrappingOutputs: CityScrappingInput[] = [];
  return scrappingInputs.reduce((acc, item) => {
    // console.log('item', item);
    acc.push(...createCityInputsForWeekdays(item));
    acc.push(...createCityInputsForWeekEnds(item));
    acc.push(...createCityInputsForGlobalDates(item, globalDates));

    return acc;
  }, scrappingOutputs);
};

const createCityInputsForWeekdays = (cityObj: CityScrappingObject) => {
  const startDate = moment(new Date());
  const endDate = moment(startDate).add(cityObj.numWeeksFromNow, 'weeks');

  // console.log('startDate', startDate.format());
  // console.log('endDate', endDate.format());

  const weekdayCityObjs: CityScrappingInput[] = [];
  for (const m = startDate; m.isBefore(endDate); m.add(1, 'days')) {
    if (moment(m).day() !== 0 && moment(m).day() < 5) {
      // console.log('weekday', moment(m).format('YYYY-MM-DD'));
      weekdayCityObjs.push({
        city_code: cityObj.goibiboCityCode,
        checkin_date: moment(m).format('YYYYMMDD'),
        checkout_date: moment(m).add(1, 'day').format('YYYYMMDD'),
        max_pages: cityObj.maxNumPages,
        rt_configuration: '1-2-0',
      });
    }
  }

  return weekdayCityObjs;
};

const createCityInputsForWeekEnds = (cityObj: CityScrappingObject) => {
  const startDate = moment(new Date());
  const endDate = moment(startDate).add(cityObj.numWeekendsFromNow, 'weeks');

  // console.log('startDate', startDate.format());
  // console.log('endDate', endDate.format());

  const weekdayCityObjs: CityScrappingInput[] = [];
  for (const m = startDate; m.isBefore(endDate); m.add(1, 'days')) {
    if (moment(m).day() === 0 || moment(m).day() >= 5) {
      // console.log('weekend', moment(m).format('YYYY-MM-DD'));
      weekdayCityObjs.push({
        city_code: cityObj.goibiboCityCode,
        checkin_date: moment(m).format('YYYYMMDD'),
        checkout_date: moment(m).add(1, 'day').format('YYYYMMDD'),
        max_pages: cityObj.maxNumPages,
        rt_configuration: '1-2-0',
      });
    }
  }

  return weekdayCityObjs;
};

const createCityInputsForGlobalDates = (
  cityObj: CityScrappingObject,
  globalDates: string[],
) => {
  const globalDateObjs: CityScrappingInput[] = [];
  globalDates.forEach((date) => {
    const momentDate = moment(date);
    // console.log('momentDate', momentDate.format());
    if (momentDate && momentDate.isAfter(moment(new Date()))) {
      globalDateObjs.push({
        city_code: cityObj.goibiboCityCode,
        checkin_date: moment(momentDate).format('YYYYMMDD'),
        checkout_date: moment(momentDate).add(1, 'day').format('YYYYMMDD'),
        max_pages: cityObj.maxNumPages,
        rt_configuration: '1-2-0',
      });
    }
  });

  return globalDateObjs;
};
