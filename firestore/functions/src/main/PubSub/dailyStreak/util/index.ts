import moment = require("moment");
import { getTimezones } from "../../../../models/timezone/Methods";

// export const timeZones = [
//   "UTC",
//   "Europe/London",
//   "Europe/Berlin",
//   "Europe/Paris",
//   "Asia/Calcutta",
//   "Asia/Kolkata",
//   "Asia/Shanghai",
//   "Asia/Tokyo",
//   "Australia/Sydney",
//   "America/New_York",
//   "America/Los_Angeles",
//   "America/Sao_Paulo",
// ];
export const getMidnightTimezones = async () => {
  const tzs = await getTimezones();
  const timeZones = tzs?.timezones;

  if (timeZones) {
    const nowUtc = moment.utc();

    const midNightTimeZones = timeZones.filter((timeZone) => {
      const localTime = nowUtc.clone().tz(timeZone);
      // console.log(localTime);
      console.log(
        "Time in",
        timeZone,
        "is",
        `${localTime.hour()}h`,
        `${localTime.minute()}m`,
      );
      // 12 - 12:14am
      return localTime.hour() === 0 && localTime.minute() <= 14;
      // return localTime.hour() === 14 && localTime.hour() < 50; // localTime.minute() <= 15;
    });

    return midNightTimeZones;
  }

  return [];
};
