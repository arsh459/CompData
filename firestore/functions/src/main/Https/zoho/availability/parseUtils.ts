import { remoteZohoAvailability } from "../../../../models/zoho/availabilityCall";
import { zohoSlot } from "./main";
import * as moment from "moment-timezone";

export const parseToUnix = (fetchedSlots: remoteZohoAvailability[][]) => {
  const finalSlots: zohoSlot[] = [];
  const slotsAdded: { [id: string]: boolean } = {};

  let earliestUnix: number = Number.POSITIVE_INFINITY;

  let i: number = 0;
  for (const fetchedSlotArray of fetchedSlots) {
    // console.log("fetchedSlotArray", fetchedSlotArray);
    for (const singleAgentResponse of fetchedSlotArray) {
      const tz = singleAgentResponse.timezone;
      const staff = singleAgentResponse.staffId;
      const dt = singleAgentResponse.date;

      for (const slotTime of singleAgentResponse.slots) {
        if (slotTime !== "Slots Not Available") {
          const strToConvert = `${dt} ${slotTime}`;

          // skip slot
          if (slotsAdded[strToConvert]) {
            console.log("SKIPPING", tz, staff, dt, slotTime);
            continue;
          }

          const momentObj = moment.tz(strToConvert, "YYYY-MM-DD hh:mm a", tz);

          // console.log("momentObj", strToConvert);
          // throw new Error("paused");
          const unix = momentObj.unix() * 1000;

          if (unix < earliestUnix) {
            // console.log("hi", unix);
            earliestUnix = unix;
          }

          console.log(i, tz, staff, dt, slotTime);

          slotsAdded[strToConvert] = true;
          finalSlots.push({
            staff_id: staff,
            timeStart: unix,
          });
          i++;
        }
      }
    }
  }

  // sorted array across timeIDs
  // const sortedFinalSlot = finalSlots.sort((x, y) => x.timeStart - y.timeStart);

  // const staffObjList: { [date: string]: zohoSlot[] } = {};
  // for (const item of finalSlots) {
  //   if (staffObjList[item.timeStart]) {
  //     staffObjList[item.timeStart].push(item);
  //   } else {
  //     staffObjList[item.timeStart] = [item];
  //   }
  // }

  // let lastStaffId: string = "";
  // const uniqueSlots: zohoSlot[] = []
  // for (const sortedSlot of sortedFinalSlot){
  //   // if sortedSlot
  //   if (!lastStaffId){
  //     uniqueSlots.push(sortedSlot);
  //     lastStaffId=sortedSlot.staff_id;
  //   } else {
  //     // getNext
  //   }
  // }

  // console.log("staffObjList", staffObjList);

  return { finalSlots, earliestUnix };
};

// x, y, z
// x, y, z, x, y, z,
