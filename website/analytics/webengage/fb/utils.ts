import axios from "axios";

export const getIPAddress = async () => {
  const resp = await axios({
    url: `https://api64.ipify.org?format=json`,
    method: "GET",
  });

  const response = resp.data as { ip?: string };
  return response.ip;
};

// Function to get a cookie by name
export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

// Function to get a URL parameter by name
export function getUrlParameter(name: string): string {
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
