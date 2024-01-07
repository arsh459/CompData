import axios from "axios";
import { devId, terraAPIKey } from "../../../constants/terra/constants";
import { TerraActivity, TerraUser } from "../../../models/Terra/TerraUser";

interface TerraUserActivityResponse {
  status: "success";
  user: TerraUser;
  data: TerraActivity[];
}

export const getUserActivity = async (userId: string, startDate: string) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://api.tryterra.co/v2/activity",
      headers: {
        "dev-id": devId,
        "x-api-key": terraAPIKey,
      },
      params: {
        user_id: userId,
        start_date: startDate,
      },
    });

    const res = response.data as TerraUserActivityResponse;
    return {
      data: res.data,
      user: res.user,
    };
  } catch (error) {
    return {};
  }
};
