import { CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import axios from "axios";
import { API_BASE_URL } from "react-native-dotenv";

interface ClResponse {
  media?: CloudinaryMedia;
  status: "success" | "failed";
}

export const uploadInternalRequest = async (img: string) => {
  const res = await axios({
    url: `${API_BASE_URL}/api/cloudinary/uploa`,
    method: "POST",
    data: {
      img: img,
    },
  });

  const axiosRes = res.data as ClResponse;

  if (axiosRes.status === "success") {
    return axiosRes.media;
  }

  return undefined;
};
