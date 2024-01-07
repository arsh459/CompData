import axios from "axios";
import * as admin from "firebase-admin";

interface zohoRefreshResponse {
  access_token: string;
  expires_in: number;
}

export const refreshZohoTokenRequest = async (zoho: zohoToken) => {
  if (zoho.refresh_token) {
    const response = await axios({
      method: "POST",
      url: process.env.ZOHO_ACCOUNTS_URL,
      params: {
        refresh_token: zoho.refresh_token,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: "refresh_token",
        accounts_url: process.env.ZOHO_ACCOUNTS_URL,
      },
    });

    const resp = response.data as zohoRefreshResponse;

    console.log("response from refresh token", resp);

    await admin
      .firestore()
      .collection("zoho")
      .doc(zoho.id)
      .update({
        access_token: resp.access_token,
        expiresAt: Date.now() + 3600 * 1000,
      });

    return resp.access_token;
  }

  return "";
};
