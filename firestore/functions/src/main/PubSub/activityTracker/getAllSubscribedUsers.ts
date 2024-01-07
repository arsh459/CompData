import axios from "axios";
import { devId, terraAPIKey } from "../../../constants/terra/constants";
import { TerraUser } from "../../../models/Terra/TerraUser";

interface TerraUserResponse {
  status: "success";
  users: TerraUser[];
}

export const getAllTerraUsers = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "https://api.tryterra.co/v2/subscriptions",
      headers: {
        "dev-id": devId,
        "x-api-key": terraAPIKey,
      },
    });

    const res = response.data as TerraUserResponse;
    return res.users;
  } catch (error) {
    return [];
  }
};
