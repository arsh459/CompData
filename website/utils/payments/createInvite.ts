import axios from "axios";
// import { RazorpayOrder } from "./interface";
// import { RazorpayOrder } from "pages/api/payments/utils/interface";

// interface userDetailsInterface {
//   name: string;
//   phone: string;
//   email: string;
//   inviteCode: string;
//   eventId: string;
//   uid: string;
// }

interface responseInvite {
  registrationId: string;
}

export const internalInviteRequest = async (
  name: string,
  phone: string,
  email: string,
  inviteCode: string,
  eventId: string,
  uid: string,
  // cohortId: string,
  userUid: string
) => {
  try {
    const response = await axios({
      url: "/api/invites/create",
      // url:
      method: "POST",
      params: {
        name,
        phone,
        email,
        inviteCode,
        eventId,
        uid,
        // cohortId,
        userUid,
      },
    });

    const data = response.data as responseInvite;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
