// import {
//   client_id,
//   client_secret,
//   redirect_uri,
// } from "@hooks/zoom/interface/constants";
import axios from "axios";

export interface ZoomMeetingResponse {
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
  meetings: Meeting[];
}

export interface Meeting {
  uuid: string;
  id: number;
  host_id: string;
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  join_url: string;
}

export const getMeetings = async (token: string) => {
  // try {
  const response = await axios({
    url: `https://api.zoom.us/v2/users/me/meetings`,
    method: "GET",
    headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    params: {
      type: "scheduled",
      page_size: 10,
    },
  });

  const data = response.data as ZoomMeetingResponse;
  // console.log("data", data);
  return data;
};
