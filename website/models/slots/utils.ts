import { SlotObj, timeLabel } from "./Slot";
import { DateTime } from "luxon";

export const getIST = () => {
  return DateTime.local({ zone: "Asia/Calcutta", locale: "en-IN" });
};

export const getISTFromMillis = (millis: number) => {
  return DateTime.fromMillis(millis)
    .setZone("Asia/Calcutta")
    .setLocale("en-IN");
};

export const checkTime = (isToday: boolean, target: SlotObj) => {
  const now = getIST();
  const currHr = now.hour;
  const currMin = now.minute;
  const { startHr: targetHr, startMin: targetMin } = getHrAndMin(target);

  if (isToday) {
    if (currHr > targetHr) {
      return false;
    } else if (currHr === targetHr && currMin > targetMin) {
      return false;
    }
  }
  return true;
};

export const checkPeriod = (target: SlotObj): timeLabel => {
  const { startHr: targetHr, startMin: targetMin } = getHrAndMin(target);
  const targetTime = getIST().startOf("day").plus({
    hours: targetHr,
    minutes: targetMin,
  });
  const local = targetTime.toLocal();
  return local.hour < 12 ? "Morning" : "Evening";
};

export const getShowSlotStr = (target: SlotObj): string => {
  const { startHr, startMin, endHr, endMin } = getHrAndMin(target);

  const start = getIST()
    .startOf("day")
    .plus({
      hours: startHr,
      minutes: startMin,
    })
    .toLocaleString(DateTime.TIME_SIMPLE);
  const end = getIST()
    .startOf("day")
    .plus({
      hours: endHr,
      minutes: endMin,
    })
    .toLocaleString(DateTime.TIME_SIMPLE);
  return `${start} - ${end}`;
};

export const getHrAndMin = (slotObj: SlotObj) => {
  const period = slotObj.label === "Evening" ? 12 : 0;

  // console.log("slotObj", slotObj);

  const tempStartHr = parseInt(slotObj.start.split(":")[0]);
  const tempEndHr = parseInt(slotObj.end.split(":")[0]);

  const startHr = period + (tempStartHr % 12);
  const startMin = parseInt(slotObj.start.split(":")[1]);

  let endHr = period + (tempEndHr % 12);
  const isDayChange = endHr - startHr < 0;
  endHr = endHr + (isDayChange ? 12 : 0);
  const endMin = parseInt(slotObj.end.split(":")[1]);

  return { startHr, startMin, endHr, endMin };
};

export const getHrInMS = (num: number) => {
  return num * 60 * 60 * 1000;
};

export const getMinInMS = (num: number) => {
  return num * 60 * 1000;
};

export const getSecInMS = (num: number) => {
  return num * 1000;
};

export const oneDayMS = 60 * 60 * 24 * 1000;
