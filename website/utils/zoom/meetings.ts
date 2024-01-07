import axios from "axios";
import { ZoomMeetingResponse } from "@utils/zoom/getMeetings";
// import { AuthTokenResponse } from "pages/api/zoom/utils/zoomToken";

export const internalGetZoomMeetings = async (
  //   userId: string,
  token: string | undefined
) => {
  if (token) {
    const response = await axios({
      url: "/api/zoom/meetings",
      method: "GET",
      params: {
        // userId: userId,
        token: token,
      },
    });

    const data = response.data as ZoomMeetingResponse;

    // console.log("data", data);
    return data;
  }
};
