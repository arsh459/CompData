// import {
//   getDayStartIST,
//   getFormattedDateForUnix,
// } from "../../PubSub/activityTracker/utils";
import { getStepsFromDataSources } from "./getSteps";

export const updateFitForUnix = async (
  accessToken: string,
  timeStart: number,
  timeEnd: number,
) => {
  //   const fDate = getFormattedDateForUnix(dayStart);

  // console.log("dayStart", dayStart, now);

  const dStepCt = await getStepsFromDataSources(
    accessToken,
    timeStart,
    timeEnd,
  );

  return {
    // fDate,
    dStepCt,
  };
};
