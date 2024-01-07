import axios from "axios";

export interface zohoBookingSuccessResponse {
  response?: {
    returnvalue?: {
      staff_name?: string;

      booked_on: string;
      booking_id: string;
      customer_booking_start_time: string;
      service_id: string;
      staff_id: string;

      customer_contact_no: string;

      workspace_id: string;
      duration: string;

      summary_url?: string;
      workspace_name: string;
      service_name: string;
      time_zone: string;
      start_time: string;
      end_time: string;
      booking_type: string;
      status: "upcoming";
    };
    status: "success";
  };
}

interface zohoBookingFailResponse {
  response?: {
    returnvalue?: {
      message?: string;
      status?: "failure";
    };
    status: "success";
  };
}

type zohoBookingResponse = zohoBookingFailResponse | zohoBookingSuccessResponse;

//https://www.zohoapis.in/bookings/v1/json/availableslots?service_id=202204000000031054&selected_date=17-Sep-2023&staff_id=202204000000031016
export const makeBookingCallFunc = async (
  zoho: zohoToken,
  staff_id: string,
  from_time: string,
  time_zone: string,
  name: string,
  email: string,
  phone_number: string,
): Promise<
  zohoBookingFailResponse | zohoBookingSuccessResponse | undefined
> => {
  if (zoho.refresh_token) {
    const data = new URLSearchParams({
      service_id: zoho.service_id,
      staff_id: staff_id,

      from_time: from_time,
      timezone: time_zone,
      customer_details: JSON.stringify({
        name: name,
        email: email,
        phone_number: phone_number,
      }),
    });

    console.log("data", data);

    const response = await axios({
      method: "POST",
      url: `${process.env.ZOHO_API_URL}/appointment`,
      headers: {
        Authorization: `Zoho-oauthtoken ${zoho.access_token}`,
      },
      data: data,
    });

    const bookingResponse = response.data as zohoBookingResponse;

    return bookingResponse;
  }

  return undefined;
};
