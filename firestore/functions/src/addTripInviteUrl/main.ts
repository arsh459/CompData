import { addDynamicLink } from "../user/addInviteURL";
import { setOne } from "../utils/firestore/fetchOne";

export const addTripInvite = async (
  tripId: string,
  circuitId: string,
  access_code: string,
  uid?: string,
) => {
  try {
    const url = generateTripInviteURL(tripId, circuitId, access_code, uid);
    // console.log('url');
    const response = await addDynamicLink(url, undefined, undefined);
    // console.log('response', response.data);

    if (response.data && response.data.shortLink) {
      //console.log("{inviteURL: response.data.shortLink}", {
      //inviteURL: response.data.shortLink,
      // });
      // console.log("tripId", tripId);
      await setOne(
        "trips",
        tripId,
        { inviteURL: response.data.shortLink },
        true,
      );
      return "success";
    }

    return "fail";
  } catch (error) {
    // console.log("error", error);
    return "fail";
  }
};

const generateTripInviteURL = (
  tripId: string,
  circuitId: string,
  access_code: string,
  uid?: string,
) => {
  const inviteURLWithParams = new URL("https://www.holidaying.travel/");

  inviteURLWithParams.searchParams.append("tripId", tripId);
  inviteURLWithParams.searchParams.append("circuitId", circuitId);
  inviteURLWithParams.searchParams.append("access_code", access_code);

  if (uid) {
    inviteURLWithParams.searchParams.append("uid", uid);
  }
  return inviteURLWithParams.href;
};
