import axios from "axios";

export interface zohoAvailabilityResponse {
  response?: {
    returnvalue?: {
      response?: boolean;
      data?: string[];
      time_zone?: string;
    };
    status: "success";
  };
}

export interface remoteZohoAvailability {
  slots: string[];
  timezone: string;
  staffId: string;
  date: string;
}

//https://www.zohoapis.in/bookings/v1/json/availableslots?service_id=202204000000031054&selected_date=17-Sep-2023&staff_id=202204000000031016
export const getZohoAvailabilityFunc = async (
  zoho: zohoToken,
  date: string,
): Promise<remoteZohoAvailability[]> => {
  if (zoho.refresh_token) {
    const promises = [];
    const staff_ids: string[] = [];
    for (const staffId of zoho.staff_ids) {
      // console.log("staffId", staffId);
      if (
        staffId !== "202204000000031016" &&
        staffId !== "202204000000034018"
      ) {
        const promise = availabilityCallAxios(zoho, staffId, date);

        staff_ids.push(staffId);
        promises.push(promise);
      }
    }

    const axiosPromises = await Promise.all(promises);

    const parsedAxios = axiosPromises.map((item, index) => {
      const slotResp = item.data as zohoAvailabilityResponse;

      if (slotResp.response?.returnvalue?.data) {
        // console.log("sl", slotResp.response.returnvalue);

        return {
          slots: slotResp.response.returnvalue.data,
          staffId: staff_ids[index] ? staff_ids[index] : "",
          timezone: slotResp.response.returnvalue.time_zone
            ? slotResp.response.returnvalue.time_zone
            : "Asia/Kolkata",
          date,
        };
      }

      return {
        slots: [],
        staffId: "",
        timezone: "Asia/Kolkata",
        date,
      };
    });

    return parsedAxios;
  }

  return [];
};

export const availabilityCallAxios = async (
  zoho: zohoToken,
  staffId: string,
  date: string,
) => {
  return axios({
    method: "GET",
    url: `${process.env.ZOHO_API_URL}/availableslots`,
    headers: {
      Authorization: `Zoho-oauthtoken ${zoho.access_token}`,
    },
    params: {
      service_id: zoho.service_id,
      selected_date: date,
      staff_id: staffId,
    },
  });
};
