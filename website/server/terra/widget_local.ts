import axios from "axios";

interface SuccessWidgetResponse {
  session_id: string;
  status: "success";
  url: string;
}

interface SuccessDeleteResponse {
  status: "success";
}

export const terraWidget_internalCall = async (
  uid: string,
  leaderKey?: string,
  eventKey?: string,
  workout?: boolean
) => {
  try {
    const res = await axios({
      url: "/api/terra/widget",
      method: "POST",
      params: {
        uid,
        leaderKey,
        eventKey,
        workout,
      },
    });
    const response = res.data as SuccessWidgetResponse;

    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const terraDelete_internalCall = async (
  user_id: string,
  uid: string
) => {
  try {
    const res = await axios({
      url: "/api/terra/remove",
      method: "POST",
      params: {
        user_id,
        uid,
      },
    });
    const response = res.data as SuccessDeleteResponse;

    return response;
  } catch (error) {
    console.log("error", error);
  }
};
