import { chetnaUID, nishaUID } from "../../../../constants/email/contacts";
import { getLastSalesAppointment } from "../../../../models/Appointments/getUtils";
import {
  availabilityCallAxios,
  zohoAvailabilityResponse,
} from "../../../../models/zoho/availabilityCall";
import {
  getDayStartIST,
  getFormattedDateForUnixWithTZ,
} from "../../../PubSub/activityTracker/utils";

const roundRobinConfiguration = [nishaUID, chetnaUID];
const staffIdsByUID: { [id: string]: string } = {
  [nishaUID]: "202204000000040492",
  [chetnaUID]: "202204000000058728",
  //   [RahulUID]: "202204000000031016",
};
const uidByStaffId: { [id: string]: string } = {
  "202204000000040492": nishaUID,
  "202204000000058728": chetnaUID,
};

export const roundRobinMain = async (
  zoho: zohoToken,
  slotStart: number,
  staffId: string,
) => {
  // get last agent
  console.log();
  // console.log("User selected staff", staffId);

  const lastSalesAppointment = await getLastSalesAppointment();

  if (lastSalesAppointment?.doctorId) {
    const { daySTR, slotTimeToCheck } = getSlotDetails(slotStart);

    let agentsChecked: number = 0;
    let lastUID = lastSalesAppointment.doctorId;
    while (agentsChecked < roundRobinConfiguration.length) {
      console.log();
      // getNextAgent in queue
      const nextAgentUID = getNextProspectiveAgent(lastUID);

      // is next agent available
      const staffIdForNextAgent = staffIdsByUID[nextAgentUID];
      if (staffIdForNextAgent) {
        // if next staffId is same as requested
        if (staffIdForNextAgent === staffId) {
          console.log();
          console.log("####");
          console.log("Requested same as picked", staffId);
          return { updatedStaffId: staffId, agentId: nextAgentUID };
        }

        const status = await checkAvailabilityForNextStaffId(
          zoho,
          daySTR,
          slotTimeToCheck,
          staffIdForNextAgent,
        );

        if (status) {
          console.log();
          console.log("####");
          console.log("Using", staffIdForNextAgent);
          return { updatedStaffId: staffIdForNextAgent, agentId: nextAgentUID };
        }
      }

      lastUID = nextAgentUID;
      agentsChecked++;
    }
  }

  return { updatedStaffId: staffId, agentId: uidByStaffId[staffId] };
};

const getNextProspectiveAgent = (currentUID: string) => {
  const currentIndex = roundRobinConfiguration.indexOf(currentUID);

  const nextAgentNumber = (currentIndex + 1) % roundRobinConfiguration.length;
  const nextAgentUID = roundRobinConfiguration[nextAgentNumber];

  console.log(
    `CurrentIndex:${currentIndex} |  NEXT AGENT Index:${nextAgentNumber} | Next Agent UID:${nextAgentUID}`,
  );
  return nextAgentUID;
};

const getSlotDetails = (slotStart: number) => {
  const dayStartInIndia = getDayStartIST(slotStart);
  const daySTR = getFormattedDateForUnixWithTZ(dayStartInIndia, "Asia/Kolkata");
  const slotTimeToCheck = getFormattedDateForUnixWithTZ(
    slotStart,
    "Asia/Kolkata",
    "hh:mm A",
  );

  console.log(`Day:${daySTR} | SlotTime:${slotTimeToCheck}`);

  return {
    slotTimeToCheck,
    daySTR,
    dayStartInIndia,
  };
};

const getOtherStaffAvailability = async (
  zoho: zohoToken,
  staffId: string,
  daySTR: string,
) => {
  const otherStaffAvailability = await availabilityCallAxios(
    zoho,
    staffId,
    daySTR,
  );

  const staffResponse = otherStaffAvailability.data as zohoAvailabilityResponse;
  const slots = staffResponse.response?.returnvalue?.data;

  return slots;
};

const checkAvailabilityForNextStaffId = async (
  zoho: zohoToken,
  daySTR: string,
  slotTimeToCheck: string,
  staffId: string,
) => {
  const slots = await getOtherStaffAvailability(zoho, staffId, daySTR);
  console.log("slots", slots);

  //
  const isSlotAvailableList = slots?.filter((item) => item === slotTimeToCheck);

  if (isSlotAvailableList?.length) {
    console.log("SLOT AVAILALE");
    return true;
  }

  return false;
};
