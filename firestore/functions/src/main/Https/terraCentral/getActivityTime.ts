import { FirestoreTerra, TerraActivity } from "../../../models/Terra/TerraUser";
// import {
//   formatDate,
//   getISTVariantForTime,
// } from "../../PubSub/activityTracker/utils";
import * as moment from "moment-timezone";

export const getPeriodString = (act: TerraActivity | FirestoreTerra) => {
  if (act.metadata && act.metadata.start_time && act.metadata.end_time) {
    return `${act.metadata.start_time}-${act.metadata.end_time}`;
  }

  return "";
};

export const getActivityTime = (act: TerraActivity | FirestoreTerra) => {
  if (act.metadata && act.metadata.start_time) {
    // console.log("act.metadata.start_time", act.metadata.start_time);
    const startTime = moment(act.metadata.start_time);
    // console.log(
    //   `startTime.tz("Asia/Kolkata").format()`,
    //   startTime.tz("Asia/Kolkata").format("YYYY-MM-DD"),
    // );

    return startTime.tz("Asia/Kolkata").format("YYYY-MM-DD");

    // console.log("act.metadata.start_time", act.metadata.start_time);

    // const date = new Date(act.metadata.start_time);

    // console.log("date", date);
    // const istTime = getISTVariantForTime(date);

    // console.log("formattedDate", formatDate(istTime));

    // console.log("istTime", istTime);
  } else {
    // console.log("no metadata");
    return undefined;
  }
};
