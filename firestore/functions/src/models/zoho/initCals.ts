import axios from "axios";
import * as admin from "firebase-admin";

interface workspaceData {
  name: string;
  id: string;
}

interface zohoWorkspaceResponse {
  response?: {
    returnvalue?: {
      data?: workspaceData[];
    };
    status: "success";
  };
}

export const getZohoWorkspaces = async (zoho: zohoToken) => {
  if (zoho.refresh_token) {
    const response = await axios({
      method: "GET",
      url: `${process.env.ZOHO_API_URL}/workspaces`,
      headers: {
        Authorization: `Zoho-oauthtoken ${zoho.access_token}`,
      },
    });

    const resp = response.data as zohoWorkspaceResponse;

    console.log(
      "response from refresh token",
      resp.response?.returnvalue?.data,
    );

    if (resp.response?.returnvalue?.data?.length) {
      await admin.firestore().collection("zoho").doc(zoho.id).update({
        workspace_id: resp.response?.returnvalue?.data[0].id,
      });
    }

    return true;
  }

  return false;
};

interface serviceData {
  duration?: string;
  buffertime?: string;
  service_type?: string;
  assigned_staffs?: string[];
  id?: string;
}

interface zohoServiceResponse {
  response?: {
    returnvalue?: {
      data?: serviceData[];
    };
    status: "success";
  };
}

export const getZohoService = async (zoho: zohoToken) => {
  if (zoho.refresh_token) {
    const response = await axios({
      method: "GET",
      url: `${process.env.ZOHO_API_URL}/services`,
      headers: {
        Authorization: `Zoho-oauthtoken ${zoho.access_token}`,
      },
      params: {
        workspace_id: zoho.workspace_id,
      },
    });

    const resp = response.data as zohoServiceResponse;

    console.log(
      "response from refresh token",
      resp.response?.returnvalue?.data,
    );

    if (resp.response?.returnvalue?.data?.length) {
      const serviceId = resp.response.returnvalue.data[0].id;
      const staff = resp.response.returnvalue.data[0].assigned_staffs;

      if (serviceId && staff) {
        await admin.firestore().collection("zoho").doc(zoho.id).update({
          service_id: serviceId,
          staff_ids: staff,
        });

        return true;
      }
    }
  }

  return false;
};
