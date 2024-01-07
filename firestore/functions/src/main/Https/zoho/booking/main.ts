import { UserInterface } from "../../../../models/User/User";
import { makeBookingCallFunc } from "../../../../models/zoho/bookingCall";
import { getFormattedDateForUnixWithTZ } from "../../../PubSub/activityTracker/utils";

export const createNewBooking = async (
  zoho: zohoToken,
  staffId: string,
  time: number,
  user: UserInterface,
) => {
  //   const user = await getUserById(uid);

  const timeString = getFormattedDateForUnixWithTZ(
    time,
    "Asia/Kolkata",
    "DD-MMM-YYYY HH:mm:ss",
  );

  console.log();
  console.log();
  console.log(
    "timeString",
    time,
    timeString,
    user?.name,
    user?.email,
    user?.phone,
  );

  // get staffId

  return await makeBookingCallFunc(
    zoho,
    staffId,
    timeString,
    "Asia/Kolkata",
    user?.name ? user?.name : "",
    user?.email ? user?.email : "",
    user?.phone ? user?.phone : "+911111111112",
  );
};
