import axios from "axios";

export const getIPAddress = async () => {
  const resp = await axios({
    url: `https://api64.ipify.org?format=json`,
    method: "GET",
  });

  const response = resp.data as { ip?: string };
  return response.ip;
};
