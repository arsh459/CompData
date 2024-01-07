import { GoogleFitOAuth } from "../../../models/User/User";
import {
  getDayStartIST,
  getFormattedDateForUnix,
  // getFormattedDateForUnix,
} from "../../PubSub/activityTracker/utils";
import { addStepActivities } from "../addSteps/addStepActivities";
import { sevenDaySteps } from "../addSteps/interface";
import { handleAccessToken } from "./fitCheck";
// import { getStepsFromDataSources } from "./getSteps";
import { updateFitForUnix } from "./updateFitForUnix";

export const mainGoogleFit = async (uid: string, googleFit: GoogleFitOAuth) => {
  //   const user = await getUserById(uid);

  //   const { googleFit } = fitCheck(user);

  // console.log("googleFit", googleFit);
  // console.log("Hi I am here", uid);

  if (googleFit) {
    // console.log("goog", googleFit);
    const accessToken = await handleAccessToken(uid, googleFit);
    console.log("access token", accessToken ? "PRESENT" : "ABSENT");

    if (accessToken) {
      const dStepsObj: sevenDaySteps = {};

      const now = Date.now();
      const dayStart = getDayStartIST(now);
      const dayMS = 24 * 60 * 60 * 1000;
      const day_7_back = dayStart - 7 * dayMS;

      for (
        let tStart: number = day_7_back;
        tStart <= dayStart;
        tStart += dayMS
      ) {
        let tEnd = tStart + dayMS;
        if (tEnd > now) {
          tEnd = now;
        }

        const { dStepCt } = await updateFitForUnix(accessToken, tStart, tEnd);

        console.log(
          `dStart:`,
          new Date(tStart),
          `tEnd:`,
          new Date(tEnd),
          "steps",
          dStepCt,
        );

        const fDate = getFormattedDateForUnix(tStart);
        dStepsObj[fDate] = dStepCt;
      }

      // const fDate = getFormattedDateForUnix(dayStart);

      // console.log("dayStart", dayStart, now);

      // const dStepCt = await getStepsFromDataSources(accessToken, dayStart, now);

      // console.log("gFitResponse", dStepCt);

      // get steps
      // const dStepCt = parseStepResponse(gFitResponse);

      // console.log("dStepCt", dStepCt);
      await addStepActivities(uid, dStepsObj);

      return {
        status: "success",
        steps: dStepsObj,
        start: day_7_back,
        end: now,
        date: `${day_7_back}-${now}`,
      };
    }
  }

  return undefined;
};
