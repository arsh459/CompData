import {
  getZohoAvailabilityFunc,
  remoteZohoAvailability,
} from "../../../../models/zoho/availabilityCall";
import {
  getDayStartIST,
  getFormattedDateForUnixWithTZ,
} from "../../../PubSub/activityTracker/utils";
import { ONE_DAY_MS } from "../../period/getPeriodArray";
import { parseToUnix } from "./parseUtils";

export interface zohoSlot {
  timeStart: number;
  staff_id: string;
}

interface availabilityResponse {
  slots: zohoSlot[];
  slotDurationInMinutes: number;
  earliestUnix?: number;
}

const getDatesToFetchAvailability = (start: number, end: number) => {
  const dayStartInIndia = getDayStartIST(start);
  const getDayEndInIndia = getDayStartIST(end);

  const datesToUse: { [date: string]: boolean } = {};

  console.log("dayStartInIndia", dayStartInIndia);
  console.log("getDayEndInIndia", getDayEndInIndia);

  // const stDateInIndia = getFormattedDateForUnixWithTZ(
  //   dayStartInIndia,
  //   "Asia/Kolkata",
  // );
  // const EnDateInIndia = getFormattedDateForUnixWithTZ(
  //   getDayEndInIndia,
  //   "Asia/Kolkata",
  // );

  const days = Math.round((getDayEndInIndia - dayStartInIndia) / ONE_DAY_MS);

  for (let dayCt: number = 0; dayCt < days; dayCt++) {
    const unixStart = dayStartInIndia + dayCt * ONE_DAY_MS;
    const daySTR = getFormattedDateForUnixWithTZ(unixStart, "Asia/Kolkata");

    datesToUse[daySTR] = true;
  }

  // console.log("datesToUse", datesToUse);

  // console.log("stDateInIndia", stDateInIndia);
  // console.log("EnDateInIndia", EnDateInIndia);

  // throw new Error("Hi");

  // datesToUse[stDateInIndia] = true;
  // datesToUse[EnDateInIndia] = true;

  return datesToUse;
};

export const fetchAvailabilityMain = async (
  zoho: zohoToken,
  start: number,
  end: number,
): Promise<availabilityResponse> => {
  const datesToUse = getDatesToFetchAvailability(start, end);

  console.log("datesToUse", datesToUse);

  const allAvailabilities: Promise<remoteZohoAvailability[]>[] = [];
  for (const date of Object.keys(datesToUse)) {
    const availabilityPromise = getZohoAvailabilityFunc(zoho, date);
    allAvailabilities.push(availabilityPromise);
  }

  const fetchedSlots = await Promise.all(allAvailabilities);

  const { finalSlots, earliestUnix } = parseToUnix(fetchedSlots);

  // console.log("earliestUnix", earliestUnix, end, earliestUnix < end);
  // throw new Error("hi");

  return {
    slots: finalSlots,
    slotDurationInMinutes: 15,
    ...(earliestUnix < end ? { earliestUnix } : {}),
  };
};
