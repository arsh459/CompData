import axios from "axios";

export interface CreateRoomResponse {
  id: string;
  name?: string;
  enabled?: boolean;
  description?: string;
  customer: string;
  template_id?: string;
  template?: string;
  region?: string;
  created_at?: string;
  updated_at?: string;
  active?: boolean;
}

export interface Room {
  id: string;
  name: string;
  enabled?: boolean;
  description?: string;
  customer?: string;
  // recording_source_template?: boolean;
  template_id?: string;
  template?: string;
  region?: string;
  created_at?: string;
  key?: string;
  updated_at?: string;
}

export interface previousRooms {
  limit: number;
  data: Room[];
  last: string;
}

export const getPreviousRoom = async (id: string, managementToken: string) => {
  try {
    const response = await axios({
      url: `https://api.100ms.live/v2/rooms/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + managementToken,
      },
    });

    return response.data as Room;
  } catch (error) {
    // console.log("eror", error);
    return null;
  }
};

export const createRoom = async (
  managementToken: string,
  name: string,
  description: string,
  template_id: string,
) => {
  const response = await axios({
    url: "https://api.100ms.live/v2/rooms",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + managementToken,
    },
    data: {
      name,
      description,
      template_id,
      recording_info: {},
      region: "in",
    },
  });

  const result = response.data as CreateRoomResponse;

  return result;
};
